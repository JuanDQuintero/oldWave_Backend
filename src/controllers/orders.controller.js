import getConnection from "../database/database";
import NodeMailer from "nodemailer";
import {
  GET_ORDER_BY_ID,
  GET_STOCK_PRODUCT,
  UPDATE_STOCK_PRODUCT,
  CREATE_ORDER,
  GET_USER,
} from "../database/queries";


const plantilla = "<p>&nbsp;</p>"
+"<h3 style='text-align: center; color: #7444fb; font-size: 3rem;'>Recibo&nbsp;</h3>"
+"<p><strong>Saludos, acontinuacion vera un resumen de la compra que acaba de realizar</strong></p>"
+"<table style='height: 54px; width: 100%; border-collapse: collapse;'border='1'>"
+"<tbody>"
+"<tr style='width: 33.3333%; height: 18px;'>"
+"<td style='width: 33.3333%; height: 18px;'>Producto 1</td>"
+"<td style='width: 33.3333%; height: 18px; text-align: left;;'>x10</td>"
+"<td style='width: 33.3333%; height: 18px;'>$100.000</td>"
+"</tr>"
+"<tr style='width: 33.3333%; height: 18px;'>"
+"<td style='width: 33.3333%; height: 18px;'>Producto 2</td>"
+"<td style='width: 33.3333%; height: 18px; text-align: left;'>x1</td>"
+"<td style='width: 33.3333%; height: 18px;'>$200.000</td>"
+"</tr>"
+"<tr style='height: 18px;'>"
+"<td style='width: 33.3333%; height: 18px;'></td>"
+"<td style='width: 33.3333%; height: 18px;'>Total</td>"
+"<td style='width: 33.3333%; height: 18px;'>$300.000</td>"
+"</tr>"
+"</tbody>"
+"</table>"
+"<p></p>"
+"<p><img src='http://placekitten.com/200/300' alt='Logo' width='117' height='176' style='display: block; margin-left: auto; margin-right: auto;' /></p>"
+"<p>&nbsp;</p>"
+"<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Para dudas comuniquese al correo test@test.com</p>"

const sendEmail = async () => {
  const transporter = NodeMailer.createTransport({
    service: process.env.HOST_SMTP,
    auth: {
      user: process.env.USER_SMTP,
      pass: process.env.PASSWORD_STMP,
    },
  });

  console.log("Usuario: "+process.env.USER_SMTP+" Contrasna: "+ process.env.PASSWORD_STMP)


  await transporter.sendMail({
    from: '"Fred Foo 👻" loscarr18@example.com', // sender address
    to: "carlosquiros12@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: plantilla, // html body
  }, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully");
    }
  });

};

const createOrder = async (req, res) => {
  const { idUser, idProduct, quantity } = req.body;

  try {
    if (
      !Array.isArray(idProduct) ||
      !Array.isArray(quantity) ||
      idProduct.length !== quantity.length
    ) {
      res.status(400).end({ error: "Por favor revisa la peticion enviada" });
    }
    let allStock = [];
    let allProduct = [];
    const connection = await getConnection();
    const user = await connection.query(GET_USER, [idUser]);
    idProduct.forEach(async (product, index) => {
      let newStock = 0;
      const stock = await connection.query(GET_STOCK_PRODUCT, [
        idProduct[index],
      ]);

      if (stock[0].stock > quantity[index]) {
        newStock = stock[0].stock - quantity[index];
        await connection.query(CREATE_ORDER, [
          idUser,
          idProduct[index],
          quantity[index],
          new Date().toISOString().slice(0, 19).replace("T", " "),
        ]);
        await connection.query(UPDATE_STOCK_PRODUCT, [
          newStock,
          idProduct[index],
        ]);

        if (index === idProduct.length - 1) {
          res.status(201).json({ Succes: "Su orden ha sido creada" });
        }
      } else {
        allStock.push(stock[0].stock);
        allProduct.push(idProduct[index]);
        if (index === idProduct.length - 1) {
          res.status(400).json({
            Error: `Los siguientes productos superaron el stock disponible`,
            stockActual: {
              stockIndividual: allStock,
              idProduct: allProduct,
            },
          });
        }
      }
    });
  } catch (e) {
    res.status(400).json({ Error: "Ha ocurrido un error inesperado" });
  }
};

const getOrderById = async (req, res) => {
  const { idUser } = req.params;
  const connection = await getConnection();
  const order = await connection.query(GET_ORDER_BY_ID, [idUser]);
  if (order.length > 0) {
    res.status(200).json({ success: order });
  } else {
    res
      .status(404)
      .json({
        notFound: "No se ha encontrado informacion con el id ingresado",
      });
  }
};

export default {
  createOrder,
  getOrderById,
  sendEmail
};

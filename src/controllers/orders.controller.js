import getConnection from "../database/database";
import {
  GET_ORDER_BY_ID,
  GET_STOCK_PRODUCT,
  UPDATE_STOCK_PRODUCT,
  CREATE_ORDER,
} from "../database/queries";

const createOrder = async (req, res) => {
  const { idUser, idProduct, quantity } = req.body;
  try {
    const connection = await getConnection();

    idProduct.forEach(async (product, index) => {

      let newStock = 0;
      const stock = await connection.query(GET_STOCK_PRODUCT, [
        idProduct[index],
      ]);

      if (stock[0].stock > quantity[index]) {
        newStock = stock[0].stock - quantity[index];
        try {
            await connection.query(CREATE_ORDER, [
                idUser,
              idProduct[index],
              quantity[index],
              new Date().toISOString().slice(0, 19).replace('T', ' '),
            ]);
            await connection.query(UPDATE_STOCK_PRODUCT, [newStock,idProduct[index]])
    
            res.json({ Succes: "Su orden ha sido creada" });
        } catch (error) {
            console.log(error)
        }
      } else {
        res.json({
          Error:`el producto con id ${idProduct[index]} ha sido superado el stock`,
          stockActual: stock
        });
      }
    });
  } catch (error) {
    res.json({ Error: "Ha ocurrido un error inesperado" });
  }
};

const getOrderById = async (req, res) => {
  const { idUser } = req.params;
  try {
    const connection = await getConnection();
    const order = await connection.query(GET_ORDER_BY_ID, [idUser]);
    res.status(200).json({ success: order });
  } catch (error) {
    res.status(400).json({ Error: "Ha ocurrido un error inesperado" });
  }
};

export default {
  createOrder,
  getOrderById,
};

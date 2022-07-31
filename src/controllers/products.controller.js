import { getConnection } from "../database/database";

const getProducts = async (req, res) => {
  const connection = await getConnection();
  const products = await connection.query(
    "SELECT                               \
      product.name as name,               \
      product.description as description, \
      product.price as price,             \
      product.img as img,                 \
      brand.name as brand                 \
   FROM product INNER JOIN brand          \
   ON product.brand_id = brand.id;"
  );
  res.json(products);
};

export const methods = {
  getProducts,
};

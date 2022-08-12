import getConnection from '../database/database';
import {
  GET_PRODUCT, GET_PRODUCTS, GET_PRODUCT_IMGS,
} from '../database/queries';

const getProducts = async (req, res) => {
  const connection = await getConnection();
  const products = await connection.query(GET_PRODUCTS);
  res.json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const connection = await getConnection();
  const product = await connection.query(GET_PRODUCT, [id]);

  if (product.length === 0) {
    res.json({
      error: 'Product not found',
    });
    return;
  }

  const imgs = await connection.query(GET_PRODUCT_IMGS, [id]);

  product[0].imgs = imgs;

  res.json(product);
};

export default {
  getProducts,
  getProduct,

};

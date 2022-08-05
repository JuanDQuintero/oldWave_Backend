import getConnection from '../database/database';

const getProducts = async (req, res) => {
  const connection = await getConnection();
  const products = await connection.query(
    'SELECT  '
    + 'product.id as id, '
    + 'product.name as name, '
    + 'product.description as description, '
    + 'product.price as price, '
    + 'product.thumbnail as thumbnail, '
    + 'brand.name as brand , '
    + 'reseller.city as city,  '
    + 'reseller.name as reseller, '
    + 'reseller.rating as reseller_rating '
    + 'FROM product INNER JOIN brand  '
    + 'ON product.brand_id = brand.id INNER JOIN '
    + 'reseller ON product.reseller_id = reseller.id;',
  );
  res.json(products);
};

export default {
  getProducts,
};

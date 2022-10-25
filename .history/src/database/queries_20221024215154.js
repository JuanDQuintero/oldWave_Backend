export const GET_PRODUCTS = 'SELECT  '
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
  + 'reseller ON product.reseller_id = reseller.id;';

export const GET_PRODUCT = 'SELECT  '
  + 'product.id as id, '
  + 'product.name as name, '
  + 'product.description as description, '
  + 'product.price as price, '
  + 'brand.name as brand , '
  + 'reseller.city as city,  '
  + 'reseller.name as reseller, '
  + 'reseller.logo as reseller_logo, '
  + 'reseller.rating as reseller_rating '
  + 'FROM product INNER JOIN brand  '
  + 'ON product.brand_id = brand.id INNER JOIN '
  + 'reseller ON product.reseller_id = reseller.id '
  + 'WHERE product.id = ?;';

export const GET_PRODUCT_IMGS = 'SELECT '
  + 'id, src '
  + 'FROM product_image '
  + 'WHERE product_id = ?;';

export const GET_PRODUCT_MATCHES = 'SELECT  '
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
  + 'reseller ON product.reseller_id = reseller.id '
  + 'WHERE(product.name LIKE ?) '
  + '+ (product.description LIKE ?) '
  + '+ (brand.name LIKE ?) '
  + '+ (reseller.name LIKE ?) ';


export const GET_USER = 'SELECT '
+ 'users.iduser as id, '
+ 'users.email as email, '
+ 'users.name as name, '
+ 'users.lastname as lastname, '
+ 'users.idGoogle as idGoogle '
+ 'FROM users where users.idGoogle = ? or users.email = ?'


export const CREATE_USER = 'INSERT INTO users (email, name, lastname, idGoogle) VALUES (?,?,?,?)'
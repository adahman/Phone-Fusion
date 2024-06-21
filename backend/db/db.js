const pg = require("pg");
const client = new pg.Client("postgres://localhost/PhoneFusion");

//Getting aLl users:
const getAllUsers = async () => {
  const response = await client.query(`SELECT * FROM "Users"" ORDER BY id ASC`);
  return response.rows;
};

//Getting a single user:
const getSingleUserById = async (id) => {
  const response = await client.query(`SELECT * FROM "Users" WHERE id = $1`, [
    id,
  ]);
  return response.rows[0];
};

//Getting a user by username:
const getUserByUsername = async (username) => {
  const response = await client.query(
    `SELECT * FROM "Users" WHERE username = $1`,
    [username]
  );
  console.log("getUserByUsername response:", response.rows);
  return response.rows[0];
};

//deleting a user
const deleteUser = async (id) => {
  await client.query(`DELETE FROM "Users" WHERE id =$1`, [id]);
  return { id };
};

//update user
const updateUser = async (id, user) => {
  const { username, email, password } = user;
  const response = await client.query(
    `UPDATE "Users" SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`,
    [username, email, password, id]
  );
  return response.rows[0];
};

//Getting all phones:
const getAllPhones = async () => {
  const response = await client.query(`SELECT * FROM "Phones" ORDER BY id ASC`);
  return response.rows;
};

//Getting a single phone by its id:
const getPhonebyId = async (id) => {
  const response = await client.query(`SELECT * FROM "Phones" WHERE id = $1`, [
    id,
  ]);
  return response.rows[0];
};

//Creating a phone
const createPhone = async (phone) => {
  const { name, brand, price, screen_size, camera_res } = phone;
  const response = await client.query(
    `INSERT INTO "Phones" (name, brand, price, screen_size, camera_res) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, brand, price, screen_size, camera_res]
  );
  return response.rows[0];
};

//Updating a phone
const updatePhone = async (id, phone) => {
  const { name, brand, price, screen_size, camera_res, imgUrL } = phone;
  const response = await client.query(
    `UPDATE "Phone" SET name = $1, brand = $2, price = $3, screen_size = $4, camera_res = $5, imgUrL = $7 WHERE id = $8 RETURNING *`,
    [name, brand, price, screen_size, camera_res, imgUrL, id]
  );
  return response.rows[0];
};

//Deleting a phone
const deletePhone = async (id) => {
  await client.query(`DELETE FROM "Phones" WHERE id = $1`, [id]);
  return { id };
};

//ORDERS
const getAllOrders = async () => {
  const response = await client.query(`SELECT * FROM "Orders" ORDER BY id ASC`);
  return response.rows;
};

const getSingleOrderById = async (id) => {
  const response = await client.query(`SELECT * FROM "Orders" WHERE id = $1`, [
    id,
  ]);
  return response.rows[0];
};

const deleteOrderById = async (id) => {
  await client.query(`DELETE FROM "Orders" WHERE id = $1`, [Number(id)]);
  return {
    id: id,
  };
};

const addOrderByUserId = async (body) => {
  await client.query(
    `INSERT INTO "Orders"(user_id, status, created_at) VALUES($1, $2, now())`,
    [body.user_id, body.status, body.created_at]
  );
  return {
    user_id: body.user_id,
    status: body.status,
    created_at: body.created_at,
  };
};

const updateOrder = async (id, order) => {
  const { order_id, phone_id, quantity } = order;
  const response = await client.query(
    `UPDATE "Orders" SET order_id = $1, phone_id = $2, quantity = $3 WHERE id = $4 RETURNING *`,
    [order_id, phone_id, quantity, id]
  );
  return response.rows[0];
};

//Cart
const getAllCart = async () => {
  const response = await client.query(`SELECT * FROM "Cart" ORDER BY id ASC`);
  return response.rows;
};

const getCartByUserId = async (params_id) => {
  const cart_res = await client.query(
    `SELECT * FROM "Cart" WHERE user_id = $1`,
    [params_id]
  );
  return {
    cart: cart_res.rows,
  };
};

const addCartByUserId = async (body) => {
  await client.query(
    `INSERT INTO "Cart"(phone_id, order_id, user_id, quantity) VALUES($1, $2)`,
    [body.phone_id, body.order_id, body.user_id, body.quantity]
  );
  return {
    phone_id: body.phone_id,
    order_id: body.order_id,
    user_id: body.user_id,
    quantity: body.quantity,
  };
};

const deleteCartByUserId = async (id) => {
  await client.query(`DELETE FROM "Cart" WHERE id = $1`, [Number(id)]);
  return {
    id: id,
  };
};

const updateCart = async (id, cart) => {
  const { order_id, phone_id, quantity } = cart;
  const response = await client.query(
    `UPDATE "Cart" SET order_id = $1, phone_id = $2, quantity =$3 WHERE id = $4 RETURNING *`,
    [order_id, phone_id, quantity, id]
  );
  return response.rows[0];
};

const checkOut = async (body) => {
  await client.query(
    `INSERT INTO "Orders"(phone_id, order_id, user_id, quantity) VALUES($1, $2, $3, $4)`,
    [body.phone_id, body.order_id, body.user_id, body.quantity]
  );
  return {
    phone_id: body.phone_id,
    order_id: body.order_id,
    user_id: body.user_id,
    quantity: body.quantity,
  };
};

module.exports = {
  getUserByUsername,
  getAllUsers,
  deleteUser,
  updateUser,
  getAllPhones,
  getSingleUserById,
  getPhonebyId,
  createPhone,
  updatePhone,
  deletePhone,
  getAllOrders,
  getSingleOrderById,
  deleteOrderById,
  addOrderByUserId,
  updateOrder,
  getAllCart,
  getCartByUserId,
  addCartByUserId,
  deleteCartByUserId,
  updateCart,
  checkOut,
  client,
};

const pg = require("pg");
const client = new pg.Client("postgres://localhost/PhoneFusion");



//Getting aLl users:
const getAllUsers = async () => {
    const response = await client.query(`SELECT * FROM "User"" ORDER BY id ASC`);
    return response.rows;
};


//Getting a single user:
const getSingleUserById = async (id) => {
    const response = await client.query(`SELECT * FROM "User" WHERE id = $1`, [
        id,
    ]);
    return response.rows[0];
};

//Getting a user by username:
const getUserByUsername = async (username) => {
    const response = await client.query(`SELECT * FROM "User" WHERE username = $1`, [username]);
    return response.rows[0];
};


  

//Getting all phones:
const getAllPhones = async () => {
    const response = await client.query(`SELECT * FROM "Phones" ORDER BY id ASC`);
    return response.rows;
};
  
//Getting a single phone by its id:
const getPhonebyId = async (id) => {
    const response = await client.query(`SELECT * FROM "Phones" WHERE id = $1`, [id]);
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
    await client.query(`DELETE FROM "Phone" WHERE id = $1`, [id]);
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



  
  
module.exports = {
    getUserByUsername,
    getAllUsers,
    getAllPhones,
    getSingleUserById,
    getPhonebyId,
    createPhone,
    updatePhone,
    deletePhone,
    getAllOrders,
    getSingleOrderById,
    client,
};
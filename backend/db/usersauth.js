const { client } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT = "shhhhhhhh";

const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 5);
  console.log("Hashed Password:", hashedPassword);
  const response = await client.query(
    `INSERT INTO "Users"(username, email, password) VALUES($1, $2, $3) RETURNING *`,
    [username, email, hashedPassword]
  );
  console.log("User created:", response.rows[0]);
  return response.rows[0];
};

const createUserAndGenerateToken = async ({ username, email, password }) => {
  const user = await createUser({ username, email, password });
  const token = await jwt.sign({ id: user.id }, JWT);
  return {
    user,
    token,
  };
};

const authenticate = async ({ username, password }) => {
  console.log("Authenticating user with email:", username);

  const response = await client.query(
    `SELECT id, username, password FROM "Users" WHERE email = $1`,
    [username]
  );
  console.log("Database response:", response.rows);

  if (!response.rows.length) {
    console.log("No user found with email:", username);
  } else {
    const isPasswordMatch = await bcrypt.compare(
      password,
      response.rows[0].password
    );
    console.log("Password match:", isPasswordMatch);

    if (!isPasswordMatch) {
      console.log("Password mismatch for user with email:", username);
    }
  }

  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].password)) === false
  ) {
    console.log("Authentication failed for user with email:", username);
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }

  const token = await jwt.sign({ id: response.rows[0].id }, JWT);
  console.log("Authentication successful for user with email:", username);

  return {
    user: response.rows[0],
    token,
  };
};

// middlewarefunction
const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }

  const response = await client.query(
    `SELECT id, username 
            FROM "Users" WHERE id=$1`,
    [id]
  );

  if (!response.rows.length) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }

  return response.rows[0];
};

const updateUser = async (id, user) => {
  const { username, email, password } = user;
  const response = await client.query(
    `UPDATE "Users" SET username = $1, email = $2, password = $3,  WHERE id = $4 RETURNING *`,
    [username, email, password, id]
  );
  return response.rows[0];
};

module.exports = {
  authenticate,
  createUserAndGenerateToken,
  findUserWithToken,
  updateUser,
};

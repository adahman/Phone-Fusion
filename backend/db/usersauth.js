const {client}= require("./db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const JWT = 'shhhhhhhh'

const createUser = async({username, password, email})=>{
    const response = await client.query(`INSERT INTO "Users"(username, password, email) 
        VALUES($1, $2, $3) RETURNING *`,
        [username, await bcrypt.hash(password, 5), email]);
    return response.rows[0]
}

const createUserAndGenerateToken = async({username, password, email})=>{
    const user = await createUser({username, password, email});
    const token = await  jwt.sign({id: user.id}, JWT)
    return {
        user,
        token
    }
}

const authenticate = async({username, password})=>{
    const response = await client.query(`SELECT id, username, 
            password FROM "Users" WHERE username=$1`, [username]);
    if(!response.rows.length||(await bcrypt.compare(password, response.rows[0].password))===false){
        const error = Error("not authorized")
        error.status = 401;
        throw error
    }

    const token = await jwt.sign({id: response.rows[0].id}, JWT)
    return{
        user: response.rows[0],
        token
    }

}

// middlewarefunction
const findUserWithToken = async (token)=>{
    let id;
    try{
        const payload = await  jwt.verify(token, JWT);
        id = payload.id;
    }catch(ex){
        const error = Error("not authorized")
        error.status = 401;
        throw error
    }

    const response = await client.query(`SELECT id, username 
            FROM "Users" WHERE id=$1`, [id]);

    if(!response.rows.length){
        const error = Error("not authorized")
        error.status = 401;
        throw error
    }

    return response.rows[0]

}

module.exports ={
    authenticate,
    createUserAndGenerateToken,
    findUserWithToken
}
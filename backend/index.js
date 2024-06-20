const express = require("express");
const app = express();
const {client} = require("./db/db");
const baseQuery = "/api";
const cors = require("cors");

app.use(cors());

app.use(express.json());
client.connect();

app.use(baseQuery + "/users", require("./api/users"));
app.use(baseQuery + "/phones", require("./api/phones"));
app.use(baseQuery + "/cart", require("./api/cart"));
app.use(baseQuery + "/orders", require("./api/orders"));
app.use(`/auth/`, require("./api/users"))

app.listen(8080, () =>{
    console.log("App is running at port 8080")
});




//semi done
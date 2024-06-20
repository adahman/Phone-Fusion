const express = require('express');
const router = express.Router();
const isLoggedIn = require("./users")

const {
    getAllOrders,
    getSingleOrderById,
    checkOut,
} = require("../db/db")

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await getAllOrders());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
        res.send(await getSingleOrderById(req.params.id));
      } catch (err) {
         next(err);
        }
});

router.post("/", isLoggedIn, async(req,res,next)=>{
  try{
    req.body.user_id = req.user_id;
    res.send(await checkOut(req.body));
  }catch (err) {
    next(err);
  }
});


const express = require("express");
const router = express.Router();


const {
  getAllUsers, 
  getSingleUserById,
  getUserByUsername,
}= require("../db/db");


//all users
router.get("/", async (req, res, next) => {
  try {
    res.send(await getAllUsers());
  } catch (err) {
    next(err);
  }
});


//single user by id
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await getSingleUserById(req.params.id));
  } catch (err) {
    next(err);
  }
});

//getting user by username
router.get("/:username", async (req, res, next) => {
  try {
    res.send(await getUserByUsername(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
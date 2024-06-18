const express = require("express");
const router = express.Router();
const isLoggedIn = require("./users")
const {
  getAllPhones,
  getPhonebyId,
  createPhone,
  updatePhone,
  deletePhone,
} = require("../db/db");

//route for all phones
router.get("/", async (req, res, next) => {
  try {
    const phones = await getAllPhones();
    res.json(phones);
  } catch (err) {
    next(err);
  }
});


//route for single phone by id:
router.get("/:id", async (req, res, next) => {
  try {
    const phone = await getPhonebyId(req.params.id);
    if (phone) {
      res.json(phone);
    } else {
      res.status(404).send("Phone not found");
    }
  } catch (err) {
    next(err);
  }
});

//adding a new phone
router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const newPhone = await createPhone(req.body);
    res.status(201).json(newPhone);
  } catch (err) {
    next(err);
  }
});


//updating a phone
router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const updatedPhone = await updatePhone(req.params.id, req.body);
    if (updatedPhone) {
      res.json(updatedPhone);
    } else {
      res.status(404).send("Phone not found");
    }
  } catch (err) {
    next(err);
  }
});

//deleting a phone
router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const deletedPhone = await deletePhone(req.params.id);
    if (deletedPhone) {
      res.json(deletedPhone);
    } else {
      res.status(404).send("Phone not found");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const isLoggedIn = require("./users")
const {
    getAllCart,
    getCartByUserId,
    addCartByUserId,
    deleteCartByUserId,
} = require("../db/db")
      
router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        res.send(await getAllCart());
    } catch (err) {
        next(err);
    }
});
  
router.get("/:id", isLoggedIn, async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await getCartByUserId(userId);
        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Error fetching cart items" });
    }
});
  
router.post("/", isLoggedIn, async (req, res) => {
    try {
        const { product_id, user_id } = req.body;
        const newCartItem = await addCartByUserId({ product_id, user_id });
        res.json(newCartItem);
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Error adding item to cart" });
    }
});
  
router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const deletedItem = await deleteCartByUserId(cartItemId);
        res.json(deletedItem);
    } catch (error) {
        console.error("Error deleting item from cart:", error);
        res.status(500).json({ error: "Error deleting item from cart" });
    }
});

router.put("/:id", async (req, res, next) =>{
    try{
        res.send(await updateCart(req.params.id))
    }catch(err){
        next(err);
    }
});



module.exports = router;
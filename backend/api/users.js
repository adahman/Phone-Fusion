const express = require("express");
const router = express.Router();


const {
  getAllUsers, 
  getSingleUserById,
}= require("../db/db");

const {
  createUserAndGenerateToken,
  authenticate, 
  findUserWithToken} = require("../db/usersauth")


const isLoggedIn = async(req,res,next)=>{
  try{
      req.user = await findUserWithToken(req.headers.authorization);
      next();
  }catch(err){
      next(err)
  }
}

router.post("/register", async(req,res,next)=>{
    try{
        res.send(await createUserAndGenerateToken(req.body))
    }catch(err){
        next(err)
    }
})

router.post("/login", async(req,res,next)=>{
    try{
        res.send(await authenticate(req.body))
    }catch(err){
        next(err)
    }
})

router.get('/me', isLoggedIn, (req,res,next)=>{
    try{
        res.send(req.user)
    }catch(err){
        next(err);
    }
})


//all users
router.get("/", authenticate, isLoggedIn, async (req, res, next) => {
  try {
    res.send(await getAllUsers());
  } catch (err) {
    next(err);
  }
});


//single user by id
router.get("/:id", authenticate, isLoggedIn, async (req, res, next) => {
  try {
    res.send(await getSingleUserById(req.params.id));
  } catch (err) {
    next(err);
  }
});

// //getting user by username
// router.get("/:username", async (req, res, next) => {
//   try {
//     res.send(await getUserByUsername(req.params.id));
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;

const router = require("express").Router();

const {signup, signin}=require("../controllers/auth");
const { userSignupValidator } = require("../validator/index");

//REGISTER
router.post("/register", userSignupValidator, signup);
router.post("/login",  signin);
module.exports = router;
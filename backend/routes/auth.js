const router = require("express").Router();

const {signup, signin}=require("../controllers/auth");
const { userSignupValidator } = require("../validator/index");


router.post("/register", userSignupValidator, signup);
router.post("/login",  signin);
module.exports = router;
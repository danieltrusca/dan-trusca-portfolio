const router=require("express").Router();

router.get("/", (req, res)=>{
    res.send("Here is users routes");
})

module.exports = router;

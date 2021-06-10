const router=require("express").Router();

const {update, remove, getUser}=require("../controllers/user");

router.get("/:id", getUser);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;

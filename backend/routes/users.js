const router=require("express").Router();

const {update, remove, getUser, followUser, unfollowUser}=require("../controllers/user");

// CRUD users
router.get("/", getUser);
router.put("/:id", update);
router.delete("/:id", remove);

// follow a user
router.put("/:id/follow", followUser);
// unfollow a user
router.put("/:id/unfollow", unfollowUser);

module.exports = router;

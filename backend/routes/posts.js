const router = require("express").Router();

const {create, update, remove, like, findPost, timeline, findUserPosts}=require("../controllers/posts");

//create a post
router.post("/", create);

// update post
router.put("/:id", update);

// delete a post
router.delete("/:id", remove);

// like a post
router.put("/:id/like", like);

// find a post
router.get("/:id", findPost);

// get timeline 
router.get("/timeline/:userId", timeline);

// get posts from a user
router.get("/profile/:username", findUserPosts);

module.exports = router;
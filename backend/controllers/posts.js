const Post=require("../models/Post");
const User=require("../models/User");


exports.create=async (req, res)=>{
    const newPost=new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json({savedPost});
      } catch (err) {
        res.status(500).json({error: err});
      }
}

exports.update=async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            updatedPost=await Post.findOneAndUpdate({_id: req.params.id},
                { $set: req.body },
                {new: true});
            res.status(200).json({
                message: "the post has been updated",
                updatedPost
            });
          } else {
            res.status(403).json({error: "you can update only your posts"});
          }
    } catch(err){
        res.status(500).json({error: err});
    }
}

exports.remove=async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.findOneAndDelete({_id: req.params.id},
                { $set: req.body },
                );
            res.status(200).json({
                message: "the post has been deleted",
            });
          } else {
            res.status(403).json({error: "you can delete only your posts"});
          }
    } catch(err){
        res.status(500).json({error: err});
    }
}

exports.like=async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            const updatedLike=await Post.findOneAndUpdate(
                {_id: req.params.id},
                {$push: { likes: req.body.userId}},
                {new: true}
            );
            res.status(200).json({
                message: "the post has been liked",
                updatedLike
            });
        } else{
            const updatedDislike=await Post.findOneAndUpdate(
                {_id: req.params.id},
                {$pull: { likes: req.body.userId}},
                {new: true}
            );
            res.status(200).json({
                message: "the post has been disliked",
                updatedDislike
            });
        }
    } catch(err){
        res.status(500).json({error: err});
    }
}

exports.findPost=async (req, res)=>{
    try{
        const postToFind=await Post.findOne({_id: req.params.id});
        return res.status(200).json({postToFind});
    } catch(err){
        res.status(500).json({error: err});
    }
}

exports.timeline=async (req, res)=>{
    try {
        const currentUser = await User.findOne({_id: req.params.userId});
        const userPosts = await Post.find({ userId: currentUser._id });

        const friendPosts=await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err){
        res.status(500).json({error: err});
    }
}

exports.findUserPosts=async (req, res)=>{
    try{
        const user=await User.findOne({username: req.params.username});
        const userPosts=await Post.find({userId: user._id});
        res.status(200).json({userPosts});
    } catch(err){
        res.status(500).json({error: err});
    }
}
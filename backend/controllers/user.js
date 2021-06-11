const User=require("../models/User");
const bcrypt=require("bcrypt");

exports.update= async (req, res)=>{
    
    if(req.body.userId===req.params.id || req.body.isAdmin){
        if (req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json({error: err});
              }
            }     
        try {
            const user = await User.findOneAndUpdate({_id: req.params.id}, 
                    {$set: req.body},
                    { new: true });
            res.status(200).json({user});
            } catch (err) {
                return res.status(500).json({error: err});
            }
    } else {
        return res.status(403).json({error:  " You can update only your account!"});
      }
}

exports.remove= async (req, res)=>{
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
          await User.findOneAndDelete(req.params.id);
          res.status(200).json({message: "Account has been deleted"});
        } catch (err) {
          return res.status(500).json({err});
        }
      } else {
        return res.status(403).json({message: "You can delete only your account!"});
      }
}

exports.getUser=async (req, res)=>{
    try{
        const user=await User.findOne({_id: req.params.id}).select("-password");
        return res.status(200).json({user});
    } catch(err){
        return res.status(500).json({err});
    }
}

exports.followUser=async (req, res)=>{
  if(req.body.userId!==req.params.id){
      try{
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)){
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json({message: "user has been followed"});
        } else{
            res.status(403).json({error: "you allready follow this user"});
        }
      } catch(err){
        res.status(500).json({error: err});
      }
  } else{
    res.status(403).json({error: "You can't follow yourself"});
  }
}

exports.unfollowUser=async (req, res)=>{
  if(req.body.userId!==req.params.id){
      try{
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json({message: "user has been unfollowed"});
        } else{
          res.status(403).json({error: "you dont follow this user"});
        }
      } catch(err){
        res.status(500).json({error: err});
      }
  } else{
    res.status(403).json({error: "You can't unfollow yourself"});
  }
}

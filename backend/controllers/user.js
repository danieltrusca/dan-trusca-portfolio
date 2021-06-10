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




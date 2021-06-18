const User=require("../models/User");
const bcrypt=require("bcrypt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup=(req, res)=>{
    const {email, username, password}=req.body;
    User.findOne({email: email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({ error: "user already exists with this email" });
            }
             User.findOne({username})
                .then((usernameSaved)=>{
                    if(usernameSaved){
                        return res.status(422).json({ error: "user already exists with this username" });
                    }
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(password, salt, (err, hashedPassword)=>{
                            //create new user
                            const newUser =new User({
                                username: username,
                                email: email,
                                password: hashedPassword,
                            });
        
                            newUser.save((err, user)=>{
                                if(err){
                                    return res.status(400).json({
                                        error: errorHandler(err)
                                    });
                                }
                                res.json({
                                    user
                                });
                            });
                        });
                    });
                })
                .catch((error)=>{
                    res.status(500).json({
                        error: errorHandler(error)
                    });
                });     
        })
        .catch((error)=>{
            res.status(500).json({
                error: errorHandler(error)
            });
        });
}

exports.signin = async (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "please add email or password" });
    }

    try {
        const user = await User.findOne({ email });
        !user && res.status(404).json({error: "User with that email does not exist. Please signup"});
    
        const validPassword = await bcrypt.compare(password, user.password)
        !validPassword && res.status(400).json({ error: "wrong password"})
    
        res.status(200).json({user})
      } catch (err) {
        
        res.status(500).json({
            error: errorHandler(err)
        });
      }
  };


  



const express=require("express");

const app=express();
const mongoose = require("mongoose");
const cors = require("cors");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer=require("multer");
const path = require("path");

// routes
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postsRoute=require("./routes/posts");


dotenv.config();



mongoose.connect(
  process.env.MONGO_URL,
  { 
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true, 
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// static folder where to put images saved from client
app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(expressValidator());
app.use(cors());

const storage=multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
})

const upload=multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
  try{
    return res.status(200).json("file uploaded succesfully");
  } catch(err){
    console.log(err);
  }
})


// routes middleware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running");
})
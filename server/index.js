const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes=require("./routes")
const cors=require("cors")
const passportSetup = require("./routes/passport");
dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{console.log("DB connected Successfully")})
.catch((err)=>{console.log("Error while connecting to DB: ",err)})


app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  

app.use(express.json());

app.use('/',routes)
app.listen(process.env.PORT,()=>{
    console.log("listening on server:",process.env.PORT)
})

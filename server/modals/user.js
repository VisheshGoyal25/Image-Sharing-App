const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id:{type:String,required:true,unique:true},
    username: { type: String, required: true},
    email: { type: String },
    pic: { type: String, default: "" },
    followers_count:{type:Number,default:0},
    following_count:{type:Number,default:0},
    followers:{type:Array},
    following:{type:Array},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

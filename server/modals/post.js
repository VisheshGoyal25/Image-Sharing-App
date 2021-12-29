const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required:true},
    likes: { type: Array },
    likes_count:{type:Number},
    comments: { type: Array },
    owner_id:{ type: String,required:true },
    name:{type:String, required:true}

  },
  { timestamps: true }
);
module.exports = mongoose.model("Posts", PostSchema);

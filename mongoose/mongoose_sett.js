const mongoose = require("mongoose");
const schema_info = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    favoriteFoods: { type: [String], required: true },
  },
  { timestamps: true }
);
const blog = mongoose.model("checkpoint", schema_info);
module.exports = blog;

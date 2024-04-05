// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String },
//   admin: {
//     type: Boolean,
//     default: true,
//   },
// });

// const userModel = mongoose.model("users", userSchema);

// module.exports = userModel;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  admin: {
    type: Boolean,
    default: true,
  },
  image: { type: String}, // Store the image as a filename or path
  firstname :{type:String,required:true},
  lastname :{type:String,required:true},
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  license: { type: String, required: true },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;


const mongoose = require("mongoose");

function connectDb() {
  mongoose.connect("mongodb+srv://imdev05:0GEHGBqKdI5AaqE7@atlascluster.pxez4ia.mongodb.net/carDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.on("connected", () => {
    console.log("connection successfull");
  });
  connection.on("error", () => {
    console.log("connection failed");
  });
}

connectDb();
module.exports = mongoose;

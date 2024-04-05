const express = require("express");
const path = require("path");
const app = express();
const dbConnection = require("./Db/db");
var cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 2000;

app.get("/hello", (req, res) => {
  res.send("Hello!");
});
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use("/api/cars/", require("./Routes/carsRoutes"));
//refresh error
app.use("/booking/api/cars/", require("./Routes/carsRoutes"));
app.use("/editcar/api/cars/", require("./Routes/carsRoutes"));
app.use("/api/users/", require("./Routes/usersRoutes"));
app.use("/booking/api/bookings/", require("./Routes/bookingsRoute"));
app.use("/api/bookings/", require("./Routes/bookingsRoute"));
app.use('/api/bookings/feedback', require('./Routes/feedbackRoutes'))
app.use("/api/profile",require('./Routes/profile'));
app.use("/api/contact",require('./Routes/contactRoute'));
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
app.listen(port, () => {
  console.log(`Server is running at port: ${port} `);
});

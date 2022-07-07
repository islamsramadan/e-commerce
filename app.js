const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const businessRoute = require("./routes/business");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("server is listening");
    });
    console.log("db is connected ");
  })
  .catch((error) => console.log("error: ", error));

// require("./models/user");

// testing file upload
// ---------------------------------

// ---------------------------------

app.use(express.json());

// routers
// app.use("/auth", authRouter);
app.use(businessRoute);

// not found middleware
// app.use((req, res) => {
//   res
//     .status(404)
//     .json({ success: false, message: "your request url is NOT FOUND" });
// });

// // error middleware
// app.use((error, req, res, next) => {
//   let status = error.status || 500;
//   console.log(`error`);
//   res.status(status).json({ success: false, message: "Internal Error" });
// });

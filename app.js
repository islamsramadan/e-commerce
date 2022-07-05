const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require('./routes/auth')

const app = express();
console.log(process.env.MONGO_CONNECTION)

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to database successfuly");
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`API server is listining on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`an error has occured, ${err}`);
  });

app.use(express.json());

// routers
app.use('/auth', authRouter)

// not found middleware
app.use((req, res) => {
  res.status(404).json({ success: false, message: "your request url is NOT FOUND" });
});

// error middleware
app.use((error, req, res, next) => {
  let status = error.status || 500;
  console.log(`error`);
  res.status(status).json({ success: false, message: "Internal Error" });
})

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);


// To connect with the database
mongoose
  .connect("mongodb://localhost:27017/node")
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected to Mongodb on port 3000!");
    });
  })
  .catch(() => console.log("not Connected"));

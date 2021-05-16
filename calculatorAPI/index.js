const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const calculatorRouter = require("./routes/calculatorRouter");
const authRouter = require("./routes/authRouter");

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/aqi", calculatorRouter);

app.listen(process.env.PORT || 4000, () =>
  console.log("Listening to port: " + process.env.PORT || 4000)
);

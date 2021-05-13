const express = require("express");
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true})
const db = mongoose.connection
db.on("error", error=>console.log(error))
db.once("open", ()=>console.log("connection to db established"))


const app = express();
app.use(express.json())

app.listen(process.env.PORT || 4000, () =>
    console.log("Listening to port: " + process.env.PORT || 4000)
);

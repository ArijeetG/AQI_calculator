const router = require("express").Router();
const pollutant = require("../model/pollutantModel");
const user = require("../model/user");
const auth = require("./verifyToken");

function aqiIndex(bh, bl, ih, il, pollutantValue) {
  const aqi = ((ih - il) / (bh - bl)) * (pollutantValue - bl) + il;
  return aqi;
}

function uploadDetails(pollutantName,pollutantValue,userDet){
  try {
    const pollutantData = new pollutant({
      pollutantName: pollutantName,
      pollutantValue: pollutantValue,
      customerName: userDet.name,
      customerEmailId: userDet.email,
    })
      .save()
      .then(() => console.log("pollutant data saved to database"));
  } catch (error) {
    setInterval(()=>{
      console.log("Retrying upload to database...")
      return uploadDetails(pollutantName,pollutantValue,userDet)
    },1000)
  }
}

router.post("/aqi-calculator", auth, async (req, res) => {
  const { pollutantName, pollutantValue, customerName, customerEmailId } =
    req.body;
  const userDet = await user.findById({ _id: req.user._id });
  console.log(userDet);  
  uploadDetails(pollutantName,pollutantValue,userDet)
  if (pollutantName === "PM2.5" || pollutantName === "PM10") {
    let bh = 100,
      bl = 50,
      ih = 100,
      il = 50;
    const aqi = aqiIndex(bh, bl, ih, il, pollutantValue);
    res.status(200).send({ aqi: aqi });
  }

  if (pollutantName === "CO") {
    let bh = 4.4,
      bl = 0,
      ih = 50,
      il = 0;
    const aqi = aqiIndex(bh, bl, ih, il, pollutantValue);
    res.status(200).send({ aqi: aqi });
  }
  if (pollutantName === "NO2") {
    let bh = 53,
      bl = 0,
      ih = 50,
      il = 0;
    const aqi = aqiIndex(bh, bl, ih, il, pollutantValue);
    res.status(200).send({ aqi: aqi });
  }
  if (pollutantName === "SO2") {
    let bh = 35,
      bl = 0,
      ih = 50,
      il = 0;
    const aqi = aqiIndex(bh, bl, ih, il, pollutantValue);
    res.status(200).send({ aqi: aqi });
  }
  if (pollutantName === "O3") {
    let bh = 0.124,
      bl = 0,
      ih = -1,
      il = -1;
    const aqi = aqiIndex(bh, bl, ih, il, pollutantValue);
    res.status(200).send({ aqi: aqi });
  }
});

module.exports = router;

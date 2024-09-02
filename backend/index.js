const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
const cookieParser = require("cookie-parser");

// routes and other middleware configurations
const bookingRoutes = require("./src/routes/booking");
const userRoutes = require("./src/routes/userRouter");
const divingCenterRoutes = require("./src/routes/divingCenter");
const equipmentRoutes = require("./src/routes/equipment");
const statsRoutes=require("./src/routes/statsRouter");
const data = require("./src/utils/data");
const DivingCenter = require("./src/models/DivingCenter");

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser(process.env.JWT_SECRET));

// Use routes
app.use("/diving-centers", divingCenterRoutes);
app.use("/bookings", bookingRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/user", userRoutes);
app.use("/stats", statsRoutes);
app.use("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
  // data.map((item) => {
  //   const newItem = {
  //     ...item,
  //     _id: item._id.$oid,
  //     country: "france",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     city: item.town,
  //   };
  //   const divingCenter = new DivingCenter(newItem);
  //   console.log(divingCenter);
  //   divingCenter.save();
  // });
});
// Start server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

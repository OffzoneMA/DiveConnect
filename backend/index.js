const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
const cookieParser = require("cookie-parser");

// Your routes and other middleware configurations follow here
const divingAssociationRoutes = require("./src/microservices/divingAssociation/routes/divingAssociation");
const bookingRoutes = require("./src/microservices/booking/routes/booking");
const userRoutes = require("./src/microservices/user/routes/userRouter");
const divingCenterRoutes = require("./src/microservices/divingCenter/routes/divingCenter");
const equipmentRoutes = require("./src/microservices/divingCenter/routes/equipment");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser(process.env.JWT_SECRET));

// Use routes
app.use("/diving-centers", divingCenterRoutes);
app.use("/diving-associations", divingAssociationRoutes);
app.use("/bookings", bookingRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/user", userRoutes);
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
});
// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

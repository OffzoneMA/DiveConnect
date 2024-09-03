// Import required packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const listEndpoints = require("express-list-endpoints");
const cookieParser = require("cookie-parser");

// Import routes and other configurations
const bookingRoutes = require("./src/routes/booking");
const userRoutes = require("./src/routes/userRouter");
const divingCenterRoutes = require("./src/routes/divingCenter");
const requestRoutes = require("./src/routes/requestRouter");
const equipmentRoutes = require("./src/routes/equipment");
const statsRoutes = require("./src/routes/statsRouter");
// const data = require("./src/utils/data"); // Uncomment if needed
// const DivingCenter = require("./src/models/DivingCenter"); // Uncomment if needed

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Middleware configurations
app.use(express.json({ limit: "50mb" })); // Using express.json instead of body-parser
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
app.use("/request", requestRoutes);
app.use("/user", userRoutes);
app.use("/stats", statsRoutes);

// Root endpoint listing all available routes
app.use("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to the database");

  // Uncomment and modify if you need to insert data on startup
  // data.map((item) => {
  //   const newItem = {
  //     ...item,
  //     _id: item._id.$oid,
  //     country: "France",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     city: item.town,
  //   };
  //   const divingCenter = new DivingCenter(newItem);
  //   console.log(divingCenter);
  //   divingCenter.save();
  // });
});

// Start the server
const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import routes
const divingCenterRoutes = require('./microservices/divingCenter/routes');
const divingAssociationRoutes = require('./microservices/divingAssociation/routes');
const bookingRoutes = require('./microservices/booking/routes');
const userRoutes = require('./microservices/user/routes');

// Use routes
app.use('/api/diving-centers', divingCenterRoutes);
app.use('/api/diving-associations', divingAssociationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
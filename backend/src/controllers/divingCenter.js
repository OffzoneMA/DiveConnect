const divingCenterService = require("../services/divingCenter");
const bookingService = require("../services/booking");
const { sendEmailTest } = require("./email");
const Booking = require("../models/Booking");
const { uploadImage, deleteImage } = require("../utils/uploadImage");

exports.getDivingCenters = async (req, res) => {
  try {
    const divingCenters = await divingCenterService.getAllDivingCenters(
      req,
      res
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getCities = async (req, res) => {
  try {
    const cities = await divingCenterService.getAllCentersCities(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDivingCenterUser = async (req, res) => {
  try {
    const divingCenters = await divingCenterService.getAllDivingCentersOfUser(
      req,
      res
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDivingCenter = async (req, res) => {
  try {
    const divingCenter = await divingCenterService.getDivingCenterById(
      req.params.id
    );
    if (!divingCenter) {
      return res.status(404).json({ error: "Diving center not found" });
    }
    res.status(200).json(divingCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDivingCenter = async (req, res) => {
  try {
    // Check if the center data exists in the request
    if (!req.body.center) {
      return res.status(400).json({ error: "Center data is required" });
    }

    // Handle image upload if the image URL exists
    let image = req.body.center.image;

    if (image) {
      image = await uploadImage(image);
    }

    // Create the new diving center with the provided data
    const newDivingCenter = await divingCenterService.createDivingCenter({
      ...req.body.center,
      user: req.body.user.userId, // Ensure the user ID is correctly passed
      image: image || null, // Assign the uploaded image URL or null
    });

    res.status(201).json({ message: "Diving center created successfully", center: newDivingCenter });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating diving center:", error);

    // Send a detailed error response
    res.status(500).json({ error: error.message || "Server error while creating diving center" });
  }
};

exports.updateDivingCenter = async (req, res) => {
  try {
    const updatedDivingCenter = await divingCenterService.getDivingCenterById(
      req.params.id
    );
    if (!updatedDivingCenter) {
      return res.status(404).json({ error: "Diving center not found" });
    }
    await divingCenterService.updateDivingCenter(
      req.body.center,
      req.params.id,
      updatedDivingCenter.image
    );
    res.status(200).json(updatedDivingCenter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDivingCenter = async (req, res) => {
  try {
    const deletedDivingCenter = await divingCenterService.deleteDivingCenter(
      req.params.id
    );
    if (!deletedDivingCenter) {
      return res.status(404).json({ error: "Diving center not found" });
    }
    res.status(200).json({ message: "Diving center deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDivingCenterBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getDivingCenterBookings(
      req.params.id
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDivingCenterBooking = async (req, res) => {
  try {
    const newBooking = await bookingService.createDivingCenterBooking(
      req.params.id,
      req.body
    );
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDivingCenterBooking = async (req, res) => {
  try {
    const booking = await bookingService.getDivingCenterBooking(
      req.params.id,
      req.params.bookingId
    );
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDivingCenterBooking = async (req, res) => {
  try {
    const updatedBooking = await bookingService.updateDivingCenterBooking(
      req.params.id,
      req.params.bookingId,
      req.body
    );
    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDivingCenterBooking = async (req, res) => {
  try {
    const deletedBooking = await bookingService.deleteDivingCenterBooking(
      req.params.id,
      req.params.bookingId
    );
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createDeviseForm = async (req, res) => {
  try {
    const { materials, formData, centers, user } = req.body;
    const equipments = Object.entries(materials).map(([key, value]) => ({
      equipment: key,
      quantity: Number(value),
    }));
    centers.map(async (center) => {
      sendEmailTest(center, formData);
      const booking = new Booking({
        user: user._id,
        divingCenter: center._id,
        date: formData.date,
        numberOfDivers: formData.total,
        equipments,
        email: formData.email,
        phone: formData.phone,
        diversLevel1: formData.diversLevel1,
        diversLevel2: formData.diversLevel2,
        diversLevel3: formData.diversLevel3,
        clientName: formData.clientName,
      });
      await booking.save();
    });

    res.status(200).json({ message: "reservation created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

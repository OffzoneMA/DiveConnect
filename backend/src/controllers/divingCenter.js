const divingCenterService = require("../services/divingCenter");
const bookingService = require("../services/booking");
const { sendEmailTest } = require("./email");
const Booking = require("../models/Booking");
const { uploadImage, deleteImage } = require("../utils/uploadImage");

exports.getDivingCenters = async (req, res) => {
  try {
    await divingCenterService.getAllDivingCenters(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCities = async (req, res) => {
  try {
    await divingCenterService.getAllCentersCities(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDivingCenterUser = async (req, res) => {
  try {
    await divingCenterService.getAllDivingCentersOfUser(req, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDivingCenter = async (req, res) => {
  try {
    const divingCenter = await divingCenterService.getDivingCenterById(req.params.id);
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
    if (!req.body.center) {
      return res.status(400).json({ error: "Center data is required" });
    }

    let image = req.body.center.image;
    if (image) {
      image = await uploadImage(image);
    }

    const newDivingCenter = await divingCenterService.createDivingCenter({
      ...req.body.center,
      user: req.body.user.userId,
      image: image || null,
    });

    res.status(201).json({ message: "Diving center created successfully", center: newDivingCenter });
  } catch (error) {
    console.error("Error creating diving center:", error);
    res.status(500).json({ error: error.message || "Server error while creating diving center" });
  }
};

exports.submitDivingCenter = async (req, res) => {
  try {
    // Extract email from request body
    const { email } = req.body;

    // Check if a diving center with the provided email already exists
    const existingCenter = await divingCenterService.findDivingCenterByEmail(email);

    if (existingCenter) {
      // If email exists, respond with a conflict status and error message
      return res.status(409).json({ message: "Email already exists. Diving center not created." });
    }

    // If email doesn't exist, proceed with creating the diving center
    const newDivingCenter = await divingCenterService.createDivingCenter(req.body);
    console.log( "Diving center created successfully : ",newDivingCenter )
    res.status(201).json({ message: "Diving center created successfully", center: newDivingCenter });
  } catch (error) {
    console.log(error)
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

exports.updateDivingCenter = async (req, res) => {
  try {
    const existingDivingCenter = await divingCenterService.getDivingCenterById(req.params.id);
    if (!existingDivingCenter) {
      return res.status(404).json({ error: "Diving center not found" });
    }
    const updatedDivingCenter = await divingCenterService.updateDivingCenter(
      req.body.center,
      req.params.id,
      existingDivingCenter.image
    );
    res.status(200).json({ message: "Diving center updated successfully", center: updatedDivingCenter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

    exports.deleteDivingCenter = async (req, res) => {
      try {
        const divingCenter = await divingCenterService.getDivingCenterById(req.params.id);
        if (!divingCenter) {
          return res.status(404).json({ error: "Diving center not found" });
        }
    
        await divingCenterService.deleteDivingCenter(req.params.id, divingCenter.image);
        res.status(200).json({ message: "Diving center deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    exports.getDivingCenterBookings = async (req, res) => {
      try {
        const bookings = await bookingService.getDivingCenterBookings(req.params.id);
        if (!bookings) {
          return res.status(404).json({ error: "Bookings not found for this diving center" });
        }
        res.status(200).json(bookings);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    exports.createDivingCenterBooking = async (req, res) => {
      try {
        const newBooking = await bookingService.createDivingCenterBooking(req.params.id, req.body);
        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    exports.getDivingCenterBooking = async (req, res) => {
      try {
        const booking = await bookingService.getDivingCenterBooking(req.params.id, req.params.bookingId);
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
        const booking = await bookingService.getDivingCenterBooking(req.params.id, req.params.bookingId);
        if (!booking) {
          return res.status(404).json({ error: "Booking not found" });
        }
    
        const updatedBooking = await bookingService.updateDivingCenterBooking(req.params.id, req.params.bookingId, req.body);
        res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    exports.deleteDivingCenterBooking = async (req, res) => {
      try {
        const booking = await bookingService.getDivingCenterBooking(req.params.id, req.params.bookingId);
        if (!booking) {
          return res.status(404).json({ error: "Booking not found" });
        }
    
        await bookingService.deleteDivingCenterBooking(req.params.id, req.params.bookingId);
        res.status(200).json({ message: "Booking deleted successfully" });
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
    
        // Process each center
        for (const center of centers) {
          // Send email notification to each center
          sendEmailTest(center, formData);
    
          // Create a booking for each center
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
        }
    
        res.status(200).json({ message: "Reservations created successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
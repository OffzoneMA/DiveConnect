const { uploadImage, deleteImage } = require("../utils/uploadImage");
const divingCenterModel = require("../models/DivingCenter");

class DivingCenterService {
  async getAllDivingCenters(req, res) {
    try {
      const { search, city, sort } = req.query;
      const queryObject = {};

      if (city) {
        queryObject.city = { $regex: city, $options: "i" };
      }

      let result = divingCenterModel.find(queryObject);

      // Sorting logic
      if (sort === "latest") {
        result = result.sort("-createdAt");
      } else if (sort === "oldest") {
        result = result.sort("createdAt");
      } else if (sort === "a-z") {
        result = result.sort("name");
      } else if (sort === "z-a") {
        result = result.sort("-name");
      }

      // Pagination logic
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);

      const divingCenters = await result;
      const totalDivingCenters = await divingCenterModel.countDocuments(queryObject);
      const numOfPages = Math.ceil(totalDivingCenters / limit);

      res.status(200).json({ divingCenters, totalDivingCenters, numOfPages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDivingCenterById(id) {
    try {
      const divingCenter = await divingCenterModel.findById(id);
      if (!divingCenter) {
        throw new Error("Diving center not found");
      }
      return divingCenter;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createDivingCenter(newDivingCenterData) {
    try {
      const newDivingCenter = new divingCenterModel(newDivingCenterData);
      await newDivingCenter.save();
      return newDivingCenter;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCentersCities(req, res) {
    try {
      const centers = await divingCenterModel.aggregate([
        {
          $group: {
            _id: { city: "$city", country: "$country" },
          },
        },
        {
          $project: {
            _id: 0,
            name: { $concat: ["$_id.city", ",", "$_id.country"] },
            code: { $concat: ["$_id.city", ",", "$_id.country"] },
          },
        },
      ]);

      res.status(200).json(centers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDivingCenter(center, id) {
    try {
      // Ensure the agencies and languages are valid
      if (center.agencies) {
        center.agencies = center.agencies.map((agency) => agency.toLowerCase());
      }
      if (center.languages) {
        center.languages = center.languages.map((language) => language.toLowerCase());
      }
  
      // Update the diving center details
      const updatedDivingCenter = await divingCenterModel.findByIdAndUpdate(
        id,
        { ...center },
        { new: true, runValidators: true }
      );
  
      return updatedDivingCenter;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllDivingCentersOfUser(req, res) {
    try {
      const { search, city, sort } = req.query;
      const queryObject = { user: req.body.user.userId };

      if (city) {
        queryObject.city = { $regex: city, $options: "i" };
      }

      let result = divingCenterModel.find(queryObject);

      // Sorting logic
      if (sort === "latest") {
        result = result.sort("-createdAt");
      } else if (sort === "oldest") {
        result = result.sort("createdAt");
      } else if (sort === "a-z") {
        result = result.sort("name");
      } else if (sort === "z-a") {
        result = result.sort("-name");
      }

      // Pagination logic
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);

      const divingCenters = await result;
      const totalDivingCenters = await divingCenterModel.countDocuments(queryObject);
      const numOfPages = Math.ceil(totalDivingCenters / limit);

      res.status(200).json({ divingCenters, totalDivingCenters, numOfPages });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async findDivingCenterByEmail(email) {
    try {
      const divingCenter = await divingCenterModel.findOne({ email });
      return divingCenter; // Will return the diving center if found or null if not found
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteDivingCenter(id, image) {
    try {
      if (image) {
        await deleteImage(image);
      }
      const deletedDivingCenter = await divingCenterModel.findByIdAndDelete(id);
      if (!deletedDivingCenter) {
        throw new Error("Diving center not found");
      }
      return deletedDivingCenter;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new DivingCenterService();
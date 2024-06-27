const divingCenterModel = require("../models/DivingCenter");

class DivingCenterService {
  async getAllDivingCenters(req, res) {
    const { search, city, sort } = req.query;
    const queryObject = {};
    if (city) {
      queryObject.city = { $regex: city, $options: "i" };
    }
    let result = divingCenterModel.find(queryObject);
    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("name");
    }
    if (sort === "z-a") {
      result = result.sort("-name");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const divingCenters = await result;

    const totalDivingCenters = await divingCenterModel.countDocuments(
      queryObject
    );
    const numOfPages = Math.ceil(totalDivingCenters / limit);

    res.status(200).json({ divingCenters, totalDivingCenters, numOfPages });
  }
  async getDivingCenterById(id) {
    const divingCenter = await divingCenterModel.findById(id);
    return divingCenter;
  }

  async createDivingCenter(newDivingCenterData) {
    const newDivingCenter = new divingCenterModel(newDivingCenterData);
    await newDivingCenter.save();
    return newDivingCenter;
  }

  async updateDivingCenter(id, updatedDivingCenterData) {
    const updatedDivingCenter = await divingCenterModel.findByIdAndUpdate(
      id,
      updatedDivingCenterData,
      { new: true }
    );
    return updatedDivingCenter;
  }

  async deleteDivingCenter(id) {
    // const deletedDivingCenter = await divingCenterModel.findByIdAndDelete(id);
    const deletedDivingCenter = await divingCenterModel.deleteMany();
    return deletedDivingCenter;
  }
}

module.exports = new DivingCenterService();

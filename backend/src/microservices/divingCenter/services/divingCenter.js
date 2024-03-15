const divingCenterModel = require("../models/DivingCenter");

class DivingCenterService {
  async getAllDivingCenters() {
    const divingCenters = await divingCenterModel.find({});
    return divingCenters;
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
    const deletedDivingCenter = await divingCenterModel.findByIdAndDelete(id);
    return deletedDivingCenter;
  }
}

module.exports = new DivingCenterService();

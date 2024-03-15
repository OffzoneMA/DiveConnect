const divingCenterService = require("../../divingCenter/services/divingCenter");

exports.getAllDivingCenters = async (req, res) => {
  const divingCenters = await divingCenterService.getAllDivingCenters();
  res.status(200).json(divingCenters);
};

exports.getDivingCenterById = async (req, res) => {
  const divingCenter = await divingCenterService.getDivingCenterById(req.params.id);
  if (!divingCenter) {
    return res.status(404).json({ error: "Diving center not found" });
  }
  res.status(200).json(divingCenter);
};

exports.createDivingCenter = async (req, res) => {
  const newDivingCenter = await divingCenterService.createDivingCenter(req.body);
  res.status(201).json(newDivingCenter);
};

exports.updateDivingCenter = async (req, res) => {
  const updatedDivingCenter = await divingCenterService.updateDivingCenter(
    req.params.id,
    req.body
  );
  if (!updatedDivingCenter) {
    return res.status(404).json({ error: "Diving center not found" });
  }
  res.status(200).json(updatedDivingCenter);
};

exports.deleteDivingCenter = async (req, res) => {
  const deletedDivingCenter = await divingCenterService.deleteDivingCenter(
    req.params.id
  );
  if (!deletedDivingCenter) {
    return res.status(404).json({ error: "Diving center not found" });
  }
  res.status(200).json({ message: "Diving center deleted" });
};

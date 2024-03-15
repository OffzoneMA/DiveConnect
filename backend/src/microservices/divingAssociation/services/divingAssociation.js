const DivingAssociation = require('../models/DivingAssociation');
const Member = require('../models/Member');
const Job = require('../models/Job');

exports.createDivingAssociation = async (data) => {
  const divingAssociation = new DivingAssociation(data);
  await divingAssociation.save();
  return divingAssociation;
};

exports.getDivingAssociation = async (id) => {
  return await DivingAssociation.findById(id).populate('members').populate('jobs');
};

exports.updateDivingAssociation = async (id, data) => {
  await DivingAssociation.findByIdAndUpdate(id, data);
  return await DivingAssociation.findById(id).populate('members').populate('jobs');
};

exports.deleteDivingAssociation = async (id) => {
  await DivingAssociation.findByIdAndDelete(id);
  await Member.deleteMany({ divingAssociation: id });
  await Job.deleteMany({ divingAssociation: id });
};

exports.createMember = async (divingAssociationId, data) => {
  const member = new Member({ ...data, divingAssociation: divingAssociationId });
  await member.save();
  await DivingAssociation.findByIdAndUpdate(divingAssociationId, { $push: { members: member._id } });
  return member;
};

exports.getMembers = async (divingAssociationId) => {
  return await Member.find({ divingAssociation: divingAssociationId });
};

exports.updateMember = async (id, data) => {
  await Member.findByIdAndUpdate(id, data);
  return await Member.findById(id);
};

exports.deleteMember = async (id) => {
  await Member.findByIdAndDelete(id);
  await DivingAssociation.findByIdAndUpdate(id.divingAssociation, { $pull: { members: id } });
};

exports.createJob = async (divingAssociationId, data) => {
  const job = new Job({ ...data, divingAssociation: divingAssociationId });
  await job.save();
  await DivingAssociation.findByIdAndUpdate(divingAssociationId, { $push: { jobs: job._id } });
  return job;
};

exports.getJobs = async (divingAssociationId) => {
  return await Job.find({ divingAssociation: divingAssociationId });
};

exports.updateJob = async (id, data) => {
  await Job.findByIdAndUpdate(id, data);
  return await Job.findById(id);
};

exports.deleteJob = async (id) => {
  await Job.findByIdAndDelete(id);
  await DivingAssociation.findByIdAndUpdate(id.divingAssociation, { $pull: { jobs: id } });
};

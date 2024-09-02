const DiveCenter = require("../models/DivingCenter");

const getDiveCenterStats = async () => {
    try {
        // Total number of dive centers
        const totalDiveCenters = await DiveCenter.countDocuments();

        // Number of dive centers by country
        const diveCentersByCountry = await DiveCenter.aggregate([
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // Number of dive centers with an email
        const diveCentersWithEmail = await DiveCenter.countDocuments({ email: { $ne: null } });

        // Number of dive centers without an email
        const diveCentersWithoutEmail = await DiveCenter.countDocuments({ email: null });

        // Number of dive centers with a phone number
        const diveCentersWithPhone = await DiveCenter.countDocuments({ phone: { $ne: null } });

        // Number of dive centers without a phone number
        const diveCentersWithoutPhone = await DiveCenter.countDocuments({ phone: null });

        return {
            totalDiveCenters,
            diveCentersByCountry,
            diveCentersWithEmail,
            diveCentersWithoutEmail,
            diveCentersWithPhone,
            diveCentersWithoutPhone,
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching dive center statistics");
    }
};

module.exports = {
    getDiveCenterStats,
};
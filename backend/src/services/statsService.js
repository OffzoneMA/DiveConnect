const DiveCenter = require("../models/DivingCenter");
const Request = require("../models/Request");

const getDiveCenterStats = async () => {
    try {
        // Existing statistics computations...
        const totalDiveCenters = await DiveCenter.countDocuments();
        const diveCentersByCountry = await DiveCenter.aggregate([
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        const diveCentersWithEmail = await DiveCenter.countDocuments({ email: { $ne: null } });
        const diveCentersWithoutEmail = await DiveCenter.countDocuments({ email: null });
        const diveCentersWithPhone = await DiveCenter.countDocuments({ phone: { $ne: null } });
        const diveCentersWithoutPhone = await DiveCenter.countDocuments({ phone: null });
        const totalRequests = await Request.countDocuments();
        const requestsByStatus = await Request.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ]);

        // Calculate total divers per request (average)
        const numberOfDiversPerRequest = await Request.aggregate([
            {
                $group: {
                    _id: null,
                    averageDivers: {
                        $avg: {
                            $sum: [
                                "$numberOfDiversLevel1",
                                "$numberOfDiversLevel2",
                                "$numberOfDiversLevel3",
                            ],
                        },
                    },
                },
            },
        ]);

        // Calculate the most frequently rented equipment
        const frequentEquipementRent = await Request.aggregate([
            { $unwind: "$equipments" }, // Flatten the equipment array
            { $group: { _id: "$equipments.name", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }, // Get the most frequently rented equipment
        ]);

        // New: Calculate dive centers by agency
        const diveCentersByAgency = await DiveCenter.aggregate([
            { $unwind: "$agencies" }, // Flatten the agencies array
            { $group: { _id: "$agencies", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        // New: Calculate dive centers by language
        const diveCentersByLanguage = await DiveCenter.aggregate([
            { $unwind: "$languages" }, // Flatten the languages array
            { $group: { _id: "$languages", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        return {
            totalDiveCenters,
            diveCentersByCountry,
            diveCentersWithEmail,
            diveCentersWithoutEmail,
            diveCentersWithPhone,
            diveCentersWithoutPhone,
            totalRequests,
            requestsByStatus,
            numberOfDiversPerRequest: numberOfDiversPerRequest[0]?.averageDivers || 0,
            frequentEquipementRent: frequentEquipementRent[0]?._id || "No data",
            diveCentersByAgency,
            diveCentersByLanguage,
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching statistics");
    }
};

module.exports = {
    getDiveCenterStats,
};
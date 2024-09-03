const diveCenterService = require("../services/statsService");

// Controller function to get dive center statistics
exports.getDiveCenterStats = async (req, res) => {
    try {
        // Call the service to get the stats
        const stats = await diveCenterService.getDiveCenterStats();

        // Return the stats in the response
        return res.status(200).json({
            success: true,
            stats: stats,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
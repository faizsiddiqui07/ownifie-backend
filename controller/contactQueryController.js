const contactQueryModel = require("../models/contactQueryModel");

// POST: Submit a contact query
const contactQueryController = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, message, projectId } = req.body;

        // Basic validation
        if (!fullName || !email || !phoneNumber || !message) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "All fields are required.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid email format.",
            });
        }

        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Phone number must be 10 digits.",
            });
        }

        const newQuery = new contactQueryModel({
            fullName,
            email,
            phoneNumber,
            message,
            projectId,
        });
        const savedQuery = await newQuery.save();

        return res.status(201).json({
            success: true,
            error: false,
            message: "Query submitted successfully.",
            data: savedQuery,
        });
    } catch (err) {
        console.error("Error submitting query:", err);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error. Please try again later.",
        });
    }
};

// GET: Fetch all contact queries
const getAllContactQuery = async (req, res) => {
    try {
        const allQueries = await contactQueryModel.find().populate("projectId", "projectName").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            error: false,
            message: "All queries fetched successfully.",
            data: allQueries,
        });
    } catch (err) {
        console.error("Error fetching queries:", err);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error. Please try again later.",
        });
    }
};

const deleteContactQuery = async (req, res) => {
    try {
        const { id } = req.params;

        const query = await contactQueryModel.findById(id);
        if (!query) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Contact query not found.",
            });
        }

        await contactQueryModel.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            error: false,
            message: "Contact query deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting contact query:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error. Unable to delete contact query.",
        });
    }
};

module.exports = {
    contactQueryController,
    getAllContactQuery,
    deleteContactQuery,
};

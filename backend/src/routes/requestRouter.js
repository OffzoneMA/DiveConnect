const express = require("express");
const router = express.Router();
const invoiceRequestController = require("../controllers/requestController");

// Create a new invoice request
router.post("/", invoiceRequestController.createInvoiceRequest);

// Get a single invoice request by ID
router.get("/:id", invoiceRequestController.getInvoiceRequestById);

// Get all invoice requests
router.get("/", invoiceRequestController.getAllInvoiceRequests);

// Update an invoice request by ID
router.put("/:id", invoiceRequestController.updateInvoiceRequest);

// Delete an invoice request by ID
router.delete("/:id", invoiceRequestController.deleteInvoiceRequest);

module.exports = router;
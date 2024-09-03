const invoiceRequestService = require("../services/requestService");

class RequestController {
  async createInvoiceRequest(req, res) {
    try {
      const invoiceRequest = await invoiceRequestService.createInvoiceRequest(req.body);
      res.status(201).json(invoiceRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getInvoiceRequestById(req, res) {
    try {
      const invoiceRequest = await invoiceRequestService.getInvoiceRequestById(req.params.id);
      if (!invoiceRequest) {
        return res.status(404).json({ message: "Invoice Request not found" });
      }
      res.status(200).json(invoiceRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllInvoiceRequests(req, res) {
    try {
      const invoiceRequests = await invoiceRequestService.getAllInvoiceRequests();
      res.status(200).json(invoiceRequests);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateInvoiceRequest(req, res) {
    try {
      const invoiceRequest = await invoiceRequestService.updateInvoiceRequest(req.params.id, req.body);
      if (!invoiceRequest) {
        return res.status(404).json({ message: "Invoice Request not found" });
      }
      res.status(200).json(invoiceRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteInvoiceRequest(req, res) {
    try {
      const deleted = await invoiceRequestService.deleteInvoiceRequest(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Invoice Request not found" });
      }
      res.status(200).json({ message: "Invoice Request deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new RequestController();
const InvoiceRequest = require("../models/Request");

class requestService {
  async createInvoiceRequest(data) {
    const invoiceRequest = new InvoiceRequest(data);
    return await invoiceRequest.save();
  }

  async getInvoiceRequestById(id) {
    return await InvoiceRequest.findById(id).populate("divingCenter equipments.equipment");
  }

  async getAllInvoiceRequests() {
    return await InvoiceRequest.find().populate("divingCenter equipments.equipment");
  }

  async updateInvoiceRequest(id, data) {
    return await InvoiceRequest.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteInvoiceRequest(id) {
    return await InvoiceRequest.findByIdAndDelete(id);
  }
}

module.exports = new requestService();
// src/models/service.js

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  subject: String,
  initialBudget: Number,
  description: String,
  budgetAmount: Number,
  status: String,
  technicianComments: String,
  code: String,
});

module.exports = mongoose.model('Service', serviceSchema);

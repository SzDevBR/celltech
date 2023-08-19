// src/controllers/serviceController.js

const Service = require('../models/service');

exports.createService = async (req, res) => {
  try {
    // Crie um novo serviço com base nos dados do corpo da solicitação
    const newService = await Service.create(req.body);

    // Gere um código de serviço com 8 dígitos (simulação)
    const generatedCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    newService.code = generatedCode;

    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar serviço.' });
  }
};

exports.getServiceStatus = async (req, res) => {
  try {
    const service = await Service.findOne({ code: req.params.code });

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviço.' });
  }
};

exports.getServiceStatus = async (req, res) => {
  try {
    const serviceCode = req.body.serviceCode;
    const service = await Service.findOne({ code: serviceCode });

    if (!service) {
      return res.render('index', { errorMessage: 'Serviço não encontrado.' });
    }

    res.render('index', { status: service });
  } catch (error) {
    res.render('index', { errorMessage: 'Erro ao buscar serviço.' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findOne({ code: req.params.code });

    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }

    // Atualize o status e os comentários do técnico com base nos dados do corpo da solicitação
    service.status = req.body.status;
    service.technicianComments = req.body.technicianComments;

    await service.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar serviço.' });
  }
};

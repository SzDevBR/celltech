// src/routes/serviceRoutes.js

const express = require('express');
const passport = require('passport');
const serviceController = require('../controllers/serviceController');


const router = express.Router();

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Autenticação do técnico
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/service/login',
    failureFlash: true,
  })
);

// Página de dashboard após login bem-sucedido
router.get('/dashboard', (req, res) => {
  // Verifique se o usuário está autenticado antes de renderizar a página
  if (req.isAuthenticated()) {
    res.render('dashboard', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

// Rota para a página inicial
router.get('/', async (req, res) => {
  try {
    const status = await Service.findOne({ code: req.params.code });
    res.render('index', { status: status }); // Passando a variável status para a visualização
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar status do serviço.' });
  }
});

// Rota para a verificação de status (POST)
router.post('/check-status', serviceController.getServiceStatus);


// Rota de logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/create', (req, res) => {
  res.render('createService');
});

router.get('/:code', serviceController.getServiceStatus);
router.post('/', serviceController.createService);
router.put('/:code', serviceController.updateService);



module.exports = router;

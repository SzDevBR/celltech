// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs'); // UPD02
const serviceRoutes = require('./routes/serviceRoutes');
const session = require('express-session'); // Adicione esta linha
const passport = require('passport'); // Adicione esta linha
const User = require('./models/user'); // Substitua pelo seu modelo de usuário
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);

// Configuração da sessão
app.use(
  session({
    secret: 'seuSegredoAqui',
    resave: false,
    saveUninitialized: false,
  })
);



app.use(passport.initialize());
app.use(passport.session());

// Serialize e deserialize o usuário
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configuração do servidor
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Defina o mecanismo de visualização para o EJS

// Use o roteador de serviços para as rotas relacionadas a serviços
app.use('/services', serviceRoutes);

app.use('/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

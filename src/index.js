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
  useCreateIndex: true,
  autoIndex: true
});

mongoose.set('strictQuery', false);

const crypto = require('crypto');

// Gere uma chave secreta aleatória com 64 bytes (512 bits)
const secretKey = crypto.randomBytes(64).toString('hex');

// Configuração da sessão
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

const bcrypt = require('bcrypt');

// Crie um usuário administrador
const adminUsername = 'admin';
const adminPassword = process.env.ADMIN_SENHA; // Defina uma senha forte aqui
const adminRole = 'admin'; // Pode ser uma string que indique o papel de administrador

// Criptografe a senha
bcrypt.hash(adminPassword, 10, async (err, hashedPassword) => {
  if (err) {
    console.error('Erro ao criptografar senha:', err);
    return;
  }

  try {
    // Crie o usuário administrador
    const adminUser = new User({
      username: adminUsername,
      password: hashedPassword,
      role: adminRole,
      // ... outros campos
    });

    // Salve o usuário no banco de dados
    await adminUser.save();
    console.log('Usuário administrador criado com sucesso.');
  } catch (error) {
    console.error('Erro ao criar usuário administrador:', error);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// Serialize e deserialize o usuário
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configuração do servidor
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Defina o mecanismo de visualização para o EJS

// Use o roteador de serviços para as rotas relacionadas a serviços
app.use('/', serviceRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

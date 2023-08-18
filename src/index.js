// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://inderux:inderux@cluster0.kwiqp.mongodb.net/celltech-servicos?retryWrites=true&w=majority';

app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs'); // UPD02
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URL;
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Defina o mecanismo de visualização para o EJS


app.use('/services', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

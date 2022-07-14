const express = require('express');

const ValidateToken = require('./controllers/authController')

// ...

const app = express();

app.use(express.json());

app.post('/login', ValidateToken.ValidateToken);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

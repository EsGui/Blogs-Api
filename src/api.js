const express = require('express');

const ValidateToken = require('./controllers/authController');

// ...

const app = express();

app.use(express.json());

app.post('/login', ValidateToken.ValidateToken);
app.post('/user', ValidateToken.validRegistration,
  ValidateToken.validRegistrationEmail,
  ValidateToken.validRegistrationFinally);

app.get('/user', ValidateToken.validateTokenRegistration, ValidateToken.listAll);

app.get('/user/:id', ValidateToken.validateTokenRegistration, ValidateToken.listOne, 
  ValidateToken.listOneFinally);

app.post('/categories', ValidateToken.validateTokenRegistration, 
  ValidateToken.registrationCategories);

app.use((err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      res.status(500).json({ message });
      break;
  }
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

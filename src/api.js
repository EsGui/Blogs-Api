const express = require('express');
require('express-async-errors');

const categoryController = require('./controllers/categoryControllers');
const loginController = require('./controllers/loginController');
const postControllers = require('./controllers/postControllers');
const userController = require('./controllers/userController');

// ...

const app = express();

app.use(express.json());

app.post('/login', loginController.loginUser);
app.post('/user', userController.validDataUser);
app.get('/user', userController.listAllUser);
app.get('/user/:id', userController.userSpecific);
app.post('/categories', categoryController.listCategorySpecific);
app.get('/categories', categoryController.listAllCategory);
app.post('/post', postControllers.listPost);
app.get('/post', postControllers.listAllInformation);
app.get('/post/:id', postControllers.listSpecific);

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

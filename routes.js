const express = require('express');
const route = express.Router();
const path = require('path');

// Usando `path.join` para resolver os caminhos relativos dos arquivos
const homeController = require(path.join(__dirname, 'src', 'controllers', 'homeController.js'));
const loginController = require(path.join(__dirname, 'src', 'controllers', 'loginController.js'));
const contatoController = require(path.join(__dirname, 'src', 'controllers', 'contatoController.js'));

const { loginRequired } = require(path.join(__dirname, 'src', 'middlewares', 'middleware.js'));

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas criação de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;

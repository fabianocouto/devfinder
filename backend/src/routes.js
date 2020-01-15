const { Router } = require('express');
const IndexController = require('./controllers/IndexController');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes =  Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

routes.get('/', IndexController.index);

module.exports = routes;
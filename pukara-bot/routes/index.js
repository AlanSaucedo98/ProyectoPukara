var express = require('express');
var router = express.Router();

const controller = require('../controllers/indexController')

/* GET home page. */
router.get('/', controller.datos);
router.get('/search',controller.search);


module.exports = router;

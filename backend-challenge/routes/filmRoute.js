const express = require('express');
const filmController = require('../controllers/film.controller');
const router = express.Router();

router.get('/', filmController.index);
router.get('/:id', filmController.show);



module.exports = router;
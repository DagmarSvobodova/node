const express = require('express');
const fetchController = require('../controllers/fetch.controller');


const router = express.Router();

router.get('/', fetchController.show);
router.post('/post', fetchController.index);


module.exports = router;
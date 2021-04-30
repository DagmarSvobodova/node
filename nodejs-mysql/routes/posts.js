const express = require('express');
const postController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/authentification')

const router = express.Router();

router.get('/', postController.index);
router.get('/:id', postController.show);
router.post('/save', checkAuthMiddleware.checkAuth, postController.save);
router.patch('/update/:id', checkAuthMiddleware.checkAuth, postController.update);
router.delete('/destroy/:id', checkAuthMiddleware.checkAuth, postController.destroy);


module.exports = router;
const express = require('express');
const router = express.Router();

const { authUser, addCar } = require('../controllers/userControllers');

const { protect } = require('../middlewares/authMiddleware');

router.post('/login', authUser);
router.post('/add-car', protect, addCar);

module.exports = router;

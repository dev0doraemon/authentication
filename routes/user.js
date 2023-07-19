const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const {
  getUserInfo,
  getUserOrdered,
  updateUserInfo,
} = require('../controllers/user');

router.get('/me', isSignedIn, getUserInfo);
router.put('/me', isSignedIn, updateUserInfo);
router.get('/orders', isSignedIn, getUserOrdered);

module.exports = router;

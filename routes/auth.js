const express = require('express');
const router = express.Router();
const { inspectToken, isSignedIn, isNotSignedIn } = require('../middlewares/auth');
const { signin, signup, signout } = require('../controllers/auth');

router.post('/signup', inspectToken, isNotSignedIn, signup);
router.post('/signin', inspectToken, isNotSignedIn, signin);
router.post('/signout', inspectToken, isSignedIn, signout);

module.exports = router;

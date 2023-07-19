const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
// const userRouter = require('./user');
// const storeRouter = require('./store');
// const menuRouter = require('./menu');
// const orderRouter = require('./order');
// const reviewRouter = require('./review');

router.use('/', authRouter); //로그인 동현님
// router.use('/users', userRouter); // 두혁님
// router.use('/stores', storeRouter); // 형진님
// router.use('/menus', menuRouter); // 동현님
// router.use('/orders', orderRouter); // 현진
// router.use('/reviews', reviewRouter); // 보류

module.exports = router;

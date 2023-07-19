const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const {
  postReviews,
  deleteReviews,
  updateReviews,
  getReviews,
} = require('../controllers/reviews');

router.post('/:storeId/reviews', isSignedIn, postReviews);
router.delete('/:storeId/reviews/:reviewsId', isSignedIn, deleteReviews);
router.patch('/:storeId/reviews/:reviewsId', isSignedIn, updateReviews);
router.get('/:storeId/reviews', getReviews);

module.exports = router;

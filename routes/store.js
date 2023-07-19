const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/authAdmin');
const {
  getStore,
  getStoreDetail,
  createStore,
  updateStore,
  deleteStore,
} = require('../controllers/store');
// "/store"

router.post('/', isAdmin, createStore);
router.get('/', getStore); // 먄악 요청 url이 host/?category=1&page=3 이런 식이면 req.query.category 이런 식으로 값 받음
router.get('/:storeId', getStoreDetail);
router.put('/:storeId', isAdmin, updateStore);
router.delete('/:storeId', isAdmin, deleteStore);

module.exports = router;

const express = require('express');
const router = express.Router();
const { isSignedIn } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/authAdmin');
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/menus');

router.get('/:storeId/menus', getMenu);
router.post('/:storeId/menus', isSignedIn, createMenu);
router.put('/:storeId/menus/:menuId', isSignedIn, isAdmin, updateMenu);
router.delete('/:storeId/menus/:menuId', isSignedIn, isAdmin, deleteMenu);

module.exports = router;

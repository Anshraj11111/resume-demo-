const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middlewares/authMiddleware');

const {
  listUsers,
  editUser,
  deleteUser,
  blockUser,
  stats,
} = require('../controllers/adminController');

// Protect all admin routes
router.use(authMiddleware, requireRole(['admin']));

// Routes
router.get('/users', listUsers);
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);
router.post('/users/:id/block', blockUser);
router.get('/stats', stats);

module.exports = router;

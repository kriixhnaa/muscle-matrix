const express = require('express');
const router = express.Router();
const { 
  addMember, 
  getMembers, 
  getStats, 
  updateMember, 
  deleteMember,
  getMember 
} = require('../controllers/memberController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Member CRUD routes
router.route('/')
  .post(addMember)
  .get(getMembers);

router.route('/stats').get(getStats);

router.route('/:id')
  .get(getMember)
  .put(updateMember)
  .delete(deleteMember);

module.exports = router;

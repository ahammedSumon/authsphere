const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');


router.use(protect);     
router.use(adminOnly);   


router.get('/users', getAllUsers);


router.delete('/users/:id', deleteUser);

module.exports = router;
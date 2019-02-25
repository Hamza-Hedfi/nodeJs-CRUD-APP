const path = require('path');

const express = require('express');

const adminController = require('../controllers/email');

const router = express.Router();

router.get('/', adminController.getEmails);

router.get('/add-email', adminController.getAddEmail);
router.post('/add-email', adminController.postAddEmail);

router.get('/edit-email/:emailId', adminController.getEditEmail);
router.post('/edit-email', adminController.postEditEmail);

router.post('/delete-email', adminController.postDeleteEmail);

module.exports = router;

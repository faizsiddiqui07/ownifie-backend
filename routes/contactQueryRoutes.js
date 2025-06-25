const express = require('express');
const { contactQueryController, getAllContactQuery, deleteContactQuery } = require('../controller/contactQueryController');
const router = express.Router()

router.post("/api/contact-query", contactQueryController);
router.get("/api/getAllqueries", getAllContactQuery);
router.delete("/api/deleteQuery/:id", deleteContactQuery);

module.exports = router 
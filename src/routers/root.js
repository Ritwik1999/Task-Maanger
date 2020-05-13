const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.send("<h3>Hi there! Please use the site from a API developement tool like Postman.</h3>"); 
});

module.exports = router;
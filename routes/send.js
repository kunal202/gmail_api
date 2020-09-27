const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');

router.post('/login', (req, res) => {

    const mail = req.body.email;
    const password = req.body.password;

})

router.post('/send', (req, res) => {

})

module.exports = router;
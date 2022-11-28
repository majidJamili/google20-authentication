const express = require('express');
const { default: mongoose } = require('mongoose');
const passport = require('passport');
const router = express.Router();
const { ensureAuth } = require('../middlewares');
const Line = require('../models/Line');
const User = require('../models/User');


// Add Lines:
router.get('/add', ensureAuth, (req, res) => {
    res.render('lines/add')
})

router.post('/', ensureAuth, async (req, res) => {

    try {
        console.log(req.user.id); 

        req.body.user = req.user.id;
        await Line.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})



module.exports = router; 
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

        const author = await User.find({ 'googleId': req.user.id })
        const authorId = author[0]._id;

        req.body.user = authorId;
        const line = new Line(req.body);
        await line.save();
        res.redirect('/dashboard')

    } catch (error) {
        console.error(error)
        res.render('error/500')

    }
})



module.exports = router; 
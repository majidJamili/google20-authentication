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

//Show Dashboard: 
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

// Show All Manufacturing Lines 
router.get('/manufacturing', ensureAuth, async (req, res) => {
    try {
        const lines = await Line.find({status: 'Manufacturing'})
            .populate('user')
            .sort({createdAt:'desc'})
            .lean()
        res.render('lines/index',{lines})
        
    } catch (error) {
        console.error(error)
        res.send('error/500')
    }
})
// Show Single Line:

router.get('/:id', ensureAuth, async (req, res) => {

    try {
        let line = await Line.findById(req.params.id)
        .populate('user')
        .lean()
        if(!line){
            return res.render('error/404')
        }else{
            res.render('lines/show',{
                line
            })
        }
        
    } catch (error) {
        console.error(error)
        res.render('error/500')        
    }

})


//Show Edit Page: 
//@route GET / lines/edit/:id
router.get('/edit/:id/', ensureAuth, async(req, res) => {
    try {
        const line = await Line.findOne({
            _id: req.params.id
        }).lean()
        
        if (!line) {
            return res.render('error/404')
        } 
        if (line.user != req.user.id) {
            res.redirect('/lines/manufacturing'); 
        }else{
            res.render('lines/edit',{
                line
            })
        }
    } catch (error) {
        console.error(error); 
        res.render('error/500')         
    }
})

//Process Edit Request: 
//@route PUT  /lines/:id

router.put('/:id', ensureAuth, async (req, res) => {

    try {
        let line = await Line.findById(req.params.id).lean()

        if(!line){
            return res.render('error/404')
        }
        if (line.user != req.user.id) {
            res.redirect('/lines/manufacturing'); 
        }else{
            line = await Line.findOneAndUpdate({_id : req.params.id}, req.body, {
                new:true, 
                runValidators:true
            })
            res.redirect('/dashboard')
        }
        
    } catch (error) {
        console.error(error); 
        res.render('error/500')       
        
    }
    

})

//Process Delete Request: 
//@route DELETE /lines/:id

router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Line.remove({_id:req.params.id})
        res.redirect('/dashboard')

    } catch (error) {
        console.error(error); 
        res.render('error/500')        
    }
})



// Get  User Lines 
// @ route GET/ lines/user/:userId

router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const lines = await Line.find({
            user: req.params.userId
        })
        .populate('user')
        .lean(); 
        res.render('lines/index',{
            lines
        })

    } catch (error) {

        console.error(error)
        res.render('error/404')
        
    }
})





module.exports = router; 
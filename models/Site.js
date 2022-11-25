const mongoose = require('mongoose'); 

const SiteSchema = new mongoose.Schema({
    title:{
        type:String, 
        require:true, 
        trim:true
    },    
    address:{
        type:String, 
        require:true
    },
    contact:{
        type:String, 
    },
    lines:{
        type:Array
    },
    createdAt:{
        type:Date, 
        default:Date.now
    }
})

module.exports= mongoose.model('Site', SiteSchema); 
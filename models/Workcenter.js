const mongoose = require('mongoose'); 

const WorkcenterSchema = new mongoose.Schema({
    title:{
        type:String, 
        require:true, 
        trim:true
    },    
    body:{
        type:String, 
        require:true
    },
    status:{
        type:String, 
    },
    processTime:{
        type:Number
    },

    tackt:{
        type:Number
    },
    prodcut:{
        type:Array
    },
    line:{
        type:Array
    },    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },   

    createdAt:{
        type:Date, 
        default:Date.now
    }
})

module.exports= mongoose.model('Workcenter', WorkcenterSchema); 
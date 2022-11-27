const mongoose = require('mongoose'); 

const LineSchema = new mongoose.Schema({
    title:{
        type:String, 
        require:true, 
        trim:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
    products:{
        type:Array
    },
    workcenters:{
        type:Array
    },    

    createdAt:{
        type:Date, 
        default:Date.now
    }
})

module.exports= mongoose.model('Line', LineSchema); 
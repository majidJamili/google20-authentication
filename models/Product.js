const mongoose = require('mongoose'); 

const ProductSchema = new mongoose.Schema({
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
    subassembly:{
        type:Array
    },
    processTime:{
        type:Number
    },
    cost:{
        type:Number
    },
    tackt:{
        type:Number
    },

    workcenters:{
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

module.exports= mongoose.model('Product', ProductSchema); 
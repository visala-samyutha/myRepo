const mongoose=require('mongoose');
const userModel = require('./signup.model');
const cartSchema=mongoose.Schema({
    cartItemId:{
        type:String,
        //required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    items:[{
        productId:{
        type:String,
        required:true,
        },
       // productId:String,
        productName:String,
        quantity:{
            type:Number,
            default:1,
        },
        price:Number
    }]
    /*items:{
        type:[productModel.Schema]
    }*/
});
const cartModel=mongoose.model("Cart",cartSchema);
module.exports=cartModel;
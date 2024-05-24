const express=require('express');
const productmodel = require('../model/product.model');
const route=express.Router();
route.use(express.json());

const {addToCart,getProduct,productEditData}=require('../controller/product.controller');

route.post('/',addToCart)
route.get('/',getProduct);
route.get('/:id',productEditData);
module.exports=route;
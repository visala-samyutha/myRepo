const express = require('express');
const routes = express.Router();
// const cartModel=require("../model/cart.model");
const { showCart, deleteCartItem } = require('../controller/cart.controller');
routes.get('/:id',showCart)
routes.post('/delete',deleteCartItem)
module.exports=routes
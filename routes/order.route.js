const express = require('express');
const routes = express.Router();
const Order = require('../model/order.model');
// const{enter,getUserProducts,placeOrder}=require('../controller/order.controller')
const control=require('../controller/order.controller')
// routes.get('/user',enter)
routes.get('/:userId',control.getUserProducts)
routes.post('/cart',control.placeOrder)
module.exports = routes
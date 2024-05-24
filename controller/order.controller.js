const orderModel = require('../model/order.model');
const productModel = require('../model/product.model');
const cartModel = require('../model/cart.model');
async function enter(req, res) {
    try {
        const { userId, orderId, productName, quantity, totalPrice, status, price } = req.body;
        const order = await orderModel.create({
            userId, orderId, productName, quantity, totalPrice, status, price
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ "message": "Invalid Order" });
    }
}
async function getUserProducts(req, res) {
    try {
        const userId = req.params.userId;
        const orders = await orderModel.find({ userId }).exec();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// async function placeOrder(req, res) {
//     try {
//         console.log("hello")
//         const  userId= req.body;
//         const cartItems=await cartModel.find(userId)
//         let totalPrice = 0;
//         for (const item of cartItems) {
//             console.log(item)
//             const product = await productModel.findOne({ productName: item.productName });
//             if (!product || item.quantity > product.quantity) {
//                 return res.status(404).json({ message: `Out of Stock: ${item.productName}` });
//             }
//             totalPrice += item.price * item.quantity;
//         }

//         for (const item of cartItems) {
//             await productModel.updateOne(
//                 { productName: item.productName },
//                 { $inc: { quantity: -item.quantity } }
//             );
//         }
//         const order = new orderModel({
//             userId,
//             items: cartItems,
//             totalPrice,
//             status: 'Processing'
//         });
//         await order.save();
        
//         res.status(200).json(order);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }
async function placeOrder(req,res){
    const userId=req.body
    console.log(userId)
    try{
        const  {userId}= req.body;
        const orders=new orderModel({ userId, items: [] });
        const cartItems=await cartModel.find({userId})
        cartItems.forEach(cart => {
            cart.items.forEach(item => {
                console.log(item)
                const { productId, productName, quantity, price } = item;
                orders.items.push({
                    productId,
                    productName,
                    quantity,
                    price,
                    total: quantity * price,
                    status: "order placed"
                });
            });
        });
        await orders.save();
        res.status(200).json({message:"order placed successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: 'error in placing the order' });
    }
}
// async function placeOrder(req,res){
//     const  userId= req.body;
//     const cartItems=await cartModel.find({userId})
//     try {
//         const orders=new orderModel({ userId, items: [] });
//         if (Array.isArray(cartItems) && cartItems.length) {
//             cartItems.forEach(cart => {
//                 try {
//                     if (Array.isArray(cart.items) && cart.items.length) {
//                         cart.items.forEach(item => {
//                             try {
//                                 const { productId, productName, quantity, price } = item;
    
//                                 orders.items.push({
//                                     productId,
//                                     productName,
//                                     quantity,
//                                     price,
//                                     total: quantity * price,
//                                     status: "order placed"
//                                 });
//                                  orders.save();
//                                 res.status(200).json({message:"order placed successfully"})
//                             } catch (itemError) {
//                                 console.error('Error processing item:', item, itemError);
//                             }
//                         });
//                     } else {
//                         console.warn('No items found in cart', cart);
//                     }
//                 } catch (cartError) {
//                     console.error('Error processing cart:', cart, cartError);
//                 }
//             });
//         } else {
//             console.warn('No carts found');
//         }
//     } catch (error) {
//         console.error('Error processing cart items:', error);
//     }
    
// }
module.exports = { enter, getUserProducts, placeOrder };
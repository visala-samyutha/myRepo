const cartModel = require('../model/cart.model');
const productModel = require('../model/product.model');

async function showCart(req, res) {
    const  userId  = req.params.id;
    try {
        console.log(userId)
        const cart = await cartModel.findOne({userId});
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ 'message': 'cart is empty' });
        }
        res.status(200).json(cart.items);
    } catch (err) {
        res.status(500).send('An error occurred while displaying the cart');
    }
}

// async function deleteCartItem(req, res) {
//     const  userId  = req.params.id;
//     const {productId}=req.body
//     try {
//         const cart = await cartModel.findOne({ userId });
//         if (!cart) {
//             return res.status(200).json({ 'message': 'cart does not exist' });
//         }
//         cart.items = [];
//         await cart.save();
//         res.status(200).json({ 'message': 'cart cleared successfully' });
//     } catch (err) {
//         res.status(500).send('An error occurred while clearing the cart');
//     }
// }
async function deleteCartItem(req,res){
   const {userId,productId}=req.body
   try {
        const cart = await cartModel.findOne({ userId });
        console.log(cart)
        if (!cart) {
            return res.status(200).json({ 'message': 'cart does not exist' });
        }
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ 'message': 'cart is empty' });
        }   
        const cartIndex = cart.items.findIndex(item => item.productId === productId); 
        console.log(cartIndex)
        cart.items.splice(cartIndex,1);
       await cart.save();
        res.status(200).json({ 'message': 'product deleted from cart successfully' });
        } catch (err) {
         res.status(500).send('An error occurred while clearing the cart');
        }
}

module.exports = { showCart, deleteCartItem };

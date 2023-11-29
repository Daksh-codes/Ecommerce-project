import  Cart  from "../model/wishlistCartModel.js";

export const addToCart = async (req , res ) => {
    try {
        const values = req.body
        const newCart = new Cart(values)
        const savedCart = await newCart.save()
        return res.status(201).send(savedCart)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export const getCartItems = async (req , res ) => {
    try {
        const userId = req.params.userId
        const cart = await Cart.find({userId})

        console.log(userId , cart )
        if(cart)
        {   return res.status(200).send(cart)}
        else 
        {   return res.status(404).send("No items found") }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export const deleteCartItems = async (req , res ) => {
    try {
        const cartId = req.params.cartId;
        const cart = await Cart.findByIdAndDelete(cartId); 
        console.log(cartId , cart )
        if (cart) {
            return res.status(200).send(cart);
        } else {
            return res.status(404).send("No item found to remove from cart");
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

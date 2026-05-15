import { Order } from "../model/Order.js";
import { Product } from "../model/Product.js";
import { Cart } from "../model/Cart.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    console.log("Cart:", cart);

    // Check cart
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart not found",
      });
    }

    // Prepare order products
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      image: item.productId.image,
      quentity: item.quentity,
    }));

    // Calculate total
    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.quentity * item.price;
    }, 0);

    // Deduct stock
    for (let item of orderItems) {
     await Product.findByIdAndUpdate(
       item.productId,
       {
         $inc: {
           stock: -item.quentity,
         },
       },
       {
         returnDocument: "after",
       },
     );
    }

    // Create order
    const order = new Order({
      userId,
      address,
      products: orderItems,
      amount: totalAmount,
      totalAmount,
      paymentMethod: "cod",
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

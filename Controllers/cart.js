import { Cart } from "../model/Cart.js";

export const productCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    // agar cart nahi hai
    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quentity: 1,
          },
        ],
      });

      await cart.save();

      return res.status(201).json({
        message: "Product Added To Cart",
        cart,
        success: true,
      });
    }

    // product find karo
    const item = cart.items.find((i) => i.productId.toString() === productId);

    // quantity increase
    if (item) {
      item.quentity += 1;
    } else {
      // new item add
      cart.items.push({
        productId,
        quentity: 1,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Cart Updated",
      cart,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).json({
        message: "Cart not found",
        success: false,
      });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();

    res.status(200).json({
      message: "Product deleted successfully",
      cart,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// UpdateQuentity

export const UpdateQuentity = async (req, res) => {
  try {
    const { userId, productId, quentity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(400).json({ message: "Cart not found", success: false });
    }
    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      res
        .status(400)
        .json({ message: "Product not found in cart", success: false });
    }
    item.quentity = quentity;
    await cart.save();
    res.status(200).json({ message: "Product are updated successfully", cart });
  } catch (error) {}
};

// Get Card by UserId

export const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.status(200).json({ cart });

  } catch (error) {
    
  }
}
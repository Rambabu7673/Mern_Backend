import { Product } from "../model/Product.js";



// Create a new product
export const productItems = async (req, res) => {
  
  try {
const { title, description, price, category, image, stock } = req.body;
console.log(req.body);
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !image ||
      stock === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      image,
      stock,
    });
    res
      .status(201)
      .json({
        message: "Product created successfully",
        product: newProduct,
        success: true,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products

export const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) {
      filter.title={$regex:search, $options:"i"}    //Case instensive search
    }

    if (category) {
      filter.category = category;
    }
    const product = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ products: product, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not updated", success: false });
    }
    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
        success: true,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const productDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "Product not deleted found", success: false });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

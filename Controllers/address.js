import { Address } from "../model/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { name, userId, address, city, state, pincode, phoneNumber } =
      req.body;
    if (
      !name ||
      !userId ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !phoneNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newAddress = await Address.create({
      userId,
      name,
      address,
      city,
      state,
      pincode,
      phoneNumber,
    });
    res.status(201).json({
      message: "Address created successfully",
      address: newAddress,
      success: true,
    });
  } catch (error) {}
};

// Edit Address/Update Address

export const getAddress = async (req, res) => {
  try {
    const id = req.params.userId;

    console.log(id);

    const getAllAddress = await Address.find({
      userId: id,
    });

    res.status(200).json({
      success: true,
      address: getAllAddress,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
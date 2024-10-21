import { AccountsModel } from "../models/accounts.model.js";

export const getAccount = async (req, res) => {
  try {
    const accounts = await AccountsModel.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const newAccount = req.body;
    const account = await AccountsModel(newAccount);
    await account.save();

    res.status(201).json({ message: "Account create successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const account = await AccountsModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account updated successfully", account });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await AccountsModel.findByIdAndDelete(id);

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

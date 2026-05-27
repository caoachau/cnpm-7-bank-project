const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  user: String,
  description: String,
  balance: { type: Number, default: 0 },
  transactions: [
    {
      date: { type: Date, default: Date.now },
      object: String,
      amount: Number,
    },
  ],
});

const Account = mongoose.models.Account || mongoose.model("Account", AccountSchema);

router.get("/:user", async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.params.user });
    if (!account) return res.status(404).json({ error: "User not found" });
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user, description } = req.body;
    const existing = await Account.findOne({ user });
    if (existing) return res.status(400).json({ error: "Account already exists" });
    const account = new Account({ user, description, balance: 0 });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:user", async (req, res) => {
  try {
    await Account.findOneAndDelete({ user: req.params.user });
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:user/transactions", async (req, res) => {
  try {
    const { date, object, amount } = req.body;
    const account = await Account.findOne({ user: req.params.user });
    if (!account) return res.status(404).json({ error: "User not found" });
    account.transactions.push({ date, object, amount });
    account.balance += Number(amount);
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:user/transactions/:id", async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.params.user });
    if (!account) return res.status(404).json({ error: "User not found" });
    const tx = account.transactions.id(req.params.id);
    if (!tx) return res.status(404).json({ error: "Transaction not found" });
    account.balance -= tx.amount;
    tx.deleteOne();
    await account.save();
    res.json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
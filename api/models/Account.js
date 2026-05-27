const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: String,
  date: String,
  object: String,
  amount: Number,
});

const accountSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  currency: String,
  description: String,
  balance: Number,
  transactions: [transactionSchema],
});

// Đây là dòng quan trọng nhất để sửa lỗi "is not a function"
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
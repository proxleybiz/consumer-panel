const mongoose = require("mongoose");

const subscription = new mongoose.Schema({
  email: { type: String },
});

module.exports =
  mongoose.models.subscriptions ||
  mongoose.model("subscriptions", subscription);

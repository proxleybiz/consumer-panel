const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  itemType: {
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    items: [
      {
        name: {
          type: String,
        },
        img: {
          type: String,
        },
      },
    ],
  },
});

module.exports = mongoose.models.shops || mongoose.model("shops", ShopSchema);

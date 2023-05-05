const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  filterOne: [
    { name: { type: String }, img: { type: String }, cost: { type: Number } },
  ],
  filterTwo: [
    {
      category: {
        type: String,
      },
      items: [
        {
          name: { type: String },
          description: { type: String },
          cost: { type: Number },
          img: { type: String },
          options: [
            {
              name: { type: String },
              img: { type: String },
              description: { type: String },
              cost: { type: Number },
            },
          ],
        },
      ],
    },
  ],
  customization: [
    {
      category: { type: String },
      options: [
        {
          name: { type: String },
          type: { type: String },
          cost: { type: Number },
          values: [{ type: String }],
        },
      ],
    },
  ],
});

module.exports = mongoose.models.shops || mongoose.model("shops", ShopSchema);

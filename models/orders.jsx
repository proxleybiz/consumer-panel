const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  order_on: {
    type: Number,
  },
  totalAmount: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  subTotal: {
    type: Number,
  },
  product: {
    type: Object,
  },
  payment_status: {
    type: String,
  },
  payment_details: {
    type: Object,
  },
  order_status: {
    type: String,
  },
  monthly_repeat: {
    type: Boolean,
    default: false,
  },
  last_repeat: {
    type: Number,
  },
  recommendation: { type: Object },
  address: {
    addressTitle: {
      type: String,
    },
    lineOne: {
      type: String,
    },
    lineTwo: {
      type: String,
    },
    landmark: {
      type: String,
    },
    pincode: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
});

module.exports =
  mongoose.models.orders || mongoose.model("orders", OrdersSchema);

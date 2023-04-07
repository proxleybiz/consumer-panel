const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  joinedOn: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  orders: [{ type: String }],
  address: [
    {
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
  ],
  password: {
    type: String,
  },
  profileCompleted: {
    type: Boolean,
  },
  companyName: { type: String },
  companyGST: {
    type: String,
  },
  businessCategory: {
    type: String,
  },
  businessAddress: {
    type: String,
  },
  designation: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
});

module.exports = mongoose.models.users || mongoose.model("users", UserSchema);

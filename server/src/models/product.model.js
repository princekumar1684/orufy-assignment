const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    mrp: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },



    status: {
      type: String,
      enum: ["published", "unpublished"],
      default: "published",
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    isExchangeable: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;

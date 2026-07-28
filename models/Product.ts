import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Product || model("Product", productSchema);
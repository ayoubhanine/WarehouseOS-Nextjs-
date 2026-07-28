import { Schema, model, models } from "mongoose";

const stockMovementSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    type: {
      type: String,
      enum: ["IN", "OUT"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models.StockMovement ||
  model("StockMovement", stockMovementSchema);
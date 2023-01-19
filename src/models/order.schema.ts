import * as mongoose from 'mongoose';
// create and export the schema for handling the orders
export const orderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true,
  },
  products: [
    {
      product: {
        // Products reference
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      // define the quantity of the orders made
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  // define the date order was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

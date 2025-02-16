import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  vendor: {
    type: String,
    required: true
  },
  price: Number,
  currentStock: {
    type: Number,
    default: 0
  },
  reorderLevel: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);
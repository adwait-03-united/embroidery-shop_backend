import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: { type: Number, default: null },
  category: {
    type: String,
    required: true,
    enum: ['tshirts', 'shirts'],
  },
  sizes:  { type: [String], required: true },
  colors: { type: [String], required: true },
  images: { type: [String], required: true },
  badge:  {
    type: String,
    enum: ['New', 'Bestseller', 'Sale', null],
    default: null,
  },
  stock: { type: Number, default: 100 },
  isFeatured: { type: Boolean, default: false },
  rating:      { type: Number, default: 0 },
  numReviews:  { type: Number, default: 0 },
}, { timestamps: true })

productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ category: 1 })
productSchema.index({ slug: 1 })

export default mongoose.model('Product', productSchema)
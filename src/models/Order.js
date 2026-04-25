import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:     { type: String, required: true },
  image:    { type: String, required: true },
  price:    { type: Number, required: true },
  size:     { type: String, required: true },
  color:    { type: String },
  qty:      { type: Number, required: true, min: 1 },
})

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    fullName: { type: String, required: true },
    phone:    { type: String, required: true },
    address:  { type: String, required: true },
    city:     { type: String, required: true },
    state:    { type: String, required: true },
    pincode:  { type: String, required: true },
  },
  subtotal:  { type: Number, required: true },
  shipping:  { type: Number, required: true, default: 0 },
  total:     { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentInfo: {
    razorpayOrderId:   String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    paidAt: Date,
  },
  isDelivered:  { type: Boolean, default: false },
  deliveredAt:  Date,
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
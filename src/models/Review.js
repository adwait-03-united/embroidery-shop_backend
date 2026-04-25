import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating:  { type: Number, required: true, min: 1, max: 5 },
  title:   { type: String, required: true, maxlength: 100 },
  comment: { type: String, required: true },
}, { timestamps: true })

reviewSchema.index({ product: 1, user: 1 }, { unique: true })

reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' }, numReviews: { $sum: 1 } } },
  ])
  if (stats.length > 0) {
    await mongoose.model('Product').findByIdAndUpdate(productId, {
      rating:     Math.round(stats[0].avgRating * 10) / 10,
      numReviews: stats[0].numReviews,
    })
  }
}

reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.product)
})

export default mongoose.model('Review', reviewSchema)
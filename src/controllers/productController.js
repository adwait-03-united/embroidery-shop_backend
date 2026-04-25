import Product from '../models/Product.js'

export const getAllProducts = async (req, res) => {
  const { category, search, sort, page = 1, limit = 12 } = req.query

  const query = {}

  if (category) {
    query.category = category
  }

  if (search) {
    query.$or = [
      { name:        { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ]
  }

  let sortOption = { createdAt: -1 }
  if (sort === 'price-asc')  sortOption = { price: 1 }
  if (sort === 'price-desc') sortOption = { price: -1 }
  if (sort === 'name')       sortOption = { name: 1 }
  if (sort === 'rating')     sortOption = { rating: -1 }

  const skip  = (Number(page) - 1) * Number(limit)
  const total = await Product.countDocuments(query)

  const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit))

  res.json({
    products,
    page:       Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    total,
  })
}

export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }
  res.json(product)
}

export const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8)
  res.json(products)
}

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params
  const products = await Product.find({ category }).sort({ createdAt: -1 })
  res.json({ products, total: products.length })
}

export const searchProducts = async (req, res) => {
  const { q } = req.query
  if (!q || q.trim().length < 2) {
    return res.json([])
  }
  const products = await Product.find({
    $or: [
      { name:        { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
    ],
  }).limit(6).select('name slug price images category')

  res.json(products)
}
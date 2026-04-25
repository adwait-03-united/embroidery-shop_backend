import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Product from '../src/models/Product.js'
import User from '../src/models/User.js'
import Order from '../src/models/Order.js'

dotenv.config()

const products = [
  { name: 'Floral Embroidery Tee', slug: 'floral-embroidery-tshirt',
    description: 'Premium cotton tee with hand-embroidered floral motif on the chest. Relaxed fit, breathable fabric.',
    price: 1299, originalPrice: 1799, badge: 'New', category: 'tshirts',
    sizes: ['S','M','L','XL'], colors: ['#f5f0eb','#1a1a1a','#c8a97e'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+1'],
    isFeatured: true, stock: 50 },

  { name: 'Heritage Crane Shirt', slug: 'heritage-crane-shirt',
    description: 'Linen-blend shirt with an embroidered crane design on the back. Perfect for casual occasions.',
    price: 2199, originalPrice: 2799, badge: 'Bestseller', category: 'shirts',
    sizes: ['S','M','L','XL','XXL'], colors: ['#f5f0eb','#8b5e3c'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+1'],
    isFeatured: true, stock: 30 },

  { name: 'Minimal Stitch Tee', slug: 'minimal-stitch-tee',
    description: 'Clean minimal tee with a small embroidered logo at the chest pocket.',
    price: 999, originalPrice: null, badge: null, category: 'tshirts',
    sizes: ['S','M','L'], colors: ['#1a1a1a','#d94f3d'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+2'],
    stock: 80 },

  { name: 'Paisley Linen Shirt', slug: 'paisley-linen-shirt',
    description: 'Premium linen shirt with intricate paisley embroidery along the placket.',
    price: 2499, originalPrice: 2999, badge: 'Sale', category: 'shirts',
    sizes: ['M','L','XL'], colors: ['#f5f0eb','#c8a97e'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+2'],
    stock: 20 },

  { name: 'Tiger Embroidery Tee', slug: 'tiger-embroidery-tshirt',
    description: 'Bold tiger face embroidery on a heavy-weight black tee. Statement piece.',
    price: 1499, originalPrice: null, badge: 'New', category: 'tshirts',
    sizes: ['S','M','L','XL'], colors: ['#1a1a1a'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+3'],
    isFeatured: true, stock: 45 },

  { name: 'Botanical Resort Shirt', slug: 'botanical-resort-shirt',
    description: 'Lightweight resort shirt with botanical leaf embroidery on both sleeves.',
    price: 1999, originalPrice: 2499, badge: null, category: 'shirts',
    sizes: ['S','M','L','XL','XXL'], colors: ['#f5f0eb'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+3'],
    stock: 35 },

  { name: 'Wave Stitch Tee', slug: 'wave-stitch-tee',
    description: 'Organic cotton tee with ocean wave stitch pattern across the chest.',
    price: 1199, originalPrice: 1499, badge: null, category: 'tshirts',
    sizes: ['M','L','XL'], colors: ['#1a1a1a','#f5f0eb'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Tee+4'],
    stock: 60 },

  { name: 'Mandala Overshirt', slug: 'mandala-overshirt',
    description: 'Heavy cotton overshirt with full mandala embroidery on the back panel.',
    price: 2799, originalPrice: 3499, badge: 'Sale', category: 'shirts',
    sizes: ['M','L','XL'], colors: ['#8b5e3c','#1a1a1a'],
    images: ['https://placehold.co/600x800/e8e0d5/1a1a1a?text=Shirt+4'],
    stock: 15 },
]

const adminUser = {
  name:     'Admin User',
  email:    'admin@stitchandco.com',
  password: 'Admin@1234',
  role:     'admin',
}

const testUser = {
  name:     'Test User',
  email:    'test@example.com',
  password: 'password123',
  role:     'user',
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    await Product.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()
    console.log('Cleared existing data')

    const createdProducts = await Product.insertMany(products)
    console.log(`Inserted ${createdProducts.length} products`)

    await User.create(adminUser)
    await User.create(testUser)
    console.log('Created admin and test users')

    console.log('---')
    console.log('Seed complete!')
    console.log('Admin login: admin@stitchandco.com / Admin@1234')
    console.log('Test login:  test@example.com / password123')
    process.exit(0)
  } catch (error) {
    console.error('Seed error:', error.message)
    process.exit(1)
  }
}

seedDB()
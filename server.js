import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes    from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import orderRoutes   from './src/routes/orderRoutes.js'
import adminRoutes   from './src/routes/adminRoutes.js'
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'https://stitch-brand.vercel.app',
  ],
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.get('/', (req, res) => {
  res.json({ message: 'Stitch & Co API is running', status: 'ok' })
})

app.get('/api/health', (req, res) => {
  res.json({
    status:   'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time:     new Date().toISOString(),
  })
})

app.use('/api/auth',     authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/admin',    adminRoutes)

app.use(notFound)
app.use(errorHandler)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
  })
})
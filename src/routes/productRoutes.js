import express from 'express'
import {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
  searchProducts,
} from '../controllers/productController.js'

const router = express.Router()

router.get('/',                    getAllProducts)
router.get('/featured',            getFeaturedProducts)
router.get('/search',              searchProducts)
router.get('/category/:category',  getProductsByCategory)
router.get('/:slug',               getProductBySlug)

export default router
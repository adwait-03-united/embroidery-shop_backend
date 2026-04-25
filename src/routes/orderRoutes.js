import express from 'express'
const router = express.Router()

router.post('/create-razorpay-order', (req, res) => res.json({ message: 'create order — coming in Phase 10' }))
router.post('/verify-payment',        (req, res) => res.json({ message: 'verify payment — coming in Phase 10' }))
router.get('/my-orders',              (req, res) => res.json({ message: 'my orders — coming in Phase 10' }))

export default router
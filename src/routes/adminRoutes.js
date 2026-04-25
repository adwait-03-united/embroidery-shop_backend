import express from 'express'
const router = express.Router()

router.get('/products',  (req, res) => res.json({ message: 'admin products — coming in Phase 10' }))
router.get('/orders',    (req, res) => res.json({ message: 'admin orders — coming in Phase 10' }))

export default router
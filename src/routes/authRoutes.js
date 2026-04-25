import express from 'express'
const router = express.Router()

router.post('/register', (req, res) => res.json({ message: 'register endpoint — coming in Phase 9' }))
router.post('/login',    (req, res) => res.json({ message: 'login endpoint — coming in Phase 9' }))
router.get('/profile',   (req, res) => res.json({ message: 'profile endpoint — coming in Phase 9' }))

export default router
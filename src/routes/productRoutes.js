import express from 'express'
const router = express.Router()

router.get('/',          (req, res) => res.json({ message: 'get all products — coming in Phase 9' }))
router.get('/:slug',     (req, res) => res.json({ message: `get product ${req.params.slug} — coming in Phase 9` }))

export default router
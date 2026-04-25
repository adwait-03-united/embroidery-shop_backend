import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email and password' })
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: 'An account with this email already exists' })
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' })
  }

  const user = await User.create({ name, email, password })

  res.status(201).json({
    _id:   user._id,
    name:  user.name,
    email: user.email,
    role:  user.role,
    token: generateToken(user._id),
  })
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' })
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  res.json({
    _id:   user._id,
    name:  user.name,
    email: user.email,
    role:  user.role,
    token: generateToken(user._id),
  })
}

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json({
    _id:       user._id,
    name:      user.name,
    email:     user.email,
    role:      user.role,
    phone:     user.phone,
    addresses: user.addresses,
    createdAt: user.createdAt,
  })
}

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  user.name  = req.body.name  || user.name
  user.email = req.body.email || user.email
  user.phone = req.body.phone || user.phone

  if (req.body.password) {
    if (req.body.password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }
    user.password = req.body.password
  }

  const updated = await user.save()

  res.json({
    _id:   updated._id,
    name:  updated.name,
    email: updated.email,
    role:  updated.role,
    token: generateToken(updated._id),
  })
}
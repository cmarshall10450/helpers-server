import express from 'express'
import User from '../models/User'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json({ success: true, data: users })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, errors: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    res.status(200).json({ success: true, data: user })
  } catch (err) {
    res.status(500).json({ success: false, errors: err })
  }
})

router.get('/:id/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('friends')
    res.status(200).json({ success: true, data: user.friends })
  } catch (err) {
    res.status(500).json({ success: false, errors: err })
  }
})

router.post('/', async (req, res) => {
  const { name, username, email, password } = req.body
  const user = await new User({
    name,
    username,
    email,
    password,
  }).save()

  res.status(200).json({ user })
})

router.post('/:id/friends', async (req, res) => {
  const { id } = req.params
  const { friendId } = req.body

  try {
    await User.findByIdAndUpdate(id, {
      $push: { friends: friendId },
    })

    await User.findByIdAndUpdate(friendId, {
      $push: { friends: id },
    })

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, errors: err })
  }
})

export default router

import express from 'express'
import Task from '../models/Task'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json({ success: true, data: tasks })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, errors: err })
  }
})

router.post('/', async (req, res) => {
  const { title, description, payment, isPublic } = req.body
  const task = await new Task({
    title,
    description,
    payment,
    public: isPublic,
  }).save()

  res.status(200).json({ success: true, data: task })
})

router.delete('/:id')

export default router

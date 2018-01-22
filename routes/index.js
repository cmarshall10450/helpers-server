import express from 'express'
import users from './users'
import tasks from './tasks'

const router = express.Router()

router.use('/users', users)
router.use('/tasks', tasks)

export default router

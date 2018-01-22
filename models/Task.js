import mongoose, { Schema } from 'mongoose'

const Task = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
  },
  public: {
    type: Boolean,
    required: true,
  },
})

export default mongoose.model('Task', Task)

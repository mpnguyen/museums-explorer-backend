import mongoose, { Schema } from 'mongoose'

const museumSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  thumb: { type: String },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

museumSchema.index({
  name: 'text',
})

export default mongoose.model('Museum', museumSchema)
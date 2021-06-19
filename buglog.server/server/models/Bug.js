import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BugSchema = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: Date },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  email: { type: String },
  picture: { type: String }
}, { timestamps: true, toJSON: { virtuals: true } })

export default BugSchema

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

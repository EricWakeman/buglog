import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  body: { type: String, required: true },
  bug: { type: Schema.Types.ObjectId, ref: 'Bug', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

export default NoteSchema

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

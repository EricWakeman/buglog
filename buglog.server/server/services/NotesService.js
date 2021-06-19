import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotes(id) {
    return await dbContext.Note.find({ bug: id })
      .populate('creator', 'name picture')
  }

  async createNote(body) {
    const note = await dbContext.Note.create(body)
    await note.populate('creator', 'name picture').execPopulate()
    return note
  }

  async isNoteOwner(id, userId) {
    const note = await dbContext.Note.find({ _id: id, creatorId: userId })
    if (!note) {
      throw new BadRequest('You do not have access to this note.')
    }
    return note
  }

  async deleteNote(id) {
    return await dbContext.Note.findByIdAndDelete(id)
  }
}

export const notesService = new NotesService()

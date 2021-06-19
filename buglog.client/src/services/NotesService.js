import { AppState } from '../AppState'
import { Note } from '../models/Note'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async createNote(note) {
    const res = await api.post('api/notes', note)
    logger.log(res.data)
    AppState.notes.push(new Note(res.data))
  }

  async deleteNote(note) {
    await api.delete('api/notes/' + note)
    AppState.notes = AppState.notes.filter(n => n.id !== note)
  }
}

export const notesService = new NotesService()

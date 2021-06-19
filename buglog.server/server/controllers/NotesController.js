import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/notes', this.createNote)
      .use(this.isNoteOwner)
      .delete('/notes/:id', this.deleteNote)
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async isNoteOwner(req, res, next) {
    try {
      await notesService.isNoteOwner(req.params.id, req.userInfo.id)
      next()
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await notesService.deleteNote(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}

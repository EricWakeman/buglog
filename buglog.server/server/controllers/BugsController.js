import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import BaseController from '../utils/BaseController'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .use(this.isBugOwner)
      .put('/:id', this.editBug)
      .delete('/:id', this.closeBug)
  }

  async getAllBugs(req, res, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.getBugById(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await notesService.getNotes(req.params.id)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      const bugData = req.body
      bugData.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(bugData)

      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async isBugOwner(req, res, next) {
    try {
      await bugsService.isBugOwner(req.params.id, req.userInfo.id)
      next()
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugsService.editBug(req.params.id, req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      const bug = await bugsService.closeBug(req.params.id)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }
}

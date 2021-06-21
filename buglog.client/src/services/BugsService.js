import { AppState } from '../AppState'
import { Bug } from '../models/Bug'
import { Note } from '../models/Note'
import { router } from '../router'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('/api/bugs')
    logger.log(res.data)
    AppState.allBugs = res.data.map(b => new Bug(b))
    AppState.sortedBugs = res.data.map(b => new Bug(b))
    logger.log(AppState.bugs)
  }

  async createBug(bugData) {
    const res = await api.post('/api/bugs', bugData)
    AppState.allBugs.push(new Bug(res.data))
    router.push({ path: `/bugs/${res.data.id}` })
  }

  async getBugAndNotes(id) {
    const bugRes = await api.get('/api/bugs/' + id)
    const noteRes = await api.get('/api/bugs/' + id + '/notes')
    AppState.activeBug = new Bug(bugRes.data)
    logger.log(AppState.activeBug)
    AppState.notes = noteRes.data.map(n => new Note(n))
  }

  async closeBug(id) {
    await api.delete('/api/bugs/' + id)
    const bug = AppState.allBugs.find(b => b.id === id)
    bug.closed = true
    if (AppState.activeBug) {
      AppState.activeBug.closed = true
    }
  }

  sortMostRecent() {
    AppState.sortedBugs = AppState.allBugs
  }

  sortOpenFirst() {
    AppState.sortedBugs = AppState.allBugs.sort(function(x, y) {
      return (x.closed === y.closed) ? 0 : x.closed ? 1 : -1
    })
  }

  sortClosedFirst() {
    AppState.sortedBugs = AppState.allBugs.sort(function(x, y) {
      return (x.closed === y.closed) ? 0 : x.closed ? -1 : 1
    })
  }

  filterOpenOnly() {
    AppState.sortedBugs = AppState.allBugs.filter(b => !b.closed)
  }

  filterClosedOnly() {
    AppState.sortedBugs = AppState.allBugs.filter(b => b.closed)
  }
}

export const bugsService = new BugsService()

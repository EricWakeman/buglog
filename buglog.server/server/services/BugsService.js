import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAllBugs() {
    return await dbContext.Bug.find({})
      .populate('creator', 'name picture')
  }

  async getBugById(id) {
    return await dbContext.Bug.findById(id)
      .populate('creator', 'name picture')
  }

  async createBug(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }

  async isBugOwner(id, userId) {
    const bug = await dbContext.Bug.find({ _id: id, creatorId: userId })
    if (!bug) {
      throw new BadRequest('You are not authorized to modify this bug.')
    }
    return bug
  }

  async editBug(id, bugData) {
    const bug = await dbContext.Bug.findById(id)
    if (bug.closed) {
      throw new BadRequest('You cannot modify a bug that has been closed.')
    }
    bugData.closed = false
    const updatedBug = await dbContext.Bug.findByIdAndUpdate(id, bugData, { new: true })
    await updatedBug.populate('creator', 'name picture').execPopulate()
  }

  async closeBug(id) {
    const bug = await dbContext.Bug.findById(id)
    if (bug.closed) {
      throw new BadRequest('This bug has already been closed.')
    }
    return await dbContext.Bug.findByIdAndUpdate(id, { closed: true }, { new: true })
  }
}
export const bugsService = new BugsService()

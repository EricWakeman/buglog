export class Bug {
  constructor(data) {
    this.closed = data.closed
    this.description = data.description
    this.title = data.title
    this.closedDate = data.closedDate || ''
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.id = data.id
  }
}

export default class ScoutMeeting {
  constructor(
    creator,
    location,
    time,
    startDate,
    endDate,
    description,
    shakedown,
  ) {
    this.creator = creator
    this.location = location
    this.time = time
    this.startDate = startDate
    this.endDate = endDate
    this.description = description
    this.shakedown = shakedown
  }
}

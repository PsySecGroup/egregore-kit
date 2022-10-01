import { QuadrantPoint, QuadrantType } from "./quadrantPoint"

/**
 * 
 */
export class Vector {
  type: QuadrantType
  context: number
  content: number
  angle: number
  time: number

  constructor (point: QuadrantPoint) {
    this.time = point.time
    this.type = point.type
    this.content = point.content
    this.context = point.context

    switch (point.type) {
      case QuadrantType.socialCreate:
        this.angle = ((Math.atan(Math.abs(this.context) / Math.abs(this.content)) * (180 / Math.PI)) / 360) || -1
      break
      case QuadrantType.personalCreate:
        this.angle = ((360 - Math.atan(Math.abs(this.context) / Math.abs(this.content)) * (180 / Math.PI)) / 360) || -1
      break
      case QuadrantType.personalDestroy:
        this.angle = ((180 + Math.atan(Math.abs(this.context) / Math.abs(this.content)) * (180 / Math.PI)) / 360) || -1
      break
      case QuadrantType.socialDestroy:
        this.angle = ((180 - Math.atan(Math.abs(this.context) / Math.abs(this.content)) * (180 / Math.PI)) / 360) || -1
      break
    }
  }
}
import { QuadrantPoint, QuadrantType } from "./quadrantPoint"

export class Vector {
  type: QuadrantType
  x: number
  y: number

  constructor (point: QuadrantPoint) {
    this.type = point.type
    this.x = point.content
    this.y = point.context
  }
}

import { QuadrantPoint, QuadrantType } from "./quadrantPoint"

export class Vector {
  type: QuadrantType
  content: number
  context: number

  constructor (point: QuadrantPoint) {
    this.type = point.type
    this.content = point.content
    this.context = point.context
  }
}

import { Vector } from "./vector"

export enum QuadrantType {
  socialCreate,
  personalCreate,
  personalDestroy,
  socialDestroy
}

/**
 * 
 */
export class QuadrantPoint {
  type: QuadrantType
  content: number
  context: number
  time: number

  constructor (type: QuadrantType, time: number, content: number = 0, context: number = 0) {
    this.type = type
    this.content = content
    this.context = context
    this.time = time
  }

  /**
   * 
   */
  addContext (value: number = 1) {
    this.context += value
  }

  /**
   * 
   */
  addContent (value: number = 1) {
    this.content += value
  }

  /**
   * 
   */
  toVector () {
    return new Vector(this)
  }
}
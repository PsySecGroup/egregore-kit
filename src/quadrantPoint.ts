import { Vector } from "./vector"

export enum QuadrantType {
  socialCreate,
  personalCreate,
  personalDestroy,
  socialDestroy
}

interface QuadrantPointJson {
  type: QuadrantType
  content: number
  context: number
  time?: number
}

/**
 * 
 */
export class QuadrantPoint {
  type: QuadrantType
  time: number
  content: number
  context: number

  constructor (type: QuadrantType | QuadrantPointJson, content: number = 0, context: number = 0, time: number = 0) {
    if(typeof type === 'number') {
      this.type = type
      this.content = content
      this.context = context
      this.time = time
    } else {
      const json = type as QuadrantPointJson
      this.type = json.type
      this.content = json.content
      this.context = json.context
      this.time = json.time
    }
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
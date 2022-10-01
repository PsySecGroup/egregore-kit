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
  content: number
  context: number

  constructor (type: QuadrantType | QuadrantPointJson, content: number = 0, context: number = 0) {
    if(typeof type === 'number') {
      this.type = type
      this.content = content
      this.context = context
    } else {
      const json = type as QuadrantPointJson
      this.type = json.type
      this.content = json.content
      this.context = json.context
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
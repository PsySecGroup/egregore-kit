const isNegativeZero = require( 'is-negative-zero')
import { HttpRequest } from "./httpRequest"
import { QuadrantPoint, QuadrantType } from "./quadrantPoint"
import { Vector } from "./vector"

export interface MethodStringMap {
  social: string[]
  personal: string[]
  create: string[]
  destroy: string[]
}

export interface MethodMap {
  social: HttpRequest[]
  personal: HttpRequest[]
  create: HttpRequest[]
  destroy: HttpRequest[]
}

interface QuadrantPoints {
  [QuadrantType.socialCreate]: QuadrantPoint[],
  [QuadrantType.personalCreate]: QuadrantPoint[],
  [QuadrantType.personalDestroy]: QuadrantPoint[],
  [QuadrantType.socialDestroy]: QuadrantPoint[]
}

const PI_RADIAN = 180 / Math.PI

/**
 * 
 */
function requestSearch (list: HttpRequest[], request: HttpRequest) {
  return list.find(endpoint => request.isMatch(endpoint)) !== undefined
}

/**
 * 
 */
 function getDegrees (a: Vector, b: Vector, offset = 360) {
  const slope = (b.context - a.context) / (b.content - a.content)
  const degree = Math.atan(slope) * PI_RADIAN
  let angle = degree % 360;
  
  if (angle < 0) {
    angle += offset
  } else if (isNegativeZero(angle)) {
    angle = 180
  }
  
  return angle
}

/**
 * 
 */
export class Space {
  readonly endpoints: MethodMap
  readonly points: QuadrantPoints = {
    [QuadrantType.socialCreate]: [],
    [QuadrantType.personalCreate]: [],
    [QuadrantType.personalDestroy]: [],
    [QuadrantType.socialDestroy]: []
  }

  /**
   * 
   */
  static fromJson (line: string) {
    const json = JSON.parse(line)
    const endpoints: MethodStringMap = json.endpoints
    const points: QuadrantPoints = {
      [QuadrantType.socialCreate]: json.points[QuadrantType.socialCreate].map(point => new QuadrantPoint(point)),
      [QuadrantType.personalCreate]: json.points[QuadrantType.personalCreate].map(point => new QuadrantPoint(point)),
      [QuadrantType.personalDestroy]: json.points[QuadrantType.personalDestroy].map(point => new QuadrantPoint(point)),
      [QuadrantType.socialDestroy]: json.points[QuadrantType.socialDestroy].map(point => new QuadrantPoint(point))
    }

    return new Space(endpoints, points)
  }

  constructor (endpoints: MethodMap | MethodStringMap, points?: QuadrantPoints) {
    if (points !== undefined) {
      this.points = points
    }

    const social: HttpRequest[] = typeof endpoints.social[0] !== 'string'
      ? endpoints.social as HttpRequest[]
      : endpoints.social.map(endpoint => {
        const parts = endpoint.split(' ')
        return new HttpRequest(parts[0], parts[1])
      }) as HttpRequest[]

    const personal: HttpRequest[] = typeof endpoints.personal[0] !== 'string'
    ? endpoints.personal as HttpRequest[]
    : endpoints.personal.map(endpoint => {
      const parts = endpoint.split(' ')
      return new HttpRequest(parts[0], parts[1])
    }) as HttpRequest[]

    const create: HttpRequest[] = typeof endpoints.create[0] !== 'string'
    ? endpoints.create as HttpRequest[]
    : endpoints.create.map(endpoint => {
      const parts = endpoint.split(' ')
      return new HttpRequest(parts[0], parts[1])
    }) as HttpRequest[]

    const destroy: HttpRequest[] = typeof endpoints.destroy[0] !== 'string'
    ? endpoints.destroy as HttpRequest[]
    : endpoints.destroy.map(endpoint => {
      const parts = endpoint.split(' ')
      return new HttpRequest(parts[0], parts[1])
    }) as HttpRequest[]

    this.endpoints = {
      social,
      personal,
      create,
      destroy
    }
  }

  /**
   * Convert an HTTP request into a quandrant point
   */
  addRequests (requests: HttpRequest[]) {
    for (const request of requests) {
      if (requestSearch(this.endpoints.social, request)) {
        this.points[QuadrantType.socialCreate].push(new QuadrantPoint(QuadrantType.socialCreate, 0, 1, request.time))
      }
      
      if (requestSearch(this.endpoints.personal, request)) {
        this.points[QuadrantType.personalCreate].push(new QuadrantPoint(QuadrantType.personalCreate, 0, -1, request.time))
      }
      
      if (requestSearch(this.endpoints.create, request)) {
        this.points[QuadrantType.personalDestroy].push(new QuadrantPoint(QuadrantType.personalDestroy, 1, 0, request.time))
      }
      
      if (requestSearch(this.endpoints.destroy, request)) {
        this.points[QuadrantType.socialDestroy].push(new QuadrantPoint(QuadrantType.socialDestroy, -1, 0, request.time))
      }
    }
  }

  /**
   * 
   */
  getPoints () {
    return[
      ...this.points[QuadrantType.socialCreate],
      ...this.points[QuadrantType.personalCreate],
      ...this.points[QuadrantType.personalDestroy],
      ...this.points[QuadrantType.socialDestroy]
    ]
  }

  /**
   * 
   */
   private _reduce (points: QuadrantPoint[]) {
    if (points.length === 0) {
      return false
    }

    let content = 0
    let context = 0

    for (const point of points) {
      context += point.context
      content += point.content
    }

    const result = new QuadrantPoint(points[0].type, content, context).toVector()

    return result
  }

  /**
   * 
   */
  getVectors (users: number) {
    const vectors = [
      this._reduce(this.points[QuadrantType.socialCreate]),
      this._reduce(this.points[QuadrantType.personalCreate]),
      this._reduce(this.points[QuadrantType.personalDestroy]),
      this._reduce(this.points[QuadrantType.socialDestroy])
    ].filter(vector => vector !== false) as Vector[]

    const result = {
      temperature: 0,
      pressure: 0,
      vectors,
      angles: []
    }

    for (let i = 0, len = result.vectors.length; i < len; i++) {
      const vector = result.vectors[i]
      const nextVector = result.vectors[i + 1] === undefined
        ? result.vectors[0]
        : result.vectors[i + 1]

      result.angles.push(getDegrees(vector, nextVector, 360 - (i * 90)))
      result.temperature += vector.context
      result.pressure +=  vector.content
    }

    result.temperature /= users
    result.pressure /= users

    return result
  }

  /**
   * 
   */
  toJson () {
    return {
      endpoints: {
        social: this.endpoints.social.map(element => element.method + ' ' + element.endpoint),
        personal: this.endpoints.personal.map(element => element.method + ' ' + element.endpoint),
        create: this.endpoints.create.map(element => element.method + ' ' + element.endpoint),
        destroy: this.endpoints.destroy.map(element => element.method + ' ' + element.endpoint)
      },
      points: this.points
    }
  }
}
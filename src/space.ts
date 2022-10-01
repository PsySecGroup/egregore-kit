import { HttpRequest } from "./httpRequest";
import { QuadrantPoint, QuadrantType } from "./quadrantPoint";

interface MethodMap {
  socialCreate: HttpRequest[]
  personalCreate: HttpRequest[]
  personalDestroy: HttpRequest[]
  socialDestroy: HttpRequest[]
}

interface QuadrantPoints {
  [QuadrantType.socialCreate]: QuadrantPoint[],
  [QuadrantType.personalCreate]: QuadrantPoint[],
  [QuadrantType.personalDestroy]: QuadrantPoint[],
  [QuadrantType.socialDestroy]: QuadrantPoint[],
}

/**
 * 
 */
function requestSearch (list: HttpRequest[], request: HttpRequest) {
  return list.find(element => request.method === element.method && request.endpoint === element.endpoint) !== undefined
}

/**
 * 
 */
export class Space {
  type: QuadrantType
  endpoints: MethodMap
  points: QuadrantPoints = {
    [QuadrantType.socialCreate]: [],
    [QuadrantType.personalCreate]: [],
    [QuadrantType.personalDestroy]: [],
    [QuadrantType.socialDestroy]: []
  }

  constructor (endpoints: MethodMap) {
    this.endpoints = endpoints
  }

  /**
   * Convert an HTTP request into a quandrant point
   */
  addRequests (requests: HttpRequest[]) {
    for (const request of requests) {
      if (requestSearch(this.endpoints.socialCreate, request)) {
        this.points[QuadrantType.socialCreate].push(new QuadrantPoint(QuadrantType.socialCreate, request.time))
      } else if (requestSearch(this.endpoints.personalCreate, request)) {
        this.points[QuadrantType.personalCreate].push(new QuadrantPoint(QuadrantType.personalCreate, request.time))
      } else if (requestSearch(this.endpoints.personalDestroy, request)) {
        this.points[QuadrantType.personalDestroy].push(new QuadrantPoint(QuadrantType.personalDestroy, request.time))
      } else if (requestSearch(this.endpoints.socialDestroy, request)) {
        this.points[QuadrantType.socialDestroy].push(new QuadrantPoint(QuadrantType.socialDestroy, request.time))
      }
    }
  }

  /**
   * 
   */
  private _reduce (points: QuadrantPoint[]) {
    let content = 0
    let context = 0

    for (const point of points) {
      context += point.context
      content += point.content
    }

    return new QuadrantPoint(points[0].type, 0, context, content).toVector()
  }

  /**
   * 
   */
  getShape () {
    return {
      temperature: NaN, // @TODO
      pressure: NaN, // @TODO
      points: {
        socialCreate: this._reduce(this.points[QuadrantType.socialCreate]),
        personalCreate: this._reduce(this.points[QuadrantType.personalCreate]),
        personalDestroy: this._reduce(this.points[QuadrantType.personalDestroy]),
        socialDestroy: this._reduce(this.points[QuadrantType.socialDestroy])
      }
    }
  }
}
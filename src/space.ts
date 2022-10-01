import { HttpRequest } from "./httpRequest";
import { QuadrantPoint, QuadrantType } from "./quadrantPoint";

interface MethodMap {
  social: HttpRequest[]
  personal: HttpRequest[]
  create: HttpRequest[]
  destroy: HttpRequest[]
}

interface PointCoord {
  x: number
  y: number
  type: QuadrantType
}

interface QuadrantPoints {
  [QuadrantType.socialCreate]: QuadrantPoint[],
  [QuadrantType.personalCreate]: QuadrantPoint[],
  [QuadrantType.personalDestroy]: QuadrantPoint[],
  [QuadrantType.socialDestroy]: QuadrantPoint[],
}

const offsetToNullfiyNegatives = 1000000000000

/**
 * 
 */
function requestSearch (list: HttpRequest[], request: HttpRequest) {
  return list.find(endpoint => request.isMatch(endpoint)) !== undefined
}

/**
 * 
 */
export class Space {
  private endpoints: MethodMap
  private points: QuadrantPoints = {
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
    return {
      socialCreate: this.points[QuadrantType.socialCreate],
      personalCreate: this.points[QuadrantType.personalCreate],
      personalDestroy: this.points[QuadrantType.personalDestroy],
      socialDestroy: this.points[QuadrantType.socialDestroy]
    }
  }

  /**
   * 
   */
  getPointsAsCoords () {
    const result: PointCoord[] = [
      {
        x: 0,
        y: 0,
        type: QuadrantType.socialCreate
      },
      {
        x: 0,
        y: 0,
        type: QuadrantType.personalCreate
      },
      {
        x: 0,
        y: 0,
        type: QuadrantType.personalDestroy
      },
      {
        x: 0,
        y: 0,
        type: QuadrantType.socialDestroy
      }
    ]

    this.points[QuadrantType.socialCreate].forEach(point => {
      result[0].x += point.content
      result[0].y += point.context
    })

    this.points[QuadrantType.personalCreate].forEach(point => {
      result[1].x += point.content
      result[1].y += point.context
    })

    this.points[QuadrantType.personalDestroy].forEach(point => {
      result[2].x += point.content
      result[2].y += point.context
    })

    this.points[QuadrantType.socialDestroy].forEach(point => {
      result[3].x += point.content
      result[3].y += point.context
    })
    
    return result
  }

  /**
   * 
   */
   private _reduce (points: QuadrantPoint[]) {
    let content = offsetToNullfiyNegatives
    let context = offsetToNullfiyNegatives

    for (const point of points) {
      context += point.context
      content += point.content
    }

    const result = new QuadrantPoint(points[0].type, content, context).toVector()

    result.x -= offsetToNullfiyNegatives
    result.y -= offsetToNullfiyNegatives

    return result
  }

  /**
   * 
   */
  getShape () {
    return {
      temperature: NaN, // @TODO
      pressure: NaN, // @TODO
      vectors: [
        this._reduce(this.points[QuadrantType.socialCreate]),
        this._reduce(this.points[QuadrantType.personalCreate]),
        this._reduce(this.points[QuadrantType.personalDestroy]),
        this._reduce(this.points[QuadrantType.socialDestroy])
      ]
    }
  }
}
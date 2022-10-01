import { QuadrantPoint, QuadrantType } from "./quadrantPoint"

const PI_RADIAN = 180 / Math.PI

/**
 * 
 */
function getDegrees (rise: number, run: number) {
  const result = Math.atan(rise / run) * PI_RADIAN
  

  return result
}

/**               (context)
 *                   90
 *    Social Destroy  ^  Social Create
 *                    |
 *            180 <-- o --> 0/360       (content)
 *                    |
 *  Personal Destroy  v  Personal Create
 *                   270
 */
export class Vector {
  type: QuadrantType
  x: number
  y: number
  angle: number

  constructor (point: QuadrantPoint) {
    this.type = point.type
    this.x = point.content
    this.y = point.context
    
    const degree = getDegrees(this.y, this.x)

    switch (point.type) {
      case QuadrantType.socialCreate:
        this.angle = degree
      break
      case QuadrantType.personalCreate:
        this.angle = this.x === 0
          ? 0
          : 360 - degree
      break
      case QuadrantType.personalDestroy:
        this.angle = this.x === 0
          ? 270
          : 180 + degree
      break
      case QuadrantType.socialDestroy:
        this.angle = this.x === 0
          ? 180
          : 180 - degree
      break
    }
  }
}
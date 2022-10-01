import { QuadrantPoint, QuadrantType } from "./quadrantPoint"

const PI_RADIAN = 180 / Math.PI

/**
 * 
 */
function getDegrees (rise: number, run: number) {
  return Math.atan(Math.abs(rise) / Math.abs(run)) * PI_RADIAN
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
  context: number
  content: number
  angle: number

  constructor (point: QuadrantPoint) {
    this.type = point.type
    this.content = point.content
    this.context = point.context
    const degree = getDegrees(this.context, this.content)

    switch (point.type) {
      case QuadrantType.socialCreate:
        this.angle = degree
      break
      case QuadrantType.personalCreate:
        this.angle = this.content === 0
          ? 0
          : 360 - degree
      break
      case QuadrantType.personalDestroy:
        this.angle = this.content === 0
          ? 270
          : 180 + degree
      break
      case QuadrantType.socialDestroy:
        this.angle = this.content === 0
          ? 180
          : 180 - degree
      break
    }
  }
}
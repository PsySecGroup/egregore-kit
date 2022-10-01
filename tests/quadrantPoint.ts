import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { QuadrantPoint, QuadrantType } from '../src/quadrantPoint'

test('Quadrant Points: Construct', async () => {
  const point = new QuadrantPoint(QuadrantType.socialCreate)

  assert.equal(point.content, 0)
  assert.equal(point.context, 0)
  assert.equal(point.type, QuadrantType.socialCreate)
})

test('Quadrant Points: Construct from JSON', async () => {
  const point = new QuadrantPoint({
    type: QuadrantType.socialCreate,
    context: 10,
    content: 20
  })

  assert.equal(point.content, 20)
  assert.equal(point.context, 10)
  assert.equal(point.type, QuadrantType.socialCreate)
})

test('Quadrant Points: Modify', async () => {
  const point = new QuadrantPoint(QuadrantType.socialCreate, 30, 100)

  point.addContent(30)
  point.addContext(100)

  assert.equal(point.content, 60)
  assert.equal(point.context, 200)
  assert.equal(point.type, QuadrantType.socialCreate)
})

import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { HttpRequest, Space } from '../src'

const endpoints = {
  social: [
    new HttpRequest('POST', '/like/*'),
    new HttpRequest('POST', '/favorite/*'),
    new HttpRequest('POST', '/friendRequest/*'),
    new HttpRequest('POST', '/post/*/comment'),
    new HttpRequest('POST', '/search/*'),
    new HttpRequest('POST', '/joinGroup/*'),
    new HttpRequest('POST', '/report'),
    new HttpRequest('POST', '/block/*'),
    new HttpRequest('POST', '/unfriend/*')
  ],
  personal: [
    new HttpRequest('POST', '/video'),
    new HttpRequest('POST', '/post'),
    new HttpRequest('POST', '/settings'),
    new HttpRequest('POST', '/changePassword'),
  ],
  create: [
    new HttpRequest('POST', '/video'),
    new HttpRequest('POST', '/post'),
    new HttpRequest('POST', '/post/*/comment'),
    new HttpRequest('POST', '/like/*'),
    new HttpRequest('POST', '/favorite/*'),
    new HttpRequest('POST', '/friendRequest/*'),
    new HttpRequest('POST', '/post/*/comment'),
    new HttpRequest('POST', '/search/*'),
    new HttpRequest('POST', '/joinGroup/*')
  ],
  destroy: [
    new HttpRequest('DELETE', '/video/*'),
    new HttpRequest('POST', '/changePassword'),
    new HttpRequest('POST', '/settings'),
    new HttpRequest('DELETE', '/post/*'),
    new HttpRequest('DELETE', '/comment/*'),
    new HttpRequest('PUT', '/video/*'),
    new HttpRequest('PUT', '/post/*'),
    new HttpRequest('PUT', '/comment/*'),
    new HttpRequest('POST', '/report'),
    new HttpRequest('POST', '/block/*'),
    new HttpRequest('POST', '/unfriend/*')
  ]
}

test('Space: Get Points', async () => {
  const space = new Space(endpoints)

  space.addRequests([
    new HttpRequest('POST', '/like/1', 1),
    new HttpRequest('POST', '/video', 2),
    new HttpRequest('POST', '/friendRequest/3', 3),
    new HttpRequest('POST', '/block/4', 4)
  ])

  const points = space.getPoints()

  assert.equal(points.socialCreate.length, 3)
  assert.equal(points.personalCreate.length, 1)
  assert.equal(points.personalDestroy.length, 3)
  assert.equal(points.socialDestroy.length, 1)

  assert.equal(points.socialCreate[0].type, 0)
  assert.equal(points.socialCreate[0].content, 0)
  assert.equal(points.socialCreate[0].context, 1)
  assert.equal(points.socialCreate[0].time, 1)

  assert.equal(points.socialCreate[1].type, 0)
  assert.equal(points.socialCreate[1].content, 0)
  assert.equal(points.socialCreate[1].context, 1)
  assert.equal(points.socialCreate[1].time, 3)

  assert.equal(points.socialCreate[2].type, 0)
  assert.equal(points.socialCreate[2].content, 0)
  assert.equal(points.socialCreate[2].context, 1)
  assert.equal(points.socialCreate[2].time, 4)

  assert.equal(points.personalCreate[0].type, 1)
  assert.equal(points.personalCreate[0].content, 0)
  assert.equal(points.personalCreate[0].context, -1)
  assert.equal(points.personalCreate[0].time, 2)

  assert.equal(points.personalDestroy[0].type, 2)
  assert.equal(points.personalDestroy[0].content, 1)
  assert.equal(points.personalDestroy[0].context, 0)
  assert.equal(points.personalDestroy[0].time, 1)

  assert.equal(points.personalDestroy[1].type, 2)
  assert.equal(points.personalDestroy[1].content, 1)
  assert.equal(points.personalDestroy[1].context, 0)
  assert.equal(points.personalDestroy[1].time, 2)

  assert.equal(points.personalDestroy[2].type, 2)
  assert.equal(points.personalDestroy[2].content, 1)
  assert.equal(points.personalDestroy[2].context, 0)
  assert.equal(points.personalDestroy[2].time, 3)

  assert.equal(points.socialDestroy[0].type, 3)
  assert.equal(points.socialDestroy[0].content, -1)
  assert.equal(points.socialDestroy[0].context, 0)
  assert.equal(points.socialDestroy[0].time, 4)
})

test('Space: Get Points As Coords', async () => {
  const space = new Space(endpoints)

  space.addRequests([
    new HttpRequest('POST', '/like/1', 1),
    new HttpRequest('POST', '/video', 2),
    new HttpRequest('POST', '/friendRequest/3', 3),
    new HttpRequest('POST', '/block/4', 4)
  ])

  const coords = space.getPointsAsCoords()

  assert.equal(coords.length, 4)

  assert.equal(coords[0].type, 0)
  assert.equal(coords[0].x, 0)
  assert.equal(coords[0].y, 3)

  assert.equal(coords[1].type, 1)
  assert.equal(coords[1].x, 0)
  assert.equal(coords[1].y, -1)

  assert.equal(coords[2].type, 2)
  assert.equal(coords[2].x, 3)
  assert.equal(coords[2].y, 0)

  assert.equal(coords[3].type, 3)
  assert.equal(coords[3].x, -1)
  assert.equal(coords[3].y, 0)
})


test('Space: Get Shape', async () => {
  const space = new Space(endpoints)

  space.addRequests([
    new HttpRequest('POST', '/like/1', 1),
    new HttpRequest('POST', '/video', 2),
    new HttpRequest('POST', '/friendRequest/3', 3),
    new HttpRequest('POST', '/block/4', 4)
  ])

  const shape = space.getShape()
  
  assert.equal(shape.vectors.length, 4)

  assert.equal(shape.vectors[0].type, 0)
  assert.equal(shape.vectors[0].x, 0)
  assert.equal(shape.vectors[0].y, 3)
  assert.equal(shape.vectors[0].angle, 45.00000000008595)

  assert.equal(shape.vectors[1].type, 1)
  assert.equal(shape.vectors[1].x, 0)
  assert.equal(shape.vectors[1].y, -1)
  assert.equal(shape.vectors[1].angle, 315.00000000002865)

  assert.equal(shape.vectors[2].type, 2)
  assert.equal(shape.vectors[2].x, 3)
  assert.equal(shape.vectors[2].y, 0)
  assert.equal(shape.vectors[2].angle, 224.99999999991405)

  assert.equal(shape.vectors[3].type, 3)
  assert.equal(shape.vectors[3].x, -1)
  assert.equal(shape.vectors[3].y, 0)
  assert.equal(shape.vectors[3].angle, 134.99999999997135)
})

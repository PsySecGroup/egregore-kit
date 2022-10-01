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

  assert.equal(points.length, 8)

  assert.equal(points[0].type, 0)
  assert.equal(points[0].content, 0)
  assert.equal(points[0].context, 1)
  assert.equal(points[0].time, 1)

  assert.equal(points[1].type, 0)
  assert.equal(points[1].content, 0)
  assert.equal(points[1].context, 1)
  assert.equal(points[1].time, 3)

  assert.equal(points[2].type, 0)
  assert.equal(points[2].content, 0)
  assert.equal(points[2].context, 1)
  assert.equal(points[2].time, 4)

  assert.equal(points[3].type, 1)
  assert.equal(points[3].content, 0)
  assert.equal(points[3].context, -1)
  assert.equal(points[3].time, 2)

  assert.equal(points[4].type, 2)
  assert.equal(points[4].content, 1)
  assert.equal(points[4].context, 0)
  assert.equal(points[4].time, 1)

  assert.equal(points[5].type, 2)
  assert.equal(points[5].content, 1)
  assert.equal(points[5].context, 0)
  assert.equal(points[5].time, 2)

  assert.equal(points[6].type, 2)
  assert.equal(points[6].content, 1)
  assert.equal(points[6].context, 0)
  assert.equal(points[6].time, 3)

  assert.equal(points[7].type, 3)
  assert.equal(points[7].content, -1)
  assert.equal(points[7].context, 0)
  assert.equal(points[7].time, 4)
})

test('Space: Get Vectors 1', async () => {
  const space = new Space(endpoints)

  space.addRequests([
    new HttpRequest('POST', '/like/1', 1),
    new HttpRequest('POST', '/video', 2),
    new HttpRequest('POST', '/friendRequest/3', 3),
    new HttpRequest('POST', '/block/4', 4)
  ])

  const shape = space.getVectors(1)

  assert.equal(shape.temperature, 2)
  assert.equal(shape.pressure, 2)

  assert.equal(shape.vectors.length, 4)
  assert.equal(shape.angles.length, 4)

  assert.equal(shape.vectors[0].type, 0)
  assert.equal(shape.vectors[0].content, 0)
  assert.equal(shape.vectors[0].context, 3)
  assert.equal(shape.angles[0], 270)

  assert.equal(shape.vectors[1].type, 1)
  assert.equal(shape.vectors[1].content, 0)
  assert.equal(shape.vectors[1].context, -1)
  assert.equal(shape.angles[1], 18.43494882292201)

  assert.equal(shape.vectors[2].type, 2)
  assert.equal(shape.vectors[2].content, 3)
  assert.equal(shape.vectors[2].context, 0)
  assert.equal(shape.angles[2], 180)

  assert.equal(shape.vectors[3].type, 3)
  assert.equal(shape.vectors[3].content, -1)
  assert.equal(shape.vectors[3].context, 0)
  assert.equal(shape.angles[3], 71.56505117707799)
})

test('Space: Get Vectors 1', async () => {
  const space = new Space(endpoints)

  space.addRequests([
    new HttpRequest('POST', '/like/1', 1),
    new HttpRequest('POST', '/video', 2),
    new HttpRequest('POST', '/friendRequest/3', 3)
  ])

  const shape = space.getVectors(1)

  assert.equal(shape.temperature, 1)
  assert.equal(shape.pressure, 3)

  assert.equal(shape.vectors.length, 3)
  assert.equal(shape.angles.length, 3)

  assert.equal(shape.vectors[0].type, 0)
  assert.equal(shape.vectors[0].content, 0)
  assert.equal(shape.vectors[0].context, 2)
  assert.equal(shape.angles[0], 270)

  assert.equal(shape.vectors[1].type, 1)
  assert.equal(shape.vectors[1].content, 0)
  assert.equal(shape.vectors[1].context, -1)
  assert.equal(shape.angles[1], 18.43494882292201)

  assert.equal(shape.vectors[2].type, 2)
  assert.equal(shape.vectors[2].content, 3)
  assert.equal(shape.vectors[2].context, 0)
  assert.equal(shape.angles[2], 146.30993247402023)
})

test('Space: Get Points from JSON endpoints', async () => {
  const space = new Space({
    social: [
      'POST /like/*',
      'POST /favorite/*',
      'POST /friendRequest/*',
      'POST /post/*/comment',
      'POST /search/*',
      'POST /joinGroup/*',
      'POST /report',
      'POST /block/*',
      'POST /unfriend/*'
    ],
    personal: [
      'POST /video',
      'POST /post',
      'POST /settings',
      'POST /changePassword',
    ],
    create: [
      'POST /video',
      'POST /post',
      'POST /post/*/comment',
      'POST /like/*',
      'POST /favorite/*',
      'POST /friendRequest/*',
      'POST /post/*/comment',
      'POST /search/*',
      'POST /joinGroup/*'
    ],
    destroy: [
      'DELETE /video/*',
      'POST /changePassword',
      'POST /settings',
      'DELETE /post/*',
      'DELETE /comment/*',
      'PUT /video/*',
      'PUT /post/*',
      'PUT /comment/*',
      'POST /report',
      'POST /block/*',
      'POST /unfriend/*'
    ]
  })

  space.addRequests([
    new HttpRequest('POST', '/like/1', 1),
    new HttpRequest('POST', '/video', 2),
    new HttpRequest('POST', '/friendRequest/3', 3),
    new HttpRequest('POST', '/block/4', 4)
  ])

  const points = space.getPoints()

  assert.equal(points.length, 8)

  assert.equal(points[0].type, 0)
  assert.equal(points[0].content, 0)
  assert.equal(points[0].context, 1)
  assert.equal(points[0].time, 1)

  assert.equal(points[1].type, 0)
  assert.equal(points[1].content, 0)
  assert.equal(points[1].context, 1)
  assert.equal(points[1].time, 3)

  assert.equal(points[2].type, 0)
  assert.equal(points[2].content, 0)
  assert.equal(points[2].context, 1)
  assert.equal(points[2].time, 4)

  assert.equal(points[3].type, 1)
  assert.equal(points[3].content, 0)
  assert.equal(points[3].context, -1)
  assert.equal(points[3].time, 2)

  assert.equal(points[4].type, 2)
  assert.equal(points[4].content, 1)
  assert.equal(points[4].context, 0)
  assert.equal(points[4].time, 1)

  assert.equal(points[5].type, 2)
  assert.equal(points[5].content, 1)
  assert.equal(points[5].context, 0)
  assert.equal(points[5].time, 2)

  assert.equal(points[6].type, 2)
  assert.equal(points[6].content, 1)
  assert.equal(points[6].context, 0)
  assert.equal(points[6].time, 3)

  assert.equal(points[7].type, 3)
  assert.equal(points[7].content, -1)
  assert.equal(points[7].context, 0)
  assert.equal(points[7].time, 4)
})
import { rm } from 'fs/promises'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { Report } from '../src/report'

const endpoints = {
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
}

test('Report: full', async () => {
  const report = new Report('_test', endpoints, 'GET /like/4,PUT /post/2,POST /search/34')
  const space1 = await report.populate()

  assert.equal(space1.toJson().endpoints, endpoints)
  assert.equal(space1.points['0'].length, 1)
  assert.equal(space1.points['1'].length, 0)
  assert.equal(space1.points['2'].length, 1)
  assert.equal(space1.points['3'].length, 1)

  assert.equal(space1.points['0'][0].type, 0)
  assert.equal(space1.points['0'][0].content, 0)
  assert.equal(space1.points['0'][0].context, 1)
  assert.equal(space1.points['0'][0].time, 0)

  assert.equal(space1.points['2'][0].type, 2)
  assert.equal(space1.points['2'][0].content, 1)
  assert.equal(space1.points['2'][0].context, 0)
  assert.equal(space1.points['2'][0].time, 0)

  assert.equal(space1.points['3'][0].type, 3)
  assert.equal(space1.points['3'][0].content, -1)
  assert.equal(space1.points['3'][0].context, 0)
  assert.equal(space1.points['3'][0].time, 0)

  const space2 = await report.populate()

  assert.equal(space2.points['0'].length, 2)
  assert.equal(space2.points['1'].length, 0)
  assert.equal(space2.points['2'].length, 2)
  assert.equal(space2.points['3'].length, 2)

  assert.equal(space2.points['0'][0].type, 0)
  assert.equal(space2.points['0'][0].content, 0)
  assert.equal(space2.points['0'][0].context, 1)
  assert.equal(space2.points['0'][0].time, 0)

  assert.equal(space2.points['0'][1].type, 0)
  assert.equal(space2.points['0'][1].content, 0)
  assert.equal(space2.points['0'][1].context, 1)
  assert.equal(space2.points['0'][1].time, 0)

  assert.equal(space2.points['2'][0].type, 2)
  assert.equal(space2.points['2'][0].content, 1)
  assert.equal(space2.points['2'][0].context, 0)
  assert.equal(space2.points['2'][0].time, 0)

  assert.equal(space2.points['2'][1].type, 2)
  assert.equal(space2.points['2'][1].content, 1)
  assert.equal(space2.points['2'][1].context, 0)
  assert.equal(space2.points['2'][1].time, 0)

  assert.equal(space2.points['3'][0].type, 3)
  assert.equal(space2.points['3'][0].content, -1)
  assert.equal(space2.points['3'][0].context, 0)
  assert.equal(space2.points['3'][0].time, 0)

  assert.equal(space2.points['3'][1].type, 3)
  assert.equal(space2.points['3'][1].content, -1)
  assert.equal(space2.points['3'][1].context, 0)
  assert.equal(space2.points['3'][1].time, 0)

  assert.equal(space1.toJson().endpoints, endpoints)
  console.log(report.path)
  await rm(report.path)
})
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { QuadrantPoint, QuadrantType } from '../src/quadrantPoint'

test('Vector: To 1/1 Vector', async () => {
  const socialCreate = new QuadrantPoint(QuadrantType.socialCreate, 1, 1)
  const personalCreate = new QuadrantPoint(QuadrantType.personalCreate, 1, 1)
  const personalDestroy = new QuadrantPoint(QuadrantType.personalDestroy, 1, 1)
  const socialDestroy = new QuadrantPoint(QuadrantType.socialDestroy, 1, 1)

  const socialCreateVector = socialCreate.toVector()
  const personalCreateVector = personalCreate.toVector()
  const personalDestroyVector = personalDestroy.toVector()
  const socialDestroyVector = socialDestroy.toVector()

  assert.equal(socialCreateVector.x, 1)
  assert.equal(socialCreateVector.y, 1)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)
  assert.equal(socialCreateVector.angle, 45)

  assert.equal(personalCreateVector.x, 1)
  assert.equal(personalCreateVector.y, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)
  assert.equal(personalCreateVector.angle, 315)

  assert.equal(personalDestroyVector.x, 1)
  assert.equal(personalDestroyVector.y, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)
  assert.equal(personalDestroyVector.angle, 225)

  assert.equal(socialDestroyVector.x, 1)
  assert.equal(socialDestroyVector.y, 1)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
  assert.equal(socialDestroyVector.angle, 135)
})

test('Vector: To 1/0 Vector', async () => {
  const socialCreate = new QuadrantPoint(QuadrantType.socialCreate, 1, 0)
  const personalCreate = new QuadrantPoint(QuadrantType.personalCreate, 1, 0)
  const personalDestroy = new QuadrantPoint(QuadrantType.personalDestroy, 1, 0)
  const socialDestroy = new QuadrantPoint(QuadrantType.socialDestroy, 1, 0)

  const socialCreateVector = socialCreate.toVector()
  const personalCreateVector = personalCreate.toVector()
  const personalDestroyVector = personalDestroy.toVector()
  const socialDestroyVector = socialDestroy.toVector()

  assert.equal(socialCreateVector.x, 1)
  assert.equal(socialCreateVector.y, 0)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)
  assert.equal(socialCreateVector.angle, 0)

  assert.equal(personalCreateVector.x, 1)
  assert.equal(personalCreateVector.y, 0)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)
  assert.equal(personalCreateVector.angle, 360)

  assert.equal(personalDestroyVector.x, 1)
  assert.equal(personalDestroyVector.y, 0)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)
  assert.equal(personalDestroyVector.angle, 180)

  assert.equal(socialDestroyVector.x, 1)
  assert.equal(socialDestroyVector.y, 0)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
  assert.equal(socialDestroyVector.angle, 180)
})

test('Vector: To 0/1 Vector', async () => {
  const socialCreate = new QuadrantPoint(QuadrantType.socialCreate, 0, 1)
  const personalCreate = new QuadrantPoint(QuadrantType.personalCreate, 0, 1)
  const personalDestroy = new QuadrantPoint(QuadrantType.personalDestroy, 0, 1)
  const socialDestroy = new QuadrantPoint(QuadrantType.socialDestroy, 0, 1)

  const socialCreateVector = socialCreate.toVector()
  const personalCreateVector = personalCreate.toVector()
  const personalDestroyVector = personalDestroy.toVector()
  const socialDestroyVector = socialDestroy.toVector()

  assert.equal(socialCreateVector.x, 0)
  assert.equal(socialCreateVector.y, 1)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)
  assert.equal(socialCreateVector.angle, 90)

  assert.equal(personalCreateVector.x, 0)
  assert.equal(personalCreateVector.y, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)
  assert.equal(personalCreateVector.angle, 0)

  assert.equal(personalDestroyVector.x, 0)
  assert.equal(personalDestroyVector.y, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)
  assert.equal(personalDestroyVector.angle, 270)

  assert.equal(socialDestroyVector.x, 0)
  assert.equal(socialDestroyVector.y, 1)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
  assert.equal(socialDestroyVector.angle, 180)
})

test('Vector: To 100/1 Vector', async () => {
  const socialCreate = new QuadrantPoint(QuadrantType.socialCreate, 100, 1)
  const personalCreate = new QuadrantPoint(QuadrantType.personalCreate, 100, 1)
  const personalDestroy = new QuadrantPoint(QuadrantType.personalDestroy, 100, 1)
  const socialDestroy = new QuadrantPoint(QuadrantType.socialDestroy, 100, 1)

  const socialCreateVector = socialCreate.toVector()
  const personalCreateVector = personalCreate.toVector()
  const personalDestroyVector = personalDestroy.toVector()
  const socialDestroyVector = socialDestroy.toVector()

  assert.equal(socialCreateVector.x, 100)
  assert.equal(socialCreateVector.y, 1)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)
  assert.equal(socialCreateVector.angle, 0.5729386976834859)

  assert.equal(personalCreateVector.x, 100)
  assert.equal(personalCreateVector.y, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)
  assert.equal(personalCreateVector.angle, 359.42706130231653)

  assert.equal(personalDestroyVector.x, 100)
  assert.equal(personalDestroyVector.y, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)
  assert.equal(personalDestroyVector.angle, 180.5729386976835)

  assert.equal(socialDestroyVector.x, 100)
  assert.equal(socialDestroyVector.y, 1)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
  assert.equal(socialDestroyVector.angle, 179.4270613023165)
})

test('Vector: To 1/100 Vector', async () => {
  const socialCreate = new QuadrantPoint(QuadrantType.socialCreate, 1, 100)
  const personalCreate = new QuadrantPoint(QuadrantType.personalCreate, 1, 100)
  const personalDestroy = new QuadrantPoint(QuadrantType.personalDestroy, 1, 100)
  const socialDestroy = new QuadrantPoint(QuadrantType.socialDestroy, 1, 100)

  const socialCreateVector = socialCreate.toVector()
  const personalCreateVector = personalCreate.toVector()
  const personalDestroyVector = personalDestroy.toVector()
  const socialDestroyVector = socialDestroy.toVector()

  assert.equal(socialCreateVector.x, 1)
  assert.equal(socialCreateVector.y, 100)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)
  assert.equal(socialCreateVector.angle, 89.42706130231652)

  assert.equal(personalCreateVector.x, 1)
  assert.equal(personalCreateVector.y, 100)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)
  assert.equal(personalCreateVector.angle, 270.57293869768347)

  assert.equal(personalDestroyVector.x, 1)
  assert.equal(personalDestroyVector.y, 100)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)
  assert.equal(personalDestroyVector.angle, 269.42706130231653)

  assert.equal(socialDestroyVector.x, 1)
  assert.equal(socialDestroyVector.y, 100)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
  assert.equal(socialDestroyVector.angle, 90.57293869768348)
})

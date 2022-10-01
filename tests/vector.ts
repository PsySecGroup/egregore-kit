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

  assert.equal(personalCreateVector.x, 1)
  assert.equal(personalCreateVector.y, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.x, 1)
  assert.equal(personalDestroyVector.y, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.x, 1)
  assert.equal(socialDestroyVector.y, 1)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
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

  assert.equal(personalCreateVector.x, 1)
  assert.equal(personalCreateVector.y, 0)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.x, 1)
  assert.equal(personalDestroyVector.y, 0)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.x, 1)
  assert.equal(socialDestroyVector.y, 0)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
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

  assert.equal(personalCreateVector.x, 0)
  assert.equal(personalCreateVector.y, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.x, 0)
  assert.equal(personalDestroyVector.y, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.x, 0)
  assert.equal(socialDestroyVector.y, 1)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
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

  assert.equal(personalCreateVector.x, 100)
  assert.equal(personalCreateVector.y, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.x, 100)
  assert.equal(personalDestroyVector.y, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.x, 100)
  assert.equal(socialDestroyVector.y, 1)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
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

  assert.equal(personalCreateVector.x, 1)
  assert.equal(personalCreateVector.y, 100)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.x, 1)
  assert.equal(personalDestroyVector.y, 100)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.x, 1)
  assert.equal(socialDestroyVector.y, 100)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
})

test('Vector: To 1/1 Vector', async () => {
  const point = new QuadrantPoint(QuadrantType.personalCreate, 0, -1)
  const vector = point.toVector()

  console.log(vector)
})

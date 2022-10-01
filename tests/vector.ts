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

  assert.equal(socialCreateVector.content, 1)
  assert.equal(socialCreateVector.context, 1)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)

  assert.equal(personalCreateVector.content, 1)
  assert.equal(personalCreateVector.context, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.content, 1)
  assert.equal(personalDestroyVector.context, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.content, 1)
  assert.equal(socialDestroyVector.context, 1)
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

  assert.equal(socialCreateVector.content, 1)
  assert.equal(socialCreateVector.context, 0)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)

  assert.equal(personalCreateVector.content, 1)
  assert.equal(personalCreateVector.context, 0)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.content, 1)
  assert.equal(personalDestroyVector.context, 0)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.content, 1)
  assert.equal(socialDestroyVector.context, 0)
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

  assert.equal(socialCreateVector.content, 0)
  assert.equal(socialCreateVector.context, 1)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)

  assert.equal(personalCreateVector.content, 0)
  assert.equal(personalCreateVector.context, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.content, 0)
  assert.equal(personalDestroyVector.context, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.content, 0)
  assert.equal(socialDestroyVector.context, 1)
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

  assert.equal(socialCreateVector.content, 100)
  assert.equal(socialCreateVector.context, 1)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)

  assert.equal(personalCreateVector.content, 100)
  assert.equal(personalCreateVector.context, 1)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.content, 100)
  assert.equal(personalDestroyVector.context, 1)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.content, 100)
  assert.equal(socialDestroyVector.context, 1)
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

  assert.equal(socialCreateVector.content, 1)
  assert.equal(socialCreateVector.context, 100)
  assert.equal(socialCreateVector.type, QuadrantType.socialCreate)

  assert.equal(personalCreateVector.content, 1)
  assert.equal(personalCreateVector.context, 100)
  assert.equal(personalCreateVector.type, QuadrantType.personalCreate)

  assert.equal(personalDestroyVector.content, 1)
  assert.equal(personalDestroyVector.context, 100)
  assert.equal(personalDestroyVector.type, QuadrantType.personalDestroy)

  assert.equal(socialDestroyVector.content, 1)
  assert.equal(socialDestroyVector.context, 100)
  assert.equal(socialDestroyVector.type, QuadrantType.socialDestroy)
})

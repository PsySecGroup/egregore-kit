import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { HttpRequest } from '../src'

test('HTTP Request: Construct', async () => {
  const request = new HttpRequest('GET', '/test', 100)

  assert.equal(request.method, 'GET')
  assert.equal(request.endpoint, '/test')
  assert.equal(request.time, 100)
})

test('HTTP Request: String match pass', async () => {
  const request = new HttpRequest('GET', '/test')
  const query = new HttpRequest('GET', '/test')

  assert.equal(request.isMatch(query), true);
})

test('HTTP Request: String match fail', async () => {
  const request = new HttpRequest('GET', '/test')
  const query = new HttpRequest('GET', '/beep')

  assert.equal(request.isMatch(query), false);
})

test('HTTP Request: Right wildcard pass', async () => {
  const request = new HttpRequest('GET', '/post/88594')
  const query = new HttpRequest('GET', '/post/*')

  assert.equal(request.isMatch(query), true);
})


test('HTTP Request: Right wildcard fail', async () => {
  const request = new HttpRequest('GET', '/video/88594')
  const query = new HttpRequest('GET', '/post/*')

  assert.equal(request.isMatch(query), false);
})

test('HTTP Request: Inner wildcard pass', async () => {
  const request = new HttpRequest('GET', '/post/88594/log')
  const query = new HttpRequest('GET', '/post/*/log')

  assert.equal(request.isMatch(query), true);
})


test('HTTP Request: Inner wildcard fail', async () => {
  const request = new HttpRequest('GET', '/video/88594/log')
  const query = new HttpRequest('GET', '/post/*/log')

  assert.equal(request.isMatch(query), false);
})

test('HTTP Request: Load from JSON', async () => {
  const request = new HttpRequest({
    method: 'GET',
    endpoint: '/test', 
    time: 100
  })

  assert.equal(request.method, 'GET')
  assert.equal(request.endpoint, '/test')
  assert.equal(request.time, 100)
})

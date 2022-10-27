import type { HttpRequestMethod } from '../src/httpRequest'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { HttpRequest } from '../src'
import { prepareHttp } from '../src/http'
import { Source } from '../src/source'

const port = 30001
const host = 'localhost'
const makeHttpRequest = data => new HttpRequest(data[0] as HttpRequestMethod, data[1])
const jsonResponse = JSON.stringify([
  "POST /like/13",
  "POST /video",
  "POST /search/bob",
  "DELETE /post/2",
  "POST /report"
])

test('Source: full', async () => {
  const { server, startServer } = await prepareHttp(port, host, true)

  server.get('/test.json', (request, reply) => {
    reply.send(jsonResponse)
  })

  await startServer()

  const source = new Source<HttpRequest>(`http://${host}:${port}/test.json`, makeHttpRequest)
  const requests = await source.get()
  console.log(requests)
  server.close()
})
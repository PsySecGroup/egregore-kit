import type { HttpRequestMethod } from '../src/httpRequest'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { HttpRequest } from '../src'
import { prepareHttp } from '../src/http'
import { Source } from '../src/source'

const port = 30001
const host = 'localhost'

test('Source: full', async () => {
  const { server, startServer } = await prepareHttp(port, host, true)

  server.get('/test.json', (request, reply) => {
    reply.send(JSON.stringify([
      "POST /like/13",
      "POST /video",
      "POST /search/bob",
      "DELETE /post/2",
      "POST /report"
    ]))
  })

  await startServer()

  const source = new Source<HttpRequest>(`http://${host}:${port}/test.json`, data => new HttpRequest(data[0] as HttpRequestMethod, data[1]))
  const requests = await source.get()
  console.log(requests)
  server.close()
})
import Fastify from 'fastify'
import { PORT, HOSTNAME } from './config'

const host = HOSTNAME
const server = Fastify()

/**
 * 
 */
export function startHttp (port: number = PORT) {
  const start = async () => {
    try {
      await server.listen({
        port,
        host
      })
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }
  start()
  console.info(`HTTP listening on port http://${host}:${port}...`)
  return server
}

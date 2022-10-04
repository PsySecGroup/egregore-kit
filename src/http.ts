import Fastify from 'fastify'
import { PORT, HOSTNAME } from './config'

const server = Fastify()

/**
 * 
 */
export function prepareHttp (port: number = PORT, host: string = HOSTNAME, silent: boolean = false) {
  const startServer = async () => {
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

  if (silent === false) {
    console.info(`HTTP listening on port http://${host}:${port}...`)
  }

  return { server, startServer }
}

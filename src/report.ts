import type { MethodMap, MethodStringMap } from './space'
import type { HttpRequestMethod } from './httpRequest'
import fetch from 'node-fetch'

import { HttpRequest } from './httpRequest'
import { REPORT_DIR } from './config'
import { readFile, utimes, writeFile } from 'fs/promises'
import { openSync, closeSync } from 'fs'

import { Space } from './space'

/**
 * 
 */
async function touch (filename: string) {
  try {
      const now = new Date()
      await utimes(filename, now, now);
  } catch (e) {
      const fd = openSync(filename, 'a');
      await closeSync(fd);
  }
}

/**
 * 
 */
function getHttpRequest (line: string) {
  const parts = line.split(' ')
  return new HttpRequest(parts[0] as HttpRequestMethod, parts[1])
}

/**
 * 
 */
function parseLines (line: string, splitChar: string) {
  const result: HttpRequest[] = []

  line.toString()
    .split(splitChar)
    .forEach(line => {
      const output = line.trim()

      if (output === '') {
        return
      } else {
        result.push(getHttpRequest(line))
      }
    })
  
  return result
}

/**
 * 
 */
export class Report {
  name: string
  readonly path: string
  endpoints: MethodMap | MethodStringMap
  private _populate: () => Promise<HttpRequest[]>

  constructor (name: string, endpoints: MethodMap | MethodStringMap, source: string) {
    this.name = name
    this.endpoints = endpoints
    this.path = `${REPORT_DIR}/${this.name}.json`

    if (source === undefined) {
      // Coming from pipe
      this._populate = async () => {
        return new Promise(resolve => {
          const result: HttpRequest[] = []
          const stdin = process.openStdin()

          stdin.on('data', (chunk) => {      
            const lines = parseLines(chunk, '\n')
            lines.forEach(line => result.push(line))
          })

          stdin.on('end', () => resolve(result))
        })
      }
    } else  if (source.substring(0, 4) === 'http') {
      // Coming from http
      this._populate = async () => {
        const result: HttpRequest[] = []
        const response = await fetch(source)

        try {
          for await (const chunk of response.body) {
            const lines = JSON.parse(chunk.toString()) as string[];
            lines.forEach(line => result.push(parseLines(line, '')[0]))
          } 

          return result
        } catch (err) {
          console.error(err.stack);
        }
      }
    } else {
      // coming from cli
      this._populate = async () => {
        return parseLines(source, ',')
      }
    }
  }

  /**
   * 
   */
  async populate () {
    await touch(this.path)
    const data = (await readFile(this.path)).toString()
    const space: Space = data === ''
      ? new Space(this.endpoints)
      : Space.fromJson(data)

    space.addRequests(await this._populate())

    await writeFile(this.path, JSON.stringify(space))

    return space
  }
}
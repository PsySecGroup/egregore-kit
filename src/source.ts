import fetch from 'node-fetch'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

/**
 * 
 */
export class Source<T> {
  readonly source: string
  readonly parseLine: (line: string[]) => T

  constructor (source: string, parseLine: (line: string[]) => T) {
    this.source = source
    this.parseLine = parseLine
  }

  /**
   * 
   */
  async get () {
    if (this.source.substring(0, 4) === 'http') {
      // Coming from http as a JSON of an array of "METHOD ENDPOINT" strings
      const result: T[] = []
      const response = await fetch(this.source, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      try {
        for await (const chunk of response.body) {
          const lines = JSON.parse(chunk.toString()) as string[];
          lines.forEach(line => result.push(this.parseLine(line.split(' '))[0]))
        } 

        return result
      } catch (err) {
        console.error(err.stack);
      }
    } else {
      // coming from file as new-line list of "METHOD ENDPOINT" strings
      const path = resolve(process.cwd(), `${this.source}.json`)
      const data = (await readFile(path)).toString()
      const lines: string[] = data.split('\n')
      const result: T[] = []

      for (const line of lines) {
         result.push(this.parseLine(line.split(' '))[0])
      }

      return result
    }
  }
}

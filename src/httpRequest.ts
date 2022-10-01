type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * 
 */
export class HttpRequest {
  method: HttpRequestMethod
  endpoint: string
  time: number

  constructor (method: HttpRequestMethod, endpoint: string, time: number = 0) {
    this.method = method
    this.endpoint = endpoint
    this.time = time
  }
}

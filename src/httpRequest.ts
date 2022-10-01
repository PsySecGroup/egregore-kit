import EasyMatch from 'easy-match'

type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface HttpRequestJson {
  method: HttpRequestMethod
  endpoint: string
  time?: number
}

/**
 * 
 */
export class HttpRequest {
  method: HttpRequestMethod
  endpoint: string
  time: number

  constructor (method: HttpRequestMethod | HttpRequestJson, endpoint?: string, time: number = 0) {
    if (typeof method === 'string') {
      this.method = method
      this.endpoint = endpoint
      this.time = time
    } else {
      this.method = method.method
      this.endpoint = method.endpoint
      this.time = method.time || 0
    }
  }

  /**
   * 
   */
  isMatch (query: HttpRequest) {
    return EasyMatch([this.method], [query.method]).ismatch && EasyMatch([this.endpoint], [query.endpoint]).ismatch
  }
}

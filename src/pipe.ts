export async function getPipeAsArray (onChunk: (chunk: string[]) => Promise<void>) {
  return new Promise(resolve => {
    
    const stdin = process.openStdin()

    stdin.on('data', async function(chunk) {
      const result: string[] = []

      chunk
        .toString()
        .split('\n')
        .forEach(line => {
          const output = line.trim()

          if (output === '') {
            return
          } else {
            result.push(line)
          }
        })
      
      await onChunk(result)
    })
    
    stdin.on('end', function () {
      resolve(true)
    })
  })
}

import { createHash } from 'node:crypto'

function generateDirectId(id1: string, id2: string) {
  const value = [id1, id2].sort()
  const hash = createHash('md5')
  hash.update(value.join(''))
  return hash.digest('hex')
}

export default generateDirectId

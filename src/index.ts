import { Hono } from 'hono'
// @ts-ignore
import path from 'node:path'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono (which is flame in japanese)!')
})

app.get('/path', (c) => {
  return c.text(path.join('/foo', 'bar', 'baz/asdf'));
})

export default app
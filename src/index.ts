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

app.get("/query", async (c) => {
  try {
    let { results } = await c.env.DB.prepare(
      "SELECT * FROM Customers",
    )
      .bind()
      .all();
    return c.json(results);
  } catch (e) {
    return c.json({ err: (e as Error).message }, 500);
  }
});

export default app
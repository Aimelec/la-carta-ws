import { Hono } from 'hono'
import { restaurantsController } from './controllers/restaurants_controller'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(logger())
app.use(cors())
app.route('/restaurants', restaurantsController);

export default app
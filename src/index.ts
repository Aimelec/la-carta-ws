import { Hono } from 'hono'
import { restaurantsController } from './controllers/restaurants_controller'
import { logger } from 'hono/logger'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(logger())
app.route('/restaurants', restaurantsController);

export default app
import { Hono } from 'hono'
import { restaurantsController } from './controllers/restaurantsController'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { OrderController } from './controllers/ordersController'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use(logger())
app.use(cors())
app.route('/restaurants', restaurantsController);
app.route('/orders', OrderController)

export default app
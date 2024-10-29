import { Hono } from 'hono'
import { restaurantsController } from './controllers/restaurants_controller'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route('/restaurants', restaurantsController);

export default app
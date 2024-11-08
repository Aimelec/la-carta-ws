import { Hono } from 'hono'
import { restaurantsController } from './controllers/restaurantsController'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { OrderController } from './controllers/ordersController'
import BackendError from './utils/BackendError'
import { StatusCode } from 'hono/utils/http-status'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use( logger() )
app.use( cors() )

app.onError((error, c) => {
  if ( error instanceof BackendError ) {
    return c.json( { message: error.message }, error.code as StatusCode )
  }

  return c.json( { message: 'Internal server error' }, 500 )
} );

app.route( '/restaurants', restaurantsController );
app.route( '', OrderController )

export default app
import { Hono } from 'hono'
import { validator } from 'hono/validator';
import { orderValidator } from '../validators/orderValidator';
import { createOrder } from '../interactors/createOrder';
import { fetchOrders } from '../interactors/fetchOrdersOfRestaurant';
import { fetchAnOrder } from '../interactors/fetchAnOrder';

const controller = new Hono<{ Bindings: CloudflareBindings }>();

controller.post( '/tables/:tableId/order',
  validator( 'param', ( value ) => orderValidator.validateParam( value ) ),
  validator( 'json', ( value, c ) => orderValidator.validateBody( value, c ) ),
  async ( c ) => {
    const body = c.req.valid( 'json' );
    const params = c.req.valid( 'param' );
    const createOrderParams = { ...params, ...body };

    const order = await createOrder.with( createOrderParams, c )
    
    return c.json( order, 201 )
  }
);

controller.get( '/restaurants/:restaurantId/orders',
  validator( 'param',  ( value ) => orderValidator.validateRestaurantParam( value ) ),
  async ( c ) => {
    const { restaurantId } = c.req.valid( 'param' )
    const orders = await fetchOrders.of( restaurantId, c )
    return c.json( orders )
  }
)

controller.get('/:idOrder',
  validator('param', (value, c) => orderValidator.validateOrderParam(value, c)),
  async ( c )=> {
    const {orderId} = c.req.valid('param')
    const order = await fetchAnOrder.for(orderId as number, c)
    return c.json(order)
  }
)

export { controller as OrderController } ;
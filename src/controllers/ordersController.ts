import { Hono } from 'hono'
import { validator } from 'hono/validator';
import { orderValidator } from '../validators/orderValidator';
import { createOrder } from '../interactors/createOrder';


const controller = new Hono<{ Bindings: CloudflareBindings }>();

controller.post('/restaurants/:idRestaurant/tables/:idTable',
  validator('param', (value, c) => orderValidator.validateParam(value, c) ),
  validator('json', (value, c) => orderValidator.validateBody(value, c) ),
  async ( c) => {
    const body = c.req.valid('json');
    const params = c.req.valid('param')
    const createOrderParams = {
      ...params,
      ...body,
      stateId: 1,
    }
    const order = await createOrder.for(createOrderParams, c)
    
    return c.json (order, 201)
  }

);


export { controller as OrderController } ;
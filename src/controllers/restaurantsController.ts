import { Hono } from 'hono'
import { validator } from 'hono/validator';
import { restaurantValidator } from '../validators/restaurantValidator';
import { createRestaurant } from '../interactors/createRestaurant';
import { orderValidator } from '../validators/orderValidator';
import { createOrder } from '../interactors/createOrder';
import { fetchRestaurants } from '../interactors/fetchRestaurants';


const controller = new Hono<{ Bindings: CloudflareBindings }>();

controller.get('/', 
  async ( c ) => {
    const restaurants = await fetchRestaurants.for(c);
    return c.json( restaurants );
  } 
  );
  
  
controller.post('/',
  validator('json', (value, c) => restaurantValidator.validate(value, c) ),
  async ( c ) => {
    try{
      const params = c.req.valid('json');
      const restaurant = await createRestaurant.for(params, c);
      
      return c.json( restaurant, 201 );
    }
    catch (e) {
      console.log(e)
    }
  }
);


controller.post('/:idRestaurant/tables/:idTable/orders',
  validator('param', (value, c) => orderValidator.validateParam(value, c) ),
  validator('json', (value, c) => orderValidator.validateBody(value, c) ),
  async ( c, next ) => {
    const body = c.req.valid('json');
    const params = c.req.valid('param')
    const createOrderParams = {
      ...params,
      ...body,
      state_id: 1,
    }
    const order = await createOrder.for(createOrderParams, c)
  }

);


export { controller as restaurantsController } ;
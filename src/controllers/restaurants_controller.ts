import { Hono } from 'hono'
import { validator } from 'hono/validator';
import { restaurantValidator } from '../validators/restaurantValidator';
import { createRestaurant } from '../interactors/create_restaurant';


const controller = new Hono<{ Bindings: CloudflareBindings }>();

controller.get('/', 
  ( c ) => c.json( { message: 'Here you have the restaurants!' } )
);

controller.post('/',
    validator('json', (value, c) => restaurantValidator.validate(value, c) ),
    async ( c ) => {
      const params = c.req.valid('json');
      const restaurant = await createRestaurant.for(params, c);

      return c.json( restaurant, 201 );
    }
);


export { controller as restaurantsController } ;
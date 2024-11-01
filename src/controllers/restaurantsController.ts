import { Hono } from 'hono'
import { validator } from 'hono/validator';
import { restaurantValidator } from '../validators/restaurantValidator';
import { createRestaurant } from '../interactors/createRestaurant';
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
      const params = c.req.valid('json');
      const restaurant = await createRestaurant.for(params, c);

      return c.json( restaurant, 201 );
    }
);


export { controller as restaurantsController } ;
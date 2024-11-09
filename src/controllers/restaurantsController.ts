import { Hono } from 'hono'
import { validator } from 'hono/validator';
import { restaurantValidator } from '../validators/restaurantValidator';
import { createRestaurant } from '../interactors/createRestaurant';
import { fetchRestaurants } from '../interactors/fetchRestaurants';
import { fetchRestaurant } from '../interactors/fetchRestaurant';

const controller = new Hono<{ Bindings: CloudflareBindings }>();

controller.get( '/', 
  async ( c ) => {
    const restaurants = await fetchRestaurants.for( c );

    return c.json( restaurants );
  }
);

controller.get( '/:restaurantId',
    validator( 'param', ( value ) => restaurantValidator.validateParam( value ) ),
    async ( c ) => {
        const { restaurantId } = c.req.valid( 'param' );
        const restaurant = await fetchRestaurant.of( restaurantId, c );
    
        return c.json( restaurant );
    }
)

controller.post( '/',
  validator( 'json', ( value, c ) => restaurantValidator.validate( value, c ) ),
  async ( c ) => {
    const params = c.req.valid( 'json' );
    const restaurant = await createRestaurant.for( params, c );
    
    return c.json( restaurant, 201 );
  }
);


export { controller as RestaurantsController } ;
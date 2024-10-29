import { Hono } from 'hono'

const controller = new Hono<{ Bindings: CloudflareBindings }>();

controller.get('/', 
  ( c ) => c.json( { message: 'Here you have the restaurants!' } )
);


export { controller as restaurantsController } ;
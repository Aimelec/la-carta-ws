import { Hono } from "hono";
import { validator } from "hono/validator";
import { tableValidator } from "../validators/tableValidator";
import { fetchOrderStates } from "../interactors/fetchOrderStatesForTable";

const controller = new Hono<{ Bindings: CloudflareBindings }>();

controller.get( '/:tableId/orderStates',
  validator('param', ( value ) => tableValidator.validateParam( value ) ),
  async ( c ) => {
    const { tableId } = c.req.valid( 'param' );
    const orderStates = await fetchOrderStates.for( tableId, c );
    
    return c.json( orderStates, 200 );
  }
);

export { controller as TablesController } ;
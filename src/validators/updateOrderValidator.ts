import { Context } from "hono";
import { updateOrderParams } from "../types/updateOrder";
import { Validator } from "./validator";

class UpdateOrderValidator extends Validator {
  protected requiredFields = [
    { key: 'stateId', type: 'number' }
  ];

  validateBody( params: updateOrderParams, c: Context ) {
    const absentField = this.checkAbsenceInside( params );

    if ( absentField ) {
      return c.json( this.absentFieldMessage( absentField ), 400 );
    }

    return {
      stateId: params.stateId
    };
  }
}

const updateOrderValidator = new UpdateOrderValidator();
export { updateOrderValidator };
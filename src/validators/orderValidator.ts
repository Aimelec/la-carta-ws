import { context } from '../types/context';
import { createOrderParams } from '../types/createOrder';
import { Validator } from './validator';

class OrderValidator extends Validator {
  protected requiredFields = [
    { key: 'information', type: 'string' }
  ];

  validateParam( params: any ) {
    return {
      tableId: Number( params.tableId ),
    };
  }

  validateBody( params: createOrderParams, c: context ) {
    const absentField = this.checkAbsenceInside( params );

    if ( absentField ) {
      return c.json( this.absentFieldMessage( absentField ), 400 );
    }

    return {
      information: params.information
    };
  }

  validateRestaurantParam( params: any ) {
    return {
      restaurantId: Number( params.restaurantId )
    };
  }

  validateOrderParam( params: any ){
    return {
      orderId: Number( params.orderId )
    }
  }
}

const orderValidator = new OrderValidator();
export { orderValidator };

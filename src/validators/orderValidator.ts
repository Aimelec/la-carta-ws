import { context } from '../types/context';
import { createOrderParams } from '../types/createOrder';

class OrderValidator {
  private requiredFields = [
    { key: 'information', type: 'string' }
  ];

  private checkAbsenceInside( params: any ) {
    return this.requiredFields.find(
      field => !params[ field.key ] || typeof params[ field.key ] !== field.type
    );
  }

  validateParam( params: any ) {
    return {
      tableId: Number( params.tableId ),
    };
  }

  validateBody( params: createOrderParams, c: context ) {
    const absentField = this.checkAbsenceInside( params );

    if (absentField) {
      return c.json( { message: `${ absentField.key } is required and must be a ${ absentField.type }` }, 400 );
    }

    return {
      information: params.information,
    };
  }

  validateRestaurantParam( params: any ) {
    console.log(params)
    return {
      restaurantId: Number( params.restaurantId ),
    };
  }

  validateOrderParam( params: any, c: context ){
    return {
      orderId: params.idOrder
    }
  }
}

const orderValidator = new OrderValidator();
export { orderValidator };

import { context } from '../types/context';
import { createOrderParams } from '../types/createOrder';

class OrderValidator {
    private requiredFields = [
        { key: 'information', type: 'string' },
        { key: 'deviceId', type: 'string' }
    ];

    private checkAbsenceInside(params: any) {
        return this.requiredFields.find(
            field => !params[field.key] || typeof params[field.key] !== field.type
        );
    }

    validateParam(params: any, c: context) {
        return {
            restaurantId: params.idRestaurant,
            tableId: params.idTable,
        };
    }

    validateBody(params: createOrderParams, c: context) {
        const absentField = this.checkAbsenceInside(params);
    
        if (absentField) {
            return c.json({ message: `${absentField.key} is required and must be a ${absentField.type}` }, 400);
        }

        if (params.deviceId.length > 255) {
            return c.json({ message: 'deviceId must be shorter than 255 characters' });
        }

        return {
            information: params.information,
            deviceId: params.deviceId,
        };
    }
}

const orderValidator = new OrderValidator();
export { orderValidator };

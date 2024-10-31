import { Context } from 'hono';
import { context } from '../types/context';
import { createRestaurantParams } from '../types/create_restaurant';

class RestaurantValidator {
  private requiredFields = [
    { key: 'name', type: 'string' },
    { key: 'latitude', type: 'number' },
    { key: 'longitude', type: 'number' },
    { key: 'menuUrl', type: 'string' },
    { key: 'logoUrl', type: 'string' },
    { key: 'information', type: 'string' },
    { key: 'tablesAmount', type: 'number' },
  ];

  private checkAbsenceInside(params: any) {
    return this.requiredFields.find(
      field => !params[field.key] || typeof params[field.key] !== field.type
    );
  }

  validate(params: createRestaurantParams, c: context) {
    const absentField = this.checkAbsenceInside(params);

    if (absentField) {
      return c.json({ message: `${absentField.key} is required and must be a ${absentField.type}` }, 400);
    }

    if (params.latitude < -90 || params.latitude > 90) {
      return c.json({ message: 'Latitude must be between -90 and 90' }, 400);
    }

    if (params.longitude < -180 || params.longitude > 180) {
      return c.json({ message: 'Longitude must be between -180 and 180' }, 400);
    }

    return {
      name: params.name,
      latitude: params.latitude,
      longitude: params.longitude,
      menuUrl: params.menuUrl,
      logoUrl: params.logoUrl,
      information: params.information,
      tablesAmount: params.tablesAmount
    };
  }
}

const restaurantValidator = new RestaurantValidator();
export { restaurantValidator };
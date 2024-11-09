import { Context } from "hono";
import { RestaurantRepository } from "../repositories/restaurantRepository";
import BackendError from "../utils/BackendError";

export class fetchRestaurant {
  restaurantRepository: RestaurantRepository;
  
  static async of( restaurantId: number, context : Context ) {
    const interactor = new fetchRestaurant( context );
    return await interactor.execute( restaurantId );
  }
  
  constructor( context : Context ) {
      this.restaurantRepository = new RestaurantRepository( context );
  }
  
  async execute( restaurantId: number ) {
      const restaurant = await this.restaurantRepository.fetchRestaurant( restaurantId );
  
      if ( !restaurant ) {
        throw new BackendError( 404, `Restaurant with id: ${ restaurantId } does not exist` );
      }
  
      return restaurant;
  }
}
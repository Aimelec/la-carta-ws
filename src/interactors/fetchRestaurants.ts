import { RestaurantRepository } from "../repositories/restaurantRepository";
import { context } from "../types/context";

export class fetchRestaurants {
  restaurantRepository: RestaurantRepository;

  static async for( context : context ) {
    const interactor = new fetchRestaurants( context );
    return await interactor.execute();
  }

  constructor( context : context ) {
    this.restaurantRepository = new RestaurantRepository( context );
  }

  async execute() {
    return this.restaurantRepository.fetchRestaurants();
  }
}
import { OrderRepository } from "../repositories/orderRepository";
import { RestaurantRepository } from "../repositories/restaurantRepository";
import { context } from "../types/context";
import BackendError from "../utils/BackendError";

export class fetchOrders {
  orderRepository: OrderRepository;
  restaurantRepository: RestaurantRepository;

  static async of( idRestaurant: number, context : context ) {
    const interactor = new fetchOrders( context );
    return await interactor.execute( idRestaurant );
  }

  constructor( context : context ) {
    this.orderRepository = new OrderRepository( context );
    this.restaurantRepository = new RestaurantRepository( context );
  }

  async execute( idRestaurant: number ) {
    const restaurant = await this.restaurantRepository.fetchRestaurant( idRestaurant );

    if ( !restaurant ) {
      throw new BackendError( 404, `Restaurant with id: ${idRestaurant} does not exist` );
    }

    return await restaurant.orders();
  }
}
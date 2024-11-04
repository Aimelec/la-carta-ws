import { OrderRepository } from "../repositories/orderRepository";
import { context } from "../types/context";

export class fetchOrders {
  orderRepository: OrderRepository;

  static async for( idRestaurant: number, context : context ) {
    const interactor = new fetchOrders( context );
    return await interactor.execute(idRestaurant);
  }

  constructor( context : context ) {
    this.orderRepository = new OrderRepository( context );
  }

  async execute(idRestaurant: number) {
    return this.orderRepository.fetchOrders(idRestaurant);
  }
}
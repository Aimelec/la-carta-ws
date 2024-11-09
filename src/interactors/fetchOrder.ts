import { OrderRepository } from "../repositories/orderRepository";
import { context } from "../types/context";
import BackendError from "../utils/BackendError";

export class fetchAnOrder {
  orderRepository: OrderRepository;

  static async for( orderId: number, context : context ) {
    const interactor = new fetchAnOrder( context );
    return await interactor.execute( orderId );
  }

  constructor( context : context ) {
    this.orderRepository = new OrderRepository( context );
  }

  async execute( orderId: number ) {
    const order = await this.orderRepository.fetchOrder( orderId );

    if ( !order ) {
      throw new BackendError( 404, `Order with id: ${ orderId } does not exist` );
    }

    return order;
  }
}
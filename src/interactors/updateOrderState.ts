import { Context } from "hono";
import { OrderRepository } from "../repositories/orderRepository";
import { OrderStateRepository } from "../repositories/orderStateRepository";
import BackendError from "../utils/BackendError";

export class updateOrderState {
  orderRepository: OrderRepository;
  orderStateRepository: OrderStateRepository;

  static async for( orderId: number, stateId: number, context : Context ) {
    const interactor = new updateOrderState( context );
    return await interactor.execute( orderId, stateId );
  }

  constructor( context : Context ) {
    this.orderRepository = new OrderRepository( context );
    this.orderStateRepository = new OrderStateRepository( context );
  }

  async execute( orderId: number, stateId: number ) {
    const order = await this.orderRepository.fetchOrder( orderId );
    const newState = await this.orderStateRepository.fetchOrderState( stateId );

    if ( !order ) {
      throw new BackendError( 404, `Order with id: ${ orderId } does not exist` );
    }

    if ( !newState ) {
      throw new BackendError( 404, `State with id: ${ stateId } does not exist` );
    }

    return await this.orderRepository.updateOrderState( order, newState );
  }
}
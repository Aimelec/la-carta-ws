import { OrderRepository } from "../repositories/orderRepository";
import { context } from "../types/context";

export class fetchAnOrder {
  orderRepository: OrderRepository;

  static async for( idOrder: number, context : context ) {
    const interactor = new fetchAnOrder( context );
    return await interactor.execute(idOrder);
  }

  constructor( context : context ) {
    this.orderRepository = new OrderRepository( context );
  }

  async execute(idOrder: number) {
    return this.orderRepository.fetchAnOrder(idOrder);
  }
}
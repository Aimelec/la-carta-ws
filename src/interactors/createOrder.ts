import { OrderRepository } from '../repositories/orderRepository';
import {context} from '../types/context'
import { createOrderParams } from '../types/createOrder'



export class createOrder {
    params: createOrderParams;
    orderRepository: OrderRepository
  
    static async for(params: createOrderParams, context: context) {
      const interactor = new createOrder(params, context);
      return await interactor.execute();
    }
  
    constructor(params: createOrderParams, context: context) {
      this.params = params;
      this.orderRepository = new OrderRepository(context);
      
    }
  
    async execute() {
      return await this.orderRepository.createOrder(this.params);
    } 
  }
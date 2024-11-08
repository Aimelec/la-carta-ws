import { Context } from "hono";
import { OrderRepository } from "../repositories/orderRepository";

export type tableParams = {
  id: number,
  restaurantId: number,
  onlyPickup: boolean
}

export class Table {
  id: number;
  restaurantId: number;
  onlyPickup: boolean;
  c: Context;

  static from( params: tableParams, c: Context ) {
    return new Table( params, c );
  }

  constructor( params: tableParams, c: Context ) {
    this.id = params.id;
    this.restaurantId = params.restaurantId;
    this.onlyPickup = params.onlyPickup;
    this.c = c;
  }

  async currentOrder() {
    const orderRepository = new OrderRepository( this.c );

    return await orderRepository.findCurrentOrderOfTable( this.id );
  }

  get isForPickup() {
    return this.onlyPickup;
  }

  toJSON() {
    return {
      id: this.id,
      restaurantId: this.restaurantId,
      onlyPickup: this.onlyPickup
    };
  }
}
import { Context } from "hono";
import { OrderRepository } from "../repositories/orderRepository";

export type RestaurantParams = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  menuUrl: string;
  logoUrl: string;
  information: string;
};

export class Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  menuUrl: string;
  logoUrl: string;
  information: string;
  c: Context;

  static from(params: RestaurantParams, c: Context) {
    return new Restaurant(params, c);
  }

  constructor(params: RestaurantParams, c: Context) {
    this.id = params.id;
    this.name = params.name;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.menuUrl = params.menuUrl;
    this.logoUrl = params.logoUrl;
    this.information = params.information;
    this.c = c;
  }

  async orders() {
    const repository = new OrderRepository( this.c );

    return await repository.fetchOrders( this.id );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
      menuUrl: this.menuUrl,
      logoUrl: this.logoUrl,
      information: this.information
    };
  }
}

export default Restaurant;
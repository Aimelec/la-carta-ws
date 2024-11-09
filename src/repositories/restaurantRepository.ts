import Restaurant, { RestaurantParams } from "../models/restaurant";
import { Context } from "hono";
import { createRestaurantParams } from "../types/createRestaurant";


class RestaurantRepository {
  database: D1Database;
  context: Context;


  constructor(context: Context) {
    this.database = context.env.DB;
    this.context = context;
  }

  async createRestaurant(params: createRestaurantParams) {
    const { name, latitude, longitude, menuUrl, logoUrl, information } = params;

    const { meta } = await this.database.prepare(
      "INSERT INTO restaurants (name, latitude, longitude, menuUrl, logoUrl, information) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(name, latitude, longitude, menuUrl, logoUrl, information)
    .run();

    return Restaurant.from( { id: meta.last_row_id as number, ...params }, this.context );
  }

  async fetchRestaurants() {
    const { results } = await this.database.prepare(
      "SELECT * FROM restaurants"
    )
    .all();

    return results.map( (row : any) => Restaurant.from(row, this.context) );
  }

  async fetchRestaurant( restaurantId: number ) {
    const restaurant = await this.database.prepare(
      "SELECT * FROM restaurants WHERE id = ?"
    )
    .bind( restaurantId )
    .first();

    return restaurant ? Restaurant.from( restaurant as RestaurantParams, this.context) : null;
  }
}

export { RestaurantRepository };
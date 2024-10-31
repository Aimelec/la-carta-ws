import Restaurant from "../models/restaurant";
import { context } from "../types/context";
import { createRestaurantParams } from "../types/create_restaurant";


class RestaurantRepository {
  database: D1Database;

  constructor(context: context) {
    this.database = context.env.DB;
  }

  async createRestaurant(params: createRestaurantParams) {
    const { name, latitude, longitude, menuUrl, logoUrl, information } = params;

    const { meta } = await this.database.prepare(
      "INSERT INTO restaurants (name, latitude, longitude, menu_url, logo_url, information) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(name, latitude, longitude, menuUrl, logoUrl, information)
    .run();

    return Restaurant.from( { id: meta.last_row_id as number, ...params } );
  }
}

export { RestaurantRepository };
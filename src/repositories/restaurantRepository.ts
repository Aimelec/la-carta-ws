import Restaurant, { RestaurantParams } from "../models/restaurant";
import { context } from "../types/context";
import { createRestaurantParams } from "../types/createRestaurant";


class RestaurantRepository {
  database: D1Database;

  constructor(context: context) {
    this.database = context.env.DB;
  }

  async createRestaurant(params: createRestaurantParams) {
    const { name, latitude, longitude, menuUrl, logoUrl, information } = params;

    const { meta } = await this.database.prepare(
      "INSERT INTO restaurants (name, latitude, longitude, menuUrl, logoUrl, information) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(name, latitude, longitude, menuUrl, logoUrl, information)
    .run();

    return Restaurant.from( { id: meta.last_row_id as number, ...params } );
  }

  async fetchRestaurants() {
    const { results } = await this.database.prepare(
      "SELECT * FROM restaurants"
    )
    .all();

    return results.map( (row : any) => { console.log(row);return Restaurant.from(row) } );
  }
}

export { RestaurantRepository };
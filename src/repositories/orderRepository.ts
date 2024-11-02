import { context } from "../types/context";
import { createOrderParams } from "../types/createOrder";


class OrderRepository {
  database: D1Database;

  constructor(context: context) {
    this.database = context.env.DB;
  }

  async createOrder(params: createOrderParams){
    const {
        restaurant_id, 
        table_id,
        information,
        device_id,
        state_id,
    } = params

    await this.database.prepare(
        "INSERT INTO orders (restaurant_id, table_id, state_id, information, device_id) VALUES (?, ?, ?, ?, ?)"
      )
      .bind( 
        restaurant_id,
        table_id,
        state_id,
        information,
        device_id)
      .run();
    
    return {...params}
  }
}

export { OrderRepository };
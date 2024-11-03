import { context } from "../types/context";
import { createOrderParams } from "../types/createOrder";
import Order, {OrderParams} from "../models/order"

class OrderRepository {
  database: D1Database;

  constructor(context: context) {
    this.database = context.env.DB;
  }

  async createOrder(params: createOrderParams) {
    const {
        restaurantId, 
        tableId,
        information,
        deviceId,
        stateId,
    } = params;

    const {meta} = await this.database.prepare(
        "INSERT INTO orders (restaurantId, tableId, stateId, information, deviceId) VALUES (?, ?, ?, ?, ?)"
      )
      .bind( 
        restaurantId,
        tableId,
        stateId,
        information,
        deviceId)
      .run();
    
    return Order.from( { id: meta.last_row_id as number, ...params } );
  }
}

export { OrderRepository };

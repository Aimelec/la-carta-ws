import { context } from "../types/context";
import { createOrderParams } from "../types/createOrder";
import Order, {OrderParams} from "../models/order"
import { OrderState } from "../models/orderState";

class OrderRepository {
  database: D1Database;

  constructor(context: context) {
    this.database = context.env.DB;
  }

  async createOrder( params: createOrderParams ) {
    const { 
        tableId,
        information,
    } = params;

    const { meta } = await this.database.prepare(
        "INSERT INTO orders (tableId, stateId, information) VALUES (?, ?, ?)"
      )
      .bind( tableId, 1, information )
      .run();
    
    return Order.from( { id: meta.last_row_id as number, ...params, state: 'pending' } );
  }

  async fetchOrders( restaurantId: number ) {
    const { results } = await this.database.prepare(
      `SELECT o.id, o.tableId, orderStates.state, o.information
       FROM restaurants r 
       INNER JOIN tables t ON r.id = t.restaurantId 
       INNER JOIN orders o ON t.id = o.tableId 
       INNER JOIN orderStates ON o.stateId = orderStates.id 
       WHERE r.id = ? 
       AND orderStates.state != 'finished';`
    )
    .bind( restaurantId )
    .all();

    return results.map( ( row : any ) => Order.from( row as OrderParams ) );
  }

  
  async fetchOrder( orderId: number ) {
    const order = await this.database.prepare(
      `SELECT o.id, o.tableId, orderStates.state, o.information
       FROM orders o 
       INNER JOIN orderStates ON o.stateId = orderStates.id 
       WHERE o.id = ?
       LIMIT 1`
    )
    .bind( orderId )
    .first();

    return order ? Order.from( order as OrderParams ) : null; 
  }

  async findCurrentOrderOfTable( tableId: number ) {
    const order = await this.database.prepare(
      `SELECT * FROM orders 
       WHERE tableId = ? 
       AND stateId != (SELECT id FROM orderStates WHERE state = 'finished') 
       ORDER BY createdAt DESC 
       LIMIT 1`
    )
    .bind( tableId )
    .first();

    return order ? Order.from( order as OrderParams ) : null;
  }

  async updateOrderState( order: Order, newState: OrderState ) {
    await this.database.prepare(
      `UPDATE orders 
       SET stateId = ? 
       WHERE id = ?`
    )
    .bind( newState.id, order.id )
    .run();

    return Order.from( { ...order, state: newState.state } );
  }
}

export { OrderRepository };

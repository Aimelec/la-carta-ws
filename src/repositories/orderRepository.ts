import { context } from "../types/context";
import { createOrderParams } from "../types/createOrder";
import Order, {OrderParams} from "../models/order"

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

  async fetchOrders( idRestaurant: number ) {
    const { results } = await this.database.prepare(
      `SELECT o.id, o.tableId, orderStates.state, o.information
       FROM restaurants r 
       INNER JOIN tables t ON r.id = t.restaurantId 
       INNER JOIN orders o ON t.id = o.tableId 
       INNER JOIN orderStates ON o.stateId = orderStates.id 
       WHERE r.id = ? 
       AND orderStates.state != 'finished';`
    )
    .bind(idRestaurant).all();

    return results.map( ( row : any ) => Order.from( row as OrderParams ) );
  }

  
  async fetchAnOrder(idOrder: number) {
    const resultIdOrderExists = await this.database.prepare (
      "select exists( select 1 from orders where orders.id = ?) as rowExists"
    )
    .bind(idOrder).all()
    const orderExists = resultIdOrderExists.results[0].rowExists as boolean
    
    if(!orderExists) 
      return `Error: Order with id: ${idOrder} does not exist`
    
    const { results } = await this.database.prepare(
      "select o.id, o.tableId, o.stateId, orderStates.state, o.information, o.deviceId from orders o inner join orderStates on o.stateId = orderStates.id where o.id = ?;"
    )
    .bind(idOrder).all();

    return Order.from(results[0] as OrderParams)
    
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

    return !!order ? Order.from( order as OrderParams ) : null;
  }
}
  
  
  export { OrderRepository };

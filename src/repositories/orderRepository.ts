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
        tableId,
        information,
        deviceId,
        stateId,
    } = params;

    const {meta} = await this.database.prepare(
        "INSERT INTO orders (tableId, stateId, information, deviceId) VALUES (?, ?, ?, ?)"
      )
      .bind( 
        tableId,
        stateId,
        information,
        deviceId)
      .run();
    
    return Order.from( { id: meta.last_row_id as number, ...params, state: 'pending' } );
  }

  async fetchOrders(idRestaurant: number) {
    const resultIdRestaurantExists = await this.database.prepare (
      "select exists( select 1 from restaurants where restaurants.id = ?) as rowExists"
    )
    .bind(idRestaurant).all()
    const restaurantExists = resultIdRestaurantExists.results[0].rowExists as boolean

    if(!restaurantExists) 
      return `Error: Restaurant with id: ${idRestaurant} does not exist`
    
    const { results } = await this.database.prepare(
      "select o.id, o.tableId, o.stateId, orderStates.state, o.information as orderInformation, o.deviceId from restaurants r inner join tables t on r.id = t.restaurantId inner join orders o on t.id = o.tableId inner join orderStates on o.stateId = orderStates.id where r.id = ? and orderStates.state != 'finished';"
    )
    .bind(idRestaurant).all();

    return results.map( (row : any) => { 
      const modelParams: OrderParams = {
        id: row.id,
        tableId: row.tableId,
        information: row.orderInformation,
        deviceId: row.deviceId,
        stateId: row.stateId,
        state: row.state
      }
      return Order.from(modelParams)
    } );
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
}
  
  
  export { OrderRepository };

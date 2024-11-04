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
    
    return Order.from( { id: meta.last_row_id as number, ...params } );
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
        stateId: row.stateId,
        information: row.orderInformation,
        deviceId: row.deviceId
      }
      const order =  Order.from(modelParams)
      return {
        ...order,
        state: row.state
      } 
    } );
  }

}

export { OrderRepository };

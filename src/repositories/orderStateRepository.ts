import { Context } from "hono";
import { OrderState, OrderStateParams } from "../models/orderState";

class OrderStateRepository {
  database: D1Database;

  constructor( context: Context ) {
    this.database = context.env.DB;
  }

  async fetchOrderState( stateId: number ) {
    const state = await this.database.prepare(
      `SELECT * FROM orderStates WHERE id = ?`
    )
    .bind( stateId )
    .first();

    return state ? OrderState.from( state as OrderStateParams ) : null;
  }
}

export { OrderStateRepository };
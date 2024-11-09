import { Context } from "hono";
import { OrderState, OrderStateParams } from "../models/orderState";
import { Table } from "../models/table";

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

  async fetchOrderStatesFor( table: Table ) {
    const orderStateIds = table.validOrderStateIds.join( ',' );

    const { results } = await this.database.prepare(
      `SELECT orderStates.*
       FROM orderStates
       WHERE orderStates.id IN (${orderStateIds})`
    )
    .bind()
    .all();

    return results.map( ( state: any ) => OrderState.from( state as OrderStateParams ) );
  }
}

export { OrderStateRepository };
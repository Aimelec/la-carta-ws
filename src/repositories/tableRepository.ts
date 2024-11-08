import { Table, tableParams } from "../models/table";
import { Context } from "hono";

class TableRepository {
  database: D1Database;
  context: Context;

  constructor(context: Context) {
    this.database = context.env.DB;
    this.context = context;
  }

  async findTable( tableId: number ) {
    const table = await this.database.prepare( "SELECT * FROM tables WHERE id = ?" )
      .bind(tableId)
      .first();

    return !!table ? Table.from( table as tableParams, this.context ) : null;
  }

  async createTablesForRestaurant( restaurantId: number, tableCount: number ) {
    const values = this.prepareValuesForCreation( restaurantId, tableCount );
    const valuesSQLTemplate = this.generateValuesSQLTemplate( values );

    const query = `INSERT INTO tables (restaurantId, onlyPickup) VALUES ${ valuesSQLTemplate }`;

    await this.database.prepare( query ).bind( ...values.flat() ).run();
  }

  private prepareValuesForCreation( restaurantId: number, tableCount: number ){
    const values = [];

    values.push( [ restaurantId, true ] );

    for ( let i = 1; i <= tableCount; i++ ) {
      values.push( [ restaurantId, false ] );
    }

    return values;
  }


  private generateValuesSQLTemplate(values: unknown[][]): string {
    return values.map( value =>
      `(${Array(value.length).fill('?').join(', ')})`
    ).join( ', ' );
  }
}

export { TableRepository };
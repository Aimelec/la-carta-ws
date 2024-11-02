import { context } from "../types/context";

class TableRepository {
  database: D1Database;

  constructor(context: context) {
    this.database = context.env.DB;
  }

  async createTablesForRestaurant(restaurantId: number, tableCount: number) {
    const values = this.prepareValuesForCreation(restaurantId, tableCount);
    const valuesSQLTemplate = this.generateValuesSQLTemplate(values);

    const query = `INSERT INTO tables (restaurant_id, number, only_pickup) VALUES ${valuesSQLTemplate}`;

    await this.database.prepare(query).bind( ...values.flat() ).run();
  }

  private prepareValuesForCreation(restaurantId: number, tableCount: number){
    const values = [];

    values.push([restaurantId, 1, true]);

    for (let i = 1; i <= tableCount; i++) {
      values.push([restaurantId, i + 1, false]);
    }

    return values;
  }


  private generateValuesSQLTemplate(values: unknown[][]): string {
    return values.map(value =>
      `(${Array(value.length).fill('?').join(', ')})`
    ).join(', ');
  }
}

export { TableRepository };
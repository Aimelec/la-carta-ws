import { Context } from "hono";
import { OrderStateRepository } from "../repositories/orderStateRepository";
import { TableRepository } from "../repositories/tableRepository";
import BackendError from "../utils/BackendError";

export class fetchOrderStates {
  orderStateRepository: OrderStateRepository;
  tableRepository: TableRepository;

  static async for( tableId: number, context: Context ) {
    const interactor = new fetchOrderStates( context );
    return await interactor.execute( tableId );
  }

  constructor( context: Context ) {
    this.tableRepository = new TableRepository( context );
    this.orderStateRepository = new OrderStateRepository( context );
  }

  async execute( tableId: number ) {
    const table = await this.tableRepository.fetchTable( tableId );

    if ( !table ) {
      throw new BackendError( 404, `Table with id: ${ tableId } does not exist` );
    }
    
    return await this.orderStateRepository.fetchOrderStatesFor( table );
  }
}
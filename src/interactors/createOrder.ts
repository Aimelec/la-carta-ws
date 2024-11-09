import { Table } from '../models/table';
import { OrderRepository } from '../repositories/orderRepository';
import { TableRepository } from '../repositories/tableRepository';
import {context} from '../types/context'
import { createOrderParams } from '../types/createOrder'
import BackendError from '../utils/BackendError';

export class createOrder {
  params: createOrderParams;
  orderRepository: OrderRepository;
  tableRepository: TableRepository;

  static async with( params: createOrderParams, context: context ) {
    const interactor = new createOrder( params, context );
    return await interactor.execute();
  }

  constructor( params: createOrderParams, context: context ) {
    this.params = params;
    this.orderRepository = new OrderRepository( context );
    this.tableRepository = new TableRepository( context );
  }

  async execute() {
    await this.validate();
    return await this.orderRepository.createOrder( this.params );
  } 

  private async validate() {
    const table = await this.tableRepository.fetchTable( this.params.tableId );

    if ( !table ) {
      throw new BackendError( 404, `Table with id: ${ this.params.tableId } does not exist` );
    }

    await this.validateTableAvailability( table );
  }

  private async validateTableAvailability( table: Table ) {
    if ( !table.isForPickup ) {
      if ( await table.currentOrder() ) {
        throw new BackendError( 400, `Table ${ table.id } already has an order` );
      }
    }
  }
}
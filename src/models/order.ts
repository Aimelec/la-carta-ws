export type OrderParams = {
  id: number;
  tableId: number,
  information: string;
  state: string
};
  
export class Order {
  id: number;
  tableId: number;
  information: string;
  state: string;

  static from( params: OrderParams ) {
    return new Order( params );
  }

  constructor( params: OrderParams ) {
    this.id = params.id;
    this.tableId = params.tableId;
    this.information = params.information;
    this.state = params.state;
  }

  toJSON() {
    return {
      id: this.id,
      tableId: this.tableId,
      information: this.information,
      state: this.state
    };
  }
}
  
export default Order;
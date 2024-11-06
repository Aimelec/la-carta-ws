export type OrderParams = {
    id: number;
    tableId: number,
    information: string;
    deviceId: string;
    stateId: number;
    state: string
  };
  
export class Order {
    id: number;
    tableId: number;
    information: string;
    deviceId: string;
    stateId: number;
    state:string
  
    static from(params: OrderParams) {
      return new Order(params);
    }
  
    constructor(params: OrderParams) {
      this.id = params.id;
      this.tableId = params.tableId;
      this.information = params.information;
      this.deviceId = params.deviceId;
      this.stateId = params.stateId;
      this.state = params.state
      }
  
  }
  
  export default Order;
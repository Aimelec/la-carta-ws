export type OrderParams = {
    id: number;
    tableId: number,
    information: string;
    deviceId: string;
    stateId: number
  };
  
export class Order {
    id: number;
    tableId: number;
    information: string;
    deviceId: string;
    stateId: number
  
    static from(params: OrderParams) {
      return new Order(params);
    }
  
    constructor(params: OrderParams) {
      this.id = params.id;
      this.tableId = params.tableId;
      this.information = params.information;
      this.deviceId = params.deviceId;
      this.stateId = params.stateId;
      }
  
/*    toJSON() {
      return {
        id: this.id,
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude,
        menuUrl: this.menuUrl,
        logoUrl: this.logoUrl,
        information: this.information
      };
    }*/
  }
  
  export default Order;
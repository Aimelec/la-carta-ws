export type OrderStateParams = {
  id: number;
  state: string;
};

export class OrderState {
  id: number;
  state: string;

  static from(params: OrderStateParams) {
    return new OrderState(params);
  }

  constructor(params: OrderStateParams) {
    this.id = params.id;
    this.state = params.state;
  }

  toJSON() {
    return {
      id: this.id,
      state: this.state
    };
  }
}
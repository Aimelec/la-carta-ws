import Restaurant from "../models/restaurant";
import { RestaurantRepository } from "../repositories/restaurant_repository";
import { TableRepository } from "../repositories/table_repository";
import { context } from "../types/context";
import { createRestaurantParams } from "../types/create_restaurant";

export class createRestaurant {
  params: createRestaurantParams;
  context: context;
  restaurantRepository: RestaurantRepository;
  tableRepository: TableRepository;

  static async for(params: createRestaurantParams, context: context) {
    const interactor = new createRestaurant(params, context);
    return await interactor.execute();
  }

  constructor(params: createRestaurantParams, context: context) {
    this.params = params;
    this.context = context;
    this.restaurantRepository = new RestaurantRepository(context);
    this.tableRepository = new TableRepository(context);
    
  }

  async execute() {
    const restaurant = await this.restaurantRepository.createRestaurant(this.params);
    await this.tableRepository.createTablesForRestaurant(restaurant.id, this.params.tablesAmount);

    return restaurant;
  }
}
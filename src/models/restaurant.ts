export type RestaurantParams = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  menuUrl: string;
  logoUrl: string;
  information: string;
};

export class Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  menuUrl: string;
  logoUrl: string;
  information: string;

  static from(params: RestaurantParams) {
    return new Restaurant(params);
  }

  constructor(params: RestaurantParams) {
    this.id = params.id;
    this.name = params.name;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.menuUrl = params.menuUrl;
    this.logoUrl = params.logoUrl;
    this.information = params.information;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
      menuUrl: this.menuUrl,
      logoUrl: this.logoUrl,
      information: this.information,
    };
  }
}

export default Restaurant;
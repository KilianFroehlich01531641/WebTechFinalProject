import { KitchenComponent } from "../kitchen/kitchen.component";

export class MenuItem {
     id: number;
     title: string;
     description: string;
     price: number;
     categories: number[];
     allergens: string[];
     isAvailable: boolean;

     constructor(id: number, title: string, description: string, price: number, categories: number[], allergens: string[], availabilityString: string) {
          this.id = id;
          this.title = title;
          this.description = description;
          this.price = price;
          this.categories = categories;
          this.allergens = allergens;
          this.isAvailable = availabilityString === "available";
     }

     getCategoryNames(): string[] { return KitchenComponent.getCategoryNames(this.categories) }; //TODO never used; overridden in data-base service
}
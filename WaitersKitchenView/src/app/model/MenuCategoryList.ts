import { DataBaseService } from "../services/data-base.service";
import { MenuCategory } from "./MenuCategory";

export class MenuCategoryList {
    private _list: MenuCategory[] = [];
    private _map: Map<number, string> = new Map();
    private _reversedMap: Map<string, number> = new Map();
    private _names: string[] = [];
    private dataBaseService: DataBaseService;

    constructor(dataBaseService: DataBaseService) {
        this.dataBaseService = dataBaseService;
        this.fetchMenuCategoryList();
    }

    get list(): MenuCategory[] {
        return this._list;
    }

    set list(array: MenuCategory[]) {
        this._list = array;
    }

    get map(): Map<number, string> {
        return this._map;
    }

    set map(map: Map<number, string>) {
        this._map = map;
    }

    get reversedMap(): Map<string, number> {
        return this._reversedMap;
    }

    set reversedMap(map: Map<string, number>) {
        this._reversedMap = map;
    }

    get names(): string[] {
        return this._names;
    }

    set names(names: string[]) {
        this._names = names;
    }

    public fetchMenuCategoryList(): void {
        this.dataBaseService.getMenuCategories().subscribe((data) => {
            this.list = data;

            //assign map, reversedMap and names
            let newMap: Map<number, string> = new Map();
            let newReversedMap: Map<string, number> = new Map();
            let newNames: string[] = [];

            for (let category of data) {
                newMap.set(category.id, category.title);
                newReversedMap.set(category.title, category.id);
                newNames.push(category.title);
            }

            this.map = newMap;
            this.reversedMap = newReversedMap;
            this.names = newNames;
        });
    }

    public getNames(ids: number[]): string[] {
        let names: string[] = [];
        for (let i of ids) {
            let name = this.map.get(i);
            names.push(name !== undefined ? name : "invalid");
        }
        return names;
    }

    public getName(id: number): string {
        let name = this.map.get(id);
        return name !== undefined ? name : "invalid";
    }

    public getIds(names: string[]): number[] {
        let ids: number[] = [];
        for (let name of names) {
            let id = this.reversedMap.get(name);
            ids.push(id !== undefined ? id : -1);
        }
        return ids;
    }

    // public indexOfTitle(title: string): number {
    //     for (let [i, category] of this.list.entries()) {
    //         if (category.title === title) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    // public contains(title: string | null): boolean {
    //     if (title) {
    //         for (let category of this.list) {
    //             console.log(title, category.title)
    //             if (category.title == title) {
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
}
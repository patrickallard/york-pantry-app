import { Item } from "./item";
import { User } from "./user";

export class Recipe {
    constructor(
        public id: Number | null,
        public name: string,
        public image: string,
        public owner: number,
        public items: Item[],
        public steps: string,
        public make: boolean
    ){}
}
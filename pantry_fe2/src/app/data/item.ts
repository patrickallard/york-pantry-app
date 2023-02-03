import { Recipe } from "./recipe";

export class Item {
    constructor(
        public id: number | null,
        public name: string,
        public image: string,
        public weight: number,
        public calories: number,
        public available: boolean,
        public recipe: number | null
    ){}
}
import { Recipe } from "./recipe";

export class User {
    constructor(
        public id: number | null,
        public username: string,
        public email: string,
        public password: string,
        public recipes: Recipe[]
    ){}
}
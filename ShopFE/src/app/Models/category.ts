import { Subcategory } from "./subcategory";

export class Category {
    id!:number;
    public name!:string;
    subcategories!:Subcategory[];
}

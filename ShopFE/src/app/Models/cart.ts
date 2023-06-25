import { CartEntry } from "./cart-entry";

export class Cart {
    id!: number;
    total_price!: Float32Array;
    entries!:CartEntry[];
}

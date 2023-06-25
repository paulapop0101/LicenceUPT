import {AssignedValue} from "../Models/products/assigned-value"
import { VariantModel } from "./products/variantModel";
export class CartEntry {
    id!:number;
    variant!:VariantModel;
    name!:string;
    quantity!:number;
    price!:string;
    totalPrice!:string;
    url!:string;
    assignedValueDTOList!:AssignedValue[];
    variant_id!:number;
}

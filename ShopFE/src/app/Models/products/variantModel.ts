import { AssignedValue } from "./assigned-value";


export class VariantModel {
    id!:number;
    product_id! : number;
    productId! : number;
    name!:string;
    price!: Float32Array;
    quantity!:number;
    added_date!:string;
    attributes!: number[];
    picture!: string | ArrayBuffer | null;
    assignedValues!: AssignedValue[];
    url!: string;
    newpicture!: boolean; 
}

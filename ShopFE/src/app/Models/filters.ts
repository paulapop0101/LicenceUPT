import { NumberInput } from "@angular/cdk/coercion";
import { Filter } from "./filter";

export class Filters {
    lprice!: NumberInput;
    hprice!: NumberInput;
    attributes!: Filter[];
}

import { Attribute } from "../attribute";
import { Value } from "../value";

export class AssignedValue {
    id! : number;
    attribute !: Attribute;
    value ! : Value;
}

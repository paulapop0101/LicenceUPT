export class Order {
    id!: number;
    user_id!: number;
    cart_id!: number;
    totalPrice!: Float32Array;
    userEmail!:string;
    order_date!:string;
    paymentType!: string;
    payment!:string;
    delivery_address!: number;
    invoice_address!:number;
}

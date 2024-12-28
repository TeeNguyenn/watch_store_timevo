import CartItemDTO from "./CartItemDTO";

class OrderDTO {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address?: string;
    note?: string;
    total_money: number;
    sub_total: number;
    shipping_method_id: number;
    payment_method_id: number;
    payment_status?: boolean;
    shipping_address: string;
    cart_items: CartItemDTO[];




    constructor(
        user_id: number,
        first_name: string,
        last_name: string,
        email: string,
        phone_number: string,
        address: string,
        note: string,
        total_money: number,
        sub_total: number,
        shipping_method_id: number,
        payment_method_id: number,
        payment_status: boolean,
        shipping_address: string,
        cart_items: CartItemDTO[],

    ) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone_number = phone_number;
        this.address = address;
        this.note = note;
        this.total_money = total_money;
        this.sub_total = sub_total;
        this.shipping_method_id = shipping_method_id;
        this.payment_method_id = payment_method_id;
        this.payment_status = payment_status;
        this.shipping_address = shipping_address;
        this.cart_items = cart_items;

    }

}

export default OrderDTO;
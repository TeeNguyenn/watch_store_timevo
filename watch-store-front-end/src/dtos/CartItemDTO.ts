class CartItemDTO {
    user_id: number;
    product_id: number;
    color_id: number;
    screen_size_id: number;
    material_id: number;
    quantity: number;

    constructor(
        user_id: number,
        product_id: number,
        color_id: number,
        screen_size_id: number,
        material_id: number,
        quantity: number,
    ) {
        this.user_id = user_id;
        this.product_id = product_id;
        this.color_id = color_id;
        this.screen_size_id = screen_size_id;
        this.material_id = material_id;
        this.quantity = quantity;
    }

}

export default CartItemDTO;
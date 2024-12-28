class CartItemModel {
    cartItemId?: number;
    userId: number;
    productId: number;
    colorId: number;
    screenSizeId: number;
    materialId: number;
    quantity?: number;

    constructor(
        cartItemId: number,
        userId: number,
        productId: number,
        colorId: number,
        screenSizeId: number,
        materialId: number,
        quantity: number,
    ) {
        this.cartItemId = cartItemId;
        this.userId = userId;
        this.productId = productId;
        this.colorId = colorId;
        this.screenSizeId = screenSizeId;
        this.materialId = materialId;
        this.quantity = quantity;

    }

}

export default CartItemModel;
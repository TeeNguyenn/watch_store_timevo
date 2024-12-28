class FavoriteModel {
    favoriteId: number;
    userId: number;
    productId: number;
    colorId: number;
    screenSizeId: number;
    materialId: number;

    constructor(
        favoriteId: number,
        userId: number,
        productId: number,
        colorId: number,
        screenSizeId: number,
        materialId: number,
    ) {
        this.favoriteId = favoriteId;
        this.userId = userId;
        this.productId = productId;
        this.colorId = colorId;
        this.screenSizeId = screenSizeId;
        this.materialId = materialId;

    }

}

export default FavoriteModel;
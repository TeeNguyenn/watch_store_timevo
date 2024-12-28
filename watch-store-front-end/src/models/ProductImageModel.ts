class ProductImageModel {
    productImageId: number;
    productId: number;
    imageName?: string;
    imageUrl: string;
    isMainImage?: boolean;
    colorId: number;


    constructor(productImageId: number,
        productId: number,

        imageName: string,
        imageUrl: string,
        isMainImage: boolean,
        colorId: number,


    ) {
        this.productImageId = productImageId;
        this.productId = productId;
        this.imageName = imageName;
        this.imageUrl = imageUrl;
        this.isMainImage = isMainImage;
        this.colorId = colorId;

    }

}

export default ProductImageModel;
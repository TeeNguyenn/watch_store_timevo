class ScreenSizeModel {
    sizeId: number;
    size?: number;
    totalProduct?: number;



    constructor(sizeId: number,
        size: number,
        totalProduct: number,
    ) {
        this.sizeId = sizeId;
        this.size = size;
        this.totalProduct = totalProduct;

    }

}

export default ScreenSizeModel;
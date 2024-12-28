class ColorModel {
    colorId: number;
    name?: string;
    red: number;
    green: number;
    blue: number;
    alpha: number;
    totalProduct?: number;



    constructor(colorId: number,
        name: string,
        red: number,
        green: number,
        blue: number,
        alpha: number,
        totalProduct: number,
    ) {
        this.colorId = colorId;
        this.name = name;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
        this.totalProduct = totalProduct;

    }

}

export default ColorModel;
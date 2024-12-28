import ColorModel from "./ColorModel";
import MaterialModel from "./MaterialModel";
import ScreenSizeModel from "./ScreenSizeModel";

class VariantModel {
    color: ColorModel;
    material: MaterialModel;
    screenSize: ScreenSizeModel;
    quantity: number;



    constructor(color: ColorModel,
        material: MaterialModel,
        screenSize: ScreenSizeModel,
        quantity: number,

    ) {
        this.color = color;
        this.material = material;
        this.screenSize = screenSize;
        this.quantity = quantity;

    }

}

export default VariantModel;
class MaterialModel {
    materialId: number;
    name?: string;
    totalProduct?: number;



    constructor(materialId: number,
        name: string,
        totalProduct: number,
    ) {
        this.materialId = materialId;
        this.name = name;
        this.totalProduct = totalProduct;

    }

}

export default MaterialModel;
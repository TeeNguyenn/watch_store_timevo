class CategoryModel {
    categoryId: number;
    name?: string;
    totalProduct?: number;



    constructor(categoryId: number,
        name: string,
        totalProduct: number,
    ) {
        this.categoryId = categoryId;
        this.name = name;
        this.totalProduct = totalProduct;

    }

}

export default CategoryModel;
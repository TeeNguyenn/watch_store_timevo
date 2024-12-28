import CategoryModel from "./CategoryModel";
import CollectionModel from "./CollectionModel";
import ColorModel from "./ColorModel";
import FeedbackModel from "./FeedbackModel";
import MaterialModel from "./MaterialModel";
import ProductImageModel from "./ProductImageModel";
import ScreenSizeModel from "./ScreenSizeModel";
import VariantModel from "./VariantModel";

class ProductModel {
    productId: number;
    title?: string;
    price: number;
    discount?: number;
    thumbnail: string;
    desc: string;
    specification: string;
    averageRate: number;
    quantityStock: number;
    category: CategoryModel;
    colors: ColorModel[];
    materials?: MaterialModel[];
    screenSizes?: ScreenSizeModel[];
    productImages: ProductImageModel[];
    variants?: VariantModel[];
    collections?: CollectionModel[];
    // feedbacks: FeedbackModel[];



    constructor(productId: number,
        title: string,
        price: number,
        discount: number,
        thumbnail: string,
        desc: string,
        specification: string,
        averageRate: number,
        quantityStock: number,
        category: CategoryModel,
        colors: ColorModel[],
        materials: MaterialModel[],
        screenSizes: ScreenSizeModel[],
        productImages: ProductImageModel[],
        variants: VariantModel[],
        collections: CollectionModel[],


        // feedbacks: FeedbackModel[],
    ) {
        this.productId = productId;
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.thumbnail = thumbnail;
        this.desc = desc;
        this.specification = specification;
        this.averageRate = averageRate;
        this.quantityStock = quantityStock;
        this.category = category;
        this.colors = colors;
        this.screenSizes = screenSizes;
        this.materials = materials;
        this.productImages = productImages;
        this.variants = variants;
        this.collections = collections;
        // this.feedbacks = feedbacks;
    }

}

export default ProductModel;
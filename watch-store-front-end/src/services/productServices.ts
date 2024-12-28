import CollectionModel from '../models/CollectionModel';
import ColorModel from '../models/ColorModel';
import MaterialModel from '../models/MaterialModel';
import ProductImageModel from '../models/ProductImageModel';
import ProductModel from '../models/ProductModel';
import ScreenSizeModel from '../models/ScreenSizeModel';
import VariantModel from '../models/VariantModel';
import { notifyError } from '../utils/Functions';
import * as request from '../utils/request'; // import all

interface ResultInterface {
    result: ProductModel[],
    totalPage: number,
}

export const getProduct = async (path: string): Promise<ResultInterface> => {
    try {
        const result: ProductModel[] = [];

        const res = await request.get(path);

        const responseData = res.data.product_responses;

        const totalPage = res.data.total_pages;

        for (const key in responseData) {

            const variants = responseData[key].variants;

            const colorList: ColorModel[] | undefined = [];
            const screenSizeList: ScreenSizeModel[] | undefined = [];
            const materialList: MaterialModel[] | undefined = [];


            variants?.forEach((variant: any) => {
                let countColor = 0;
                for (let index = 0; index < colorList.length; index++) {
                    if (
                        variant.color.id ===
                        colorList[index].colorId
                    ) {
                        countColor++;
                        break;
                    }
                }
                if (countColor === 0) {
                    colorList.push({
                        colorId: variant.color.id,
                        name: variant.color.name,
                        red: variant.color.red,
                        green: variant.color.green,
                        blue: variant.color.blue,
                        alpha: variant.color.alpha,
                        totalProduct: variant.color.total_products,
                    });
                }
                let countScreenSize = 0;
                for (let index = 0; index < screenSizeList.length; index++) {
                    if (
                        variant.screen_size.id ===
                        screenSizeList[index].sizeId
                    ) {
                        countScreenSize++;
                        break;
                    }
                }
                if (countScreenSize === 0) {
                    screenSizeList.push({
                        sizeId: variant.screen_size.id,
                        size: variant.screen_size.size,
                        // totalProduct: variant.color.total_products,
                    });
                }
                let countMaterial = 0;
                for (let index = 0; index < materialList.length; index++) {
                    if (
                        variant.material.id ===
                        materialList[index].materialId
                    ) {
                        countMaterial++;
                        break;
                    }
                }
                if (countMaterial === 0) {
                    materialList.push({
                        materialId: variant.material.id,
                        name: variant.material.name,
                        // totalProduct: variant.color.total_products,
                    });
                }
            });

            const productImages: ProductImageModel[] = [];

            responseData[key].product_images.forEach((productImage: any) => productImages.push({
                productImageId: productImage.id,
                productId: productImage.product_id,
                imageName: productImage.image_name,
                imageUrl: productImage.image_url,
                isMainImage: productImage.is_main_image,
                colorId: productImage.color_id,
            }))

            const variantList: VariantModel[] = [];

            responseData[key].variants.forEach((variant: any) => variantList.push({
                color: {
                    colorId: variant.color.id,
                    name: variant.color.name,
                    red: variant.color.red,
                    green: variant.color.green,
                    blue: variant.color.blue,
                    alpha: variant.color.alpha,
                },
                screenSize: {
                    sizeId: variant.screen_size.id,
                    size: variant.screen_size.size,
                },
                material: {
                    materialId: variant.material.id,
                    name: variant.material.name,
                },
                quantity: variant.quantity,
            }))


            result.push({
                productId: responseData[key].id,
                title: responseData[key].title,
                price: responseData[key].price,
                desc: responseData[key].description,
                specification: responseData[key].specification,
                discount: responseData[key].discount,
                thumbnail: responseData[key].thumbnail,
                averageRate: responseData[key].average_rate,
                quantityStock: responseData[key].quantity_stock,
                category: responseData[key].category,
                colors: colorList.sort(
                    (a: any, b: any) => a.colorId - b.colorId
                ),
                materials: materialList.sort(
                    (a: any, b: any) => a.materialId - b.materialId
                ),
                screenSizes: screenSizeList.sort(
                    (a: any, b: any) => a.sizeId - b.sizeId
                ),
                productImages: productImages.sort((a: any, b: any) => a.colorId - b.colorId),   //coi chung bug
                variants: variantList,
            })


        }

        return {
            result,
            totalPage
        };


    } catch (error) {
        throw (error);
    }
};

export const getAllProduct = async (currentPage = 1, limit: number = 12, collectionId?: string, categoryId?: string, colorId?: string, materialId?: string, keyword?: string, sort?: string, minPrice?: string, maxPrice?: string): Promise<ResultInterface> => {

    const path = `products?page=${currentPage - 1}&limit=${limit}&collection-ids=${collectionId || ''}&category-ids=${categoryId || ''}&color-ids=${colorId || ''}&material-ids=${materialId || ''}&keyword=${keyword || ''}&sort=${sort || ''}&min-price=${minPrice || '0'}&max-price=${maxPrice || '10000'}`;
    return getProduct(path);
};

export const get3ProductBestSeller = async (): Promise<ResultInterface> => {
    // temp
    const path = `products?page=1&limit=3&min-price=0&max-price=10000`;
    return getProduct(path);
};

export const getProductById = async (productId: number): Promise<ProductModel> => {
    try {
        const res = await request.get(`/products/${productId}`);

        const responseData = res.data;

        const variants: any[] = responseData.variants;

        const colorList: ColorModel[] | undefined = [];
        const screenSizeList: ScreenSizeModel[] | undefined = [];
        const materialList: MaterialModel[] | undefined = [];

        variants?.forEach((variant) => {
            let count = 0;
            for (let index = 0; index < colorList.length; index++) {
                if (
                    variant.color.id ===
                    colorList[index].colorId
                ) {
                    count++;
                    break;
                }
            }
            if (count === 0) {
                colorList.push({
                    colorId: variant.color.id,
                    name: variant.color.name,
                    red: variant.color.red,
                    green: variant.color.green,
                    blue: variant.color.blue,
                    alpha: variant.color.alpha,
                    totalProduct: variant.color.total_products,
                });
            }

            let countScreenSize = 0;
            for (let index = 0; index < screenSizeList.length; index++) {
                if (
                    variant.screen_size.id ===
                    screenSizeList[index].sizeId
                ) {
                    countScreenSize++;
                    break;
                }
            }
            if (countScreenSize === 0) {
                screenSizeList.push({
                    sizeId: variant.screen_size.id,
                    size: variant.screen_size.size,
                    // totalProduct: variant.color.total_products,
                });
            }
            let countMaterial = 0;
            for (let index = 0; index < materialList.length; index++) {
                if (
                    variant.material.id ===
                    materialList[index].materialId
                ) {
                    countMaterial++;
                    break;
                }
            }
            if (countMaterial === 0) {
                materialList.push({
                    materialId: variant.material.id,
                    name: variant.material.name,
                    // totalProduct: variant.color.total_products,
                });
            }
        });

        const productImages: ProductImageModel[] = [];

        responseData.product_images.forEach((productImage: any) => productImages.push({
            productImageId: productImage.id,
            productId: productImage.product_id,
            imageName: productImage.image_name,
            imageUrl: productImage.image_url,
            isMainImage: productImage.is_main_image,
            colorId: productImage.color_id,
        }))

        const variantList: VariantModel[] = [];

        responseData.variants.forEach((variant: any) => variantList.push({
            color: {
                colorId: variant.color.id,
                name: variant.color.name,
                red: variant.color.red,
                green: variant.color.green,
                blue: variant.color.blue,
                alpha: variant.color.alpha,
            },
            screenSize: {
                sizeId: variant.screen_size.id,
                size: variant.screen_size.size,
            },
            material: {
                materialId: variant.material.id,
                name: variant.material.name,
            },
            quantity: variant.quantity,
        }))

        const collectionList: CollectionModel[] = [];

        responseData.collections.forEach((collection: any) => collectionList.push({
            name: collection.name,
            collectionId: collection.id,
        }))


        return {
            productId: responseData.id,
            title: responseData.title,
            price: responseData.price,
            desc: responseData.description,
            specification: responseData.specification,
            discount: responseData.discount,
            thumbnail: responseData.thumbnail,
            averageRate: responseData.average_rate,
            quantityStock: responseData.quantity_stock,
            category: {
                categoryId: responseData.category.id,
                name: responseData.category.name
            },
            colors: colorList.sort(
                (a: any, b: any) => a.colorId - b.colorId
            ),
            materials: materialList.sort(
                (a: any, b: any) => a.materialId - b.materialId
            ),
            screenSizes: screenSizeList.sort(
                (a: any, b: any) => a.sizeId - b.sizeId
            ),
            productImages: productImages.sort((a: any, b: any) => a.colorId - b.colorId),
            variants: variantList,
            collections: collectionList,

        };


    } catch (error) {
        throw (error);
    }
};


export const deleteProductItem = async (productId: string) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.del(`products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        // throw (error);
        console.log(error);


    }
};


export const postProduct = async (product: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('products', product, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    } catch (error: any) {
        // throw (error);
        return { errorMessage: error.response.data.message }

    }
};

export const putProduct = async (product: any, productId: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put(`products/${productId}`, product, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw (error);

    }
};
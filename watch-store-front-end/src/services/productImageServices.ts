import ProductImageModel from '../models/ProductImageModel';
import * as request from '../utils/request';

export const getMainProductImageListByProductId = async (productId: number): Promise<ProductImageModel[]> => {

    const result: ProductImageModel[] = [];

    const res = await request.get(`products/${productId}`)

    const responseData: any[] = res.data.product_images;

    responseData.forEach(item => {
        if (item.is_main_image) {
            result.push(
                {
                    productImageId: item.id,
                    productId: item.product_id,
                    imageName: item.image_name,
                    imageUrl: item.image_url,
                    colorId: item.color_id,

                }
            )
        }
    })

    return result;

}



export const putProductImage = async (imageList: any, productId: number, colorId: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put('products/uploads', imageList, {
            params: {
                'product-id': productId,
                'color-id': colorId,
                files: '',
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.log(error);


    }
};
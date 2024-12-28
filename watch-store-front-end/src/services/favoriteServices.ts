import FavoriteModel from '../models/FavoriteModel';
import * as request from '../utils/request'; // import all



interface ResultInterface {
    result: FavoriteModel[],
    totalPage: number,
    totalProduct: number,
}

export const getFavoriteByUserId = async (userId: string, currentPage = 1, limit: number = 6, sort = 'latest'): Promise<ResultInterface> => {
    const token = localStorage.getItem('token');
    // const userId = localStorage.getItem('user_id');

    try {
        const response = await request.get(`favorites/user/${userId}`, {
            params: {
                page: currentPage - 1,
                limit,
                sort
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = response.data.total_pages;
        const totalProduct = response.data.total_products;


        const result: FavoriteModel[] = [];

        response.data.favorite_responses.forEach((item: any) => result.push({
            favoriteId: item.id,
            userId: item.user_id,
            productId: item.product_id,
            colorId: item.color_id,
            screenSizeId: item.screen_size_id,
            materialId: item.material_id,
        }))

        return {
            result,
            totalPage,
            totalProduct
        };

    } catch (error) {
        throw (error);

    }
}

export const postFavorite = async (favoriteItem: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const data = {
        user_id: Number.parseInt(userId + ''),
        product_id: Number.parseInt(favoriteItem.productId),
        color_id: Number.parseInt(favoriteItem.colorId),
        screen_size_id: Number.parseInt(favoriteItem.screenSizeId),
        material_id: Number.parseInt(favoriteItem.materialId),
    }

    try {
        const response = await request.post('favorites', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw (error);

    }
}


export const putFavorite = async (favoriteItem: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const data = {
        user_id: Number.parseInt(userId + ''),
        product_id: Number.parseInt(favoriteItem.productId),
        color_id: Number.parseInt(favoriteItem.colorId),
        screen_size_id: Number.parseInt(favoriteItem.screenSizeId),
        material_id: Number.parseInt(favoriteItem.materialId),
    }

    try {
        const response = await request.put(`favorites/${favoriteItem.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw (error);

    }
}

export const deleteFavorite = async (favoriteItem: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');



    try {
        const response = await request.del('favorites/user-product', {
            params: {
                'user-id': Number.parseInt(favoriteItem.userId + ''),
                'product-id': favoriteItem.productId,
                'color-id': favoriteItem.colorId,
                'screen-size-id': favoriteItem.screenSizeId,
                ' material-id': favoriteItem.materialId,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response;

    } catch (error) {
        throw (error);

    }
}

export const deleteFavoriteById = async (id: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.del(`favorites/${id}`, {

            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response;

    } catch (error) {
        throw (error);

    }
}
import CartItemModel from '../models/CartItemModel';
import * as request from '../utils/request'; // import all

export const getCartItemByUserId = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
        const response = await request.get(`cart-items/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        throw (error);

    }
}

export const postCartItem = async (cartItem: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const data = {
        user_id: Number.parseInt(userId + ''),
        product_id: Number.parseInt(cartItem.product_id),
        color_id: Number.parseInt(cartItem.color_id),
        screen_size_id: Number.parseInt(cartItem.screen_size_id),
        material_id: Number.parseInt(cartItem.material_id),
        quantity: Number.parseInt(cartItem.quantity),
    }

    try {
        const response = await request.post('cart-items', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error: any) {
        throw (error);


    }

}


export const putCartItem = async (cartItem: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const data = {
        user_id: Number.parseInt(userId + ''),
        product_id: Number.parseInt(cartItem.productId),
        color_id: Number.parseInt(cartItem.colorId),
        screen_size_id: Number.parseInt(cartItem.screenSizeId),
        material_id: Number.parseInt(cartItem.materialId),
        quantity: Number.parseInt(cartItem.quantity),
    }

    try {
        const response = await request.put(`cart-items/${cartItem.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw (error);

    }
}

export const deleteCartItem = async (cartItem: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
        const response = await request.del('cart-items/user-product', {
            params: {
                'user-id': Number.parseInt(userId + ''),
                'product-id': cartItem.productId,
                'color-id': cartItem.colorId,
                'screen-size-id': cartItem.screenSizeId,
                'material-id': cartItem.materialId,
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

export const deleteCartItemByUserId = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
        const response = await request.del(`cart-items/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response;

    } catch (error) {
        throw (error);

    }
}
import * as request from '../utils/request'; // import all



export const postVariants = async (variants: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('variants', variants, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        // throw (error);
        console.log(error);
        return {
            status: 'CONFLICT'
        }
    }
};

export const putVariants = async (variants: any, productId: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put(`variants/products/${productId}`, variants, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        // throw (error);
        console.log(error);
        return {
            status: 'CONFLICT'
        }
    }
};

export const deleteVariants = async (productId: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.del(`variants/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error: any) {
        // throw (error);
        console.log(error);
        return {
            errorMessage: error.response.data.message
        }
    }
};

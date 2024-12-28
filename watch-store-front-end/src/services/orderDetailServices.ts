import * as request from '../utils/request'; // import all



export const getOrderDetailByOrderId = async (orderId: string = '') => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`order-details/order/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw (error);

    }
};

// export const getAllOrderByUserId = async () => {
//     const currentUser = localStorage.getItem('user_id');
//     const token = localStorage.getItem('token');

//     try {
//         const response = await request.get(`orders/user/${currentUser}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         return response.data;

//     } catch (error) {
//         throw (error);

//     }
// };

// export const postOrder = async (order: OrderDTO) => {
//     const token = localStorage.getItem('token');

//     try {
//         const response = await request.post('orders', order, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         return response;

//     } catch (error) {
//         throw (error);

//     }
// };
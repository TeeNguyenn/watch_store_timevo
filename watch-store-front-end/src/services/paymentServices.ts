import * as request from '../utils/request'; // import all

export const getPaymentViaVNPAY = async (amount: number, bankCode: string = 'NCB', orderId: number) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`payments/create-payment`, {
            params: {
                amount,
                bankCode,
                orderId
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};


import PaymentMethodModel from '../models/PaymentMethodModel';
import * as request from '../utils/request'; // import all


export const getAllPaymentMethod = async (): Promise<PaymentMethodModel[]> => {
    try {
        const result: PaymentMethodModel[] = [];

        const res = await request.get('payment-methods');

        const responseData: any[] = res.data;

        responseData.forEach((item) => result.push({
            paymentMethodId: item.id,
            name: item.name,
            desc: item.description,
            cost: item.cost

        }))
        return result;


    } catch (error) {
        throw (error)
    }
};
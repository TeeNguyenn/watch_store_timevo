import ShippingMethodModel from '../models/ShippingMethodModel';
import * as request from '../utils/request'; // import all


export const getAllShippingMethod = async (): Promise<ShippingMethodModel[]> => {
    try {
        const result: ShippingMethodModel[] = [];

        const res = await request.get('shipping-methods');

        const responseData: any[] = res.data;

        responseData.forEach((item) => result.push({
            shippingMethodId: item.id,
            name: item.name,
            desc: item.description,
            cost: item.cost

        }))
        return result;


    } catch (error) {
        throw (error)
    }
};
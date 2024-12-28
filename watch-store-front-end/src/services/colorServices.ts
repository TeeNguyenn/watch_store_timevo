import ColorModel from '../models/ColorModel';
import * as request from '../utils/request'; // import all


export const getAllColor = async (): Promise<ColorModel[]> => {
    try {
        const result: ColorModel[] = [];

        const res = await request.get('colors?page=0&limit=1000');

        const responseData: any[] = res.data.color_responses;

        responseData.forEach((item) => result.push({
            colorId: item.id,
            name: item.name,
            red: item.red,
            green: item.green,
            blue: item.blue,
            alpha: item.alpha,
            totalProduct: item.total_products,

        }))

        return result;


    } catch (error) {
        throw (error)
    }
};


export const postColor = async (color: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('colors', color, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};
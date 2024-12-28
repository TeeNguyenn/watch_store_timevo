import MaterialModel from '../models/MaterialModel';
import ScreenSizeModel from '../models/ScreenSizeModel';
import * as request from '../utils/request'; // import all


export const getAllScreenSize = async (): Promise<ScreenSizeModel[]> => {
    try {
        const result: ScreenSizeModel[] = [];

        const res = await request.get('screen-sizes?page=0&limit=1000');

        const responseData: any[] = res.data.screen_size_responses;

        responseData.forEach((item) => result.push({
            sizeId: item.id,
            size: item.size,
            totalProduct: item.total_products,

        }))

        return result;


    } catch (error) {
        throw (error)
    }
};


export const postScreenSize = async (screenSize: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('screen-sizes', screenSize, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};
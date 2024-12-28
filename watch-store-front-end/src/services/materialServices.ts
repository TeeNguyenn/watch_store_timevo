import MaterialModel from '../models/MaterialModel';
import * as request from '../utils/request'; // import all


export const getAllMaterial = async (): Promise<MaterialModel[]> => {
    try {
        const result: MaterialModel[] = [];

        const res = await request.get('materials?page=0&limit=1000');

        const responseData: any[] = res.data.material_responses;

        responseData.forEach((item) => result.push({
            materialId: item.id,
            name: item.name,
            totalProduct: item.total_products,

        }))

        return result;


    } catch (error) {
        throw (error)
    }
};


export const postMaterial = async (material: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('materials', material, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};
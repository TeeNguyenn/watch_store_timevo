import UserModel from '../models/UserModel';
import * as request from '../utils/request'; // import all

interface IRole {
    id: number;
    name: string;
}

export const getUserDetail = async (): Promise<UserModel> => {
    const token = localStorage.getItem('token');
    try {
        const response = await request.get('users/details', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const role: IRole[] = [];

        response.data.roles.forEach((roleItem: any) => role.push({
            id: roleItem.id,
            name: roleItem.name
        }))

        return {
            userId: response.data.id,
            lastName: response.data.last_name,
            firstName: response.data.first_name,
            phoneNumber: response.data.phone_number,
            email: response.data.email,
            avatar: response.data.avatar,
            address: response.data.address,
            role

        };

    } catch (error) {
        throw (error);

    }
}

interface IResult {
    result: UserModel[];
    totalPage: number;
}

export const getAllUser = async (): Promise<IResult> => {
    const token = localStorage.getItem('token');
    try {
        const response = await request.get('users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = response.total_pages;

        const result: UserModel[] = [];

        response.user_responses.forEach((item: any) => result.push(
            {
                userId: item.id,
                lastName: item.last_name,
                firstName: item.first_name,
                phoneNumber: item.phone_number,
                email: item.email,
                isActive: item.is_active,
                address: item.address,
                avatar: item.avatar
            }
        ))

        return {
            result,
            totalPage
        };

    } catch (error) {
        throw (error);

    }
}


export const deleteUser = async (userId: string) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put(`users/block/${userId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};

export const putUser = async (data: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put(`users/${data.userId}`, data.infos, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};

export const putAvatarUser = async (userId: string, avatar: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put(`users/avatar/${userId}`, avatar, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error: any) {
        // throw (error);
        return {
            errorMessage: error.response.data.message
        }


    }
};

export const resetPassword = async (userId: string) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put(`users/reset-password/${userId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error: any) {
        // throw (error);
        return {
            errorMessage: error.response.data.message
        }


    }
};

export const generateOTP = async (email: string) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put('users/generate-otp', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                email
            }
        });

        return response;

    } catch (error: any) {
        // throw (error);
        return {
            errorMessage: error.response.data.message
        }


    }
};

export const checkOTP = async (email: string, otp: string) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put('users/check-otp', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                email,
                otp
            }
        });

        return response;

    } catch (error: any) {
        // throw (error);
        return {
            errorMessage: error.response.data.message
        }


    }
};

export const forgotPassword = async (data: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put('users/forgot-password', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error: any) {
        // throw (error);
        return {
            errorMessage: error.response.data.message
        }


    }
};

export const changePassword = async (data: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put('users/change-password', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error: any) {
        // throw (error);
        return {
            errorMessage: error.response.data.message
        }


    }
};
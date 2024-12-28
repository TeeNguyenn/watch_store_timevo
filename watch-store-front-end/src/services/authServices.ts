import { jwtDecode } from 'jwt-decode';
import UserDTO from '../dtos/UserDTO';
import * as request from '../utils/request'; // import all


export const checkExistEmail = async (email?: string) => {
    try {
        const response = await request.get(`users/email-unique?email=${email || ''}`);
        return response.data;

    } catch (error) {
        throw (error);

    }
}

export const register = async (data: UserDTO) => {
    try {
        const response = await request.post(`users/register`, data);
        return response.data;

    } catch (error) {
        throw (error);

    }
}

export const activeAccount = async (email: string, activeAccount: string) => {
    try {
        const response = await request.get(`users/active-account?email=${email}&active-code=${activeAccount}`);

        return response;

    } catch (error) {
        throw (error);

    }
}

export const login = async (loginDTO: any) => {
    try {
        const response = await request.post('users/login', loginDTO);

        const { token, refresh_token } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
        const decodedToken: any = jwtDecode(token);
        localStorage.setItem('user_id', decodedToken.userId);



        return response;

    } catch (error) {
        // throw (error);
        console.log('error', error);
        return error;

    }
}
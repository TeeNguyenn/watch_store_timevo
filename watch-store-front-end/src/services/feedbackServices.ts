import FeedbackModel from '../models/FeedbackModel';
import * as request from '../utils/request'; // import all


interface ResultInterface {
    result: any,
    totalPage: number,
    totalFeedbacks: number,
}

export const getAllFeedbackByProductId = async (productId: number, currentPage = 1, limit = 5, sort = 'latest'): Promise<ResultInterface> => {
    try {
        const result: FeedbackModel[] = [];

        const res = await request.get(`feedbacks/product/${productId}`, {
            params: {
                page: currentPage - 1,
                limit,
                sort
            }
        });

        const totalPage = res.data.total_pages;
        const totalFeedbacks = res.data.total_feedbacks;
        const responseData = res.data.feedback_responses;

        for (const key in responseData) {

            result.push({
                feedbackId: responseData[key].feedback_id,
                productId: responseData[key].product_id,
                rate: responseData[key].rate,
                comment: responseData[key].comment,
                firstName: responseData[key].first_name,
                lastName: responseData[key].last_name,
                createAt: responseData[key].created_at,
                updateAt: responseData[key].updated_at,

            })
        }

        return {
            result,
            totalPage,
            totalFeedbacks
        };


    } catch (error) {
        throw (error)
    }
};

export const getAllFeedbackByUserId = async (userId: string, currentPage = 1, limit: number = 6, sort = 'latest'): Promise<ResultInterface> => {
    // const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
        const result: FeedbackModel[] = [];

        const res = await request.get(`feedbacks/user/${userId}`, {
            params: {
                page: currentPage - 1,
                limit,
                sort
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = res.data.total_pages;
        const totalFeedbacks = res.data.total_feedbacks;
        const responseData = res.data.feedback_responses;

        for (const key in responseData) {

            result.push({
                feedbackId: responseData[key].feedback_id,
                productId: responseData[key].product_id,
                rate: responseData[key].rate,
                comment: responseData[key].comment,
                firstName: responseData[key].first_name,
                lastName: responseData[key].last_name,
                createAt: responseData[key].created_at,
                updateAt: responseData[key].updated_at,

            })
        }

        return {
            result,
            totalPage,
            totalFeedbacks
        };


    } catch (error) {
        throw (error)
    }
};

export const getAllFeedback = async (currentPage = 1, limit: number = 6, sort = 'latest') => {
    // const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
        const result: FeedbackModel[] = [];

        const res = await request.get(`feedbacks`, {
            params: {
                page: currentPage - 1,
                limit,
                sort
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res;


    } catch (error) {
        console.log(error);

        // throw (error)
    }
};


export const postFeedback = async (feedbackItem: any) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const data = {
        user_id: Number.parseInt(userId + ''),
        product_id: Number.parseInt(feedbackItem.product_id),
        comment: feedbackItem.comment,
        rate: Number.parseInt(feedbackItem.rate),
    }

    try {
        const response = await request.post('feedbacks', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw (error);

    }
}
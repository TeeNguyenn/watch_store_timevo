import OrderDTO from '../dtos/OrderDTO';
import { formatPrice } from '../utils/Functions';
import * as request from '../utils/request'; // import all



export const getOrderByOrderId = async (orderId: string = '') => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw (error);

    }
};


interface ResultInterface {
    result: any,
    totalPage: number,
    totalOrders: number,
}

export const getAllOrderByUserId = async (currentUser: string, currentPage = 1, limit: number = 6, sort = 'latest'): Promise<ResultInterface> => {
    // const currentUser = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`orders/user/${currentUser}`, {
            params: {
                page: currentPage - 1,
                limit,
                sort
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = response.data.total_pages;
        const totalOrders = response.data.total_orders;

        return {
            result: response.data.order_responses,
            totalPage,
            totalOrders
        };

    } catch (error) {
        throw (error);

    }
};

export const getAllOrder = async (currentPage = 1, limit: number = 8): Promise<ResultInterface> => {
    // const currentUser = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`orders`, {
            params: {
                page: currentPage - 1,
                limit,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const totalPage = response.data.total_pages;
        const totalOrders = response.data.total_orders;

        return {
            result: response.data.order_responses,
            totalPage,
            totalOrders
        };

    } catch (error) {
        throw (error);

    }
};

export const getTheLast6MonthsOfOrders = async () => {
    // const currentUser = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    try {
        const response = await request.get(`orders`, {
            params: {
                page: 0,
                limit: 1,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Get all order
        const responseData = await request.get(`orders`, {
            params: {
                page: 0,
                limit: response.data.total_pages,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Get order of last 6 months
        const currentTime = new Date().getTime(); // Thời gian hiện tại
        const sixMonthsAgo = currentTime - 6 * 30 * 24 * 60 * 60 * 1000; // Thời gian 6 tháng trước

        const recentOrders = responseData.data.order_responses.filter((order: any) => order.order_date >= sixMonthsAgo);


        // Get total money of last 6 months
        // const summarizeByMonth = (orders: any[]) => {
        //     const monthMap: { [key: string]: number } = {};

        //     orders.forEach(order => {
        //         const date = new Date(order.order_date); // Convert timestamp to Date
        //         const month = date.toLocaleString('en-US', { month: 'long' }); // Lấy tên tháng tiếng Anh
        //         // const year = date.getFullYear(); // Lấy năm để phân biệt các tháng khác năm
        //         // const key = `${month} ${year}`; // Ghép tháng và năm làm key
        //         const key = `${month}`; // Ghép tháng và năm làm key

        //         // Nếu order đó là order đầu tiên của tháng đó thì khởi tạo bằng 0
        //         if (!monthMap[key]) {
        //             monthMap[key] = 0; // Nếu chưa tồn tại tháng trong map, khởi tạo với 0
        //         }

        //         monthMap[key] += order.total_money; // Cộng dồn tổng tiền
        //     });

        //     // Chuyển monthMap thành mảng object
        //     return Object.entries(monthMap).map(([month, total]) => ({
        //         name: month,
        //         $: form,
        //     }));
        // };

        const getLastSixMonthsRevenue = (orders: any[]) => {
            const currentDate = new Date();
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const lastSixMonths: any[] = [];

            // Tạo danh sách 6 tháng gần đây với tên tháng
            for (let i = 5; i >= 0; i--) {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
                const monthName = monthNames[date.getMonth()];
                const year = date.getFullYear();
                lastSixMonths.push({
                    name: monthName,
                    $: 0,
                });
            }

            // Tính tổng tiền theo tháng
            orders.forEach((order: any) => {
                const orderDate = new Date(order.order_date);
                const orderMonth = monthNames[orderDate.getMonth()];
                const orderYear = orderDate.getFullYear();

                const targetMonth = lastSixMonths.find(
                    (month) => month.name === orderMonth
                );

                if (targetMonth) {
                    targetMonth.$ += order.total_money;
                }
            });

            lastSixMonths.forEach(month => {

                month.$ = Number(Number(month.$).toFixed(2));
            })

            return lastSixMonths;
        }


        const ordersSummary = getLastSixMonthsRevenue(recentOrders); // Tổng hợp dữ liệu theo tháng

        return ordersSummary;


    } catch (error) {
        // throw (error);
        console.log(error);
    }
};

export const postOrder = async (order: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.post('orders', order, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};

export const putOrder = async (orderId: number, order: any) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.put(`orders/${orderId}`, order, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};

export const deleteOrderItem = async (orderId: string) => {
    const token = localStorage.getItem('token');

    try {
        const response = await request.del(`orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;

    } catch (error) {
        throw (error);

    }
};
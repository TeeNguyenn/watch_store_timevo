import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import Widget from './components/widget';
import Featured from './components/featured';
import Chart from './components/chart';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
import * as orderServices from '../../services/orderServices';
import * as userServices from '../../services/userServices';
import UserModel from '../../models/UserModel';
import { isToday } from '../../utils/Functions';
import PreLoader from '../../components/PreLoader';
import * as feedbackServices from '../../services/feedbackServices';

const cx = classNames.bind(styles);

interface ITopCustomerList {
    avatar: string | undefined;
    name: string;
    email: string;
    totalOrder: number;
}

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [totalOrders, setTotalOrders] = useState(0);

    const [totalUsers, setTotalUsers] = useState(0);
    const [earnings, setEarnings] = useState(0);
    const [totalSaleToday, setTotalSaleToday] = useState(0);
    const [topCustomerList, setTopCustomerList] = useState<ITopCustomerList[]>([]);
    const [lastReviewList, setLatestReviewList] = useState([]);

    // get all orders
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            const res = await orderServices.getAllOrder(1, 1);
            setTotalOrders(res.totalPage);

            const responseData = await userServices.getAllUser();
            setTotalUsers(responseData.result.length);

            let totalEarning = 0;
            let totalSaleNow = 0;
            let count = 0;
            let topCustomers: ITopCustomerList[] = [];

            // Latest review
            const reviewList = await feedbackServices.getAllFeedback();

            const latestReviews = reviewList.data.feedback_responses.map((item: any) => {
                let feedbackItem = {};
                responseData.result.forEach((user: UserModel) => {
                    if (item.user_id == user.userId) {
                        feedbackItem = {
                            avatar: user.avatar,
                            comment: item.comment
                        }
                    }
                })
                return feedbackItem
            });

            setLatestReviewList(latestReviews);

            const fetchApi1 = async (userItem: UserModel) => {
                const res = await orderServices.getAllOrderByUserId(userItem.userId + '');



                // Top customer
                count++
                if (res.totalOrders > 0) {
                    const resData = await orderServices.getAllOrderByUserId(userItem.userId + '', 1, res.totalOrders);
                    topCustomers.push({
                        avatar: userItem.avatar,
                        name: userItem.firstName + ' ' + userItem.lastName,
                        email: userItem.email,
                        totalOrder: res.totalOrders

                    })

                    const totalSpent = resData.result.reduce((accumulator: any, currentItem: any) => {
                        if (isToday(currentItem.order_date)) {
                            totalSaleNow += currentItem.total_money;
                        }
                        return accumulator + currentItem.total_money;
                    }, 0);


                    totalEarning += totalSpent;
                }

                if (count === responseData.result.length) {
                    if (topCustomers.length > 6) {
                        setTopCustomerList(topCustomers.sort((a: ITopCustomerList, b: ITopCustomerList) => b.totalOrder - a.totalOrder).slice(0, 6))
                    } else {
                        setTopCustomerList(topCustomers.sort((a: ITopCustomerList, b: ITopCustomerList) => b.totalOrder - a.totalOrder))

                    }

                    setTotalSaleToday(totalSaleNow);
                    setEarnings(totalEarning);
                    setLoading(false);
                    return;
                }

            }

            async function fetchSequentially(responseData: any) {
                for (const userItem of responseData.result) {
                    await fetchApi1(userItem);
                }
            }

            fetchSequentially(responseData);
        };

        fetchApi();
    }, []);

    if (loading) {
        return <PreLoader show />
    }

    return (
        <>
            <div className={cx('dashboard__widgets')}>
                <Widget type="customer" amount={totalUsers}></Widget>
                <Widget type="order" amount={totalOrders}></Widget>
                <Widget type="earning" amount={earnings}></Widget>
                <Widget type="balance"></Widget>
            </div>
            <div className={cx('dashboard__charts')}>
                <Featured totalSaleToday={totalSaleToday}></Featured>
                <Chart title="Last 6 Months ( Revenue )" aspect={2 / 1}></Chart>
            </div>
            <div className={cx('dashboard__bottom')}>
                <div className="container">
                    <div className="row">
                        <div className="col col-5">
                            <div className={cx('block')}>
                                <h2 className={cx('block__title')}>
                                    Top Customers
                                </h2>
                                <div className={cx('block__list')}>
                                    {topCustomerList.map(customerItem =>
                                        <div className={cx('block__item')}>
                                            <div
                                                className={cx('block__img-wrapper')}
                                            >
                                                <Image
                                                    src={customerItem.avatar || images.defaultAvatar}
                                                    alt="avatar"
                                                    className={cx('block__avatar')}
                                                ></Image>
                                            </div>
                                            <div className={cx('block__body')}>
                                                <div>
                                                    <div
                                                        className={cx(
                                                            'block__name'
                                                        )}
                                                    >
                                                        {customerItem.name}
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'block__email'
                                                        )}
                                                    >
                                                        {customerItem.email}
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx('block__counter')}
                                                >
                                                    {customerItem.totalOrder} orders
                                                </div>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                        </div>
                        <div className="col col-7">
                            <div className={cx('block')}>
                                <h2 className={cx('block__title')}>
                                    Latest Reviews
                                </h2>
                                <div className={cx('block__list')}>
                                    {
                                        lastReviewList.map((item: any, index) => <div key={index} className={cx('block__item')}>
                                            <div
                                                className={cx('block__img-wrapper')}
                                            >
                                                <Image
                                                    src={item.avatar}
                                                    alt="avatar"
                                                    className={cx('block__avatar')}

                                                ></Image>
                                            </div>
                                            <div className={cx('block__body')}>
                                                <div
                                                    className={cx('block__name', {
                                                        'line-clamp': true,
                                                    })}
                                                    style={{ fontSize: 14 }}
                                                >
                                                    {item.comment}
                                                </div>
                                            </div>
                                        </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

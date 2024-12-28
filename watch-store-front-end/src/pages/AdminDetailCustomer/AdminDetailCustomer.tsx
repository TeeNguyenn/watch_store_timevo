import classNames from 'classnames/bind';

import styles from './AdminDetailCustomer.module.scss';
import Navbar from '../Dashboard/components/navbar';
import CustomerInfo from '../../components/CustomerInfo';
import Orders from '../../components/Orders';
import Wishlist from '../../components/Wishlist';
import Reviews from '../../components/Reviews';
import { useEffect, useState } from 'react';
import * as orderServices from '../../services/orderServices';
import { useParams } from 'react-router-dom';
import * as favoriteServices from '../../services/favoriteServices';
import * as feedbackServices from '../../services/feedbackServices';

const cx = classNames.bind(styles);

const AdminDetailCustomer = () => {

    const [totalOrders, setTotalOrders] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);


    // Get customerId from url
    const { customerId } = useParams();

    let customerIdNumber = 0;
    try {
        customerIdNumber = parseInt(customerId + '');
        if (Number.isNaN(customerIdNumber)) {
            customerIdNumber = 0;
        }
    } catch (error) {
        customerIdNumber = 0;
        console.log('Error:', error);
    }

    useEffect(() => {
        const fetchApi = async () => {
            const res = await orderServices.getAllOrderByUserId(
                customerId + '',

            );
            setTotalOrders(res.totalOrders);
            const favoriteRes = await favoriteServices.getFavoriteByUserId(
                customerId + '',
            );
            setTotalProduct(favoriteRes.totalProduct);
            const feedbackData = await feedbackServices.getAllFeedbackByUserId(
                customerId + '',

            );
            setTotalFeedbacks(feedbackData.totalFeedbacks);
        };

        fetchApi();
    }, [customerId]);

    return (

        <div className={cx('detail')}>
            <CustomerInfo modifier></CustomerInfo>
            <div className={cx('detail__order')}>
                <h2 className={cx('detail__title')}>
                    Orders{' '}
                    <span
                        style={{
                            color: 'var(--caption-color)',
                            fontWeight: '400',
                        }}
                    >
                        {`(${totalOrders})`}
                    </span>
                </h2>
                <Orders className={cx('detail__order-inner')}></Orders>

            </div>
            <div className={cx('detail__wishlist')}>
                <h2 className={cx('detail__title')}>
                    Wishlist{' '}
                    <span
                        style={{
                            color: 'var(--caption-color)',
                            fontWeight: '400',
                        }}
                    >
                        {`(${totalProduct})`}
                    </span>
                </h2>
                <Wishlist className={cx('detail__wishlist-inner')}></Wishlist>

            </div>
            <div className={cx('detail__review')}>
                <h2 className={cx('detail__title')}>
                    Ratings & reviews {' '}
                    <span
                        style={{
                            color: 'var(--caption-color)',
                            fontWeight: '400',
                        }}
                    >
                        {`(${totalFeedbacks})`}
                    </span>
                </h2>
                <Reviews className={cx('detail__reviews-inner')}></Reviews>

            </div>
        </div>
    );
};

export default AdminDetailCustomer;

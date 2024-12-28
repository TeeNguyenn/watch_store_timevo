import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../components/Button';
import styles from './Profile.module.scss';
import CustomerInfo from '../../components/CustomerInfo';
import { CartIcon, MobileUserIcon, UserIcon } from '../../components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faHeart,
    faStar,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Orders from '../../components/Orders';
import Reviews from '../../components/Reviews';
import Wishlist from '../../components/Wishlist';
import PersonalInfo from '../PersonalInfo';
import * as orderServices from '../../services/orderServices';
import * as feedbackServices from '../../services/feedbackServices';
import FeedbackModel from '../../models/FeedbackModel';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Profile = () => {
    const [showTabContent, setShowTabContent] = useState(1);
    const [totalOrders, setTotalOrders] = useState<any>([]);
    const [feedbackList, setFeedbackList] = useState<FeedbackModel[]>([]);

    const currentUser = localStorage.getItem('user_id');

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
        if (currentUser) {
            const fetchApi = async () => {
                const res = await orderServices.getAllOrderByUserId(currentUser);

                setTotalOrders(res.totalOrders);
            };

            fetchApi();
        }
    }, [currentUser]);

    // re-render component when remove order-item
    useEffect(() => {
        const handleStorageChange = () => {
            const fetchApi = async () => {
                const res = await orderServices.getAllOrderByUserId(currentUser + '');

                setTotalOrders(res.totalOrders);
            };

            fetchApi();
        };

        window.addEventListener('storage', handleStorageChange);

        // Lắng nghe sự kiện tùy chỉnh "storageChanged" trong cùng tab
        window.addEventListener('storageChanged', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('storageChanged', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const feedbackData =
                await feedbackServices.getAllFeedbackByUserId(
                    customerId || currentUser + ''
                );

            setFeedbackList(feedbackData.result);
        };

        fetchApi();
    }, []);

    return (
        <div className="container-spacing">
            <div className={cx('profile')}>
                <CustomerInfo></CustomerInfo>
                <div className={cx('profile__nav-list')}>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 1,
                        })}
                        onClick={() => setShowTabContent(1)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={
                                    <FontAwesomeIcon icon={faCartShopping} />
                                }
                            >
                                Orders
                            </Button>
                            <span className={cx('profile__nav-count')}>
                                {`(${totalOrders})`}
                            </span>
                        </div>
                    </div>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 2,
                        })}
                        onClick={() => setShowTabContent(2)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={<FontAwesomeIcon icon={faStar} />}
                            >
                                Reviews
                            </Button>
                            <span className={cx('profile__nav-count')}>
                                {`(${feedbackList.length})`}
                            </span>
                        </div>
                    </div>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 3,
                        })}
                        onClick={() => setShowTabContent(3)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={<FontAwesomeIcon icon={faHeart} />}
                            >
                                Wishlist
                            </Button>
                        </div>
                    </div>
                    <div
                        className={cx('profile__nav-item', {
                            active: showTabContent === 4,
                        })}
                        onClick={() => setShowTabContent(4)}
                    >
                        <div className={cx('profile__nav-wrapper')}>
                            <Button
                                className={cx('profile__nav-btn')}
                                leftIcon={<FontAwesomeIcon icon={faUser} />}
                            >
                                Personal info
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 1,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <Orders></Orders>
                    </div>
                </div>
                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 2,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <Reviews></Reviews>
                    </div>
                </div>
                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 3,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <Wishlist></Wishlist>
                    </div>
                </div>
                <div
                    className={cx('profile__tab-content', {
                        show: showTabContent === 4,
                    })}
                >
                    <div className={cx('profile__tab-panel')}>
                        <PersonalInfo></PersonalInfo>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

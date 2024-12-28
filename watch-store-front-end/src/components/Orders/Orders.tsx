import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Orders.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { CheckNoCircleIcon, RightIcon } from '../Icons';
import Label from '../Label';
import Pagination from '../Pagination';
import * as orderServices from '../../services/orderServices';
import { formatPrice, getCurrentDateWithHour } from '../../utils/Functions';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

interface OrdersProps {
    className?: string;
}

const Orders = ({ className }: OrdersProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [limit, setLimit] = useState(6);

    const [viewAll, setViewAll] = useState(false);

    const currentUser = localStorage.getItem('user_id');
    const [orderList, setOrderList] = useState<any>([]);
    const [loading, setLoading] = useState(false);


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
            setLoading(true);
            const fetchApi = async () => {
                const res = await orderServices.getAllOrderByUserId(
                    customerId || currentUser,
                    currentPage,
                    limit
                );

                setOrderList(res.result);
                setTotalPage(res.totalPage);
                setTotalOrders(res.totalOrders);
                setLoading(false);
            };

            setTimeout(() => {
                fetchApi();
            }, 300);
        }
    }, [currentUser, currentPage, limit]);

    // re-render component when remove order-item
    useEffect(() => {
        const handleStorageChange = () => {
            setLoading(true);
            const fetchApi = async () => {
                const res = await orderServices.getAllOrderByUserId(
                    customerId || currentUser + '',
                    currentPage,
                    limit
                );

                setOrderList(res.result);
                setTotalPage(res.totalPage);
                setTotalOrders(res.totalOrders);
                setLoading(false);
            };
            setTimeout(() => {
                fetchApi();
            }, 300);
        };

        window.addEventListener('storage', handleStorageChange);

        // Lắng nghe sự kiện tùy chỉnh "storageChanged" trong cùng tab
        window.addEventListener('storageChanged', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('storageChanged', handleStorageChange);
        };
    }, []);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    const handleRemoveOrderItem = (orderId: string) => {
        const fetchApi = async () => {
            setLoading(true);
            const res = await orderServices.deleteOrderItem(orderId); // Bug: No delete in db

            if (res.status === 'OK') {
                const res = await orderServices.getAllOrderByUserId(
                    customerId || currentUser + '',
                    currentPage
                );

                setOrderList(res.result);
                setTotalPage(res.totalPage);
                setTotalOrders(res.totalOrders);

                // handle remove last item
                const remainder = res.totalOrders % 6;
                const totalPages = Math.ceil((res.totalOrders + 1) / limit);

                if (
                    remainder === 0 &&
                    res.totalOrders > 0 &&
                    currentPage === totalPages &&
                    !viewAll
                ) {
                    setCurrentPage(currentPage - 1);
                }

                setLoading(false);
            }
        };

        setTimeout(() => {
            fetchApi();
        }, 300);
    };

    const handleViewAll = () => {
        if (!viewAll) {
            setLimit(totalOrders);
        } else {
            setLimit(6);
        }
        setViewAll(!viewAll);
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    if (orderList.length === 0) {
        return <></>
    }

    return (
        <div className={cx('order', className)}>
            <div className={cx('order__container')}>
                <table className={cx('order__table')}>
                    <thead>
                        <tr>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '140px' }}
                            >
                                order
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '180px' }}
                            >
                                status
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '20%', minWidth: '180px' }}
                            >
                                delivery method
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '160px' }}
                            >
                                date{' '}
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%', minWidth: '160px' }}
                            >
                                total
                            </th>
                            <th
                                className={cx('order__heading')}
                                style={{ width: '15%' }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map((orderItem: any, index: number) => (
                            <tr key={index}>
                                <td className={cx('order__number')}>
                                    <Link
                                        to={`/customer/order-details/${orderItem.id}`}
                                        className={cx('order__link')}
                                    >
                                        {`#OID${orderItem.id}`}
                                    </Link>
                                </td>
                                <td className={cx('order__status')}>
                                    <Label
                                        paymentStatus={orderItem.payment_status}
                                        paymentMethod={
                                            orderItem.payment_method_name
                                        }
                                        status={orderItem.status}
                                        modifier={!!className}
                                    ></Label>
                                </td>
                                <td className={cx('order__delivery')}>
                                    {orderItem.payment_method_name}
                                </td>
                                <td className={cx('order__date')}>
                                    {getCurrentDateWithHour(
                                        orderItem.order_date
                                    )}
                                </td>
                                <td className={cx('order__total')}>
                                    {/* Checkkkk */}
                                    {formatPrice(
                                        orderItem.sub_total +
                                        orderItem.shipping_cost
                                    )}
                                </td>
                                <td className={cx('order__options')}>
                                    <div className={cx('order__dropdown')}>
                                        <Tippy
                                            interactive
                                            delay={[0, 300]}
                                            offset={[0, 0]}
                                            placement="bottom-end"
                                            trigger="click"
                                            render={(attrs) => (
                                                <div
                                                    className={cx(
                                                        'order__menu'
                                                    )}
                                                >
                                                    <Button
                                                        to={`/customer/order-details/${orderItem.id}`}
                                                        className={cx(
                                                            'order__act-btn'
                                                        )}
                                                    >
                                                        view
                                                    </Button>
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'order__act-btn'
                                                        )}
                                                    >
                                                        export
                                                    </Button>
                                                    <hr />
                                                    <Button
                                                        className={cx(
                                                            'order__act-btn'
                                                        )}
                                                        onClick={() =>
                                                            handleRemoveOrderItem(
                                                                orderItem.id
                                                            )
                                                        }
                                                    >
                                                        remove
                                                    </Button>
                                                </div>
                                            )}
                                        >
                                            <Button
                                                className={cx('order__btn')}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                />
                                            </Button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                className={cx('order__bottom', {
                    'd-none': currentUser
                        ? totalPage === 1 && orderList.length <= 6
                        : false,
                })}
            >
                <div className={cx('order__view')}>
                    <p
                        className={cx('order__view-desc', {
                            'd-sm-none': true,
                        })}
                    >
                        {viewAll
                            ? `1 to ${totalOrders} items of ${totalOrders}`
                            : `${limit * (currentPage - 1) + 1} to ${currentPage * 6 >= totalOrders
                                ? totalOrders
                                : currentPage * 6
                            } items of ${totalOrders}`}
                    </p>
                    <Button
                        className={cx('order__view-btn', {
                            'd-none': currentPage > 1 || className,
                        })}
                        rightIcon={<RightIcon></RightIcon>}
                        onClick={handleViewAll}
                    >
                        {viewAll ? 'View less' : 'View all'}
                    </Button>
                </div>
                <div className={cx('order__paging')}>
                    <Pagination
                        modifier
                        currentPage={currentPage}
                        totalPage={viewAll ? 1 : totalPage}
                        pagination={pagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};

export default Orders;

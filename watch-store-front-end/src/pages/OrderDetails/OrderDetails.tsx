import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import styles from './OrderDetails.module.scss';
import Image from '../../components/Image';
import images from '../../assets/images';
import { CheckNoCircleIcon, UpArrowIcon } from '../../components/Icons';
import * as orderDetailServices from '../../services/orderDetailServices';
import ProductModel from '../../models/ProductModel';
import * as productServices from '../../services/productServices';
import {
    formatPrice,
    getCurrentDate,
    getCurrentDateWithHour,
    getCurrentHour,
    getMonth,
    notifySuccess,
} from '../../utils/Functions';
import PreLoader from '../../components/PreLoader';
import * as orderServices from '../../services/orderServices';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRotateLeft,
    faArrowRotateRight,
    faChevronDown,
    faPrint,
} from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

const cx = classNames.bind(styles);

// Note: Check xem timeline co 2 thang khac nhau khong de loai bo min-width
// Note: Timeline con truong hop index < orderStatus
// Note: Timeline chi moi dung cho TH orderStatus = 2 = PENDING

interface OrderDetailsProps {
    modifier?: boolean;
}

const OrderDetails = ({ modifier }: OrderDetailsProps) => {
    const [orderStatus, setOrderStatus] = useState(2);
    const currentUser = localStorage.getItem('user_id');
    const [total, setTotal] = useState(0);
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [orderProducts, setOrderProducts] = useState<any>([]);
    const [orderDetail, setOrderDetail] = useState<any>({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [fulfillmentStatus, setFulfillmentStatus] = useState('');

    // Get productId from url
    const { orderId } = useParams();

    let orderIdNumber = 0;
    try {
        orderIdNumber = parseInt(orderId + '');
        if (Number.isNaN(orderIdNumber)) {
            orderIdNumber = 0;
        }
    } catch (error) {
        orderIdNumber = 0;
        console.log('Error:', error);
    }

    // Get order product detail
    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                window.scrollTo(0, 0);
                const orderProducts =
                    await orderDetailServices.getOrderDetailByOrderId(
                        orderIdNumber + ''
                    );
                setOrderProducts(orderProducts);
                let result: ProductModel[] = [];

                const fetchApi = async (productId: any) => {
                    const res = await productServices.getProductById(
                        productId.product_id
                    );

                    result.push(res);

                    if (result.length === orderProducts.length) {
                        setProductList(result);
                        let totalTemp = 0;
                        result.forEach((productItem, index) => {
                            if (productItem.discount) {
                                totalTemp =
                                    totalTemp +
                                    orderProducts.at(index).quantity *
                                    productItem.price *
                                    (1 - productItem.discount / 100);
                            } else {
                                totalTemp =
                                    orderProducts.at(index).quantity *
                                    productItem.price;
                            }
                        });
                        setTotal(totalTemp);
                        window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh

                        setLoading(false);
                    }
                };

                const fetchApis = async (orderProducts: any) => {
                    for await (const item of orderProducts) {
                        await fetchApi(item);
                    }
                };
                fetchApis(orderProducts);


            };

            fetchApi();
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                const res = await orderServices.getOrderByOrderId(
                    orderIdNumber + ''
                );

                // VNPay
                if (res.payment_method_id === 1) {
                    setPaymentStatus(res.payment_status ? 'Completed' : 'Canceled');
                } else {
                    setPaymentStatus('Processing');
                }

                setFulfillmentStatus(res.status);

                setOrderDetail(res);


                // Trang thai thanh cong gan nhat
                // ready : initialValue = 0
                // pending: initialValue = -1
                // InitialValue = - 1 =>> PENDING

                switch (res.status) {
                    // case 'Is ready':
                    //     setOrderStatus(0);
                    //     break;
                    // case 'Order is processing':
                    //     setOrderStatus(1);
                    //     break;
                    // InitialValue = 2 =>> PENDING
                    case 'PENDING':
                        setOrderStatus(2);
                        break;
                    case 'PROCESSING':
                        setOrderStatus(3);
                        break;
                    case 'SHIPPED':
                        console.log('cc');

                        setOrderStatus(4);
                        break;
                    case 'DELIVERY':
                        setOrderStatus(5);
                        break;
                    default:
                        break;
                }
            };

            fetchApi();
        }
    }, []);

    const handleOrderTime = (index: number, isGetDate: string) => {
        if (isGetDate) {
            if (orderStatus === index) {
                return getCurrentDate(orderDetail.order_date);
            } else if (orderStatus + 1 === index) {
                return getCurrentDate(orderDetail.order_date + 104400000); //104400000 = 1 day 5 hours
            } else if (orderStatus + 1 < index) {
                return 'Estimated time';
            }
            else {
                // Còn trường hợp index < orderStatus
                // temp
                return getCurrentDate(orderDetail.order_date);
            }
        } else {
            if (orderStatus === index) {
                return getCurrentHour(orderDetail.order_date);
            } else if (orderStatus + 1 === index) {
                return getCurrentHour(orderDetail.order_date + 104400000);
            } else if (orderStatus + 1 < index) {
                return getCurrentDate(
                    orderDetail.order_date +
                    104400000 +
                    (index - orderStatus) * 24 * 60 * 60 * 1000 // (index - orderStatus) days
                );
            } else {
                // Còn trường hợp index < orderStatus
                // temp
                return getCurrentHour(orderDetail.order_date);
            }
        }
    };

    const handlePaymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentStatus(e.target.value);

        const fetchApi = async () => {
            setLoading(true);
            const orderDetailData = await orderDetailServices.getOrderDetailByOrderId(orderDetail.id)

            let cartItems = [];
            if (orderDetailData) {
                cartItems = orderDetailData.map((item: any) => ({
                    "user_id": orderDetail.user_id,
                    "product_id": item.product_id,
                    "quantity": item.quantity,
                    "color_id": item.color_id,
                    "material_id": item.material_id,
                    "screen_size_id": item.screen_size_id
                }))
            }

            const data = {
                user_id: orderDetail.user_id,
                first_name: orderDetail.first_name,
                last_name: orderDetail.last_name,
                email: orderDetail.email,
                phone_number: orderDetail.phone_number,
                address: orderDetail.address,
                note: orderDetail.note,
                total_money: orderDetail.total_money,
                sub_total: orderDetail.sub_total,
                shipping_method_id: orderDetail.shipping_method_id,
                payment_method_id: orderDetail.payment_method_id,
                payment_status: !!e.target.value,
                shipping_address: orderDetail.shipping_address,
                cart_items: cartItems,
                status: orderDetail.status
            };

            const res = await orderServices.putOrder(orderDetail.id, data)

            if (res.status === 'OK') {
                setLoading(false);
                setTimeout(() => {
                    notifySuccess('Order updated successfully');
                }, 0);
            }
        };

        fetchApi();

    };

    const handleFulfillmentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFulfillmentStatus(e.target.value);

        const fetchApi = async () => {
            setLoading(true);
            const orderDetailData = await orderDetailServices.getOrderDetailByOrderId(orderDetail.id)

            let cartItems = [];
            if (orderDetailData) {
                cartItems = orderDetailData.map((item: any) => ({
                    "user_id": orderDetail.user_id,
                    "product_id": item.product_id,
                    "quantity": item.quantity,
                    "color_id": item.color_id,
                    "material_id": item.material_id,
                    "screen_size_id": item.screen_size_id
                }))
            }

            const data = {
                user_id: orderDetail.user_id,
                first_name: orderDetail.first_name,
                last_name: orderDetail.last_name,
                email: orderDetail.email,
                phone_number: orderDetail.phone_number,
                address: orderDetail.address,
                note: orderDetail.note,
                total_money: orderDetail.total_money,
                sub_total: orderDetail.sub_total,
                shipping_method_id: orderDetail.shipping_method_id,
                payment_method_id: orderDetail.payment_method_id,
                payment_status: orderDetail.payment_status,
                shipping_address: orderDetail.shipping_address,
                cart_items: cartItems,
                status: e.target.value
            };

            const res = await orderServices.putOrder(orderDetail.id, data)

            if (res.status === 'OK') {
                setLoading(false);
                setTimeout(() => {
                    notifySuccess('Order updated successfully');
                }, 0);
            }
        };

        fetchApi();

    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className="container-spacing">
            <div
                className={cx('order-details', {
                    modifier,
                })}
            >
                <div className={cx('order-details__top')}>
                    <h2 className={cx('order-details__title')}>
                        {`Order #OID${orderIdNumber}`}
                    </h2>
                    <div
                        className={cx('order-details__actions', {
                            'd-none': !modifier,
                        })}
                    >
                        <Button
                            className={cx('order-details__action')}
                            leftIcon={<FontAwesomeIcon icon={faPrint} />}
                        >
                            Print
                        </Button>
                        <Button
                            className={cx('order-details__action')}
                            leftIcon={
                                <FontAwesomeIcon icon={faArrowRotateLeft} />
                            }
                        >
                            Refund
                        </Button>
                        <Tippy
                            visible={showDropdown}
                            interactive
                            delay={[0, 300]}
                            offset={[0, 10]}
                            placement="bottom-end"
                            onClickOutside={() => setShowDropdown(false)}
                            render={(attrs) => (
                                <div className={cx('dropdown-profile')}>
                                    <div
                                        className={cx('dropdown-profile__menu')}
                                    >
                                        <Link
                                            to={config.routes.profile}
                                            className={cx(
                                                'dropdown-profile__group'
                                            )}
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                        >
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Action
                                            </span>
                                        </Link>
                                        <Link
                                            to={config.routes.profile}
                                            className={cx(
                                                'dropdown-profile__group'
                                            )}
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                        >
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Another action
                                            </span>
                                        </Link>
                                        <Link
                                            to={config.routes.profile}
                                            className={cx(
                                                'dropdown-profile__group'
                                            )}
                                            onClick={() =>
                                                setShowDropdown(false)
                                            }
                                        >
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Something else
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        >
                            <Button
                                className={cx('order-details__action')}
                                rightIcon={
                                    <FontAwesomeIcon icon={faChevronDown} />
                                }
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                More action
                            </Button>
                        </Tippy>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col col-8 col-xl-12">
                        <div className={cx('order-details__left')}>
                            <div
                                className={cx('products', {
                                    modifier,
                                })}
                            >
                                <div className={cx('products__container')}>
                                    <table className={cx('products__table')}>
                                        <thead>
                                            <tr>
                                                <th
                                                    className={cx(
                                                        'products__heading'
                                                    )}
                                                    style={{
                                                        width: '9%',
                                                        minWidth: '70px',
                                                    }}
                                                ></th>
                                                <th
                                                    className={cx(
                                                        'products__heading'
                                                    )}
                                                    style={{
                                                        minWidth: '300px',
                                                        width: '34%',
                                                    }}
                                                >
                                                    products
                                                </th>
                                                <th
                                                    className={cx(
                                                        'products__heading'
                                                    )}
                                                    style={{
                                                        width: '22%',
                                                        minWidth: '180px',
                                                    }}
                                                >
                                                    Variant
                                                </th>
                                                <th
                                                    className={cx(
                                                        'products__heading'
                                                    )}
                                                    style={{
                                                        width: '15%',
                                                        minWidth: '140px',
                                                    }}
                                                >
                                                    price
                                                </th>
                                                <th
                                                    className={cx(
                                                        'products__heading'
                                                    )}
                                                    style={{
                                                        width: '12%',
                                                        minWidth: '110px',
                                                    }}
                                                >
                                                    quantity
                                                </th>
                                                <th
                                                    className={cx(
                                                        'products__heading'
                                                    )}
                                                    style={{
                                                        width: '8%',
                                                        minWidth: '60px',
                                                    }}
                                                >
                                                    total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productList.map(
                                                (productItem, index) => (
                                                    <tr key={index}>
                                                        <td
                                                            className={cx(
                                                                'products__media'
                                                            )}
                                                            style={{
                                                                width: '9%',
                                                                minWidth:
                                                                    '70px',
                                                            }}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'products__img-wrapper'
                                                                )}
                                                            >
                                                                <Image
                                                                    src={
                                                                        productItem.productImages
                                                                            .filter(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.colorId ===
                                                                                    orderProducts?.at(
                                                                                        index
                                                                                    )
                                                                                        .color_id &&
                                                                                    item.isMainImage
                                                                            )
                                                                            .at(
                                                                                0
                                                                            )
                                                                            ?.imageUrl ||
                                                                        ''
                                                                    }
                                                                    alt="image"
                                                                    loading={
                                                                        'lazy'
                                                                    }
                                                                    className={cx(
                                                                        'products__img'
                                                                    )}
                                                                ></Image>
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                'products__product'
                                                            )}
                                                            style={{
                                                                minWidth:
                                                                    '300px',
                                                                width: '34%',
                                                            }}
                                                        >
                                                            <Link
                                                                to={`/products/${productItem.productId}`}
                                                                className={cx(
                                                                    'products__link',
                                                                    {
                                                                        'line-clamp':
                                                                            true,
                                                                    }
                                                                )}
                                                            >
                                                                {
                                                                    productItem.title
                                                                }
                                                            </Link>
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                'products__color'
                                                            )}
                                                            style={{
                                                                width: '22%',
                                                                minWidth:
                                                                    '180px',
                                                            }}
                                                        >
                                                            <p
                                                                className={cx(
                                                                    'products__color-text',
                                                                    {
                                                                        'line-clamp':
                                                                            true,
                                                                    }
                                                                )}
                                                            >
                                                                {
                                                                    productItem.colors
                                                                        .filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.colorId ===
                                                                                orderProducts.at(
                                                                                    index
                                                                                )
                                                                                    .color_id
                                                                        )
                                                                        .at(0)
                                                                        ?.name
                                                                }{' '}
                                                                /{' '}
                                                                {productItem?.screenSizes
                                                                    ?.filter(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.sizeId ===
                                                                            orderProducts.at(
                                                                                index
                                                                            )
                                                                                .screen_size_id
                                                                    )
                                                                    .at(0)
                                                                    ?.size +
                                                                    ' Inches'}{' '}
                                                                /{' '}
                                                                {
                                                                    productItem?.materials
                                                                        ?.filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.materialId ===
                                                                                orderProducts.at(
                                                                                    index
                                                                                )
                                                                                    .material_id
                                                                        )
                                                                        .at(0)
                                                                        ?.name
                                                                }
                                                            </p>
                                                        </td>

                                                        <td
                                                            className={cx(
                                                                'products__price'
                                                            )}
                                                            style={{
                                                                width: '15%',
                                                                minWidth:
                                                                    '140px',
                                                            }}
                                                        >
                                                            {productItem.discount
                                                                ? formatPrice(
                                                                    productItem.price *
                                                                    (1 -
                                                                        productItem.discount /
                                                                        100)
                                                                )
                                                                : formatPrice(
                                                                    productItem.price
                                                                )}
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                'products__quantity'
                                                            )}
                                                            style={{
                                                                width: '12%',
                                                                minWidth:
                                                                    '110px',
                                                            }}
                                                        >
                                                            {
                                                                orderProducts.at(
                                                                    index
                                                                ).quantity
                                                            }
                                                        </td>
                                                        <td
                                                            className={cx(
                                                                'products__total'
                                                            )}
                                                            style={{
                                                                width: '8%',
                                                                minWidth:
                                                                    '60px',
                                                            }}
                                                        >
                                                            {productItem.discount
                                                                ? formatPrice(
                                                                    orderProducts.at(
                                                                        index
                                                                    )
                                                                        .quantity *
                                                                    productItem.price *
                                                                    (1 -
                                                                        productItem.discount /
                                                                        100)
                                                                )
                                                                : formatPrice(
                                                                    orderProducts.at(
                                                                        index
                                                                    )
                                                                        .quantity *
                                                                    productItem.price
                                                                )}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className={cx('products__bottom')}>
                                    <p className={cx('products__subtotal')}>
                                        Items subtotal :
                                    </p>
                                    <p
                                        className={cx(
                                            'products__subtotal-price'
                                        )}
                                    >
                                        {formatPrice(total)}
                                    </p>
                                </div>
                            </div>
                            {/* Order details */}
                            <div className={cx('order__info')}>
                                <h3 className={cx('order__info-title')}>
                                    Order Details
                                </h3>
                                <div className={cx('order__buyer-info')}>
                                    <div className={cx('order__info-row')}>
                                        <div
                                            className={cx('order__info-label')}
                                        >
                                            Order ID:
                                        </div>
                                        <div
                                            className={cx('order__info-value')}
                                        >
                                            {`OID${orderDetail.id}`}
                                        </div>
                                    </div>
                                    <div className={cx('order__info-row')}>
                                        <div
                                            className={cx('order__info-label')}
                                        >
                                            Date:
                                        </div>
                                        <div
                                            className={cx('order__info-value')}
                                        >
                                            {getCurrentDateWithHour(
                                                orderDetail.order_date,
                                                true
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('order__info-row')}>
                                        <div
                                            className={cx('order__info-label')}
                                        >
                                            Consignee:
                                        </div>
                                        <div
                                            className={cx('order__info-value')}
                                        >
                                            {orderDetail.first_name}
                                        </div>
                                    </div>
                                    <div className={cx('order__info-row')}>
                                        <div
                                            className={cx('order__info-label')}
                                        >
                                            Phone:
                                        </div>
                                        <div
                                            className={cx('order__info-value')}
                                        >
                                            {orderDetail.phone_number}
                                        </div>
                                    </div>
                                    <div className={cx('order__info-row')}>
                                        <div
                                            className={cx('order__info-label')}
                                        >
                                            Email:
                                        </div>
                                        <div
                                            className={cx('order__info-value')}
                                        >
                                            {orderDetail.email}
                                        </div>
                                    </div>
                                    <div className={cx('order__info-row')}>
                                        <div
                                            className={cx('order__info-label')}
                                        >
                                            Payment method:
                                        </div>
                                        <div
                                            className={cx('order__info-value')}
                                        >
                                            {orderDetail.payment_method_name}
                                        </div>
                                    </div>
                                    <div className={cx('order__info-row')}>
                                        <div
                                            className={cx('order__info-label')}
                                        >
                                            Shipping address:
                                        </div>
                                        <div
                                            className={cx('order__info-value')}
                                        >
                                            {orderDetail.shipping_address}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-4 col-xl-12">
                        <div className={cx('summary')}>
                            <h3 className={cx('summary__title')}>Summary</h3>
                            <div className={cx('summary__row')}>
                                <p className={cx('summary__label')}>
                                    Subtotal :
                                </p>
                                <p className={cx('summary__subtotal')}>
                                    {formatPrice(total)}
                                </p>
                            </div>
                            <div className={cx('summary__row')}>
                                <p className={cx('summary__label')}>
                                    Discount :
                                </p>
                                <p
                                    className={cx('summary__discount')}
                                >{`-${formatPrice(0)}`}</p>
                            </div>
                            <div className={cx('summary__row')}>
                                <p className={cx('summary__label')}>
                                    Shipping Cost :
                                </p>
                                <p className={cx('summary__shipping-cost')}>
                                    {formatPrice(
                                        Number.parseFloat(
                                            orderDetail.shipping_cost + ''
                                        )
                                    )}
                                </p>
                            </div>
                            <div className={cx('summary__bottom')}>
                                <p className={cx('summary__label-total')}>
                                    Total :
                                </p>
                                <p className={cx('summary__total')}>
                                    {formatPrice(
                                        Number.parseFloat(
                                            total +
                                            orderDetail.shipping_cost +
                                            ''
                                        )
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className={cx('timeline', { 'd-none': modifier })}>
                            <h3 className={cx('timeline__heading')}>
                                Order Status
                            </h3>
                            {/* Processing */}
                            {/* <div className={cx('timeline__item')}>
                                <div className="row gy-xl-0 gx-xl-2">
                                    <div className="col col-12 ">
                                        <div className={cx('timeline__row')}>
                                            <div
                                                className={cx(
                                                    'timeline__date-wrapper'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'timeline__date'
                                                    )}
                                                >
                                                    23 August, 2023
                                                    <span> 10:30 AM</span>
                                                </p>
                                            </div>
                                            <div
                                                className={cx(
                                                    'timeline__separator'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'timeline__icon',
                                                        {
                                                            success:
                                                                orderStatus >=
                                                                1,
                                                            ready:
                                                                orderStatus ===
                                                                0,
                                                            pending:
                                                                orderStatus <=
                                                                -1,
                                                        }
                                                    )}
                                                >
                                                    {orderStatus >= 1 && (
                                                        <CheckNoCircleIcon
                                                            width="0.8rem"
                                                            height="1rem"
                                                        ></CheckNoCircleIcon>
                                                    )}
                                                    {(orderStatus === 0 ||
                                                        orderStatus <= -1) && (
                                                        <svg
                                                            width={'13'}
                                                            height={'10'}
                                                            fill="currentColor"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 512 512"
                                                        >
                                                            <path d="M215.4 96L144 96l-36.2 0L96 96l0 8.8L96 144l0 40.4 0 89L.2 202.5c1.6-18.1 10.9-34.9 25.7-45.8L48 140.3 48 96c0-26.5 21.5-48 48-48l76.6 0 49.9-36.9C232.2 3.9 243.9 0 256 0s23.8 3.9 33.5 11L339.4 48 416 48c26.5 0 48 21.5 48 48l0 44.3 22.1 16.4c14.8 10.9 24.1 27.7 25.7 45.8L416 273.4l0-89 0-40.4 0-39.2 0-8.8-11.8 0L368 96l-71.4 0-81.3 0zM0 448L0 242.1 217.6 403.3c11.1 8.2 24.6 12.7 38.4 12.7s27.3-4.4 38.4-12.7L512 242.1 512 448s0 0 0 0c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64c0 0 0 0 0 0zM176 160l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span
                                                    className={cx(
                                                        'timeline__line',
                                                        {
                                                            success:
                                                                orderStatus > 1,
                                                            ready:
                                                                orderStatus ===
                                                                1,
                                                            pending:
                                                                orderStatus <=
                                                                0,
                                                        }
                                                    )}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col ">
                                        <div
                                            className={cx('timeline__content')}
                                        >
                                            <h4
                                                className={cx(
                                                    'timeline__label'
                                                )}
                                            >
                                                Order is processing
                                            </h4>
                                            <p
                                                className={cx(
                                                    'timeline__desc',
                                                    { 'line-clamp': true }
                                                )}
                                            >
                                                {orderStatus >= 1 &&
                                                    'Your package is ready for the seller to prepare.'}
                                                {orderStatus === 0 &&
                                                    'Your package is now ready to be shipped.'}
                                                {orderStatus <= -1 && 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* Picked up */}
                            <div className={cx('timeline__item')}>
                                <div className="row gy-xl-0 gx-xl-2">
                                    <div className="col col-12 ">
                                        <div className={cx('timeline__row')}>
                                            <div
                                                className={cx(
                                                    'timeline__date-wrapper'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'timeline__date',
                                                        {
                                                            modifier:
                                                                getMonth(
                                                                    orderDetail.order_date
                                                                ) !==
                                                                getMonth(
                                                                    orderDetail.order_date +
                                                                    104400000 +
                                                                    (5 -
                                                                        orderStatus -
                                                                        1) *
                                                                    24 *
                                                                    60 *
                                                                    60 *
                                                                    1000
                                                                ),
                                                        }
                                                    )}
                                                >
                                                    {handleOrderTime(
                                                        2,
                                                        'getDate'
                                                    )}{' '}
                                                    <span>
                                                        {handleOrderTime(2, '')}{' '}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                className={cx(
                                                    'timeline__separator'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'timeline__icon',
                                                        {
                                                            success:
                                                                orderStatus >=
                                                                2,
                                                            ready:
                                                                orderStatus ===
                                                                1,
                                                            pending:
                                                                orderStatus <=
                                                                0,
                                                        }
                                                    )}
                                                >
                                                    {orderStatus >= 2 && (
                                                        <CheckNoCircleIcon
                                                            width="0.8rem"
                                                            height="1rem"
                                                        ></CheckNoCircleIcon>
                                                    )}
                                                    {(orderStatus === 1 ||
                                                        orderStatus <= 0) && (
                                                            <svg
                                                                width={'13'}
                                                                height={'10'}
                                                                fill="currentColor"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 448 512"
                                                            >
                                                                <path d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z" />
                                                            </svg>
                                                        )}
                                                </div>
                                                <span
                                                    className={cx(
                                                        'timeline__line',
                                                        {
                                                            success:
                                                                orderStatus > 2,
                                                            ready:
                                                                orderStatus ===
                                                                2,
                                                            pending:
                                                                orderStatus <=
                                                                1,
                                                        }
                                                    )}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div
                                            className={cx('timeline__content')}
                                        >
                                            <h4
                                                className={cx(
                                                    'timeline__label'
                                                )}
                                            >
                                                Picked Up
                                            </h4>
                                            <p className={cx('timeline__desc')}>
                                                {orderStatus >= 2 &&
                                                    'Your package has been picked up from the seller.'}
                                                {orderStatus === 1 &&
                                                    'Your package is now ready to be shipped.'}
                                                {orderStatus <= 0 && 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Ready to ship */}
                            <div className={cx('timeline__item')}>
                                <div className="row gy-xl-0 gx-xl-2">
                                    <div className="col col-12">
                                        <div className={cx('timeline__row')}>
                                            <div
                                                className={cx(
                                                    'timeline__date-wrapper'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'timeline__date',
                                                        {
                                                            modifier:
                                                                getMonth(
                                                                    orderDetail.order_date
                                                                ) !==
                                                                getMonth(
                                                                    orderDetail.order_date +
                                                                    104400000 +
                                                                    (5 -
                                                                        orderStatus -
                                                                        1) *
                                                                    24 *
                                                                    60 *
                                                                    60 *
                                                                    1000
                                                                ),
                                                        }
                                                    )}
                                                >
                                                    {handleOrderTime(
                                                        3,
                                                        'getDate'
                                                    )}{' '}
                                                    <span>
                                                        {handleOrderTime(3, '')}{' '}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                className={cx(
                                                    'timeline__separator'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'timeline__icon',
                                                        {
                                                            success:
                                                                orderStatus >=
                                                                3,
                                                            ready:
                                                                orderStatus ===
                                                                2,
                                                            pending:
                                                                orderStatus <=
                                                                1,
                                                        }
                                                    )}
                                                >
                                                    {orderStatus >= 3 && (
                                                        <CheckNoCircleIcon
                                                            width="0.8rem"
                                                            height="1rem"
                                                        ></CheckNoCircleIcon>
                                                    )}
                                                    {(orderStatus === 2 ||
                                                        orderStatus <= 1) && (
                                                            <svg
                                                                width={'13'}
                                                                height={'10'}
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                data-prefix="fas"
                                                                data-icon="truck-ramp-box"
                                                                role="img"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 640 512"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M640 0V400c0 61.9-50.1 112-112 112c-61 0-110.5-48.7-112-109.3L48.4 502.9c-17.1 4.6-34.6-5.4-39.3-22.5s5.4-34.6 22.5-39.3L352 353.8V64c0-35.3 28.7-64 64-64H640zM576 400a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM23.1 207.7c-4.6-17.1 5.6-34.6 22.6-39.2l46.4-12.4 20.7 77.3c2.3 8.5 11.1 13.6 19.6 11.3l30.9-8.3c8.5-2.3 13.6-11.1 11.3-19.6l-20.7-77.3 46.4-12.4c17.1-4.6 34.6 5.6 39.2 22.6l41.4 154.5c4.6 17.1-5.6 34.6-22.6 39.2L103.7 384.9c-17.1 4.6-34.6-5.6-39.2-22.6L23.1 207.7z"
                                                                ></path>
                                                            </svg>
                                                        )}
                                                </div>
                                                <span
                                                    className={cx(
                                                        'timeline__line',
                                                        {
                                                            success:
                                                                orderStatus > 3,
                                                            ready:
                                                                orderStatus ===
                                                                3,
                                                            pending:
                                                                orderStatus <=
                                                                2,
                                                        }
                                                    )}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div
                                            className={cx('timeline__content')}
                                        >
                                            <h4
                                                className={cx(
                                                    'timeline__label'
                                                )}
                                            >
                                                Ready to Ship
                                            </h4>
                                            <p className={cx('timeline__desc')}>
                                                {orderStatus >= 3 &&
                                                    'Your package is ready for the shipped.'}
                                                {orderStatus === 2 &&
                                                    'Your package is now ready to be shipp.'}
                                                {orderStatus <= 1 && 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Shipped */}
                            <div className={cx('timeline__item')}>
                                <div className="row gy-xl-0 gx-xl-2">
                                    <div className="col col-12">
                                        <div className={cx('timeline__row')}>
                                            <div
                                                className={cx(
                                                    'timeline__date-wrapper'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'timeline__date',
                                                        {
                                                            modifier:
                                                                getMonth(
                                                                    orderDetail.order_date
                                                                ) !==
                                                                getMonth(
                                                                    orderDetail.order_date +
                                                                    104400000 +
                                                                    (5 -
                                                                        orderStatus -
                                                                        1) *
                                                                    24 *
                                                                    60 *
                                                                    60 *
                                                                    1000
                                                                ),
                                                        }
                                                    )}
                                                >
                                                    {handleOrderTime(
                                                        4,
                                                        'getDate'
                                                    )}{' '}
                                                    <span>
                                                        {handleOrderTime(4, '')}{' '}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                className={cx(
                                                    'timeline__separator'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'timeline__icon',
                                                        {
                                                            success:
                                                                orderStatus >=
                                                                4,
                                                            ready:
                                                                orderStatus ===
                                                                3,
                                                            pending:
                                                                orderStatus <=
                                                                2,
                                                        }
                                                    )}
                                                >
                                                    {orderStatus >= 4 && (
                                                        <CheckNoCircleIcon
                                                            width="0.8rem"
                                                            height="1rem"
                                                        ></CheckNoCircleIcon>
                                                    )}
                                                    {(orderStatus === 3 ||
                                                        orderStatus <= 2) && (
                                                            <svg
                                                                width={'13'}
                                                                height={10}
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                data-prefix="fas"
                                                                data-icon="truck"
                                                                role="img"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 640 512"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                                                                ></path>
                                                            </svg>
                                                        )}
                                                </div>
                                                <span
                                                    className={cx(
                                                        'timeline__line',
                                                        {
                                                            success:
                                                                orderStatus > 4,
                                                            ready:
                                                                orderStatus ===
                                                                4,
                                                            pending:
                                                                orderStatus <=
                                                                3,
                                                        }
                                                    )}
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div
                                            className={cx('timeline__content')}
                                        >
                                            <h4
                                                className={cx(
                                                    'timeline__label'
                                                )}
                                            >
                                                Shipped
                                            </h4>
                                            <p className={cx('timeline__desc')}>
                                                {orderStatus >= 4 &&
                                                    'Your package is shipped.'}
                                                {orderStatus === 3 &&
                                                    'Your package is now ready to be ship.'}
                                                {orderStatus <= 2 && 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Delivered */}
                            <div className={cx('timeline__item')}>
                                <div className="row gy-xl-0 gx-xl-2">
                                    <div className="col col-12">
                                        <div className={cx('timeline__row')}>
                                            <div
                                                className={cx(
                                                    'timeline__date-wrapper'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'timeline__date',
                                                        {
                                                            modifier:
                                                                getMonth(
                                                                    orderDetail.order_date
                                                                ) !==
                                                                getMonth(
                                                                    orderDetail.order_date +
                                                                    104400000 +
                                                                    (5 -
                                                                        orderStatus -
                                                                        1) *
                                                                    24 *
                                                                    60 *
                                                                    60 *
                                                                    1000
                                                                ),
                                                        }
                                                    )}
                                                >
                                                    {handleOrderTime(
                                                        5,
                                                        'getDate'
                                                    )}{' '}
                                                    <span>
                                                        {handleOrderTime(5, '')}{' '}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                className={cx(
                                                    'timeline__separator'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'timeline__icon',
                                                        {
                                                            success:
                                                                orderStatus >=
                                                                5,
                                                            ready:
                                                                orderStatus ===
                                                                4,
                                                            pending:
                                                                orderStatus <=
                                                                3,
                                                        }
                                                    )}
                                                >
                                                    {orderStatus >= 5 && (
                                                        <CheckNoCircleIcon
                                                            width="0.8rem"
                                                            height="1rem"
                                                        ></CheckNoCircleIcon>
                                                    )}
                                                    {(orderStatus === 4 ||
                                                        orderStatus <= 3) && (
                                                            <svg
                                                                width={'13'}
                                                                height={'10'}
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                data-prefix="fas"
                                                                data-icon="truck-fast"
                                                                role="img"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 640 512"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"
                                                                ></path>
                                                            </svg>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div
                                            className={cx('timeline__content')}
                                        >
                                            <h4
                                                className={cx(
                                                    'timeline__label'
                                                )}
                                            >
                                                Delivered
                                            </h4>
                                            <p className={cx('timeline__desc')}>
                                                {orderStatus >= 5 &&
                                                    'Your package is delivered.'}
                                                {orderStatus === 4 &&
                                                    'Your package is now ready to be delivery.'}
                                                {orderStatus <= 3 && 'Pending'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={cx('organize', { 'd-none': !modifier })}
                        >
                            <h4
                                className={cx('organize__label')}
                                style={{ marginBottom: '24px' }}
                            >
                                Order Status
                            </h4>

                            {/* Payment status */}
                            <div className={cx('organize__group')}>
                                <div className={cx('organize__top')}>
                                    <h5 className={cx('organize__title')}>
                                        Payment status
                                    </h5>
                                </div>
                                <select
                                    name="paymentStatus"
                                    id="paymentStatus"
                                    className={cx('organize__select')}
                                    value={paymentStatus}
                                    onChange={handlePaymentStatusChange}
                                >
                                    {
                                        orderDetail.payment_method_id === 2 && <option value="Processing">
                                            Processing
                                        </option>
                                    }
                                    {
                                        orderDetail.payment_method_id === 1 && <option value="">Canceled</option>   // vnpay
                                    }
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            {/* Fulfillment status */}
                            <div className={cx('organize__group')}>
                                <div className={cx('organize__top')}>
                                    <h5 className={cx('organize__title')}>
                                        Fulfillment status
                                    </h5>
                                </div>
                                <select
                                    name="fulfillmentStatus"
                                    id="fulfillmentStatus"
                                    className={cx('organize__select')}
                                    value={fulfillmentStatus}
                                    onChange={handleFulfillmentStatusChange}
                                >

                                    <option value="PENDING">Pending</option>
                                    <option value="PROCESSING">Processing</option>
                                    <option value="SHIPPED">Shipped</option>
                                    <option value="DELIVERY">Delivered</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

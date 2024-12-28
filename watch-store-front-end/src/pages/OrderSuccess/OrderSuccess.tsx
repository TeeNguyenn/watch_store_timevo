import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss';
import { OrderSuccessIcon } from '../../components/Icons';
import Image from '../../components/Image';
import images from '../../assets/images';
import Button from '../../components/Button';
import config from '../../config';
import * as orderServices from '../../services/orderServices';
import { formatPrice, getCurrentDate } from '../../utils/Functions';
import * as productServices from '../../services/productServices';
import ProductModel from '../../models/ProductModel';
import * as cartItemServices from '../../services/cartItemServices';
import PreLoader from '../../components/PreLoader';
import { useNavigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound';
import { useAppDispatch } from '../../redux/store';
import { deleteCartByUserId, getCart } from '../../layouts/components/Cart/cartSlice';

const cx = classNames.bind(styles);

const OrderSuccess = () => {
    const products = JSON.parse(localStorage.getItem('products') + '');

    const [orderDetail, setOrderDetail] = useState<any>({});
    const currentUser = localStorage.getItem('user_id');
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentUser && products && products.length > 0) {
            window.scrollTo(0, 0);

            let result: ProductModel[] = [];
            const fetchApi = async (cartItem: any) => {
                const res = await productServices.getProductById(
                    cartItem.product_id
                );

                result.push(res);

                if (result.length === products.length) {
                    setProductList(result);
                    let totalTemp = 0;
                    result.forEach((productItem, index) => {
                        if (productItem.discount) {
                            totalTemp =
                                totalTemp +
                                products.at(index).quantity *
                                productItem.price *
                                (1 - productItem.discount / 100);
                        } else {
                            totalTemp =
                                products.at(index).quantity * productItem.price;
                        }
                    });
                    setTotal(totalTemp);
                    setLoading(false);

                    const orderId = localStorage.getItem('orderId');
                    const res = await orderServices.getOrderByOrderId(orderId + '');

                    setOrderDetail(res);

                    //delete cart item
                    await dispatch(deleteCartByUserId())

                    await dispatch(getCart())

                    localStorage.setItem('products', JSON.stringify([]));
                    localStorage.setItem('orderId', JSON.stringify(''));

                }
            };

            const fetchApis = async (products: any) => {
                for await (const item of products) {
                    await fetchApi(item);
                }
            };
            fetchApis(products);
        }
    }, [currentUser]);



    if (
        products.length === 0 ||
        !localStorage.getItem('orderId') ||
        !products
    ) {
        return <PageNotFound></PageNotFound>;
    }

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('', { 'container-spacing': true })}>
            <div className={cx('order')}>
                <div className={cx('order__inner')}>
                    <div className={cx('order__top')}>
                        <OrderSuccessIcon></OrderSuccessIcon>
                        <h1 className={cx('order__title')}>Order Successful</h1>
                    </div>
                    <div className={cx('order__body')}>
                        <p className={cx('order__text')}>
                            Your order has been successfully processed. Please
                            check your email for more details.
                        </p>
                        <div className={cx('order__info')}>
                            <h3 className={cx('order__info-title')}>
                                Order Details
                            </h3>
                            <div className={cx('order__buyer-info')}>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Order ID:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        {`OID${orderDetail.id}`}
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Date:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        {getCurrentDate(orderDetail.order_date)}
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Consignee:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        {orderDetail.first_name}
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Mobile phone number:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        {orderDetail.phone_number}
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Email:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        {orderDetail.email}
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Payment method:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        {orderDetail.payment_method_name}
                                    </div>
                                </div>
                                <div className={cx('order__info-row')}>
                                    <div className={cx('order__info-label')}>
                                        Shipping address:
                                    </div>
                                    <div className={cx('order__info-value')}>
                                        {orderDetail.shipping_address}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('order__products')}>
                            <h3 className={cx('order__product-title')}>
                                Product
                            </h3>
                            <div className={cx('order__product-list')}>
                                {productList.map((productItem, index) => (
                                    <div className={cx('order__product-item')}>
                                        <div
                                            key={productItem.productId}
                                            className={cx(
                                                'order__product-media'
                                            )}
                                        >
                                            <Image
                                                src={
                                                    productItem.productImages
                                                        .filter(
                                                            (item) =>
                                                                item.colorId ===
                                                                products.at(
                                                                    index
                                                                )
                                                                    .color_id &&
                                                                item.isMainImage
                                                        )
                                                        .at(0)?.imageUrl || ''
                                                }
                                                className={cx(
                                                    'order__product-img'
                                                )}
                                            ></Image>
                                            <p
                                                className={cx(
                                                    'order__product-quantity'
                                                )}
                                            >
                                                {products.at(index).quantity}
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                'order__product-content'
                                            )}
                                        >
                                            <p
                                                className={cx(
                                                    'order__product-name'
                                                )}
                                            >
                                                {productItem.title}
                                            </p>
                                            <p
                                                className={cx(
                                                    'order__product-styles'
                                                )}
                                            >
                                                {
                                                    productItem.colors
                                                        .filter(
                                                            (item) =>
                                                                item.colorId ===
                                                                products.at(
                                                                    index
                                                                ).color_id
                                                        )
                                                        .at(0)?.name
                                                }{' '}
                                                /{' '}
                                                {productItem?.screenSizes
                                                    ?.filter(
                                                        (item) =>
                                                            item.sizeId ===
                                                            products.at(index)
                                                                .screen_size_id
                                                    )
                                                    .at(0)?.size +
                                                    ' Inches'}{' '}
                                                /{' '}
                                                {
                                                    productItem?.materials
                                                        ?.filter(
                                                            (item) =>
                                                                item.materialId ===
                                                                products.at(
                                                                    index
                                                                ).material_id
                                                        )
                                                        .at(0)?.name
                                                }
                                            </p>
                                        </div>
                                        <div
                                            className={cx(
                                                'order__product-price'
                                            )}
                                        >
                                            {productItem.discount
                                                ? formatPrice(
                                                    products.at(index)
                                                        .quantity *
                                                    productItem.price *
                                                    (1 -
                                                        productItem.discount /
                                                        100)
                                                )
                                                : formatPrice(
                                                    products.at(index)
                                                        .quantity *
                                                    productItem.price
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('order__subtotal')}>
                                <h3 className={cx('order__subtotal-label')}>
                                    Subtotal
                                </h3>
                                <p className={cx('order__subtotal-price')}>
                                    {formatPrice(total)}
                                </p>
                            </div>
                            <div className={cx('order__shipping')}>
                                <h3 className={cx('order__shipping-label')}>
                                    Shipping
                                </h3>
                                <p className={cx('order__shipping-price')}>
                                    {formatPrice(orderDetail.shipping_cost)}
                                </p>
                            </div>
                            <div className={cx('order__total')}>
                                <h3 className={cx('order__total-label')}>
                                    Total
                                </h3>
                                <p className={cx('order__total-price')}>
                                    {formatPrice(
                                        total + orderDetail.shipping_cost
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className={cx('order__btn-wrapper')}>
                            <Button
                                to={config.routes.shop}
                                rounded
                                primary
                                className={cx('order__btn')}
                            >
                                Continue shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;

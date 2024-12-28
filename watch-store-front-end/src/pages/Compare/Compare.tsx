import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from '../../components/Button';
import styles from './Compare.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Image from '../../components/Image';
import images from '../../assets/images';
import { CloseIcon } from '../../components/Icons';
import config from '../../config';
import ProductModel from '../../models/ProductModel';
import * as productServices from '../../services/productServices';
import PreLoader from '../../components/PreLoader';
import { formatPrice } from '../../utils/Functions';

const cx = classNames.bind(styles);

const Compare = () => {
    // Get  products
    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const compareList: any[] =
            JSON.parse(localStorage.getItem('compare_list') + '') || [];

        if (compareList.length === 0) {
            setTimeout(() => {
                setProductList([]);
                setLoading(false);
            }, 300);
        } else {
            let result: ProductModel[] = [];
            const fetchApi = async (productId: any) => {
                const res = await productServices.getProductById(
                    productId.product_id
                );

                result.push(res);

                if (result.length === compareList.length) {
                    setProductList(result);
                    setLoading(false);
                }
            };

            compareList.forEach((item: any, index: number) => {
                setTimeout(() => {
                    fetchApi(item);
                }, index * 500);
            });
        }
    }, []);

    // re-render component when remove wishlist-item
    useEffect(() => {
        const handleStorageChange = () => {
            setLoading(true);

            const compareList: any[] =
                JSON.parse(localStorage.getItem('compare_list') + '') || [];

            if (compareList.length === 0) {
                setTimeout(() => {
                    setProductList([]);
                    setLoading(false);
                }, 300);
            } else {
                let result: ProductModel[] = [];
                const fetchApi = async (productId: any) => {
                    const res = await productServices.getProductById(
                        productId.product_id
                    );

                    result.push(res);

                    if (result.length === compareList.length) {
                        setProductList(result);
                        setLoading(false);
                    }
                };

                compareList.forEach((item: any, index: number) => {
                    setTimeout(() => {
                        fetchApi(item);
                    }, index * 500);
                });
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Lắng nghe sự kiện tùy chỉnh "storageChanged" trong cùng tab
        window.addEventListener('storageChanged', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('storageChanged', handleStorageChange);
        };
    }, []);

    const handleRemove = (compareItemId: number) => {
        const compareList: any[] =
            JSON.parse(localStorage.getItem('compare_list') + '') || [];

        const index = compareList.findIndex(
            (item) => item.product_id === compareItemId
        );
        if (index !== -1) {
            compareList.splice(index, 1);
        }
        localStorage.setItem('compare_list', JSON.stringify(compareList));
        window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }
    return (
        <div className={cx('compare', { 'container-spacing': true })}>
            <Breadcrumb
                title="Compare"
                links={[{ to: config.routes.home, name: 'home' }, { name: 'Compare' }]}
            ></Breadcrumb>
            <div
                className={cx('compare__list', {
                    'd-none': productList.length === 0,
                })}
            >
                <table className={cx('compare__table')}>
                    <tbody className={cx('compare__body')}>
                        <tr className={cx('', { 'd-sm-none': true })}>
                            <th className={cx('compare__title')}> Product </th>
                            <th>Availability</th>
                            <th>Type</th>
                            <th>Sku</th>
                            <th>Add to Cart</th>
                        </tr>
                        {productList.map((compareItem, index) => (
                            <tr>
                                <td
                                    key={index}
                                    className={cx('product__thumbnail')}
                                >
                                    <Link
                                        to={`/products/${compareItem.productId}`}
                                        className={cx(
                                            'product__thumbnail-wrapper'
                                        )}
                                    >
                                        <Image
                                            src={compareItem.thumbnail}
                                            alt="Product image"
                                            className={cx('product__img')}
                                        ></Image>
                                    </Link>
                                    <p className={cx('product__caption')}>
                                        {compareItem.category.name}
                                    </p>
                                    <Link
                                        to={`/products/${compareItem.productId}`}
                                        className={cx('product__name', {
                                            'primary-hover': true,
                                        })}
                                    >
                                        {compareItem.title}
                                    </Link>
                                    <p className={cx('product__price')}>
                                        {compareItem!.discount
                                            ? formatPrice(
                                                compareItem!.price *
                                                (1 -
                                                    compareItem!
                                                        .discount /
                                                    100)
                                            )
                                            : formatPrice(compareItem!.price)}
                                    </p>
                                    <Button
                                        className={cx('product__close-btn', {
                                            'primary-hover': true,
                                        })}
                                        onClick={() =>
                                            handleRemove(compareItem.productId)
                                        }
                                    >
                                        <CloseIcon
                                            width="1.3rem"
                                            height="1.3rem"
                                        ></CloseIcon>
                                    </Button>
                                </td>
                                <td className={cx('product__availability')}>
                                    {compareItem.quantityStock > 0
                                        ? 'In stock'
                                        : 'Out of stock'}
                                </td>
                                <td className={cx('product__type')}>
                                    {compareItem.collections?.at(0)?.name}
                                </td>
                                <td className={cx('product__sku')}>Nil</td>
                                <td className={cx('product__cart')}>
                                    <Button
                                        to={`/products/${compareItem.productId}`}
                                        rounded
                                        primary
                                        className={cx('product__cart-btn')}
                                    >
                                        Select Options
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Compare empty */}
            <div
                className={cx('compare-empty', {
                    'd-none': productList.length > 0,
                })}
            >
                <h2 className={cx('compare-empty__title')}>
                    Nothing found to compare!
                </h2>
                <Button
                    rounded
                    to={config.routes.shop}
                    className={cx('compare-empty__continue-btn')}
                >
                    Continue shopping
                </Button>
            </div>
        </div>
    );
};

export default Compare;

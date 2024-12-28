import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Favorite.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import config from '../../config';
import Card from '../Shop/components/Card';
import * as productServices from '../../services/productServices';
import ProductModel from '../../models/ProductModel';
import Pagination from '../../components/Pagination';
import PreLoader from '../../components/PreLoader';
import { useMediaQuery } from 'react-responsive';
import * as favoriteServices from '../../services/favoriteServices';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

//temp wishlist component
const Favorite = () => {
    const links = ['home', 'Wishlist'];
    const currentUser = localStorage.getItem('user_id');
    const [loading, setLoading] = useState(false);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const isXxlScreen = useMediaQuery({ query: '(max-width: 1399.98px)' });

    const [limit, setLimit] = useState(15);

    // call api get wishlist
    const [wishlist, setWishlist] = useState<any>([]);
    const [tempWishlist, setTempWishlist] = useState<any>(() => {
        const arr: any[] =
            JSON.parse(localStorage.getItem('wishlist') + '') || [];
        let result: any[] = [];
        setLoading(true);
        const fetchApi = async (wishlistItem: any) => {
            const responseData = await productServices.getProductById(
                wishlistItem.product_id
            );

            result.push(responseData);

            if (result.length === arr.length) {
                setLoading(false);
                setWishlist(result);
                setTempWishlist(result);
                return;
            }
        };
        if (arr.length === 0) {
            setWishlist([]);
            setLoading(false);
            return;
        }
        arr.forEach((wishlistItem, index) => {
            setTimeout(() => {
                fetchApi(wishlistItem);
            }, 100 * index);
        });
    });

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

    // get wishlist from db
    useEffect(() => {
        if (currentUser) {
            localStorage.removeItem('wishlist');
            const fetchApi = async () => {
                const res = await favoriteServices.getFavoriteByUserId(
                    customerId || currentUser
                );

                if (res.result.length === 0) {
                    setWishlist([]);
                    setLoading(false);
                    return;
                }

                let result: any[] = [];
                const fetchApi = async (wishlistItem: any) => {
                    const responseData = await productServices.getProductById(
                        wishlistItem.productId
                    );
                    result.push(responseData);

                    if (result.length === res.result.length) {
                        setWishlist(result);
                        setLoading(false);
                        return;
                    }
                };

                res.result.forEach((wishlistItem: any, index: number) => {
                    fetchApi(wishlistItem);
                });
            };
            fetchApi();
        }
    }, [currentUser]);

    // re-render component when remove wishlist-item
    useEffect(() => {
        const handleStorageChange = () => {
            if (!currentUser) {
                // const arr: any[] =
                //     JSON.parse(localStorage.getItem('wishlist') + '') || [];
                // let result: any[] = [];
                // const fetchApi = async (wishlistItem: any) => {
                //     const responseData = await productServices.getProductById(
                //         wishlistItem.product_id
                //     );
                //     result = [...result, responseData];
                //     if (result.length === arr.length) {
                //         setWishlist(result);
                //         return;
                //     }
                // };
                // arr.forEach((wishlistItem) => {
                //     fetchApi(wishlistItem);
                // });
            } else {
                setLoading(true);
                const fetchApi = async () => {
                    const res = await favoriteServices.getFavoriteByUserId(
                        customerId || currentUser
                    );

                    if (res.result.length === 0) {
                        setWishlist([]);
                        setLoading(false);
                        return;
                    }

                    let result: any[] = [];
                    const fetchApi = async (wishlistItem: any) => {
                        const responseData =
                            await productServices.getProductById(
                                wishlistItem.productId
                            );
                        result.push(responseData);

                        if (result.length === res.result.length) {
                            setWishlist(result);
                            setLoading(false);
                            return;
                        }
                    };
                    res.result.forEach((wishlistItem: any, index: number) => {
                        fetchApi(wishlistItem);
                    });
                };
                setTimeout(() => {
                    fetchApi();
                }, 200);
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

    useEffect(() => {
        if (isXxlScreen) {
            setLimit(12);
        }
    }, []);

    // useEffect(() => {
    //     if (!currentUser) {
    //         const fetchApi = async (wishlistItem: any) => {
    //             // setLoading(true);

    //             const responseData = await productServices.getProductById(
    //                 wishlistItem.product_id
    //             );

    //             setWishlist([...wishlist, responseData]);
    //         };
    //         wishlist.forEach((wishlistItem: any) => {
    //             fetchApi(wishlistItem);
    //         });
    //     }
    // }, [currentPage]);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    const handleChangeWishlist: any = (newArr: any) => {
        setLoading(true);
        if (newArr.length === 0) {
            setWishlist([]);
            setLoading(false);
            localStorage.setItem('wishlist', JSON.stringify(newArr));
            return;
        }
        let result: any[] = [];
        const fetchApi = async (wishlistItem: any) => {
            const responseData = await productServices.getProductById(
                wishlistItem.product_id
            );
            result.push(responseData);

            if (result.length === newArr.length) {
                setWishlist(result);
                setLoading(false);
                return;
            }
        };
        newArr.forEach((wishlistItem: any, index: number) => {
            fetchApi(wishlistItem);
        });
        localStorage.setItem('wishlist', JSON.stringify(newArr));
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('wishlist', { 'container-spacing': true })}>
            <Breadcrumb title="wishlist" links={links}></Breadcrumb>
            <div
                className={cx('wishlist__list', {
                    'd-none': wishlist.length === 0,
                })}
            >
                <div className={cx('wishlist__row')}>
                    <div
                        className={cx('', {
                            row: true,
                            'row-cols-5': true,
                            'row-cols-xxl-4': true,
                            'row-cols-lg-3': true,
                            'row-cols-sm-2': true,
                            'gy-3': true,
                            'g-md-2': true,
                        })}
                    >
                        {wishlist.map((item: any, index: any) => (
                            <Card
                                key={index}
                                isReview={false}
                                productItem={item}
                                handleChangeWishlist={handleChangeWishlist}
                            ></Card>
                        ))}
                    </div>
                </div>
                <Pagination
                    hide={wishlist.length === 0}
                    currentPage={currentPage}
                    totalPage={
                        !isXxlScreen
                            ? Math.floor(wishlist.length / 15 + 1)
                            : Math.floor(wishlist.length / 12 + 1)
                    }
                    pagination={pagination}
                ></Pagination>
            </div>
            {/* Empty wishlist */}
            {wishlist.length === 0 && (
                <div className={cx('wishlist__empty')}>
                    <h2 className={cx('wishlist__empty-title')}>
                        Nothing found in wishlist!
                    </h2>
                    <Button
                        to={config.routes.shop}
                        rounded
                        primary
                        className={cx('wishlist__btn')}
                    >
                        Continue shopping
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Favorite;

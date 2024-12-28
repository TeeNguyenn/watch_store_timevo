import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Wishlist.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown,
    faCartShopping,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { RemoveIcon, RightIcon } from '../Icons';
import Label from '../Label';
import Pagination from '../Pagination';
import { renderRating, splitArrayAtIndex } from '../../utils/Functions';
import Image from '../Image';
import images from '../../assets/images';
import VariantModel from '../../models/VariantModel';
import ProductImageModel from '../../models/ProductImageModel';
import ProductModel from '../../models/ProductModel';
import WishlistItem from './WishlistItem';
import * as favoriteServices from '../../services/favoriteServices';
import PreLoader from '../PreLoader';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { getWishlist } from './wishlistSlice';

const cx = classNames.bind(styles);

interface WishlistProps {
    className?: string;
}

const Wishlist = ({ className }: WishlistProps) => {
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [viewAll, setViewAll] = useState(false);

    const currentUser = localStorage.getItem('user_id');
    const [loading, setLoading] = useState(false);


    const [limit, setLimit] = useState(6);

    const dispatch = useAppDispatch()
    const wishlist = useAppSelector((state: RootState) => state.wishlists.wishlist);
    const totalPage = useAppSelector((state: RootState) => state.wishlists.totalPage);
    const totalProduct = useAppSelector((state: RootState) => state.wishlists.totalProduct);
    const status = useAppSelector((state: RootState) => state.wishlists.status);

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
        dispatch(getWishlist({
            id: customerId || currentUser + '',
            currentPage,
            limit
        }))
    }, [currentUser, currentPage, limit]);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    const handleChangeWishlist: any = () => {
        // handle remove last item
        const remainder = (totalProduct - 1) % 6;
        const totalPages = Math.ceil(totalProduct / limit);

        if (
            remainder === 0 &&
            totalProduct - 1 > 0 &&
            currentPage === totalPages &&
            !viewAll
        ) {
            setCurrentPage(currentPage - 1);
        } else {
            dispatch(getWishlist({
                id: customerId || currentUser + '',
                currentPage,
                limit
            }))
        }

    };

    const handleViewAll = () => {
        if (!viewAll) {
            setLimit(totalProduct);
        } else {
            setLimit(6);
        }
        setViewAll(!viewAll);
    };

    if (loading || status === 'loading') {
        window.scrollTo(0, 0);
        return <PreLoader show></PreLoader>;
    }

    if (wishlist.length === 0) {
        return <></>
    }

    return (
        <div className={cx('wishlist', className)}>
            <div className={cx('wishlist__container')}>
                <table className={cx('wishlist__table', {
                    modifier: className
                })}>
                    <thead>
                        <tr>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '8%' }}
                            ></th>
                            <th
                                className={cx('wishlist__heading')}
                                style={{
                                    minWidth: className ? '300px' : '250px',
                                    width: '30%',
                                }}
                            >
                                products
                            </th>
                            <th
                                className={cx('wishlist__heading', {
                                    'd-none': className
                                })}
                                style={{ width: '22%', minWidth: '300px' }}
                            >
                                Variant
                            </th>

                            <th
                                className={cx('wishlist__heading', {
                                    'd-none': !className
                                })}
                                style={{ width: '20%', minWidth: className ? '230px' : '200px', textAlign: 'left' }}
                            >
                                color
                            </th>
                            <th
                                className={cx('wishlist__heading', {
                                    'd-none': !className
                                })}
                                style={{ width: '20%', minWidth: '180px' }}
                            >
                                size
                            </th>
                            <th
                                className={cx('wishlist__heading', {
                                    'd-none': !className
                                })}
                                style={{ width: '20%', minWidth: '180px', textAlign: 'right' }}
                            >
                                material
                            </th>
                            <th
                                className={cx('wishlist__heading')}
                                style={{ width: '20%', minWidth: '200px', textAlign: className ? 'right' : 'center' }}
                            >
                                price
                            </th>
                            <th
                                className={cx('wishlist__heading', {
                                    'd-none': className
                                })}
                                style={{ width: '20%' }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.map((wishlistItem, index) => (
                            <WishlistItem
                                key={index}
                                modifier={!!className}
                                wishlistItem={
                                    currentUser
                                        ? wishlistItem
                                        : {
                                            productId:
                                                wishlistItem.product_id,
                                            colorId: wishlistItem.color_id,
                                            screenSizeId:
                                                wishlistItem.screen_size_id,
                                            materialId:
                                                wishlistItem.material_id,
                                        }
                                }
                                handleChangeWishlist={handleChangeWishlist}
                            ></WishlistItem>
                        ))}

                    </tbody>
                </table>
            </div>
            <div
                className={cx('wishlist__bottom', {
                    'd-none': currentUser
                        ? totalPage === 1 && wishlist.length <= 6
                        : JSON.parse(localStorage.getItem('wishlist') + '')
                            .length <= 6,
                })}
            >
                <div className={cx('wishlist__view')}>
                    <p
                        className={cx('wishlist__view-desc', {
                            'd-sm-none': true,
                        })}
                    >
                        {viewAll
                            ? `1 to ${totalProduct} items of ${totalProduct}`
                            : `${limit * (currentPage - 1) + 1} to ${currentPage * 6 >= totalProduct
                                ? totalProduct
                                : currentPage * 6
                            } items of ${totalProduct}`}
                    </p>
                    <Button
                        className={cx('wishlist__view-btn', {
                            'd-none': currentPage > 1 || className,
                        })}
                        rightIcon={<RightIcon></RightIcon>}
                        onClick={handleViewAll}
                    >
                        {viewAll ? 'View less' : 'View all'}
                    </Button>
                </div>
                <div className={cx('wishlist__paging')}>
                    <Pagination
                        modifier
                        currentPage={currentPage}
                        totalPage={viewAll ? 1 : totalPage} //temp
                        pagination={pagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

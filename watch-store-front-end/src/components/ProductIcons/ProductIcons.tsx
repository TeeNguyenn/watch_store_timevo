import React, { useContext, useEffect, useMemo, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ToastContainer } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './ProductIcons.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    ActiveHeartIcon,
    AddToCartIcon,
    CloseIcon,
    CompareFillIcon,
    CompareIcon,
    HeartIcon,
    QuickByIcon,
} from '../Icons';
import Button from '../Button';
import ProductModel from '../../models/ProductModel';
import { CartContext } from '../../contexts/CartContext';
import VariantModel from '../../models/VariantModel';
import * as cartItemServices from '../../services/cartItemServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import * as favoriteServices from '../../services/favoriteServices';
import QuickBuy from '../QuickBuy';
import PreLoader from '../PreLoader';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { getWishlist, postWishlistItem } from '../Wishlist/wishlistSlice';
import { notifySuccess, notifyWarning } from '../../utils/Functions';
import { getCart, postCart } from '../../layouts/components/Cart/cartSlice';

const cx = classNames.bind(styles);

interface ProductIconsProps {
    mobile?: boolean;
    className?: string;
    productItem?: ProductModel;
    handleShowQuickBuy?: any;
}

const ProductIcons = ({
    mobile,
    className,
    productItem,
    handleShowQuickBuy,
}: ProductIconsProps) => {
    const currentUser = localStorage.getItem('user_id');
    const [loading, setLoading] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingQuickBuy, setLoadingQuickBuy] = useState(false);
    const [loadingCompare, setLoadingCompare] = useState(false);
    const [liked, setLiked] = useState(false);
    const [compared, setCompared] = useState(false);
    const location = useLocation();
    const pathName = location.pathname;
    const [isWishlist, setIsWishlist] = useState(false);
    const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const [loadingWishlist, setLoadingWishlist] = useState(false);

    const dispatch = useAppDispatch();
    const wishlistStatus = useAppSelector(
        (state: RootState) => state.wishlists.status
    );
    const cartStatus = useAppSelector(
        (state: RootState) => state.cartList.status
    );

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

    const context = useContext(CartContext);

    const arr: VariantModel[] | undefined = productItem?.variants?.filter(
        (variant) =>
            variant.color.colorId === productItem?.colors.at(0)?.colorId
    );

    const result: VariantModel[] | undefined = [];

    arr?.forEach((sizeItem) => {
        let count = 0;
        for (let index = 0; index < result.length; index++) {
            if (
                sizeItem.screenSize.sizeId === result[index].screenSize.sizeId
            ) {
                count++;
                break;
            }
        }
        if (count === 0) {
            result.push(sizeItem);
        }
    });

    const sortResult = result.sort(
        (a: any, b: any) => a.screenSize.sizeId - b.screenSize.sizeId
    );
    const screenSizeId = sortResult?.at(0)?.screenSize.sizeId;

    let materialList: any[] = [];

    arr?.forEach((materialItem) => {
        if (materialItem.screenSize.sizeId === screenSizeId) {
            materialList.push(materialItem.material.materialId);
        }
    });

    const materialId = materialList.sort((a: any, b: any) => a - b).at(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (pathName === '/wishlist') {
            setIsWishlist(true);
        }
    }, [pathName]);

    // get wishlist
    const wishlist = useAppSelector(
        (state: RootState) => state.wishlists.wishlist
    );

    // get compareList
    useEffect(() => {
        const compareList: any[] =
            JSON.parse(localStorage.getItem('compare_list') + '') || [];

        let isCompared = false;
        compareList.forEach((compareItem) => {
            if (compareItem.product_id === productItem?.productId) {
                isCompared = true;
                return;
            }
        });

        if (isCompared) {
            setCompared(true);
            return;
        }
    }, []);

    const handleAddToCart = () => {
        if (!currentUser) {
            // Force login
            setLoadingLogin(true);
            localStorage.setItem('previousPage', location.pathname);
            window.scrollTo(0, 0);

            setTimeout(() => {
                setLoadingLogin(false);
                navigate(config.routes.login);
            }, 300);
        } else {
            const fetchData = async () => {
                await dispatch(
                    postCart({
                        productId: productItem?.productId,
                        colorId: productItem?.colors.at(0)?.colorId,
                        screenSizeId: screenSizeId,
                        materialId: materialId,
                    })
                );
                await dispatch(getCart());
                if (cartStatus === 'fulfilled') {
                    context?.handleCart();
                }
            };
            fetchData();
        }
    };

    const handleAddWishlist = () => {
        if (!currentUser) {
            // Force login
            setLoadingLogin(true);
            localStorage.setItem('previousPage', location.pathname);
            window.scrollTo(0, 0);

            setTimeout(() => {
                setLoadingLogin(false);
                navigate(config.routes.login);
            }, 300);
        } else {
            setLoadingWishlist(true);
            if (liked) {
                return;
            } else {
                dispatch(
                    postWishlistItem({
                        userId: currentUser,
                        productId: productItem?.productId,
                        colorId: productItem?.colors.at(0)?.colorId,
                        screenSizeId: screenSizeId,
                        materialId: materialId,
                    })
                );
                setLiked(true);
                // if (wishlistStatus === 'fulfilled') {    no work=))
                //     setTimeout(() => {
                //         notifySuccess('Product added to wishlist successfully')
                //     }, 200);
                // }
            }
            setTimeout(() => {
                setLoadingWishlist(false);
            }, 500);
        }
    };

    const handleQuickBuy = () => {
        setLoadingQuickBuy(true);

        // navigate()

        // no scroll to top
        document.body.classList.add('hide-scroll');

        setTimeout(() => {
            handleShowQuickBuy(true);
            setShowQuickBuyModal(true);

            setLoadingQuickBuy(false);
        }, 300);
    };

    const handleShowQuickBuyModal = () => {
        document.body.classList.remove('hide-scroll');
        setShowQuickBuyModal(false);
        handleShowQuickBuy(false);
    };

    const handleAddCompare = () => {
        setLoadingCompare(true);
        if (compared) {
            return;
        } else {
            const compareList: any[] =
                JSON.parse(localStorage.getItem('compare_list') + '') || [];
            if (compareList.length === 4) {
                setShowCompareModal(true);
                setLoadingCompare(false);
                return;
            }
            const newCompareList = [
                {
                    product_id: productItem?.productId,
                },
                ...compareList,
            ];
            setCompared(true);
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
            localStorage.setItem(
                'compare_list',
                JSON.stringify(newCompareList)
            );
        }

        setTimeout(() => {
            setLoadingCompare(false);
        }, 300);
    };

    if (loadingLogin) {
        return <PreLoader show></PreLoader>;
    }

    if (mobile) {
        return (
            <div
                className={cx('product-icons', 'modifier', {
                    'custom-wishlist': isWishlist,
                })}
            >
                {wishlistStatus === 'loading' ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <div
                        className={cx('wishlist-content')}
                        onClick={handleAddWishlist}
                    >
                        {liked ? (
                            <Button
                                to={config.routes.wishlist}
                                className={cx('btn')}
                            >
                                <ActiveHeartIcon
                                    className={cx('icon')}
                                    width="1.5rem"
                                    height="1.5rem"
                                ></ActiveHeartIcon>
                            </Button>
                        ) : (
                            <HeartIcon
                                className={cx('icon')}
                                width="1.5rem"
                                height="1.5rem"
                            ></HeartIcon>
                        )}
                    </div>
                )}

                {cartStatus === 'loading' ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Button className={cx('btn')}>
                        <AddToCartIcon
                            width="1.7rem"
                            height="1.7rem"
                            className={cx('icon')}
                        ></AddToCartIcon>
                    </Button>
                )}
            </div>
        );
    }

    return (
        <>
            <div
                className={cx('product-icons', className, {
                    'custom-wishlist': isWishlist,
                })}
            >
                {loadingWishlist ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy delay={[0, 150]} content="Wishlist" placement="top">
                        <div
                            className={cx('wishlist-content', {
                                'd-none': isWishlist,
                            })}
                            onClick={handleAddWishlist}
                        >
                            {wishlist.some(
                                (item) =>
                                    item.productId === productItem?.productId
                            ) ? (
                                <Button
                                    to={config.routes.wishlist}
                                    className={cx('btn')}
                                >
                                    <ActiveHeartIcon
                                        className={cx('icon')}
                                    ></ActiveHeartIcon>
                                </Button>
                            ) : (
                                <HeartIcon className={cx('icon')}></HeartIcon>
                            )}
                        </div>
                    </Tippy>
                )}

                {loadingCompare ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy delay={[0, 150]} content="Compare" placement="top">
                        <div
                            className={cx('compare-content', 'btn')}
                            onClick={handleAddCompare}
                        >
                            {compared ? (
                                <Button
                                    to={config.routes.compare}
                                    className={cx('btn')}
                                >
                                    <CompareFillIcon
                                        className={cx('icon')}
                                    ></CompareFillIcon>
                                </Button>
                            ) : (
                                <CompareIcon
                                    className={cx('icon')}
                                ></CompareIcon>
                            )}
                        </div>
                    </Tippy>
                )}

                {loadingQuickBuy ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy delay={[0, 150]} content="Quick Buy" placement="top">
                        <Button className={cx('btn')} onClick={handleQuickBuy}>
                            <QuickByIcon className={cx('icon')}></QuickByIcon>
                        </Button>
                    </Tippy>
                )}

                {cartStatus === 'loading' ? (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                ) : (
                    <Tippy
                        delay={[0, 150]}
                        content="Add To Cart"
                        placement="top"
                    >
                        <Button className={cx('btn')} onClick={handleAddToCart}>
                            <AddToCartIcon
                                className={cx('icon')}
                            ></AddToCartIcon>
                        </Button>
                    </Tippy>
                )}
            </div>

            <QuickBuy
                show={showQuickBuyModal}
                showQuickBuyModal={showQuickBuyModal}
                handleShowQuickBuyModal={handleShowQuickBuyModal}
                productItem={productItem}
            ></QuickBuy>

            <div
                className={cx('compare-modal', {
                    show: showCompareModal,
                })}
            >
                <div
                    className={cx('compare-modal__overlay')}
                    onClick={() => setShowCompareModal(false)}
                ></div>
                <div className={cx('compare-modal__inner')}>
                    <Button
                        className={cx('compare-modal__close-btn')}
                        onClick={() => setShowCompareModal(false)}
                    >
                        <CloseIcon width="1.4rem" height="1.4rem"></CloseIcon>
                    </Button>
                    <p className={cx('compare-modal__desc')}>
                        You will not be allowed to compare more than 4 products
                        at a time
                    </p>
                    <Button
                        to={config.routes.compare}
                        rounded
                        primary
                        className={cx('compare-modal__view-btn')}
                    >
                        View compare
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ProductIcons;

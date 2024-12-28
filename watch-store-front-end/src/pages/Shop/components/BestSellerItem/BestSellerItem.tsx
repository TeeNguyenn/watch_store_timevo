import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';

import styles from './BestSellerItem.module.scss';
import Image from '../../../../components/Image';
import { CompareIcon, HeartIcon } from '../../../../components/Icons';
import Button from '../../../../components/Button';
import { formatPrice, renderRating } from '../../../../utils/Functions';
import ColorItem from '../../../../components/ColorItem';
import ProductModel from '../../../../models/ProductModel';
import ProductImageModel from '../../../../models/ProductImageModel';
import * as productImageServices from '../../../../services/productImageServices';
import config from '../../../../config';
import VariantModel from '../../../../models/VariantModel';
import { useAppDispatch } from '../../../../redux/store';
import {
    getCart,
    postCart,
} from '../../../../layouts/components/Cart/cartSlice';
import { CartContext } from '../../../../contexts/CartContext';
import QuickBuy from '../../../../components/QuickBuy';

const cx = classNames.bind(styles);

interface BestSellerItemProps {
    item: ProductModel;
    handleShowQuickBuy?: (isShow: boolean) => void;
}

const BestSellerItem = ({
    item,
    handleShowQuickBuy = () => { },
}: BestSellerItemProps) => {
    const currentUser = localStorage.getItem('user_id');

    const [mainProductImageList, setMainProductImageList] = useState<
        ProductImageModel[]
    >([]);
    const [activeColor, setActiveColor] = useState(item?.colors[0].colorId);
    const [activeThumbnail, setActiveThumbnail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [materialId, setMaterialId] = useState<any>(0);
    const [screenSizeId, setScreenSizeId] = useState<any>(0);
    const dispatch = useAppDispatch();
    const context = useContext(CartContext);
    const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const mainProductImageData =
                await productImageServices.getMainProductImageListByProductId(
                    item!.productId
                );

            mainProductImageData.forEach(
                (item) => {
                    if (item.colorId === activeColor) {
                        setActiveThumbnail(item.imageUrl)
                    }
                }
            );


            setMainProductImageList(mainProductImageData);

            const arr: VariantModel[] | undefined = item?.variants?.filter(
                (variant) =>
                    variant.color.colorId === item?.colors.at(0)?.colorId
            );

            const result: VariantModel[] | undefined = [];

            arr?.forEach((sizeItem) => {
                let count = 0;
                for (let index = 0; index < result.length; index++) {
                    if (
                        sizeItem.screenSize.sizeId ===
                        result[index].screenSize.sizeId
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
            setScreenSizeId(sortResult?.at(0)?.screenSize.sizeId);

            let materialList: any[] = [];

            arr?.forEach((materialItem) => {
                if (materialItem.screenSize.sizeId === screenSizeId) {
                    materialList.push(materialItem.material.materialId);
                }
            });

            setMaterialId(materialList.sort((a: any, b: any) => a - b).at(0));
        };

        fetchApi();
    }, []);

    const handleMainProductImage = (colorId: number) => {
        mainProductImageList.forEach(
            (item) =>
                item.colorId === colorId && setActiveThumbnail(item.imageUrl)
        );

        setActiveColor(colorId);
    };

    const handleShowQuickBuyModal = () => {
        document.body.classList.remove('hide-scroll');
        setShowQuickBuyModal(false);
        handleShowQuickBuy(false);
    };

    const handleQuickBuy = () => {
        //here....
        // navigate()

        // no scroll to top
        document.body.classList.add('hide-scroll');

        setTimeout(() => {
            handleShowQuickBuy(true);
            setShowQuickBuyModal(true);
        }, 300);
    };

    const handleAddToCart = async () => {
        if (!currentUser) {
            setLoading(true);
            localStorage.setItem('previousPage', location.pathname);
            window.scrollTo(0, 0);

            setTimeout(() => {
                setLoading(false);
                navigate(config.routes.login);
            }, 300);
        } else {
            const fetchData = async () => {
                await dispatch(
                    postCart({
                        productId: item?.productId,
                        colorId: activeColor,
                        screenSizeId: screenSizeId,
                        materialId: materialId,
                    })
                );

                await dispatch(getCart());

                context?.handleCart();
            };

            fetchData();
        }
    };

    return (
        <>
            <div className={cx('card')}>
                <div className={cx('card__media')}>
                    <Link
                        to={`/products/${item.productId}`}
                        className={cx('card__img-wrapper')}
                    >
                        <Image
                            src={activeThumbnail + ''}
                            className={cx('card__thumbnail')}
                        ></Image>
                    </Link>
                    <Link
                        to={`/products/${item.productId}`}
                        className={cx('card__popup', {
                            'd-none': true,
                        })}
                    >
                        <div className={cx('card__product-icons')}>
                            <div className={cx('card__product-icon-top')}>
                                <Tippy
                                    delay={[0, 150]}
                                    content="Compare"
                                    placement="left"
                                    className="card-popup-product-icon"
                                >
                                    <Link
                                        to={'/'}
                                        className={cx('card__icon-wrapper')}
                                    >
                                        <CompareIcon
                                            className={cx('card__icon')}
                                        ></CompareIcon>
                                    </Link>
                                </Tippy>
                                <Tippy
                                    delay={[0, 150]}
                                    content="Wishlist"
                                    placement="left"
                                    className="card-popup-product-icon"
                                >
                                    <div className={cx('card__icon-wrapper')}>
                                        <HeartIcon
                                            className={cx('card__icon')}
                                        ></HeartIcon>
                                    </div>
                                </Tippy>
                            </div>
                            <div className={cx('card__product-icon-bottom')}>
                                <Button
                                    rounded
                                    primary
                                    className={cx('card__btn')}
                                    onClick={handleQuickBuy}
                                >
                                    Quick buy
                                </Button>
                                <form>
                                    <Button
                                        rounded
                                        primary
                                        className={cx('card__btn')}
                                        onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={cx('card__content')}>
                    <p className={cx('card__caption')}>{item.category.name}</p>
                    <h3>
                        <Link
                            to={`/products/${item.productId}`}
                            className={cx('card__heading')}
                        >
                            {item.title}
                        </Link>
                    </h3>
                    <div className={cx('card__price-container')}>
                        <div className={cx('card__price-regular-wrapper')}>
                            <p className={cx('card__price-regular')}>
                                {item!.discount
                                    ? formatPrice(
                                        item!.price *
                                        (1 - item!.discount / 100)
                                    )
                                    : formatPrice(item!.price)}
                            </p>
                        </div>
                        <div
                            className={cx('card__price-old-wrapper', {
                                'd-none': !item?.discount,
                            })}
                        >
                            <p className={cx('card__price-old')}>
                                {formatPrice(item!.price)}
                            </p>
                        </div>
                    </div>
                    <div className={cx('card__stars')}>
                        {renderRating(item.averageRate)}
                    </div>
                    <div className={cx('card__colors')}>
                        {item?.colors.map((colorItem, index) => (
                            <Tippy
                                key={index}
                                delay={[0, 150]}
                                content={colorItem.name}
                                placement="top"
                                className="card-color-tooltip"
                            >
                                <div>
                                    <ColorItem
                                        red={colorItem.red}
                                        green={colorItem.green}
                                        blue={colorItem.blue}
                                        // alpha={colorItem.alpha}
                                        active={
                                            activeColor === colorItem.colorId
                                        }
                                        onClick={() =>
                                            handleMainProductImage(
                                                colorItem.colorId
                                            )
                                        }
                                    ></ColorItem>
                                </div>
                            </Tippy>
                        ))}
                    </div>
                </div>
            </div>
            <QuickBuy
                show={showQuickBuyModal}
                showQuickBuyModal={showQuickBuyModal}
                handleShowQuickBuyModal={handleShowQuickBuyModal}
                productItem={item}
            ></QuickBuy>
        </>
    );
};

export default BestSellerItem;

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '../../../../components/Button';
import styles from './Card.module.scss';
import Image from '../../../../components/Image';
import ColorItem from '../../../../components/ColorItem';
import { renderRating } from '../../../../utils/Functions';
import ProductIcons from '../../../../components/ProductIcons';
import Badge from '../../../../components/Badge';
import ProductModel from '../../../../models/ProductModel';
import images from '../../../../assets/images';
import { formatPrice } from '../../../../utils/Functions';
import * as feedbackServices from '../../../../services/feedbackServices';
import FeedbackModel from '../../../../models/FeedbackModel';
import ProductImageModel from '../../../../models/ProductImageModel';
import * as productImageServices from '../../../.../../../services/productImageServices';
import { CloseIcon } from '../../../../components/Icons';
import * as favoriteServices from '../../../../services/favoriteServices';
import VariantModel from '../../../../models/VariantModel';
import PreLoader from '../../../../components/PreLoader';
import { Spin } from 'antd';


const cx = classNames.bind(styles);

interface CardProps {
    oneProduct?: boolean;
    twoProduct?: boolean;
    threeProduct?: boolean;
    fourProduct?: boolean;
    isReview?: boolean;
    productItem?: ProductModel;
    handleChangeWishlist?: any;
    handleShowQuickBuy?: any;
}

const Card = ({
    oneProduct,
    twoProduct,
    threeProduct,
    fourProduct,
    isReview = true,
    productItem,
    handleChangeWishlist = false,
    handleShowQuickBuy,
}: CardProps) => {
    const currentUser = localStorage.getItem('user_id');
    const isMobileScreen = useMediaQuery({ query: '(max-width: 575.98px)' });
    const [mainProductImageList, setMainProductImageList] = useState<
        ProductImageModel[]
    >([]);
    const [activeColor, setActiveColor] = useState(
        productItem?.colors[0].colorId
    );
    const [activeThumbnail, setActiveThumbnail] = useState('');
    const [loading, setLoading] = useState(true);
    const [fullFeedbackList, setFullFeedbackList] = useState<FeedbackModel[]>([]);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);


    // handle
    const Arr: VariantModel[] | undefined = productItem?.variants?.filter(
        (variant) =>
            variant.color.colorId === productItem?.colors.at(0)?.colorId
    );

    const result: VariantModel[] | undefined = [];

    Arr?.forEach((sizeItem) => {
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

    const output: VariantModel[] | undefined = [];
    let materialIdTemp = 0; //temp because bug

    Arr?.forEach((materialItem) => {
        let count = 0;
        for (let index = 0; index < output.length; index++) {
            if (
                materialItem.material.materialId ===
                output[index].material.materialId
            ) {
                count++;
                break;
            }
        }
        if (count === 0) {
            output.push(materialItem);
        }
        if (materialItem.screenSize.sizeId === screenSizeId) {
            materialIdTemp = materialItem.material.materialId;
            return;
        }
    });

    const sortOutput = output.sort(
        (a: any, b: any) => a.material.materialId - b.material.materialId
    );

    const materialId = sortOutput?.at(0)?.material.materialId;

    useEffect(() => {
        const fetchApi = async () => {
            const feedbackData =
                await feedbackServices.getAllFeedbackByProductId(
                    productItem!.productId
                );

            setTotalFeedbacks(feedbackData.totalFeedbacks)

            if (feedbackData.totalFeedbacks > 0) {
                const resData =
                    await feedbackServices.getAllFeedbackByProductId(
                        productItem!.productId,
                        1,
                        feedbackData.totalFeedbacks,
                    );
                setFullFeedbackList(resData.result);
            }

            const mainProductImageData =
                await productImageServices.getMainProductImageListByProductId(
                    productItem!.productId
                );

            // setFeedbackList(feedbackData);
            setMainProductImageList(mainProductImageData);

            mainProductImageData.forEach(
                (item) => {
                    if (item.colorId === activeColor) {
                        setActiveThumbnail(item.imageUrl)
                    }
                }
            );

            setLoading(false);

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

    const handleRemoveWishlistItem = () => {
        if (!currentUser) {
            const wishlist: any[] =
                JSON.parse(localStorage.getItem('wishlist') + '') || [];

            const index = wishlist.findIndex(
                (item) =>
                    item.product_id === productItem?.productId &&
                    item.color_id === productItem?.colors.at(0)?.colorId
            );
            if (index !== -1) {
                wishlist.splice(index, 1);
            }
            handleChangeWishlist(wishlist);
        } else {
            const fetchApi = async () => {
                const res = await favoriteServices.deleteFavorite({
                    userId: Number.parseInt(currentUser),
                    productId: productItem?.productId,
                    colorId: productItem?.colors.at(0)?.colorId,
                    screenSizeId: screenSizeId,
                    materialId: materialIdTemp,
                });
            };
            fetchApi();
            window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
        }
    };

    const handleAverageRating = () => {
        if (totalFeedbacks === 0) {
            return 0;
        }
        const fiveStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 5
            ).length * 5;
        const fourStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 4
            ).length * 4;
        const threeStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 3
            ).length * 3;
        const twoStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 2
            ).length * 2;
        const oneStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 1
            ).length * 1;
        return (
            (fiveStarQuantity +
                fourStarQuantity +
                threeStarQuantity +
                twoStarQuantity +
                oneStarQuantity) /
            totalFeedbacks
        );
    };

    // if (loading) {
    //     return <PreLoader show />
    // }

    return (
        <article
            className={cx('card', { col: true, card__horizontal: oneProduct })}
        >
            <div
                className={cx('card__inner', {
                    horizontal: oneProduct,
                    row: oneProduct,
                    wishlist: handleChangeWishlist,
                })}
            >
                <div
                    className={cx('card__media', {
                        col: oneProduct,
                        'col-4': oneProduct,
                    })}
                >
                    <div style={{ position: 'relative' }}>
                        <Link
                            to={`/products/${productItem?.productId}`}
                            className={cx('card__thumbnail-wrapper')}
                        >
                            {productItem?.quantityStock === 0 && (
                                <Badge title="Sold Out"></Badge>
                            )}
                            {productItem?.discount && (
                                <Badge title="Sale"></Badge>
                            )}
                            {
                                loading ? <Spin style={{ color: '#7c4eb9' }} size='large' className={cx('card__thumbnail')} /> :
                                    <Image
                                        src={activeThumbnail || images.noProductImg}
                                        className={cx('card__thumbnail')}
                                        fallback={images.noProductImg}
                                    ></Image>
                            }
                        </Link>
                        <ProductIcons
                            mobile={isMobileScreen}
                            className={cx('card__product-icons')}
                            productItem={productItem}
                            handleShowQuickBuy={handleShowQuickBuy}
                        ></ProductIcons>
                        {handleChangeWishlist && (
                            <Button
                                className={cx('card__close-btn')}
                                onClick={handleRemoveWishlistItem}
                            >
                                <CloseIcon
                                    width="1.3rem"
                                    height="1.3rem"
                                ></CloseIcon>
                            </Button>
                        )}
                    </div>
                </div>
                <div
                    className={cx('card__content', {
                        col: oneProduct,
                        'col-8': oneProduct,
                    })}
                >
                    <p className={cx('card__caption')}>
                        {productItem?.category.name}
                    </p>
                    <h3>
                        <Link
                            to={`/products/${productItem?.productId}`}
                            className={cx('card__heading', {
                                'primary-hover': true,
                                'line-clamp': true,
                                modifier: fourProduct,
                                'modifier-lg': threeProduct,
                                'modifier-md': twoProduct,
                            })}
                        >
                            {productItem?.title}
                        </Link>
                    </h3>
                    <div className={cx('card__colors')}>
                        {productItem?.colors.map((colorItem, index) => (
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
                    <div className={cx('card__price-container')}>
                        <div className={cx('card__price-regular-wrapper')}>
                            <p className={cx('card__price-regular')}>
                                {productItem!.discount
                                    ? formatPrice(
                                        productItem!.price *
                                        (1 - productItem!.discount / 100)
                                    )
                                    : formatPrice(productItem!.price)}
                            </p>
                        </div>
                        <div
                            className={cx('card__price-old-wrapper', {
                                'd-none': !productItem?.discount,
                            })}
                        >
                            <p className={cx('card__price-old')}>
                                {formatPrice(productItem!.price)}
                            </p>
                        </div>
                    </div>
                    {isReview && (
                        <div className={cx('card__review')}>
                            <div className={cx('card__stars')}>
                                {renderRating(handleAverageRating())}
                            </div>
                            <p className={cx('card__review-title')}>
                                <span className={cx('card__review_count')}>
                                    {totalFeedbacks}
                                </span>
                                review
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default Card;

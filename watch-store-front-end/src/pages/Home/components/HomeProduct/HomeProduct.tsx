import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import styles from './HomeProduct.module.scss';
import Image from '../../../../components/Image';
import Button from '../../../../components/Button';
import Quantity from '../../../../components/Quantity';
import {
    CompareIcon,
    HeartIcon,
    ZoomInIcon,
} from '../../../../components/Icons';
import ProductImageModel from '../../../../models/ProductImageModel';
import { imageMagnifier, renderRating } from '../../../../utils/Functions';
import ProductModel from '../../../../models/ProductModel';
import FeedbackModel from '../../../../models/FeedbackModel';
import { useParams } from 'react-router-dom';
import * as productServices from '../../../../services/productServices';
import * as feedbackServices from '../../../../services/feedbackServices';
import Price from '../../../../components/Price';
import PreLoader from '../../../../components/PreLoader';

const cx = classNames.bind(styles);

const HomeProduct = () => {
    // Slider
    const [nav1, setNav1] = useState<any>();
    const [nav2, setNav2] = useState<any>();

    const [productDetail, setProductDetail] = useState<ProductModel>();
    const [feedbackList, setFeedbackList] = useState<FeedbackModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeColor, setActiveColor] = useState<number | undefined>();
    const [tempColor, setTempColor] = useState<number | undefined>();

    // const [activeSize, setActiveSize] = useState<number | undefined>();
    // const [tempSize, setTempSize] = useState<number | undefined>();

    // const [activeMaterial, setActiveMaterial] = useState<number | undefined>();
    // const [tempMaterial, setTempMaterial] = useState<number | undefined>();

    const [imageList, setImageList] = useState<ProductImageModel[] | any>([]);
    const [productList, setProductList] = useState<any[]>([]);

    // Get productId from url
    // const { productId } = useParams();

    // let productIdNumber = 0;
    // try {
    //     productIdNumber = parseInt(productId + '');
    //     if (Number.isNaN(productIdNumber)) {
    //         productIdNumber = 0;
    //     }
    // } catch (error) {
    //     productIdNumber = 0;
    //     console.log('Error:', error);
    // }

    useEffect(() => {
        imageMagnifier(
            '.product-detail-slider .slick-slider:first-child .product-detail-slider__img-wrapper',
            200
        );
    }, [imageList]);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);

            const responseData = await productServices.getProductById(
                4 //temp
            );

            setProductDetail(responseData);
            setActiveColor(responseData?.colors.at(0)?.colorId);
            // setActiveSize(responseData.variants?.at(0)?.screenSize.sizeId);
            // setActiveMaterial(
            //     responseData.variants?.at(0)?.material.materialId
            // );
            setImageList(
                responseData?.productImages.filter(
                    (item) =>
                        item.colorId === responseData?.colors.at(0)?.colorId
                )
            );
            const feedbackData =
                await feedbackServices.getAllFeedbackByProductId(
                    4 //temp
                );
            setFeedbackList(feedbackData.result);

            const recommendProducts = await productServices.getAllProduct(1, 5);

            if (recommendProducts) {
                setProductList(recommendProducts.result);
            }
            setLoading(false);
        };
        fetchApi();
    }, []); //[productIdNumber]

    const handleSelectColor = (colorId: number) => {
        const newArr = productDetail?.productImages.filter(
            (item: ProductImageModel) => item.colorId === colorId
        );
        setImageList(newArr);
        setActiveColor(colorId);
    };

    // if (loading) {
    //     window.scrollTo(0, 0);
    //     // return <PreLoader show></PreLoader>;
    // }

    return (
        <>
            {loading && <PreLoader show></PreLoader>}
            <div
                className={cx('product-detail__container', {
                    'product-detail-slider': true,
                })}
            >
                <div
                    className={cx('product-detail__row', {
                        row: true,
                        'row-cols-2': true,
                        'row-cols-lg-1': true,
                        'gx-4': true,
                    })}
                >
                    {/* Media */}
                    <div className={cx('', { col: true })}>
                        <section
                            className={cx('product-detail__media-wrapper')}
                        >
                            <div className={cx('product-detail__media')}>
                                <div className="slider-container">
                                    {/* Main */}
                                    <Slider
                                        asNavFor={nav2!}
                                        ref={(slider) => setNav1(slider)}
                                        arrows={true}
                                        speed={0}
                                    >
                                        {imageList.map(
                                            (
                                                img: ProductImageModel,
                                                index: number
                                            ) => (
                                                <div
                                                    className={cx(
                                                        'product-detail__img-wrapper',
                                                        {
                                                            'product-detail-slider__img-wrapper':
                                                                true,
                                                        }
                                                    )}
                                                    key={index}
                                                >
                                                    <Image
                                                        src={img.imageUrl}
                                                        alt={img.imageUrl}
                                                        className={cx(
                                                            'product-detail__img'
                                                        )}
                                                    ></Image>
                                                </div>
                                            )
                                        )}
                                    </Slider>
                                    {/* Slide */}
                                    <Slider
                                        asNavFor={nav1!}
                                        ref={(slider) => setNav2(slider)}
                                        slidesToShow={imageList.length}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        arrows={false}
                                    >
                                        {imageList.map(
                                            (
                                                img: ProductImageModel,
                                                index: number
                                            ) => (
                                                <div
                                                    className={cx(
                                                        'product-detail__slide-wrapper'
                                                    )}
                                                    key={index}
                                                >
                                                    <Image
                                                        src={img.imageUrl}
                                                        alt={img.imageName}
                                                        className={cx(
                                                            'product-detail__slide'
                                                        )}
                                                    ></Image>
                                                </div>
                                            )
                                        )}
                                    </Slider>
                                </div>
                                {/* <div className={cx('product-detail__actions')}>
                                    <ul
                                        className={cx(
                                            'product-detail__actions-list'
                                        )}
                                    >
                                        <li>
                                            <Button
                                                className={cx(
                                                    'product-detail__actions-item'
                                                )}
                                            >
                                                <HeartIcon></HeartIcon>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                className={cx(
                                                    'product-detail__actions-item'
                                                )}
                                            >
                                                <ZoomInIcon></ZoomInIcon>
                                            </Button>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        </section>
                    </div>
                    {/* Content */}
                    <div className={cx('', { col: true })}>
                        <section className={cx('product-detail__content')}>
                            <div>
                                <h1 className={cx('product-detail__title')}>
                                    {productDetail?.title}
                                </h1>
                            </div>
                            <div className={cx('product-detail__review')}>
                                <div className={cx('product-detail__stars')}>
                                    {productDetail?.averageRate &&
                                        renderRating(productDetail.averageRate)}
                                </div>
                                <span
                                    className={cx(
                                        'product-detail__review-quantity'
                                    )}
                                >
                                    {feedbackList.length} review
                                </span>
                            </div>
                            <p className={cx('product-detail__text')}>
                                {productDetail?.desc}
                            </p>
                            <Price
                                price={productDetail?.price}
                                discount={productDetail?.discount}
                            ></Price>

                            <div
                                className={cx('product-detail__advance-style')}
                            >
                                {/* Color */}
                                <div className={cx('product-detail__group')}>
                                    <div
                                        className={cx('product-detail__label')}
                                    >
                                        <p
                                            className={cx(
                                                'product-detail__label-text'
                                            )}
                                        >
                                            Color:
                                        </p>
                                        <p
                                            className={cx(
                                                'product-detail__color-label'
                                            )}
                                        >
                                            {tempColor
                                                ? productDetail?.colors.map(
                                                      (item) =>
                                                          item.colorId ===
                                                              tempColor &&
                                                          item.name
                                                  )
                                                : productDetail?.colors.map(
                                                      (item) =>
                                                          item.colorId ===
                                                              activeColor &&
                                                          item.name
                                                  )}
                                        </p>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__color-list'
                                        )}
                                    >
                                        {productDetail?.productImages.map(
                                            (item) =>
                                                item.isMainImage && (
                                                    <div
                                                        className={cx(
                                                            'product-detail__color-item',
                                                            {
                                                                active:
                                                                    activeColor ===
                                                                    item.colorId,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSelectColor(
                                                                item.colorId
                                                            )
                                                        }
                                                        onMouseEnter={() =>
                                                            setTempColor(
                                                                item.colorId
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setTempColor(
                                                                undefined
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            className={cx(
                                                                'product-detail__color-img'
                                                            )}
                                                            src={item.imageUrl}
                                                            alt={item.imageName}
                                                        ></Image>
                                                    </div>
                                                )
                                        )}
                                    </div>
                                </div>
                                {/* Screen */}
                                <div className={cx('product-detail__group')}>
                                    <div
                                        className={cx('product-detail__label')}
                                    >
                                        <p
                                            className={cx(
                                                'product-detail__label-text'
                                            )}
                                        >
                                            Screen Size:
                                        </p>
                                        <p
                                            className={cx(
                                                'product-detail__color-label'
                                            )}
                                        >
                                            {/* {tempSize
                                                    ? productDetail?.variants?.map(
                                                          (item) =>
                                                              item.screenSize
                                                                  .sizeId ===
                                                                  tempSize &&
                                                              `${item.screenSize.size} inches`
                                                      )
                                                    : productDetail?.variants?.map(
                                                          (item) =>
                                                              item.screenSize
                                                                  .sizeId ===
                                                                  activeSize &&
                                                              `${item.screenSize.size} inches`
                                                      )} */}
                                            {productDetail?.variants?.map(
                                                (item) =>
                                                    item.color.colorId ===
                                                        activeColor &&
                                                    `${item.screenSize.size} inches`
                                            )}
                                        </p>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__size-list'
                                        )}
                                    >
                                        {productDetail?.variants?.map(
                                            (item) =>
                                                item.color.colorId ===
                                                    activeColor && (
                                                    <Button
                                                        rounded
                                                        className={cx(
                                                            'product-detail__option-btn',
                                                            {
                                                                active:
                                                                    item.color
                                                                        .colorId ===
                                                                    activeColor,
                                                            }
                                                        )}
                                                        // onClick={() =>
                                                        //     setActiveSize(
                                                        //         item.screenSize
                                                        //             .sizeId
                                                        //     )
                                                        // }
                                                        // onMouseEnter={() =>
                                                        //     setActiveSize(
                                                        //         item.screenSize
                                                        //             .sizeId
                                                        //     )
                                                        // }
                                                        // onMouseLeave={() =>
                                                        //     setActiveSize(undefined)
                                                        // }
                                                    >
                                                        {`${item.screenSize.size} Inches`}
                                                    </Button>
                                                )
                                        )}
                                    </div>
                                </div>
                                {/* Material */}
                                <div className={cx('product-detail__group')}>
                                    <div
                                        className={cx('product-detail__label')}
                                    >
                                        <p
                                            className={cx(
                                                'product-detail__label-text'
                                            )}
                                        >
                                            Strap Material:
                                        </p>
                                        <p
                                            className={cx(
                                                'product-detail__color-label'
                                            )}
                                        >
                                            {productDetail?.variants?.map(
                                                (item) =>
                                                    item.color.colorId ===
                                                        activeColor &&
                                                    `${item.material.name}`
                                            )}
                                        </p>
                                    </div>
                                    <div
                                        className={cx(
                                            'product-detail__material-list'
                                        )}
                                    >
                                        {productDetail?.variants?.map(
                                            (item) =>
                                                item.color.colorId ===
                                                    activeColor && (
                                                    <Button
                                                        rounded
                                                        className={cx(
                                                            'product-detail__option-btn',
                                                            {
                                                                active:
                                                                    item.color
                                                                        .colorId ===
                                                                    activeColor,
                                                            }
                                                        )}
                                                    >
                                                        {item.material.name}
                                                    </Button>
                                                )
                                        )}
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className={cx('product-detail__group')}>
                                    <div
                                        className={cx(
                                            'product-detail__product-form'
                                        )}
                                    >
                                        <div
                                            className={cx(
                                                'product-detail__buttons'
                                            )}
                                        >
                                            <Quantity
                                                widthBtn="55px"
                                                heightBtn="55px"
                                                className={cx(
                                                    'product-detail__quantity-btn'
                                                )}
                                            ></Quantity>
                                            <Button
                                                primary
                                                rounded
                                                className={cx(
                                                    'product-detail__add-btn'
                                                )}
                                            >
                                                Add to cart
                                            </Button>
                                            <Button
                                                className={cx(
                                                    'product-detail__btn',
                                                    { 'primary-hover': true }
                                                )}
                                            >
                                                <HeartIcon></HeartIcon>
                                            </Button>
                                            <Button
                                                className={cx(
                                                    'product-detail__btn',
                                                    { 'primary-hover': true }
                                                )}
                                            >
                                                <CompareIcon></CompareIcon>
                                            </Button>
                                        </div>
                                        <Button
                                            to="#!"
                                            rounded
                                            primary
                                            className={cx(
                                                'product-detail__buy-btn'
                                            )}
                                        >
                                            Buy it now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeProduct;

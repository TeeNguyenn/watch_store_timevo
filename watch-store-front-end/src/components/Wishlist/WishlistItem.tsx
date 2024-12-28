import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link, useParams } from 'react-router-dom';

import styles from './Wishlist.module.scss';
import Image from '../Image';
import images from '../../assets/images';
import Button from '../Button';
import { RemoveIcon } from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretDown,
    faCartShopping,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import ProductImageModel from '../../models/ProductImageModel';
import VariantModel from '../../models/VariantModel';
import ProductModel from '../../models/ProductModel';
import * as productServices from '../../services/productServices';
import Price from '../Price';
import * as favoriteServices from '../../services/favoriteServices';
import { CartContext } from '../../contexts/CartContext';
import * as cartItemServices from '../../services/cartItemServices';
import PreLoader from '../PreLoader';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteWishlistItem, putWishlistItem } from './wishlistSlice';
import { getCart, postCart } from '../../layouts/components/Cart/cartSlice';

const cx = classNames.bind(styles);

interface WishlistItemProps {
    wishlistItem: any;
    handleChangeWishlist: any;
    className?: string;
    modifier?: boolean;
}

const WishlistItem = ({
    className,
    wishlistItem,
    modifier,
    handleChangeWishlist,
}: WishlistItemProps) => {
    const [showDropdownVariant, setShowDropdownVariant] = useState(false);
    // const [showMobileDropdownVariant, setShowMobileDropdownVariant] =
    //     useState(false);
    const [activeColor, setActiveColor] = useState<number | undefined>();
    const [tempColor, setTempColor] = useState<number | undefined>();

    const [activeSize, setActiveSize] = useState<number | undefined>();
    const [tempSize, setTempSize] = useState<number | undefined>();

    const [activeMaterial, setActiveMaterial] = useState<number | undefined>();
    const [tempMaterial, setTempMaterial] = useState<number | undefined>();

    const [productDetail, setProductDetail] = useState<ProductModel>();
    const currentUser = localStorage.getItem('user_id');
    const [imageList, setImageList] = useState<ProductImageModel[] | any>([]);

    const [sizeList, setSizeList] = useState<VariantModel[] | undefined>([]);
    const [tempSizeList, setTempSizeList] = useState<
        VariantModel[] | undefined
    >([]);
    const [materialList, setMaterialList] = useState<
        VariantModel[] | undefined
    >([]);
    const [tempMaterialList, setTempMaterialList] = useState<
        VariantModel[] | undefined
    >([]);
    const [loadingCart, setLoadingCart] = useState(false);
    const context = useContext(CartContext);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch()
    const cartStatus = useAppSelector((state: RootState) => state.cartList.status);
    const wishlistStatus = useAppSelector((state: RootState) => state.wishlists.status);


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
        const fetchApi = async () => {
            const responseData = await productServices.getProductById(
                wishlistItem.productId
            );

            setProductDetail(responseData);
            setActiveColor(wishlistItem.colorId);
            setTempColor(wishlistItem.colorId);

            const Arr: VariantModel[] | undefined =
                responseData?.variants?.filter(
                    (variant) => variant.color.colorId === wishlistItem.colorId
                );

            const result: VariantModel[] | undefined = [];

            Arr?.forEach((sizeItem) => {
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
            setSizeList(sortResult);
            setTempSizeList(sortResult);
            setActiveSize(wishlistItem.screenSizeId);
            setTempSize(wishlistItem.screenSizeId);

            const output: VariantModel[] | undefined = [];

            Arr?.forEach((materialItem) => {

                if (materialItem.screenSize.sizeId === wishlistItem.screenSizeId) {
                    output.push(materialItem);
                }
            });

            const sortOutput = output.sort(
                (a: any, b: any) =>
                    a.material.materialId - b.material.materialId
            );
            setMaterialList(sortOutput);
            setTempMaterialList(sortOutput);
            setActiveMaterial(wishlistItem.materialId);
            setTempMaterial(wishlistItem.materialId);

            setImageList(
                responseData?.productImages.filter(
                    (item) => item.colorId === wishlistItem.colorId
                )
            );
        };
        fetchApi();
    }, []);

    const handleSelectColor = (colorId: number, isConfirm: boolean = false) => {
        setTempColor(colorId);

        const Arr: VariantModel[] | undefined = productDetail?.variants?.filter(
            (variant) => variant.color.colorId === colorId
        );

        const result: VariantModel[] | undefined = [];

        Arr?.forEach((sizeItem) => {
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

        setTempSizeList(sortResult);

        if (!isConfirm) {
            setTempSize(sortResult.at(0)?.screenSize.sizeId);
        }

        const output: VariantModel[] | undefined = [];

        Arr?.forEach((materialItem) => {

            if (materialItem.screenSize.sizeId === sortResult.at(0)?.screenSize.sizeId) {
                output.push(materialItem);
            }
        });

        const sortOutput = output.sort(
            (a: any, b: any) => a.material.materialId - b.material.materialId
        );

        setTempMaterialList(sortOutput);

        if (!isConfirm) {
            setTempMaterial(sortOutput.at(0)?.material.materialId);
        }
    };


    const handleSelectSize = (sizeId: number, isConfirm: boolean = false, isCancel: boolean = false) => {
        const Arr: VariantModel[] | undefined = productDetail?.variants?.filter(
            (variant) => variant.color.colorId === (isCancel ? activeColor : tempColor)
        );

        const output: VariantModel[] | undefined = [];

        Arr?.forEach((materialItem) => {

            if (materialItem.screenSize.sizeId === sizeId) {
                output.push(materialItem);
            }
        });

        const sortOutput = output.sort(
            (a: any, b: any) => a.material.materialId - b.material.materialId
        );

        setTempMaterialList(sortOutput);

        if (!isConfirm) {
            setTempMaterial(sortOutput.at(0)?.material.materialId);
        }

    }

    const handleConfirm = () => {
        const newArr = productDetail?.productImages.filter(
            (item: ProductImageModel) => item.colorId === tempColor
        );
        setImageList(newArr);


        const fetchApi = async () => {
            const resData = await favoriteServices.getFavoriteByUserId(
                customerId || currentUser + ''
            );

            // Lay ra item mà đang có variant giống variant đang active de lay ra favoriteId
            const putFavoriteItem = resData.result.find((item) => {
                return (
                    item.productId === productDetail?.productId &&
                    item.colorId === activeColor &&
                    item.screenSizeId === activeSize &&
                    item.materialId === activeMaterial
                );
            });

            if (putFavoriteItem) {
                dispatch(putWishlistItem({
                    productId: productDetail?.productId,
                    colorId: tempColor,
                    screenSizeId: tempSize,
                    materialId: tempMaterial,
                    id: putFavoriteItem?.favoriteId,
                }))
            }
        };
        fetchApi();


        setActiveColor(tempColor);
        setActiveSize(tempSize);
        setActiveMaterial(tempMaterial);
        setShowDropdownVariant(false);
        // setShowMobileDropdownVariant(false);
        handleSelectColor(Number(parseInt(tempColor + '')), true);
        handleSelectSize(Number(parseInt(tempSize + '')), true);

    };

    const handleCancel = () => {
        const newArr = productDetail?.productImages.filter(
            (item: ProductImageModel) => item.colorId === activeColor
        );
        setImageList(newArr);
        setTempColor(activeColor);
        setTempSize(activeSize);
        setTempMaterial(activeMaterial);
        setShowDropdownVariant(false);
        // setShowMobileDropdownVariant(false);
        handleSelectColor(Number(parseInt(activeColor + '')), true);
        handleSelectSize(Number(parseInt(activeSize + '')), true, true);

    };

    const handleOutSide = () => {
        setTempColor(activeColor);
        setTempSize(activeSize);
        setTempMaterial(activeMaterial);
        setShowDropdownVariant(false);
        // setShowMobileDropdownVariant(false);
        handleSelectColor(Number(parseInt(activeColor + '')), true);
        handleSelectSize(Number(parseInt(activeSize + '')), true, true);

    };

    const handleRemoveItem = async () => {
        await dispatch(deleteWishlistItem({
            userId: Number.parseInt(currentUser + ''),
            productId: wishlistItem?.productId,
            colorId: wishlistItem?.colorId,
            screenSizeId: wishlistItem.screenSizeId,
            materialId: wishlistItem.materialId,
        }));
        handleChangeWishlist();

    };

    const handleAddToCart = () => {

        const fetchData = async () => {
            await dispatch(postCart({
                productId: productDetail?.productId,
                colorId: activeColor,
                screenSizeId: activeSize,
                materialId: activeMaterial
            }))
            await dispatch(getCart());
            if (cartStatus === 'fulfilled') {
                context?.handleCart();
            }

        }

        fetchData();
    };

    if (wishlistStatus === 'loading') {
        return <PreLoader show></PreLoader>;
    }

    return (
        <tr className={cx('', className)}>
            <td className={cx('wishlist__media', {
                modifier
            })}>
                <div className={cx('wishlist__img-wrapper')} style={modifier ? { width: 60, height: 60 } : {}}>
                    <Image
                        src={imageList?.at(0)?.imageUrl}
                        alt="image"
                        loading={'lazy'}
                        className={cx('wishlist__img')}
                    ></Image>
                </div>
            </td>
            <td className={cx('wishlist__product', {
                modifier
            })}>
                <Link
                    to={`/products/${productDetail?.productId}`}
                    className={cx('wishlist__link', {
                        'line-clamp': true,
                        'line-clamp-1': true,
                    })}
                >
                    {productDetail?.title}
                </Link>
            </td>
            <td
                className={cx('wishlist__variant', {
                    'd-none': modifier
                })}
                style={{
                    width: '20%',
                    minWidth: '220px',
                }}
            >
                <Tippy
                    visible={showDropdownVariant}
                    interactive
                    delay={[0, 300]}
                    offset={[0, 50]}
                    placement="bottom"
                    onClickOutside={handleOutSide}
                    render={(attrs) => (
                        <div className={cx('variant__container')}>
                            {/* Color */}
                            <div className={cx('variant__group')}>
                                <p className={cx('variant__label')}>Color:</p>
                                {productDetail?.colors.map((colorItem) => (
                                    <Button
                                        key={colorItem.colorId}
                                        className={cx('variant__select-btn', {
                                            active:
                                                tempColor === colorItem.colorId,
                                        })}
                                        onClick={() =>
                                            handleSelectColor(colorItem.colorId)
                                        }
                                    >
                                        {colorItem.name}
                                    </Button>
                                ))}
                            </div>
                            {/* Screen size */}
                            <div className={cx('variant__group')}>
                                <p className={cx('variant__label')}>
                                    Screen size:
                                </p>
                                {tempSizeList?.map((sizeItem) => (
                                    <Button
                                        key={sizeItem.screenSize.sizeId}
                                        className={cx('variant__select-btn', {
                                            active:
                                                sizeItem.screenSize.sizeId ===
                                                tempSize,
                                        })}
                                        onClick={() => {

                                            setTempSize(
                                                sizeItem.screenSize.sizeId
                                            );
                                            handleSelectSize(sizeItem.screenSize.sizeId)
                                        }
                                        }
                                    >
                                        {`${sizeItem.screenSize.size} Inches`}
                                    </Button>
                                ))}
                            </div>
                            {/* Material */}
                            <div className={cx('variant__group')}>
                                <p className={cx('variant__label')}>
                                    Material:
                                </p>
                                {tempMaterialList?.map((materialItem) => (
                                    <Button
                                        key={materialItem.material.materialId}
                                        className={cx('variant__select-btn', {
                                            active:
                                                materialItem.material
                                                    .materialId ===
                                                tempMaterial,
                                        })}
                                        onClick={() =>
                                            setTempMaterial(
                                                materialItem.material.materialId
                                            )
                                        }
                                    >
                                        {materialItem.material.name + ''}
                                    </Button>
                                ))}
                            </div>
                            <div className={cx('variant__bottom')}>
                                <Button
                                    className={cx('variant__cancel-btn')}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    primary
                                    className={cx('variant__confirm-btn')}
                                    onClick={handleConfirm}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    )}
                >
                    <div
                        className={cx('wishlist__variant-top', {
                            active: showDropdownVariant,
                        })}
                        onClick={() =>
                            setShowDropdownVariant(!showDropdownVariant)
                        }
                    >
                        <p className={cx('wishlist__variant-label')}>
                            Product Classification:
                        </p>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </Tippy>

                <div className={cx('cart-item__options')}>
                    <div className={cx('cart-item__option')}>
                        {productDetail?.colors.map(
                            (item) => item.colorId === activeColor && item.name
                        )}
                    </div>
                    <div className={cx('cart-item__option')}>
                        {productDetail?.screenSizes?.map(
                            (item) =>
                                item.sizeId === activeSize &&
                                item.size + ' Inches'
                        )}
                    </div>
                    <div className={cx('cart-item__option')}>
                        {productDetail?.materials?.map(
                            (item) =>
                                item.materialId === activeMaterial && item.name
                        )}
                    </div>
                </div>
            </td>

            <td className={cx('', {
                'd-none': !modifier
            })}>
                <div className={cx('wishlist__styles-text')}>
                    {productDetail?.colors.map(
                        (item) => item.colorId === activeColor && item.name
                    )}
                </div>
            </td>
            <td className={cx('', {
                'd-none': !modifier
            })} >
                <div className={cx('wishlist__styles')} style={{ textAlign: 'left' }}>
                    {productDetail?.screenSizes?.map(
                        (item) =>
                            item.sizeId === activeSize &&
                            item.size + ' Inches'
                    )}
                </div>
            </td>
            <td className={cx('wishlist__styles', {
                'd-none': !modifier
            })}>
                <div className={cx('wishlist__styles')}>
                    {productDetail?.materials?.map(
                        (item) =>
                            item.materialId === activeMaterial && item.name
                    )}
                </div>
            </td>
            <td className={cx('wishlist__price', {
                modifier
            })}>
                <Price
                    price={productDetail?.price}
                    discount={productDetail?.discount}
                    noBadge
                ></Price>
            </td>
            <td className={cx('wishlist__options', {
                'd-none': modifier
            })}>
                <div className={cx('wishlist__option-wrapper')}>
                    <Button
                        className={cx('wishlist__trash-can')}
                        onClick={handleRemoveItem}
                    >
                        <RemoveIcon width="1.8rem" height="1.8rem"></RemoveIcon>
                    </Button>
                    <Button
                        className={cx('wishlist__add-cart')}
                        leftIcon={
                            !loadingCart && (
                                <FontAwesomeIcon icon={faCartShopping} />
                            )
                        }
                        onClick={handleAddToCart}
                    >
                        {loadingCart ? (
                            <Button className={cx('loading')}>
                                <FontAwesomeIcon icon={faSpinner} />
                            </Button>
                        ) : (
                            'Add to cart'
                        )}
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default WishlistItem;

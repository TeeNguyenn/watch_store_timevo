import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { RemoveIcon } from '../../../components/Icons';
import Quantity from '../../../components/Quantity';
import Price from '../../../components/Price';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../components/Button';
import styles from '../Cart.module.scss';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ProductModel from '../../../models/ProductModel';
import VariantModel from '../../../models/VariantModel';
import * as productServices from '../../../services/productServices';
import { formatPrice } from '../../../utils/Functions';
import * as cartItemServices from '../../../services/cartItemServices';
import PreLoader from '../../../components/PreLoader';
import ProductImageModel from '../../../models/ProductImageModel';
import { deleteCart, getCart, postCart } from '../../../layouts/components/Cart/cartSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

const cx = classNames.bind(styles);

interface CartItemProps {
    cartItem?: any;

}

const CartItem = ({ cartItem }: CartItemProps) => {
    const [showDropdownVariant, setShowDropdownVariant] = useState(false);
    const [showMobileDropdownVariant, setShowMobileDropdownVariant] =
        useState(false);
    const [activeColor, setActiveColor] = useState<number | undefined>();
    const [tempColor, setTempColor] = useState<number | undefined>();

    const [activeSize, setActiveSize] = useState<number | undefined>();
    const [tempSize, setTempSize] = useState<number | undefined>();

    const [activeMaterial, setActiveMaterial] = useState<number | undefined>();
    const [tempMaterial, setTempMaterial] = useState<number | undefined>();

    const [isErrorQuantity, setIsErrorQuantity] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const dispatch = useAppDispatch();
    const cartStatus = useAppSelector((state: RootState) => state.cartList.status);


    useEffect(() => {
        const fetchApi = async () => {
            const responseData = await productServices.getProductById(
                cartItem.product_id
            );

            setProductDetail(responseData);
            setActiveColor(cartItem.color_id);
            setTempColor(cartItem.color_id);

            const Arr: VariantModel[] | undefined =
                responseData?.variants?.filter(
                    (variant) => variant.color.colorId === cartItem.color_id
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
            setActiveSize(cartItem.screen_size_id);
            setTempSize(cartItem.screen_size_id);

            const output: VariantModel[] | undefined = [];

            Arr?.forEach((materialItem) => {
                if (materialItem.screenSize.sizeId === cartItem.screen_size_id) {
                    output.push(materialItem);
                }
            });

            const sortOutput = output.sort(
                (a: any, b: any) =>
                    a.material.materialId - b.material.materialId
            );
            setMaterialList(sortOutput);
            setTempMaterialList(sortOutput);
            setActiveMaterial(cartItem.material_id);
            setTempMaterial(cartItem.material_id);

            setImageList(
                responseData?.productImages.filter(
                    (item) => item.colorId === cartItem.color_id
                )
            );
        };
        fetchApi();
    }, [cartItem.product_id]);

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

    const handleErrorQuantity = (isError: boolean) => {
        setIsErrorQuantity(isError);
    };

    const handleRemoveCartItem = () => {
        const fetchData = async () => {
            await dispatch(deleteCart({
                userId: Number.parseInt(currentUser + ''),
                productId: cartItem?.product_id,
                colorId: cartItem?.color_id,
                screenSizeId: cartItem?.screen_size_id,
                materialId: cartItem?.material_id,
            }))
            await dispatch(getCart());

        }
        fetchData();
    };

    const handleConfirm = () => {
        const newArr = productDetail?.productImages.filter(
            (item: ProductImageModel) => item.colorId === tempColor
        );
        setImageList(newArr);
        setActiveColor(tempColor);
        setActiveSize(tempSize);
        setActiveMaterial(tempMaterial);
        setShowDropdownVariant(false);
        setShowMobileDropdownVariant(false);
        handleSelectColor(Number(parseInt(tempColor + '')), true);
        handleSelectSize(Number(parseInt(tempSize + '')), true);
        const fetchApi = async () => {
            const resData = await cartItemServices.getCartItemByUserId();
            const cartItem = resData.find(
                (item: any) =>
                    item.product_id === productDetail?.productId &&
                    item.color_id === tempColor &&
                    item.screen_size_id === tempSize &&
                    item.material_id === tempMaterial
            );
            const putCartItem = resData.find(
                (item: any) =>
                    item.product_id === productDetail?.productId &&
                    item.color_id === activeColor &&
                    item.screen_size_id === activeSize &&
                    item.material_id === activeMaterial
            );
            if (cartItem) {
                const fetchData = async () => {
                    await dispatch(deleteCart({
                        userId: Number.parseInt(currentUser + ''),
                        productId: productDetail?.productId,
                        colorId: activeColor,
                        screenSizeId: activeSize,
                        materialId: activeMaterial,
                    }))
                    await dispatch(deleteCart({
                        userId: Number.parseInt(currentUser + ''),
                        productId: productDetail?.productId,
                        colorId: tempColor,
                        screenSizeId: tempSize,
                        materialId: tempMaterial,
                    }))
                    await dispatch(postCart({
                        productId: productDetail?.productId,
                        colorId: tempColor,
                        screenSizeId: tempSize,
                        materialId: tempMaterial,
                        quantity: cartItem.quantity + 1
                    }))
                    await dispatch(getCart());

                }
                fetchData();
            } else {
                const fetchData = async () => {
                    await dispatch(deleteCart({
                        userId: Number.parseInt(currentUser + ''),
                        productId: productDetail?.productId,
                        colorId: activeColor,
                        screenSizeId: activeSize,
                        materialId: activeMaterial,
                    }))

                    await dispatch(postCart({
                        productId: productDetail?.productId,
                        colorId: tempColor,
                        screenSizeId: tempSize,
                        materialId: tempMaterial,
                        quantity: putCartItem.quantity
                    }))
                    await dispatch(getCart());

                }
                fetchData();
            }
        };
        fetchApi();


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
        setShowMobileDropdownVariant(false);
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

    if (cartStatus === 'loading') {
        return <PreLoader show></PreLoader>;
    }

    return (
        <tr className={cx('cart-item')}>
            <td
                className={cx('cart-item__product')}
                style={{
                    width: '35%',
                    minWidth: '450px',
                }}
            >
                <Link
                    to={`/products/${productDetail?.productId}`}
                    className={cx('cart-item__media')}
                >
                    <Image
                        src={
                            productDetail?.productImages
                                .filter(
                                    (item) =>
                                        item.colorId === cartItem.color_id &&
                                        item.isMainImage
                                )
                                .at(0)?.imageUrl || ''
                        }
                        className={cx('cart-item__img')}
                    ></Image>
                </Link>
                <div className={cx('cart-item__body')}>
                    <p className={cx('cart-item__label')}>
                        {productDetail?.category?.name}
                    </p>
                    <Link
                        to={`/products/${productDetail?.productId}`}
                        className={cx('cart-item__link', {
                            'primary-hover': true,
                        })}
                    >
                        {productDetail?.title}
                    </Link>
                    {/* mobile */}
                    <Tippy
                        visible={showMobileDropdownVariant}
                        interactive
                        delay={[0, 300]}
                        offset={[0, 60]}
                        placement="bottom"
                        onClickOutside={handleOutSide
                        }
                        render={(attrs) => (
                            <div className={cx('variant__container')}>
                                {/* Color */}
                                <div className={cx('variant__group')}>
                                    <p className={cx('variant__label')}>
                                        Color:
                                    </p>
                                    {productDetail?.colors.map((colorItem) => (
                                        <Button
                                            key={colorItem.colorId}
                                            className={cx(
                                                'variant__select-btn',
                                                {
                                                    active:
                                                        tempColor ===
                                                        colorItem.colorId,
                                                }
                                            )}
                                            onClick={() =>
                                                handleSelectColor(
                                                    colorItem.colorId
                                                )
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
                                            className={cx(
                                                'variant__select-btn',
                                                {
                                                    active:
                                                        sizeItem.screenSize
                                                            .sizeId ===
                                                        tempSize,
                                                }
                                            )}
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
                                            key={
                                                materialItem.material.materialId
                                            }
                                            className={cx(
                                                'variant__select-btn',
                                                {
                                                    active:
                                                        materialItem.material
                                                            .materialId ===
                                                        tempMaterial,
                                                }
                                            )}
                                            onClick={() =>
                                                setTempMaterial(
                                                    materialItem.material
                                                        .materialId
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
                            className={cx('cart-item__variant-top', {
                                active: showMobileDropdownVariant,
                                'd-none': true,
                                'd-md-flex': true,
                            })}
                            onClick={() =>
                                setShowMobileDropdownVariant(
                                    !showMobileDropdownVariant
                                )
                            }
                        >
                            <p className={cx('cart-item__variant-label')}>
                                {productDetail?.colors.map(
                                    (item) =>
                                        item.colorId === activeColor &&
                                        item.name
                                )}{' '}
                                /{' '}
                                {productDetail?.screenSizes?.map(
                                    (item) =>
                                        item.sizeId === activeSize &&
                                        item.size + ' Inches'
                                )}{' '}
                                /{' '}
                                {productDetail?.materials?.map(
                                    (item) =>
                                        item.materialId === activeMaterial &&
                                        item.name
                                )}
                            </p>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </Tippy>
                    <div
                        className={cx('cart-item__price-text', {
                            'd-none': true,
                            'd-xl-block': true,
                        })}
                    >
                        <Price
                            price={productDetail?.price}
                            discount={productDetail?.discount}
                            noBadge
                        ></Price>
                    </div>

                    <div
                        className={cx('cart__mobile-actions', {
                            'd-none': true,
                            'd-lg-flex': true,
                        })}
                    >
                        <Quantity
                            widthBtn="40px"
                            heightBtn="42px"
                            value={cartItem.quantity + ''}
                            cartItem={cartItem}
                        ></Quantity>
                        <RemoveIcon width="17" height="22"></RemoveIcon>
                    </div>
                </div>
            </td>
            <td
                className={cx('cart-item__variant', {
                    'd-md-none': true,
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
                    offset={[0, 60]}
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
                        className={cx('cart-item__variant-top', {
                            active: showDropdownVariant,
                        })}
                        onClick={() =>
                            setShowDropdownVariant(!showDropdownVariant)
                        }
                    >
                        <p className={cx('cart-item__variant-label')}>
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
            <td
                className={cx('cart-item__  e', {
                    'd-xl-none': true,
                })}
                style={{
                    width: '15%',
                    minWidth: '160px',
                }}
            >
                <div className={cx('cart-item__price-text')}>
                    <Price
                        price={productDetail?.price}
                        discount={productDetail?.discount}
                        noBadge
                    ></Price>
                </div>
            </td>
            <td
                className={cx('cart-item__quantity', {
                    'd-lg-none': true,
                })}
                style={{
                    width: '15%',
                    minWidth: '180px',
                }}
            >
                <Quantity
                    widthBtn="55px"
                    heightBtn="55px"
                    value={cartItem.quantity + ''}
                    cartItem={cartItem}
                ></Quantity>
            </td>

            <td
                className={cx('cart-item__total', {
                    'd-lg-none': true,
                })}
                style={{
                    width: '10%',
                    minWidth: '120px',
                }}
            >
                <div className={cx('cart-item__total-text')}>
                    {productDetail?.discount
                        ? formatPrice(
                            productDetail?.price *
                            (1 - productDetail?.discount / 100) *
                            cartItem.quantity
                        )
                        : formatPrice(
                            Number.parseInt(productDetail?.price + '') *
                            cartItem.quantity
                        )}
                </div>
            </td>
            <td
                className={cx('cart-item__actions', {
                    'd-lg-none': true,
                })}
                style={{
                    width: '5%',
                }}
            >
                <div onClick={handleRemoveCartItem}>
                    <RemoveIcon
                        className={cx('', {
                            'primary-hover': true,
                        })}
                    ></RemoveIcon>
                </div>
            </td>
        </tr>
    );
};

export default CartItem;

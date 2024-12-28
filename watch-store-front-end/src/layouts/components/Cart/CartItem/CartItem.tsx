import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../../components/Button';
import { ErrorIcon, RemoveIcon } from '../../../../components/Icons';
import styles from '../Cart.module.scss';
import { Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import images from '../../../../assets/images';
import Quantity from '../../../../components/Quantity';
import * as productServices from '../../../../services/productServices';
import ProductModel from '../../../../models/ProductModel';
import VariantModel from '../../../../models/VariantModel';
import * as cartItemServices from '../../../../services/cartItemServices';
import ProductImageModel from '../../../../models/ProductImageModel';
import { useAppDispatch } from '../../../../redux/store';
import { deleteCart, getCart } from '../cartSlice';

const cx = classNames.bind(styles);

interface CartItemProps {
    cartItem?: any;

}

const CartItem = ({ cartItem }: CartItemProps) => {
    const [isErrorQuantity, setIsErrorQuantity] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [productDetail, setProductDetail] = useState<ProductModel>();
    const currentUser = localStorage.getItem('user_id');

    const [sizeList, setSizeList] = useState<VariantModel[] | undefined>([]);
    const [materialList, setMaterialList] = useState<
        VariantModel[] | undefined
    >([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchApi = async () => {
            // setLoading(true);

            const responseData = await productServices.getProductById(
                cartItem.product_id
            );

            setProductDetail(responseData);

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

            const output: VariantModel[] | undefined = [];

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
            });

            const sortOutput = output.sort(
                (a: any, b: any) =>
                    a.material.materialId - b.material.materialId
            );
            setMaterialList(sortOutput);

            // setLoading(false);
        };
        fetchApi();
    }, [cartItem]);

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

    return (
        <div className={cx('cart-item')}>
            <Link
                to={`/products/${productDetail?.productId}`}
                className={cx('cart-item__img-link')}
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
                    alt="cart-item"
                    className={cx('cart-item__img')}
                ></Image>
            </Link>
            <div className={cx('cart-item__body')}>
                <p className={cx('cart-item__caption')}>
                    {productDetail?.category?.name}
                </p>

                <Link to={`/products/${productDetail?.productId}`}>
                    <span className={cx('cart-item__name')}>
                        {productDetail?.title}
                    </span>
                </Link>
                <div className={cx('cart-item__options')}>
                    <p className={cx('cart-item__option')}>
                        {productDetail?.colors.map(
                            (colorItem) =>
                                colorItem.colorId === cartItem.color_id &&
                                colorItem.name
                        )}
                    </p>
                    <p className={cx('cart-item__option')}>
                        {sizeList?.map(
                            (sizeItem) =>
                                sizeItem.screenSize.sizeId ===
                                cartItem.screen_size_id &&
                                `${sizeItem.screenSize.size} Inches`
                        )}
                    </p>
                    <p className={cx('cart-item__option')}>
                        {materialList?.map(
                            (materialItem) =>
                                materialItem.material.materialId ===
                                cartItem.material_id &&
                                materialItem.material.name
                        )}
                    </p>
                </div>
                <div className={cx('cart-item__quantity-wrapper')}>
                    {/* Onblur when input error = -1... */}
                    <div
                        className={cx('cart-item__error', {
                            show: isErrorQuantity,
                        })}
                    >
                        <ErrorIcon></ErrorIcon>
                        <p className={cx('cart-item__error-text')}>
                            You can only add from 1 to 100 of this item to your
                            cart.
                        </p>
                    </div>
                    <Quantity
                        className={cx('cart-item__quantity')}
                        widthBtn="35px"
                        heightBtn="36px"
                        handleErrorQuantity={handleErrorQuantity}
                        value={cartItem.quantity + ''}
                        cartItem={cartItem}
                    ></Quantity>
                </div>
                <div className={cx('cart-item__remove-wrapper')}>
                    <Button
                        className={cx('cart-item__remove-btn')}
                        onClick={handleRemoveCartItem}
                    >
                        <RemoveIcon
                            className={cx('cart-item__remove-icon')}
                        ></RemoveIcon>
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default CartItem;

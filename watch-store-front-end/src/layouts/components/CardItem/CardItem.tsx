import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Price from '../../../components/Price';
import styles from './CardItem.module.scss';
import Image from '../../../components/Image';
import ColorItem from '../../../components/ColorItem';
import ProductIcons from '../../../components/ProductIcons';
import Badge from '../../../components/Badge';
import ProductModel from '../../../models/ProductModel';
import Tippy from '@tippyjs/react';
import ProductImageModel from '../../../models/ProductImageModel';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

interface CardItemProps {
    className?: string;
    productItem?: ProductModel;
}

const CardItem = ({ className, productItem }: CardItemProps) => {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 575.98px)' });
    const [mainProductImageList, setMainProductImageList] = useState<
        ProductImageModel[] | undefined
    >(productItem?.productImages.filter((item) => item.isMainImage));
    const [activeColor, setActiveColor] = useState(
        productItem?.colors[0].colorId
    );
    const [activeThumbnail, setActiveThumbnail] = useState(productItem?.productImages.find(item => item.isMainImage)?.imageUrl);

    const handleMainProductImage = (colorId: number) => {
        mainProductImageList?.forEach(
            (item) =>
                item.colorId === colorId && setActiveThumbnail(item.imageUrl)
        );

        setActiveColor(colorId);
    };

    return (
        <div className={cx('card-item', className)}>
            <Link
                to={`/products/${productItem?.productId}`}
                className={cx('card-item__img-link')}
            >
                {/* {soldOut && <Badge title="Sold Out"></Badge>} */}
                <Image
                    src={activeThumbnail || images.noProductImg}
                    alt={productItem?.title}
                    className={cx('card-item__img')}
                ></Image>
                <ProductIcons
                    mobile={isMobileScreen}
                    className={cx('card-item__product-icons')}
                ></ProductIcons>
            </Link>
            <div className={cx('card-item__body')}>
                <h3>
                    <Link
                        className={cx('card-item__name')}
                        to={`/products/${productItem?.productId}`}
                    >
                        {productItem?.title}
                    </Link>
                </h3>
                <div className={cx('color-list')}>
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
                                    active={activeColor === colorItem.colorId}
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
                <Price
                    className={cx('card-item__price')}
                    price={productItem?.price}
                ></Price>
            </div>
        </div>
    );
};

export default CardItem;

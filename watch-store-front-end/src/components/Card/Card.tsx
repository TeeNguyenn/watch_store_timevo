import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from '../Button';
import styles from './Card.module.scss';
import Image from '../Image';
import images from '../../assets/images/home';
import ProductIcons from '../ProductIcons';
import ColorItem from '../ColorItem';
import Badge from '../Badge';

const cx = classNames.bind(styles);

interface CardProps {
    soldOut?: boolean;
    className?: string;
}

const Card = ({ soldOut, className }: CardProps) => {
    return (
        <div className={cx('card', className)}>
            <Link to="#!" className={cx('card__media')}>
                <Badge title="Sold out"></Badge>
                <Image
                    src={images.popupProductImg}
                    className={cx('card__img')}
                ></Image>
                <ProductIcons mobile></ProductIcons>
            </Link>
            <div className={cx('card__body')}>
                <h3>
                    <Button to="#!" className={cx('card__heading')}>
                        Unisex Smartwatch
                    </Button>
                </h3>
                <div className={cx('card__color-options')}>
                    {/* <ColorItem color="#7989b8"></ColorItem>
                    <ColorItem color="rgb(2, 2, 2)"></ColorItem>
                    <ColorItem color="#b0e1e7"></ColorItem> */}
                    <ColorItem
                        red={2}
                        green={2}
                        blue={2}
                        // alpha={colorItem.alpha}
                    ></ColorItem>
                    <ColorItem
                        red={2}
                        green={2}
                        blue={2}
                        // alpha={colorItem.alpha}
                    ></ColorItem>
                    <ColorItem
                        red={2}
                        green={2}
                        blue={2}
                        // alpha={colorItem.alpha}
                    ></ColorItem>
                </div>
                <p className={cx('card__price')}>$14.3369</p>
            </div>
        </div>
    );
};

export default Card;

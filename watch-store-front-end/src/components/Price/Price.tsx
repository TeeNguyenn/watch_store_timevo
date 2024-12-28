import React from 'react';
import classNames from 'classnames/bind';
import styles from './Price.module.scss';
import { formatPrice } from '../../utils/Functions';
import ProductModel from '../../models/ProductModel';
import Badge from '../Badge';

const cx = classNames.bind(styles);

interface PriceProps {
    noBadge?: boolean;
    className?: string;
    price?: number;
    discount?: number;
}

const Price = ({ className, noBadge, price = 0, discount = 0 }: PriceProps) => {
    return (
        <div className={cx('price__container', className)}>
            <div className={cx('price__regular-wrapper')}>
                <p className={cx('price__regular')}>
                    {discount
                        ? formatPrice(price * (1 - discount / 100))
                        : formatPrice(price)}
                </p>
            </div>
            <div
                className={cx('price__old-wrapper', {
                    'd-none': !discount,
                })}
            >
                <p className={cx('price__old')}>{formatPrice(price)}</p>
            </div>
            {discount !== 0 && !noBadge && (
                <Badge
                    className={cx('price__discount')}
                    title={`SAVE ${parseInt(discount + '')}%`}
                ></Badge>
            )}
        </div>
    );
};

export default Price;

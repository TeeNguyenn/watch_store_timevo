import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './QuickBuy.module.scss';
import Detail from '../../pages/Detail';
import { CloseIcon } from '../Icons';
import ProductModel from '../../models/ProductModel';

const cx = classNames.bind(styles);

interface QuickBuyProps {
    showQuickBuyModal: boolean;
    handleShowQuickBuyModal: () => void;
    show?: boolean;
    productItem?: ProductModel;
}

const QuickBuy = ({
    productItem,
    show = false,
    showQuickBuyModal,
    handleShowQuickBuyModal = () => {},
}: QuickBuyProps) => {
    return (
        <div className={cx('quick-buy', { show })}>
            <div
                className={cx('quick-buy__overlay')}
                onClick={handleShowQuickBuyModal}
            ></div>
            <div
                className={cx('quick-buy__container', {
                    show: showQuickBuyModal,
                })}
            >
                <button
                    className={cx('quick-buy__close-btn', {
                        'primary-hover': true,
                    })}
                    onClick={handleShowQuickBuyModal}
                >
                    <CloseIcon width="1.6rem" height="1.6rem"></CloseIcon>
                </button>
                {show && <Detail quickBuy productItem={productItem}></Detail>}
            </div>
        </div>
    );
};

export default QuickBuy;

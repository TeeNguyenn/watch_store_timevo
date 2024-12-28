import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Cart.module.scss';

const cx = classNames.bind(styles);

interface CartWrapperProps {
    children: JSX.Element;
    handleCloseCartDrawer: () => void;
    show?: boolean;
}

const CartWrapper = ({
    children,
    show,
    handleCloseCartDrawer,
}: CartWrapperProps) => {
    return (
        <div className={cx('cart', { active: show })}>
            <div className={cx('inner')}>
                <div
                    className={cx('overlay')}
                    onClick={handleCloseCartDrawer}
                ></div>
                <div className={cx('content')} style={styles}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CartWrapper;

import React from 'react';
import classNames from 'classnames/bind';

import styles from './Wishlist.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import config from '../../config';
import WishlistComponent from '../../components/Wishlist';
import PageNotFound from '../PageNotFound';
import { RootState, useAppSelector } from '../../redux/store';

const cx = classNames.bind(styles);

const Wishlist = () => {
    const links = [{ to: config.routes.home, name: 'home' }, { name: 'Wishlist' }];

    const currentUser = localStorage.getItem('user_id');

    const wishlist = useAppSelector((state: RootState) => state.wishlists.wishlist);
    const status = useAppSelector((state: RootState) => state.wishlists.status);


    if (!currentUser) {
        return <PageNotFound></PageNotFound>;
    }

    return (
        <div className={cx('wishlist', { 'container-spacing': true })}>
            <Breadcrumb title="wishlist" links={links}></Breadcrumb>
            <div className={cx('', { 'd-none': wishlist.length === 0 })}>
                <WishlistComponent></WishlistComponent>
            </div>
            {/* Empty wishlist */}
            {wishlist.length === 0 && status !== 'loading' && (
                <div className={cx('wishlist__empty')}>
                    <h2 className={cx('wishlist__empty-title')}>
                        Nothing found in wishlist!
                    </h2>
                    <Button
                        to={config.routes.shop}
                        rounded
                        primary
                        className={cx('wishlist__btn')}
                    >
                        Continue shopping
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Wishlist;

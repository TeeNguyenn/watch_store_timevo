import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MobileSubMenu.module.scss';
import { RightArrowIcon } from '../Icons';
import { NavLink } from 'react-router-dom';
import config from '../../config';

const cx = classNames.bind(styles);

interface MobileSubMenuProps {
    isShow: boolean;
    title: string;
    navList: any[];
    handleMobileSubMenu: (isCloseMobileSubMenu: boolean) => void;
}

const MobileSubMenu = ({
    isShow,
    title,
    navList,
    handleMobileSubMenu,
}: MobileSubMenuProps) => {
    return (
        <div className={cx('menu-drawer__content', { show: isShow })}>
            <div className={cx('mobile-sub-menu')}>
                <div
                    className={cx('mobile-sub-menu__header', {
                        // active: showMobileSubMenu,
                    })}
                    onClick={() => handleMobileSubMenu(true)}
                >
                    <RightArrowIcon
                        className={cx('mobile-sub-menu__icon')}
                    ></RightArrowIcon>
                    <span>{title}</span>
                </div>
                <nav className={cx('mobile-sub-menu__navbar')}>
                    {navList?.map((navItem, index) => (
                        <NavLink
                            key={index}
                            to={navItem.to}
                            className={(nav) =>
                                cx('mobile-sub-menu__nav-item', {
                                    active: nav.isActive,
                                    'd-none': navItem.name === 'Dashboard', //admin
                                    'log-out': navItem.name === 'Log out',
                                })
                            }
                            onClick={() => handleMobileSubMenu(false)}
                        >
                            {navItem.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileSubMenu;

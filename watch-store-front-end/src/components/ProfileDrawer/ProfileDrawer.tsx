import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileDrawer.module.scss';
import Button from '../Button';
import { CloseIcon, RightArrowIcon, UserIcon } from '../Icons';
import { Link, NavLink } from 'react-router-dom';
import config from '../../config';

const cx = classNames.bind(styles);

interface ProfileDrawerProps {
    isShow: boolean;
    className?: string;
    handleShowMobileMenu?: any;
}

const ProfileDrawer = ({
    isShow,
    className,
    handleShowMobileMenu,
}: ProfileDrawerProps) => {
    return (
        <div className={cx('mobile-menu__menu-drawer')}>
            <span
                className={cx('menu-drawer__overlay', {
                    show: isShow,
                })}
                onClick={handleShowMobileMenu}
            ></span>
            <div
                className={cx('menu-drawer__inner', {
                    show: isShow,
                })}
            >
                <div className={cx('menu-drawer__header')}>
                    <span className={cx('menu-drawer__heading')}>
                        My Account
                    </span>
                    <Button
                        className={cx('menu-drawer__close-btn')}
                        onClick={handleShowMobileMenu}
                    >
                        <CloseIcon width="1.5rem" height="1.5rem"></CloseIcon>
                    </Button>
                </div>
                <nav className={cx('menu-drawer__navbar')}>
                    <NavLink
                        to={'/profile'}
                        className={(nav) =>
                            cx('menu-drawer__nav-item', {
                                active: nav.isActive,
                            })
                        }
                        onClick={() => handleShowMobileMenu}
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to={'/dashboard'}
                        className={(nav) =>
                            cx('menu-drawer__nav-item', {
                                active: nav.isActive,
                                'd-none': true, //admin
                            })
                        }
                        onClick={() => handleShowMobileMenu}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to={'/posts'}
                        className={(nav) =>
                            cx('menu-drawer__nav-item', {
                                active: nav.isActive,
                            })
                        }
                        onClick={() => handleShowMobileMenu}
                    >
                        Posts & Activity
                    </NavLink>
                    <NavLink
                        to={'/setting'}
                        className={(nav) =>
                            cx('menu-drawer__nav-item', {
                                active: nav.isActive,
                            })
                        }
                        onClick={() => handleShowMobileMenu}
                    >
                        Settings & Privacy
                    </NavLink>
                    <NavLink
                        to={'/help'}
                        className={(nav) =>
                            cx('menu-drawer__nav-item', {
                                active: nav.isActive,
                            })
                        }
                        onClick={() => handleShowMobileMenu}
                    >
                        Help Center
                    </NavLink>
                    <NavLink
                        to={'/logout'}
                        className={(nav) =>
                            cx('menu-drawer__nav-item', {
                                active: nav.isActive,
                            })
                        }
                        onClick={() => handleShowMobileMenu}
                    >
                        Log out
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

export default ProfileDrawer;

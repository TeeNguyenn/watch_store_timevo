import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import {
    CartIcon,
    CloseIcon,
    DashboardIcon,
    HelpIcon,
    LockIcon,
    LogoutIcon,
    MobileUserIcon,
    RightArrowIcon,
    SearchIcon,
    SettingIcon,
    SubMenuIcon,
    UpArrowIcon,
    UserIcon,
} from '../../../components/Icons';
import config from '../../../config';
import SearchModal from '../SearchModal';
import Cart from '../Cart';
import CartWrapper from '../Cart/CartWrapper';
import LoginModal from '../LoginModal';
import SlideShow from '../SlideShow';
import Button from '../../../components/Button';
import MobileSubMenu from '../../../components/MobileSubMenu';
import * as userServices from '../../../services/userServices';
import UserModel from '../../../models/UserModel';
import { CartContext } from '../../../contexts/CartContext';
import * as cartItemServices from '../../../services/cartItemServices';
import PreLoader from '../../../components/PreLoader';
import {
    RootState,
    useAppDispatch,
    useAppSelector,
} from '../../../redux/store';
import { putAvatarCustomer } from '../../../components/CustomerInfo/CustomerInfoSlice';
import { ToastContainer } from 'react-toastify';
import { notifySuccess } from '../../../utils/Functions';

const cx = classNames.bind(styles);

const Header = () => {
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showCartDrawer, setShowCartDrawer] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isSlideShow, setIsSlideShow] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSubMenu, setShowMobileSubMenu] = useState(false);
    const [showDropdownProfile, setShowDropdownProfile] = useState(false);
    const [isProfileDrawer, setIsProfileDrawer] = useState(false);
    const [userDetail, setUserDetail] = useState<UserModel>();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const pathName = location.pathname;
    const context = useContext(CartContext);
    const navigate = useNavigate();

    const cartList = useAppSelector((state: RootState) => state.cartList.cart);
    const avatar = useAppSelector(
        (state: RootState) => state.customerInfo.avatar
    );
    const dispatch = useAppDispatch();

    // User status
    const currentUser = localStorage.getItem('user_id');

    useEffect(() => {
        if (pathName === '/') {
            setIsSlideShow(true);
        } else {
            setIsSlideShow(false);
        }
    }, [pathName]);

    useEffect(() => {
        if (currentUser) {
            // setLoading(true);
            const fetchApi = async () => {
                const res = await userServices.getUserDetail();
                setUserDetail(res);
                // setLoading(false);
            };
            fetchApi();
        }
    }, [currentUser]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 740) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, []);

    // api

    const handleSearch = () => {
        setShowSearchModal(!showSearchModal);
    };

    const handleCloseSearchModal = () => {
        setShowSearchModal(!showSearchModal);
    };

    const handleCloseCartDrawer = () => {
        setShowCartDrawer(false);
        context?.handleCart();
    };

    if (
        showSearchModal ||
        showCartDrawer ||
        showMobileMenu ||
        showMobileSubMenu ||
        context?.cart
    ) {
        document.body.classList.add('hide-scroll');
    } else {
        document.body.classList.remove('hide-scroll');
    }

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleLogout = () => {
        setShowDropdownProfile(false);
        dispatch(putAvatarCustomer(''));

        localStorage.clear();

        // localStorage.removeItem('token');
        // localStorage.removeItem('user_id');
        // localStorage.removeItem('refresh_token');
        // setCartList([]);

        navigate(config.routes.login);
        setTimeout(() => {
            notifySuccess('Logout successful.', 3000);
        }, 0);
    };

    const handleMobileSubMenu = (isCloseMobileSubMenu: boolean) => {
        if (isCloseMobileSubMenu) {
            setShowMobileSubMenu(false);
        } else {
            setShowMobileMenu(false);
            setShowMobileSubMenu(false);
        }
    };

    const handleShowSubMenu = (isProfile: boolean) => {
        if (isProfile) {
            setIsProfileDrawer(true);
        } else {
            setIsProfileDrawer(false);
        }
        setShowMobileSubMenu(true);
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('', { 'container-spacing': true })}>
            <div
                className={cx('header-container', {
                    'header-container__slide-show': isSlideShow,
                })}
            >
                <header
                    className={cx('header', {
                        'header__slide-show': isSlideShow,
                    })}
                >
                    {/* Mobile menu */}
                    <div
                        className={cx('mobile-menu', {
                            'd-none': true,
                            'd-xl-block': true,
                        })}
                    >
                        <SubMenuIcon
                            className={cx('mobile-menu__icon')}
                            onClick={() => setShowMobileMenu(true)}
                        ></SubMenuIcon>
                        <div className={cx('mobile-menu__menu-drawer')}>
                            <span
                                className={cx('menu-drawer__overlay', {
                                    show: showMobileMenu,
                                })}
                                onClick={() => handleMobileSubMenu(false)}
                            ></span>
                            <div
                                className={cx('menu-drawer__inner', {
                                    show: showMobileMenu,
                                })}
                            >
                                <div className={cx('menu-drawer__header')}>
                                    <span
                                        className={cx('menu-drawer__heading')}
                                    >
                                        Menu
                                    </span>
                                    <Button
                                        className={cx('menu-drawer__close-btn')}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        <CloseIcon
                                            width="1.5rem"
                                            height="1.5rem"
                                        ></CloseIcon>
                                    </Button>
                                </div>
                                <nav className={cx('menu-drawer__navbar')}>
                                    <NavLink
                                        to={config.routes.home}
                                        className={(nav) =>
                                            cx('menu-drawer__nav-item', {
                                                active: nav.isActive,
                                            })
                                        }
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to={config.routes.shop}
                                        className={(nav) =>
                                            cx('menu-drawer__nav-item', {
                                                active: nav.isActive,
                                            })
                                        }
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        Shop
                                    </NavLink>
                                    <NavLink
                                        to={config.routes.about}
                                        className={(nav) =>
                                            cx('menu-drawer__nav-item', {
                                                active: nav.isActive,
                                            })
                                        }
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        About
                                    </NavLink>
                                    <div
                                        className={cx('menu-drawer__nav-item')}
                                        onClick={() => handleShowSubMenu(false)}
                                    >
                                        <span>Pages</span>
                                        <RightArrowIcon></RightArrowIcon>
                                    </div>
                                </nav>
                                <div
                                    className={cx('menu-drawer__utility-links')}
                                >
                                    {currentUser ? (
                                        <Button
                                            leftIcon={
                                                <UserIcon
                                                    width="2rem"
                                                    height="2rem"
                                                ></UserIcon>
                                            }
                                            className={cx(
                                                'menu-drawer__login-link',
                                                {
                                                    'primary-hover': true,
                                                    'd-md-none': true,
                                                }
                                            )}
                                            onClick={() =>
                                                handleShowSubMenu(true)
                                            }
                                        >
                                            Account
                                        </Button>
                                    ) : (
                                        <Button
                                            to={config.routes.login}
                                            leftIcon={
                                                <UserIcon
                                                    width="2rem"
                                                    height="2rem"
                                                ></UserIcon>
                                            }
                                            className={cx(
                                                'menu-drawer__login-link',
                                                {
                                                    'primary-hover': true,
                                                    'd-md-none': true,
                                                }
                                            )}
                                            onClick={() =>
                                                setShowMobileMenu(false)
                                            }
                                        >
                                            Log in
                                        </Button>
                                    )}
                                    <ul
                                        className={cx(
                                            'menu-drawer__social-list'
                                        )}
                                    >
                                        <li
                                            className={cx(
                                                'menu-drawer__social-item'
                                            )}
                                        >
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'menu-drawer__social-item-link',
                                                    {
                                                        'primary-hover': true,
                                                    }
                                                )}
                                                onClick={() =>
                                                    setShowMobileMenu(false)
                                                }
                                            >
                                                <svg
                                                    width="1.8rem"
                                                    height="1.8rem"
                                                    viewBox="0 0 19 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M0.0462914 0L7.3819 9.92811L0 18H1.66179L8.1253 10.9338L13.3464 18H19L11.2522 7.51415L18.1236 0.00146392H16.4618L10.5102 6.50992L5.70131 0.00146392H0.0477214L0.0462914 0ZM2.48907 1.23845H5.08663L16.5558 16.7601H13.9582L2.48907 1.23845Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        </li>
                                        <li
                                            className={cx(
                                                'menu-drawer__social-item'
                                            )}
                                        >
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'menu-drawer__social-item-link',
                                                    {
                                                        'primary-hover': true,
                                                    }
                                                )}
                                                onClick={() =>
                                                    setShowMobileMenu(false)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="1.8rem"
                                                    height="1.8rem"
                                                    viewBox="0 0 10 22"
                                                    fill="none"
                                                >
                                                    <g clip-path="url(#clip0_423_5411)">
                                                        <path
                                                            d="M0 6.23792H9.13208L8.64079 9.65017H0V6.23792ZM1.60489 4.98736C1.60489 1.52449 2.87034 0 6.36 0H9.1291V3.55815H6.45826C6.17539 3.55815 5.96399 3.66534 5.81809 3.87972C5.67219 4.0941 5.60073 4.37101 5.60073 4.71045V21.203H1.60489V4.99034V4.98736Z"
                                                            fill="currentcolor"
                                                        ></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_423_5411">
                                                            <rect
                                                                width="9.13208"
                                                                height="21.2"
                                                                fill="currentcolor"
                                                            ></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </Link>
                                        </li>
                                        <li
                                            className={cx(
                                                'menu-drawer__social-item'
                                            )}
                                        >
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'menu-drawer__social-item-link',
                                                    {
                                                        'primary-hover': true,
                                                    }
                                                )}
                                                onClick={() =>
                                                    setShowMobileMenu(false)
                                                }
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    width="1.8rem"
                                                    height="1.8rem"
                                                    viewBox="0 0 17 18"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M8.48.58a8.42 8.42 0 015.9 2.45 8.42 8.42 0 011.33 10.08 8.28 8.28 0 01-7.23 4.16 8.5 8.5 0 01-2.37-.32c.42-.68.7-1.29.85-1.8l.59-2.29c.14.28.41.52.8.73.4.2.8.31 1.24.31.87 0 1.65-.25 2.34-.75a4.87 4.87 0 001.6-2.05 7.3 7.3 0 00.56-2.93c0-1.3-.5-2.41-1.49-3.36a5.27 5.27 0 00-3.8-1.43c-.93 0-1.8.16-2.58.48A5.23 5.23 0 002.85 8.6c0 .75.14 1.41.43 1.98.28.56.7.96 1.27 1.2.1.04.19.04.26 0 .07-.03.12-.1.15-.2l.18-.68c.05-.15.02-.3-.11-.45a2.35 2.35 0 01-.57-1.63A3.96 3.96 0 018.6 4.8c1.09 0 1.94.3 2.54.89.61.6.92 1.37.92 2.32 0 .8-.11 1.54-.33 2.21a3.97 3.97 0 01-.93 1.62c-.4.4-.87.6-1.4.6-.43 0-.78-.15-1.06-.47-.27-.32-.36-.7-.26-1.13a111.14 111.14 0 01.47-1.6l.18-.73c.06-.26.09-.47.09-.65 0-.36-.1-.66-.28-.89-.2-.23-.47-.35-.83-.35-.45 0-.83.2-1.13.62-.3.41-.46.93-.46 1.56a4.1 4.1 0 00.18 1.15l.06.15c-.6 2.58-.95 4.1-1.08 4.54-.12.55-.16 1.2-.13 1.94a8.4 8.4 0 01-5-7.65c0-2.3.81-4.28 2.44-5.9A8.04 8.04 0 018.48.57z"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        </li>
                                        <li
                                            className={cx(
                                                'menu-drawer__social-item'
                                            )}
                                        >
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'menu-drawer__social-item-link',
                                                    {
                                                        'primary-hover': true,
                                                    }
                                                )}
                                                onClick={() =>
                                                    setShowMobileMenu(false)
                                                }
                                            >
                                                <svg
                                                    width="1.8rem"
                                                    height="1.8rem"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path
                                                        fill="currentcolor"
                                                        d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"
                                                    ></path>
                                                    <path
                                                        fill="currentcolor"
                                                        d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        </li>
                                        <li
                                            className={cx(
                                                'menu-drawer__social-item'
                                            )}
                                        >
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'menu-drawer__social-item-link',
                                                    {
                                                        'primary-hover': true,
                                                    }
                                                )}
                                                onClick={() =>
                                                    setShowMobileMenu(false)
                                                }
                                            >
                                                <svg
                                                    width="1.8rem"
                                                    height="1.8rem"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    viewBox="0 0 100 70"
                                                >
                                                    <path
                                                        d="M98 11c2 7.7 2 24 2 24s0 16.3-2 24a12.5 12.5 0 01-9 9c-7.7 2-39 2-39 2s-31.3 0-39-2a12.5 12.5 0 01-9-9c-2-7.7-2-24-2-24s0-16.3 2-24c1.2-4.4 4.6-7.8 9-9 7.7-2 39-2 39-2s31.3 0 39 2c4.4 1.2 7.8 4.6 9 9zM40 50l26-15-26-15v30z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* Mobile sub menu */}
                            <MobileSubMenu
                                isShow={showMobileSubMenu}
                                title={isProfileDrawer ? 'My Account' : 'Pages'}
                                navList={
                                    isProfileDrawer
                                        ? [
                                              {
                                                  to: '/profile',
                                                  name: 'Profile',
                                              },
                                              {
                                                  to: '/dashboard',
                                                  name: 'Dashboard',
                                              },
                                              {
                                                  to: '/posts-activity',
                                                  name: 'Posts & Activity',
                                              },
                                              {
                                                  to: '/setting-privacy',
                                                  name: 'Settings & Privacy ',
                                              },
                                              {
                                                  to: '/help-center',
                                                  name: 'Help Center',
                                              },
                                              {
                                                  to: '/logout',
                                                  name: 'Log out',
                                              },
                                          ]
                                        : [
                                              {
                                                  to: config.routes.blog,
                                                  name: 'Blog',
                                              },
                                              {
                                                  to: config.routes.faq,
                                                  name: 'Faq',
                                              },
                                              {
                                                  to: config.routes.contact,
                                                  name: 'Contact',
                                              },
                                          ]
                                }
                                handleMobileSubMenu={handleMobileSubMenu}
                            ></MobileSubMenu>
                        </div>
                    </div>

                    {/* Navbar */}
                    <nav className={cx('navbar', { 'd-xl-none': true })}>
                        <NavLink
                            to={config.routes.home}
                            className={(nav) =>
                                cx('navbar-item', {
                                    active: nav.isActive,
                                })
                            }
                        >
                            <span className={cx('navbar-content')}>Home</span>
                        </NavLink>
                        <NavLink
                            to={config.routes.shop}
                            className={(nav) =>
                                cx('navbar-item', { active: nav.isActive })
                            }
                        >
                            <span className={cx('navbar-content')}>Shop</span>
                        </NavLink>
                        <NavLink
                            to={config.routes.about}
                            className={(nav) =>
                                cx('navbar-item', { active: nav.isActive })
                            }
                        >
                            <span className={cx('navbar-content')}>About</span>
                        </NavLink>

                        <Tippy
                            interactive
                            delay={[0, 300]}
                            offset={[18, 12]}
                            placement="bottom"
                            render={(attrs) => (
                                <div
                                    className={cx('sub-menu')}
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <div>
                                        <NavLink
                                            className={(nav) =>
                                                cx('sub-menu__item', {
                                                    active: nav.isActive,
                                                })
                                            }
                                            to={config.routes.blog}
                                        >
                                            Blog
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink
                                            className={(nav) =>
                                                cx('sub-menu__item', {
                                                    active: nav.isActive,
                                                })
                                            }
                                            to={config.routes.faq}
                                        >
                                            Faq
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink
                                            className={(nav) =>
                                                cx('sub-menu__item', {
                                                    active: nav.isActive,
                                                })
                                            }
                                            to={config.routes.contact}
                                        >
                                            Contact
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        >
                            <NavLink to={'#!'} className={cx('navbar-item')}>
                                <span className={cx('navbar-content')}>
                                    Pages
                                </span>
                            </NavLink>
                        </Tippy>
                    </nav>
                    {/* Logo */}
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <Image
                            src={images.logo}
                            alt="Logo"
                            fallback=""
                            className={cx('logo')}
                        ></Image>
                    </Link>
                    {/* Actions */}
                    <div className={cx('actions')}>
                        <span className={cx('icon')} onClick={handleSearch}>
                            <SearchIcon
                                width={'2.6rem'}
                                height={'2.6rem'}
                                className={cx('actions__icon')}
                            ></SearchIcon>
                        </span>
                        <div
                            className={cx('icon')}
                            onClick={() => {
                                setShowCartDrawer(true);
                                context?.handleCart();
                                return;
                            }}
                        >
                            <CartIcon
                                width={'2.6rem'}
                                height={'2.6rem'}
                                className={cx('actions__icon')}
                            ></CartIcon>
                            <span
                                className={cx('quantity', {
                                    'd-none': cartList.length === 0,
                                })}
                            >
                                {cartList.length}
                            </span>
                        </div>
                        {/* Profile */}
                        <Tippy
                            visible={showDropdownProfile}
                            interactive
                            delay={[0, 300]}
                            offset={[15, 20]}
                            placement="bottom-end"
                            onClickOutside={() => setShowDropdownProfile(false)}
                            render={(attrs) => (
                                <div className={cx('dropdown-profile')}>
                                    <div
                                        className={cx('dropdown-profile__top')}
                                    >
                                        <div
                                            className={cx(
                                                'dropdown-profile__avatar-wrapper'
                                            )}
                                        >
                                            <Image
                                                src={
                                                    avatar
                                                        ? avatar
                                                        : currentUser
                                                        ? userDetail?.avatar
                                                        : images.defaultAvatar
                                                }
                                                alt="avatar"
                                                className={cx(
                                                    'dropdown-profile__avatar'
                                                )}
                                            ></Image>
                                        </div>
                                        <h6
                                            className={cx(
                                                'dropdown-profile__name'
                                            )}
                                        >
                                            {/* {userDetail?.lastName +
                                                ', ' +
                                                userDetail?.firstName +
                                                ''} */}
                                            {userDetail?.firstName +
                                                ' ' +
                                                userDetail?.lastName}
                                        </h6>
                                    </div>
                                    <div
                                        className={cx('dropdown-profile__menu')}
                                    >
                                        <Link
                                            to={config.routes.profile}
                                            className={cx(
                                                'dropdown-profile__group'
                                            )}
                                            onClick={() =>
                                                setShowDropdownProfile(false)
                                            }
                                        >
                                            <MobileUserIcon></MobileUserIcon>
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Profile
                                            </span>
                                        </Link>
                                        <Link
                                            to={config.routes.adminDashboard}
                                            className={cx(
                                                'dropdown-profile__group',
                                                {
                                                    'd-none':
                                                        !userDetail?.role?.some(
                                                            (roleItem) =>
                                                                roleItem.id ===
                                                                1
                                                        ),
                                                } // id = 1 is admin
                                            )}
                                            onClick={() =>
                                                setShowDropdownProfile(false)
                                            }
                                        >
                                            <DashboardIcon></DashboardIcon>
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Dashboard
                                            </span>
                                        </Link>
                                        <Link
                                            to={'#!'}
                                            className={cx(
                                                'dropdown-profile__group'
                                            )}
                                            onClick={() =>
                                                setShowDropdownProfile(false)
                                            }
                                        >
                                            <LockIcon></LockIcon>
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Posts & Activity
                                            </span>
                                        </Link>
                                        <Link
                                            to={'#!'}
                                            className={cx(
                                                'dropdown-profile__group'
                                            )}
                                            onClick={() =>
                                                setShowDropdownProfile(false)
                                            }
                                        >
                                            <SettingIcon></SettingIcon>
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Settings & Privacy
                                            </span>
                                        </Link>
                                        <Link
                                            to={'#!'}
                                            className={cx(
                                                'dropdown-profile__group'
                                            )}
                                            onClick={() =>
                                                setShowDropdownProfile(false)
                                            }
                                        >
                                            <HelpIcon></HelpIcon>
                                            <span
                                                className={cx(
                                                    'dropdown-profile__text'
                                                )}
                                            >
                                                Help Center
                                            </span>
                                        </Link>
                                    </div>
                                    <Button
                                        leftIcon={<LogoutIcon></LogoutIcon>}
                                        className={cx(
                                            'dropdown-profile__logout-btn'
                                        )}
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </Button>
                                </div>
                            )}
                        >
                            <div
                                className={cx('icon', { 'd-xl-none': true })}
                                onClick={
                                    currentUser
                                        ? () =>
                                              setShowDropdownProfile(
                                                  !showDropdownProfile
                                              )
                                        : () => setShowLoginModal(true)
                                }
                            >
                                {avatar ? (
                                    <Image
                                        className={cx('avatar')}
                                        src={avatar}
                                        alt="avatar"
                                    ></Image>
                                ) : currentUser ? (
                                    <Image
                                        className={cx('avatar')}
                                        src={
                                            userDetail?.avatar
                                                ? userDetail?.avatar
                                                : images.defaultAvatar
                                        }
                                        alt="avatar"
                                    ></Image>
                                ) : (
                                    <UserIcon
                                        width={'2.6rem'}
                                        height={'2.6rem'}
                                    ></UserIcon>
                                )}
                            </div>
                        </Tippy>
                    </div>
                </header>

                {isSlideShow && <SlideShow></SlideShow>}

                {showSearchModal && (
                    <SearchModal
                        handleCloseSearchModal={handleCloseSearchModal}
                    ></SearchModal>
                )}

                <CartWrapper
                    show={showCartDrawer || context?.cart}
                    handleCloseCartDrawer={handleCloseCartDrawer}
                >
                    <Cart handleCloseCartDrawer={handleCloseCartDrawer}></Cart>
                </CartWrapper>

                {showLoginModal && (
                    <LoginModal
                        handleCloseLoginModal={handleCloseLoginModal}
                    ></LoginModal>
                )}

                <Button
                    className={cx('scroll-to-top', {
                        show: showScrollToTop,
                    })}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <UpArrowIcon></UpArrowIcon>
                </Button>
            </div>
        </div>
    );
};

export default Header;

import React from 'react';

import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import Search from '../../../../components/Search';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Switch from '@mui/material/Switch';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import Image from '../../../../components/Image';
import images from '../../../../assets/images';
import { SubMenuIcon } from '../../../../components/Icons';

const cx = classNames.bind(styles);

interface NavbarProps {
    handleShow: () => void;
}

const Navbar = (props: NavbarProps) => {
    return (
        <div className={cx('navbar')}>
            <div className={cx('navbar__container')}>
                <div className={cx('navbar__mobile-menu', {
                    "d-none": true,
                    'd-md-block': true
                })} onClick={() => props.handleShow()}>
                    <SubMenuIcon width='2rem' height='2rem'></SubMenuIcon>
                </div>
                <div className={cx('navbar__search-wrapper')}>
                    <Search
                        adminSearch
                        className={cx('navbar__search')}
                    ></Search>
                </div>
                <div className={cx('navbar__items')}>
                    <div className={cx('navbar__item', {
                        'd-md-none': true
                    })}>
                        <LanguageOutlinedIcon
                            className={cx('navbar__icon')}
                        ></LanguageOutlinedIcon>
                        <span className={cx('navbar__label')}>English</span>
                    </div>
                    <div className={cx('navbar__item', {
                        'd-lg-none': true
                    })}>
                        <Switch color="secondary" />
                        <span>Theme</span>
                    </div>
                    <div className={cx('navbar__item', {
                        'd-lg-none': true
                    })}>
                        <FullscreenOutlinedIcon
                            className={cx('navbar__icon')}
                        ></FullscreenOutlinedIcon>
                    </div>
                    <div className={cx('navbar__item')}>
                        <NotificationsActiveOutlinedIcon
                            className={cx('navbar__icon')}
                        ></NotificationsActiveOutlinedIcon>
                        <span className={cx('navbar__counter')}>3</span>
                    </div>
                    <div className={cx('navbar__item')}>
                        <ChatBubbleOutlineOutlinedIcon
                            className={cx('navbar__icon')}
                        ></ChatBubbleOutlineOutlinedIcon>
                        <span className={cx('navbar__counter')}>5</span>
                    </div>
                    <div className={cx('navbar__item', {
                        'd-lg-none': true
                    })}>
                        <ListOutlinedIcon
                            className={cx('navbar__icon')}
                        ></ListOutlinedIcon>
                    </div>
                    <div className={cx('navbar__item')}>
                        <Image
                            src={images.defaultAvatar}
                            alt="Avatar"
                            className={cx('navbar__profile')}
                        ></Image>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

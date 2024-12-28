import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Widget.module.scss';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { formatPrice } from '../../../../utils/Functions';
import config from '../../../../config';
const cx = classNames.bind(styles);

interface WidgetProps {
    type: string;
    amount?: number;
    diff?: number
}

const Widget = ({ type, amount = 500, diff = 30 }: WidgetProps) => {
    let data: any;

    switch (type) {
        case 'customer':
            data = {
                title: 'CUSTOMER',
                isMoney: false,
                link: 'See details',
                icon: (
                    <PersonOutlineOutlinedIcon
                        className={cx('widget__icon')}
                        style={{
                            color: 'crimson',
                            backgroundColor: '#ff000033',
                        }}
                    ></PersonOutlineOutlinedIcon>
                ),
                url: config.routes.adminCustomers,
            };
            break;
        case 'order':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: 'View all orders',
                icon: (
                    <ShoppingCartOutlinedIcon
                        className={cx('widget__icon')}
                        style={{
                            color: 'goldenrod',
                            backgroundColor: '#daa52033',
                        }}
                    ></ShoppingCartOutlinedIcon>
                ),
                url: config.routes.adminOrders,

            };
            break;
        case 'earning':
            data = {
                title: 'EARNINGS',
                isMoney: true,
                link: 'View net earnings',
                icon: (
                    <MonetizationOnOutlinedIcon
                        className={cx('widget__icon')}
                        style={{
                            color: 'green  ',
                            backgroundColor: '#00800033',
                        }}
                    ></MonetizationOnOutlinedIcon>
                ),
                url: '#!',

            };
            break;
        case 'balance':
            data = {
                title: 'MY BALANCE',
                isMoney: true,
                link: 'Withdraw money',
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className={cx('widget__icon')}
                        style={{
                            color: 'purple',
                            backgroundColor: '#80008033',
                        }}
                    ></AccountBalanceWalletOutlinedIcon>
                ),
                url: '#!',

            };
            break;

        default:
            break;
    }
    return (
        <div className={cx('widget')}>
            <div className={cx('widget__left')}>
                <span className={cx('widget__title')}>{data.title}</span>
                <span className={cx('widget__counter')}>
                    {
                        data.isMoney ? formatPrice(amount) : amount
                    }
                </span>
                <Link to={data.url} className={cx('widget__link')}>
                    {data.link}
                </Link>
            </div>
            <div className={cx('widget__right')}>
                <div className={cx('widget__percentage', 'positive')}>
                    <KeyboardArrowUpOutlinedIcon></KeyboardArrowUpOutlinedIcon>
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;

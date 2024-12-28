import React from 'react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../../../../config';
import { LogoIcon } from '../../../../components/Icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { notifySuccess } from '../../../../utils/Functions';
import { putAvatarCustomer } from '../../../../components/CustomerInfo/CustomerInfoSlice';
import { useAppDispatch } from '../../../../redux/store';

const cx = classNames.bind(styles);

interface SidebarProps {
    show: boolean;
    handleShow: () => void;
}

const Sidebar = (props: SidebarProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        // localStorage.removeItem('token');
        // localStorage.removeItem('user_id');
        // localStorage.removeItem('refresh_token');

        dispatch(putAvatarCustomer(''));
        localStorage.clear();

        navigate(config.routes.login);
        setTimeout(() => {
            notifySuccess('Logout successful.', 3000);
        }, 0);
    };

    return (
        <div
            className={cx('sidebar', {
                show: props.show,
            })}
        >
            <div className={cx('sidebar__top')}>
                <Link to={config.routes.home} style={{ outline: 'none' }}>
                    <LogoIcon height="3rem"></LogoIcon>
                </Link>
            </div>
            <div className={cx('sidebar__bottom')}>
                <div className={cx('sidebar__group')}>
                    <p className={cx('sidebar__title')}>MAIN</p>
                    <ul>
                        <li>
                            <Link
                                to={config.routes.adminDashboard}
                                className={cx('sidebar__item')}
                            >
                                <DashboardIcon
                                    className={cx('sidebar__icon')}
                                ></DashboardIcon>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('sidebar__group')}>
                    <p className={cx('sidebar__title')}>LISTS</p>
                    <ul>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <PersonOutlineIcon
                                    className={cx('sidebar__icon')}
                                ></PersonOutlineIcon>
                                <span>Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.adminProducts}
                                className={cx('sidebar__item')}
                            >
                                <LocalGroceryStoreOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></LocalGroceryStoreOutlinedIcon>
                                <span>Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.adminOrders}
                                className={cx('sidebar__item')}
                            >
                                <CreditCardOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></CreditCardOutlinedIcon>
                                <span>Orders</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('sidebar__group')}>
                    <p className={cx('sidebar__title')}>CHARTS</p>
                    <ul>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <InsertChartOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></InsertChartOutlinedIcon>
                                <span>Stats</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <NotificationsActiveOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></NotificationsActiveOutlinedIcon>
                                <span>Notifications</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('sidebar__group')}>
                    <p className={cx('sidebar__title')}>SERVICE</p>
                    <ul>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <DnsOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></DnsOutlinedIcon>
                                <span>System Health</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <SettingsOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></SettingsOutlinedIcon>
                                <span>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('sidebar__group')}>
                    <p className={cx('sidebar__title')}>USER INTERFACE</p>
                    <ul>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <ManageAccountsOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></ManageAccountsOutlinedIcon>
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <CalendarMonthOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></CalendarMonthOutlinedIcon>
                                <span>Calendar</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={config.routes.adminCustomers}
                                className={cx('sidebar__item')}
                            >
                                <DiamondOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></DiamondOutlinedIcon>
                                <span>Helper</span>
                            </Link>
                        </li>
                        <li>
                            <div
                                className={cx('sidebar__item')}
                                onClick={handleLogout}
                            >
                                <ExitToAppOutlinedIcon
                                    className={cx('sidebar__icon')}
                                ></ExitToAppOutlinedIcon>
                                <span>Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

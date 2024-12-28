import React, { useEffect, useState } from 'react';
import Sidebar from '../../pages/Dashboard/components/sidebar';
import Navbar from '../../pages/Dashboard/components/navbar';
import styles from './AdminLayout.module.scss';
import classNames from 'classnames/bind';
import PageNotFound from '../../pages/PageNotFound';
import { useLocation } from 'react-router-dom';
import * as userServices from '../../services/userServices';

const cx = classNames.bind(styles);

interface AdminLayoutProps {
    children: JSX.Element;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [mobileMenu, setMobileMenu] = useState(false);


    const handleShow = () => {
        setMobileMenu(!mobileMenu);
    }



    return (
        <div style={{ display: 'flex' }}>
            <div className={cx('overlay', {
                'd-none': true,
                'd-md-block': true,
                show: mobileMenu
            })} onClick={handleShow}></div>
            <Sidebar show={mobileMenu} handleShow={handleShow}></Sidebar>
            <div style={{ flex: '6', backgroundColor: 'whitesmoke' }}>
                <Navbar handleShow={handleShow}></Navbar>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;

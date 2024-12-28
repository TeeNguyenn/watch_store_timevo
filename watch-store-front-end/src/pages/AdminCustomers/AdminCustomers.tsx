import React from 'react';
import classNames from 'classnames/bind';

import styles from './AdminCustomers.module.scss';
import Navbar from '../Dashboard/components/navbar';
import DataTable from './components/DataTable';
const cx = classNames.bind(styles);

const AdminCustomers = () => {
    return (
        <>

            <DataTable></DataTable>
        </>
    );
};

export default AdminCustomers;

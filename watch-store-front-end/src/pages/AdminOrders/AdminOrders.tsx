import classNames from 'classnames/bind';

import styles from './AdminOrders.module.scss';
import OrderTable from './DataTable';

const cx = classNames.bind(styles);


const AdminOrders = () => {
    return (
        <OrderTable></OrderTable>
    );
};

export default AdminOrders;

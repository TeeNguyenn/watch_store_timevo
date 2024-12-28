import classNames from 'classnames/bind';

import styles from './AdminOrderDetails.module.scss';
import OrderDetails from '../OrderDetails';

const cx = classNames.bind(styles);

const AdminOrderDetails = () => {
    return (
        <>
            <OrderDetails modifier></OrderDetails>
        </>
    );
};

export default AdminOrderDetails;

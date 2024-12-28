import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { DataGrid } from '@mui/x-data-grid';

import Button from '../../../components/Button';
import styles from './OrderTable.module.scss';
import config from '../../../config';
import PreLoader from '../../../components/PreLoader';
import * as orderServices from '../../../services/orderServices';
import { Link } from 'react-router-dom';
import images from '../../../assets/images';
import { formatPrice, getCurrentDateWithHour } from '../../../utils/Functions';
import Label from '../../../components/Label';

const cx = classNames.bind(styles);

const OrderTable = () => {
    const [data, setData] = useState<any[]>([]);


    const orderColumns: any = [
        {
            field: 'id', headerName: 'ID', width: 100, renderCell: (params: any) => {
                return (
                    <Link to={`/admin/order-details/${params.row.id}`} className={cx('cell-link')}>
                        {params.row.id}
                    </Link>

                );
            },
        },
        {
            field: 'user',
            headerName: 'User',
            width: 250,
            sortable: true,
            valueGetter: (params: any) => params, //sort by user
            renderCell: (params: any) => {
                return (
                    <div
                        className="cellWithImg"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'inherit',
                        }}
                    >
                        <img
                            className="cellImg"
                            src={params.row.img}
                            alt="avatar"
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginRight: '20px',
                                cursor: 'pointer',
                                mixBlendMode: 'multiply',
                            }}
                        />
                        {params.row.user}
                    </div>
                );
            },
        },
        { field: 'total', headerName: 'Total', width: 100 },
        {
            field: 'status',
            headerName: 'Status',
            // type: 'number',
            width: 150,
            renderCell: (params: any) => {
                return (
                    <div className={cx('cellWithStatus', `${params.row.status}`)}>
                        <Label
                            paymentStatus={params.row.status.paymentStatus}
                            paymentMethod={
                                params.row.status.paymentMethod
                            }
                            status={params.row.status.status}
                            modifier
                        ></Label>
                    </div>

                );
            },
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            // type: 'number',
            width: 180,
        },
        {
            field: 'deliveryMethod',
            headerName: 'Delivery Method',
            // type: 'number',
            width: 180,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 180,
        },
    ];


    // pagination
    const [totalProduct, setTotalProduct] = useState(0);
    const [limit, setLimit] = useState(8);

    const [viewAll, setViewAll] = useState(false);

    const [loading, setLoading] = useState(false);



    // get all orders
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const res = await orderServices.getAllOrder(1, 1);
            const responseData = await orderServices.getAllOrder(1, res.totalPage);

            let rows: any[] = [];

            responseData.result.forEach((item: any) => {
                rows.push(
                    {
                        id: item.id,
                        user: item.first_name + ' ' + item.last_name,
                        img: images.defaultAvatar,
                        total: formatPrice(item.total_money),
                        status: {
                            paymentStatus: item.payment_status,
                            paymentMethod: item.payment_method_name,
                            status: item.status
                        },
                        paymentMethod: item.payment_method_name,
                        deliveryMethod: item.shipping_method_name,
                        date: getCurrentDateWithHour(
                            item.order_date
                        ),
                    }
                )
            })

            setData(rows.reverse());    // reverese() <=> sort='latest'
            setLoading(false);


        };

        fetchApi();
    }, []);

    const handleDelete = (id: any) => {
        // temp
        setData(data.filter((item: any) => item.id !== id));
    };

    // const actionColumn = [
    //     {
    //         field: 'action',
    //         headerName: 'Action',
    //         width: 200,
    //         sortable: false,
    //         renderCell: (params: any) => {
    //             return (
    //                 <div className={cx('cell-action')}>
    //                     <Button to="#!" className={cx('view-btn')}>
    //                         View
    //                     </Button>
    //                     <Button
    //                         className={cx('delete-btn')}
    //                         onClick={() => handleDelete(params.row.id)}
    //                     >
    //                         Delete
    //                     </Button>
    //                 </div>
    //             );
    //         },
    //     },
    // ];

    const paginationModel = { page: 0, pageSize: 8 };


    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('data-table')}>
            <div className={cx('data-title')}>
                <span>Orders</span>
                <Button
                    to={config.routes.adminNewCustomer}
                    className={cx('btn')}
                >
                    + Add Order
                </Button>
            </div>
            <DataGrid
                className={cx('data-grid')}
                rows={data}
                // columns={orderColumns.concat(actionColumn)}
                columns={orderColumns}
                initialState={{ pagination: { paginationModel } }}
                // pageSizeOptions={[8, 16]}
                checkboxSelection
                sx={{ border: 0 }}
                onCellClick={(params, event) => {
                    if (params.field === 'id') {
                        event.stopPropagation(); // Ngăn việc tích checkbox khi click vào cột "Id"
                    }
                }}
            />
        </div>
    );
};

export default OrderTable;

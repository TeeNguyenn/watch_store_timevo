import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';

import Button from '../../../../components/Button';
import styles from './DataTable.module.scss';
import { Link } from 'react-router-dom';
import config from '../../../../config';
import * as userServices from '../../../../services/userServices';
import images from '../../../../assets/images';
import * as orderServices from '../../../../services/orderServices';
import UserModel from '../../../../models/UserModel';
import {
    getCurrentDateWithHour,
    notifyError,
    notifySuccess,
} from '../../../../utils/Functions';
import PreLoader from '../../../../components/PreLoader';

const cx = classNames.bind(styles);

export default function DataTable() {
    const userColumns: any = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'user',
            headerName: 'User',
            width: 230,
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
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'orders',
            headerName: 'Orders',
            type: 'number',
            width: 100,
        },
        {
            field: 'lastOrder',
            headerName: 'Last Order',
            type: 'number',
            width: 200,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: any) => {
                return (
                    <div
                        className={cx('cellWithStatus', `${params.row.status}`)}
                    >
                        {params.row.status}
                    </div>
                );
            },
        },
    ];

    const [data, setData] = React.useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // get all users
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const responseData = await userServices.getAllUser();

            let rows: any[] = [];

            const fetchApi1 = async (userItem: UserModel) => {
                const res = await orderServices.getAllOrderByUserId(
                    userItem.userId + ''
                );

                rows.push({
                    id: userItem.userId,
                    user: userItem.firstName + ' ' + userItem.lastName,
                    img: userItem.avatar || images.defaultAvatar, //temp
                    email: userItem.email,
                    status: userItem.isActive ? 'active' : 'passive',
                    orders: res.totalOrders,
                    lastOrder:
                        res.totalOrders > 0
                            ? getCurrentDateWithHour(
                                  res.result.at(0).order_date
                              )
                            : 'No orders',
                });

                if (rows.length === responseData.result.length) {
                    setData(rows);
                    setLoading(false);
                }
            };

            async function fetchSequentially(responseData: any) {
                for (const userItem of responseData.result) {
                    await fetchApi1(userItem);
                }
            }
            fetchSequentially(responseData);
        };

        fetchApi();
    }, []);

    const handleDelete = (params: any) => {
        // temp
        // setData(data.filter((item: any) => item.id !== id));

        if (params.row.status === 'passive') {
            notifyError('Unable to delete user.');
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const res = await userServices.deleteUser(params.row.id);

            if (res.status === 'OK') {
                setLoading(false);
                params.row.status = 'passive';
                setTimeout(() => {
                    notifySuccess('User deleted successfully.');
                }, 100);
            }
        };
        fetchApi();
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            sortable: false,
            renderCell: (params: any) => {
                return (
                    <div className={cx('cell-action')}>
                        <Button
                            to={`/admin/customer/detail/${params.row.id}`}
                            className={cx('view-btn')}
                        >
                            View
                        </Button>
                        <Button
                            className={cx('delete-btn')}
                            onClick={() => handleDelete(params)}
                        >
                            Delete
                        </Button>
                        <Button
                            to={`/admin/customer/edit/${params.row.id}`}
                            className={cx('modifier-btn')}
                        >
                            {/* <ModifierIcon width='1.2rem' height='1.2rem' /> */}
                            Edit
                        </Button>
                    </div>
                );
            },
        },
    ];

    const paginationModel = { page: 0, pageSize: 8 };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('data-table')}>
            <div className={cx('data-title')}>
                <span>Users</span>
                <Button
                    to={config.routes.adminNewCustomer}
                    className={cx('btn')}
                >
                    + Add New
                </Button>
            </div>
            <DataGrid
                className={cx('data-grid')}
                rows={data}
                columns={userColumns.concat(actionColumn)}
                initialState={{ pagination: { paginationModel } }}
                // pageSizeOptions={[8, 16]}
                checkboxSelection
                sx={{ border: 0 }}
                onCellClick={(params, event) => {
                    if (params.field === 'action') {
                        event.stopPropagation(); // Ngăn việc tích checkbox khi click vào cột "Action"
                    }
                }}
            />
        </div>
    );
}

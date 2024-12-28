import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../components/Button';
import styles from './AdminProducts.module.scss';
import ProductTable from './components/DataTable';
import Pagination from '../../components/Pagination';
import { RightIcon } from '../../components/Icons';
import * as productServices from '../../services/productServices';
import PreLoader from '../../components/PreLoader';
import config from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import { notifyError } from '../../utils/Functions';

const cx = classNames.bind(styles);

const AdminProducts = () => {
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [limit, setLimit] = useState(6);

    const [viewAll, setViewAll] = useState(false);

    const currentUser = localStorage.getItem('user_id');
    const [loading, setLoading] = useState(false);

    const [productList, setProductList] = useState<any[]>([]);

    const notifyDeleteProductSuccess = () => {
        toast.success('Product deleted successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // get all product
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const responseData = await productServices.getAllProduct(
                currentPage,
                limit
            );
            const res = await productServices.getAllProduct(currentPage, 1);

            if (responseData) {
                setProductList(responseData.result);
                setTotalPage(responseData.totalPage);
                setTotalProduct(res.totalPage);
            }

            setLoading(false);
        };

        fetchApi();
    }, [currentPage, limit]);

    const handleRemoveProductItem = (productId: string) => {
        const fetchApi = async () => {
            setLoading(true);
            const res = await productServices.deleteProductItem(productId);

            if (res && res.status === 'OK') {
                const res = await productServices.getAllProduct(currentPage, 6);
                // Get all product for get total product
                const resData = await productServices.getAllProduct(1, 1);

                setProductList(res.result);
                setTotalProduct(resData.totalPage);

                // handle remove last item
                const remainder = resData.totalPage % 6;
                const totalPages = Math.ceil((resData.totalPage + 1) / limit);

                if (
                    remainder === 0 &&
                    resData.totalPage > 0 &&
                    currentPage === totalPages &&
                    !viewAll
                ) {
                    setCurrentPage(currentPage - 1);
                }

                setLoading(false);
                setTimeout(() => {
                    notifyDeleteProductSuccess();
                }, 100);
            } else {
                setLoading(false);
                setTimeout(() => {
                    notifyError('Delete product failed.')
                }, 100);
            }
        };

        fetchApi();

    };

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    const handleViewAll = () => {
        if (!viewAll) {
            setLimit(totalProduct);
        } else {
            setLimit(6);
        }
        setViewAll(!viewAll);
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <>
            <div className={cx('product__list')}>
                <div className={cx('product__title')}>
                    <span>Products</span>
                    <Button
                        to={config.routes.adminNewProduct}
                        className={cx('product__btn')}
                    >
                        + Add New
                    </Button>
                </div>
                <ProductTable
                    productList={productList}
                    handleRemoveProductItem={handleRemoveProductItem}
                ></ProductTable>
                <div
                    className={cx('product__bottom', {
                        'd-none': totalPage === 1 && productList.length <= 6,
                    })}
                >
                    <div className={cx('product__view')}>
                        <p
                            className={cx('product__view-desc', {
                                'd-sm-none': true,
                            })}
                        >
                            {viewAll
                                ? `1 to ${totalProduct} items of ${totalProduct}`
                                : `${limit * (currentPage - 1) + 1} to ${currentPage * 6 >= totalProduct
                                    ? totalProduct
                                    : currentPage * 6
                                } items of ${totalProduct}`}
                        </p>
                        <Button
                            className={cx('product__view-btn', {
                                'd-none': true,
                            })}
                            rightIcon={<RightIcon></RightIcon>}
                            onClick={handleViewAll}
                        >
                            {viewAll ? 'View less' : 'View all'}
                        </Button>
                    </div>
                    <div className={cx('product__paging')}>
                        <Pagination
                            modifier
                            currentPage={currentPage}
                            totalPage={viewAll ? 1 : totalPage}
                            pagination={pagination}
                        ></Pagination>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProducts;

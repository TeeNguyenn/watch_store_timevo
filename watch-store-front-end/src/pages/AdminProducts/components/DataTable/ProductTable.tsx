import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../../components/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './ProductTable.module.scss';
import images from '../../../../assets/images';
import ProductModel from '../../../../models/ProductModel';
import { formatPrice } from '../../../../utils/Functions';
import * as productServices from '../../../../services/productServices';
import Image from '../../../../components/Image';

const cx = classNames.bind(styles);

interface ProductTableProps {
    productList: ProductModel[];
    handleRemoveProductItem: (productId: string) => void;
}

const ProductTable = (props: ProductTableProps) => {

    return (
        <div className={cx('product-table')}>
            <TableContainer
                component={Paper}
                className={cx('table__container')}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={cx('table__cell')}
                                style={{
                                    backgroundColor: '#fff',
                                    fontFamily: 'var(--font-family)',
                                }}
                            >
                                Id
                            </TableCell>
                            <TableCell
                                className={cx('table__cell')}
                                style={{
                                    backgroundColor: '#fff',
                                    fontFamily: 'var(--font-family)',
                                }}
                            >
                                Product
                            </TableCell>
                            <TableCell
                                className={cx('table__cell')}
                                style={{
                                    backgroundColor: '#fff',
                                    fontFamily: 'var(--font-family)',
                                }}
                            >
                                Category
                            </TableCell>
                            <TableCell
                                className={cx('table__cell')}
                                style={{
                                    backgroundColor: '#fff',
                                    fontFamily: 'var(--font-family)',
                                }}
                            >
                                Price
                            </TableCell>
                            <TableCell
                                className={cx('table__cell')}
                                style={{
                                    backgroundColor: '#fff',
                                    fontFamily: 'var(--font-family)',
                                }}
                            >
                                Stock
                            </TableCell>
                            <TableCell
                                className={cx('table__cell')}
                                style={{
                                    backgroundColor: '#fff',
                                    fontFamily: 'var(--font-family)',
                                }}
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.productList.map(productItem => (
                                <TableRow key={productItem.productId}>
                                    <TableCell className={cx('table__cell')}>
                                        {productItem.productId}
                                    </TableCell>
                                    <TableCell className={cx('table__cell')}>
                                        <div className={cx('table__cell-wrapper')}>
                                            <Image
                                                src={productItem.productImages.find(item => item.colorId === productItem.colors.at(0)?.colorId && item.isMainImage)?.imageUrl || images.noImg}
                                                alt=""
                                                className={cx('table__image')}
                                            />
                                            {productItem.title}
                                        </div>
                                    </TableCell>
                                    <TableCell className={cx('table__cell')}>
                                        {productItem.category.name}
                                    </TableCell>
                                    <TableCell className={cx('table__cell')}>
                                        {productItem!.discount
                                            ? formatPrice(
                                                productItem!.price *
                                                (1 - productItem!.discount / 100)
                                            )
                                            : formatPrice(productItem!.price)}
                                    </TableCell>
                                    <TableCell className={cx('table__cell')}>
                                        {productItem.quantityStock > 0 ? "In stock" : 'Out stock'}
                                    </TableCell>
                                    <TableCell className={cx('table__cell')}>
                                        <div className={cx('table__cell-action')}>
                                            <Button
                                                to={`/products/${productItem.productId}`}
                                                className={cx('table__view-btn')}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                className={cx('table__delete-btn')}
                                                onClick={() => props.handleRemoveProductItem(productItem.productId + '')}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                className={cx('table__modifier-btn')}
                                                to={`/admin/product/edit/${productItem.productId}`}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </TableCell>
                                    {/* <TableCell className={cx('table__cell')}>
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell> */}
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductTable;

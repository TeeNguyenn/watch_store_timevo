import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Reviews.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { RightIcon } from '../Icons';
import Label from '../Label';
import Pagination from '../Pagination';
import { formatDateTime, renderRating } from '../../utils/Functions';
import * as feedbackServices from '../../services/feedbackServices';
import FeedbackModel from '../../models/FeedbackModel';
import * as productServices from '../../services/productServices';
import PreLoader from '../PreLoader';

const cx = classNames.bind(styles);

interface ReviewsProps {
    className?: string;
}

const Reviews = ({ className }: ReviewsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);
    const [limit, setLimit] = useState(6);
    const [viewAll, setViewAll] = useState(false);
    const [productList, setProductList] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const [feedbackList, setFeedbackList] = useState<FeedbackModel[]>([]);
    const currentUser = localStorage.getItem('user_id');


    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    // Get customerId from url
    const { customerId } = useParams();

    let customerIdNumber = 0;
    try {
        customerIdNumber = parseInt(customerId + '');
        if (Number.isNaN(customerIdNumber)) {
            customerIdNumber = 0;
        }
    } catch (error) {
        customerIdNumber = 0;
        console.log('Error:', error);
    }

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const feedbackData = await feedbackServices.getAllFeedbackByUserId(
                customerId || currentUser + '',
                currentPage,
                limit
            );

            setFeedbackList(feedbackData.result);
            setTotalPage(feedbackData.totalPage);
            setTotalFeedbacks(feedbackData.totalFeedbacks);

            let result: any = [];

            const fetchProducts = async (productId: number) => {
                const res = await productServices.getProductById(productId);

                result.push(res);

                if (result.length === feedbackData.result.length) {
                    setProductList(result);
                    setLoading(false);
                    return;
                }
            };

            feedbackData.result.forEach((item: FeedbackModel) => {
                fetchProducts(item.productId);
            });

            setLoading(false);
        };

        fetchApi();
    }, [currentPage, limit]);

    const handleViewAll = () => {
        if (!viewAll) {
            setLimit(totalFeedbacks);
        } else {
            setLimit(6);
        }
        setViewAll(!viewAll);
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    if (feedbackList.length === 0) {
        return <></>
    }

    return (
        <div className={cx('review', className)}>
            <div className={cx('review__container')}>
                <table className={cx('review__table')}>
                    <thead>
                        <tr>
                            <th
                                className={cx('review__heading')}
                                style={{
                                    minWidth: '220px',
                                }}
                            >
                                product
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '10%', minWidth: '100px' }}
                            >
                                rating
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{
                                    minWidth: '480px',
                                }}
                            >
                                review
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '10%' }}
                            >
                                status
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '12%' }}
                            >
                                date
                            </th>
                            <th
                                className={cx('review__heading')}
                                style={{ width: '7%' }}
                            ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbackList.map((feedbackItem, index) => (
                            <tr key={index}>
                                <td className={cx('review__product')}>
                                    <Link
                                        to={`/products/${feedbackItem.productId}`}
                                        className={cx('review__link', {
                                            'line-clamp': true,
                                            'line-clamp-1': true,
                                        })}
                                    >
                                        {productList[index]?.title}
                                    </Link>
                                </td>
                                <td className={cx('review__rating')}>
                                    {renderRating(
                                        Number.parseInt(feedbackItem?.rate + '')
                                    )}
                                </td>
                                <td className={cx('review__desc')}>
                                    <p
                                        className={cx('', {
                                            'line-clamp': true,
                                        })}
                                    >
                                        {feedbackItem.comment}
                                    </p>
                                </td>
                                <td className={cx('review__status')}>
                                    <Label success title="approved" modifier={!!className}></Label>
                                </td>
                                <td className={cx('review__date')}>
                                    {formatDateTime(feedbackItem.updateAt + '')}
                                </td>
                                <td className={cx('review__options')}>
                                    <div className={cx('review__dropdown')}>
                                        <Tippy
                                            // visible={showDropdownProfile}
                                            interactive
                                            offset={[0, 3]}
                                            placement="bottom-end"
                                            // onClickOutside={() => setShowDropdownProfile(false)}
                                            render={(attrs) => (
                                                <div
                                                    className={cx(
                                                        'review__menu'
                                                    )}
                                                >
                                                    <Button
                                                        to={`/products/${feedbackItem.productId}`}
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        view
                                                    </Button>
                                                    <Button
                                                        to="#!"
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        export
                                                    </Button>
                                                    <hr />
                                                    <Button
                                                        className={cx(
                                                            'review__act-btn'
                                                        )}
                                                    >
                                                        remove
                                                    </Button>
                                                </div>
                                            )}
                                        >
                                            <Button
                                                className={cx('review__btn')}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEllipsis}
                                                />
                                            </Button>
                                        </Tippy>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div
                className={cx('review__bottom', {
                    'd-none': totalPage === 1 && feedbackList.length <= 6,
                })}
            >
                <div className={cx('review__view')}>
                    <p
                        className={cx('review__view-desc', {
                            'd-sm-none': true,
                        })}
                    >
                        {viewAll
                            ? `1 to ${totalFeedbacks} items of ${totalFeedbacks}`
                            : `${limit * (currentPage - 1) + 1} to ${currentPage * 6 >= totalFeedbacks
                                ? totalFeedbacks
                                : currentPage * 6
                            } items of ${totalFeedbacks}`}
                    </p>
                    <Button
                        className={cx('review__view-btn', {
                            'd-none': currentPage > 1 || className,
                        })}
                        rightIcon={<RightIcon></RightIcon>}
                        onClick={handleViewAll}
                    >
                        {viewAll ? 'View less' : 'View all'}
                    </Button>
                </div>
                <div className={cx('review__paging')}>
                    <Pagination
                        modifier
                        currentPage={currentPage}
                        totalPage={viewAll ? 1 : totalPage}
                        pagination={pagination}
                    ></Pagination>
                </div>
            </div>
        </div>
    );
};

export default Reviews;

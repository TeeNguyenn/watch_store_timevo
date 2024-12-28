import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../../../components/Button';
import styles from './Review.module.scss';
import { renderRating } from '../../../../utils/Functions';
import Image from '../../../../components/Image';
import {
    faArrowUpFromBracket,
    faStar as starFill,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackModel from '../../../../models/FeedbackModel';
import images from '../../../../assets/images';
import { CheckIcon, ErrorIcon } from '../../../../components/Icons';
import * as feedbackServices from '../../../../services/feedbackServices';

const cx = classNames.bind(styles);

interface ReviewProps {
    feedbackList?: FeedbackModel[];
    productId?: any;
    totalFeedbacks?: any;
    handleSort?: any;
}

const Review = ({
    feedbackList,
    productId,
    totalFeedbacks,
    handleSort,
}: ReviewProps) => {
    const [sort, setSort] = useState('latest');
    const [sortBy, setSortBy] = useState('Most Recent');
    const [visible, setVisible] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [fullFeedbackList, setFullFeedbackList] = useState<FeedbackModel[]>(
        []
    );

    useEffect(() => {
        const fetchApi = async () => {
            const res = await feedbackServices.getAllFeedbackByProductId(
                productId,
                1,
                5,
                sort
            );
            if (res.totalFeedbacks > 0) {
                const resData =
                    await feedbackServices.getAllFeedbackByProductId(
                        productId,
                        1,
                        res.totalFeedbacks,
                        sort
                    );
                setFullFeedbackList(resData.result);
            }
        };

        fetchApi();
    }, [sort]);

    const formik = useFormik({
        initialValues: {
            rating: '',
            title: '',
            review: '',
            name: '',
            email: '',
        },
        validationSchema: Yup.object({
            rating: Yup.string().required('You must fill in this section.'),
            title: Yup.string().required('You must fill in this section.'),
            review: Yup.string().required('You must fill in this section.'),
            name: Yup.string().required('You must fill in this section.'),
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            const data = {
                product_id: productId,
                comment: values.review,
                rate: values.rating,
            };
            const fetchApi = async () => {
                const res = await feedbackServices.postFeedback(data);
                if (res) {
                    setSubmitted(true);
                    window.dispatchEvent(new Event('storageChanged')); // Phát sự kiện tuỳ chỉnh
                }
            };
            setTimeout(() => {
                fetchApi();
            }, 1000);
        },
    });

    const handleSortBy = (name: string) => {
        if (name === sortBy) {
            return;
        }
        setSortBy(name);
        setVisible(false);
        switch (name) {
            case 'Most Recent':
                setSort('latest');
                handleSort('latest');
                break;
            case 'Oldest':
                setSort('oldest');
                handleSort('oldest');
                break;
            case 'Highest Rating':
                setSort('high');
                handleSort('high');
                break;
            case 'Lowest Rating':
                setSort('low');
                handleSort('low');
                break;

            default:
                break;
        }
    };

    const handleAverageRating = () => {
        if (totalFeedbacks === 0) {
            return 0;
        }
        const fiveStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 5
            ).length * 5;
        const fourStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 4
            ).length * 4;
        const threeStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 3
            ).length * 3;
        const twoStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 2
            ).length * 2;
        const oneStarQuantity =
            fullFeedbackList!.filter(
                (item) => Number.parseInt(item.rate + '') === 1
            ).length * 1;
        return (
            (fiveStarQuantity +
                fourStarQuantity +
                threeStarQuantity +
                twoStarQuantity +
                oneStarQuantity) /
            totalFeedbacks
        );
    };

    return (
        <div className={cx('review')}>
            <div className={cx('review__header')}>
                <h2 className={cx('review__title')}>Customer Reviews</h2>
                <div className={cx('review__row-stars')}>
                    {/* Summary */}
                    <div className={cx('review__summary')}>
                        <div className={cx('review__summary-inner')}>
                            <div className={cx('review__summary-stars')}>
                                {renderRating(handleAverageRating())}
                            </div>
                            <span className={cx('review__summary-average')}>
                                {`${Number.parseFloat(
                                    handleAverageRating().toFixed(2)
                                )} out of 5`}
                            </span>
                        </div>
                        <div className={cx('review__summary-text')}>
                            {`Based on ${totalFeedbacks} review`}
                        </div>
                    </div>
                    {/* Histogram */}
                    <div className={cx('review__histogram')}>
                        {/* 5 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(5)}
                            </div>
                            <div className={cx('review__histogram-bar')}>
                                <span
                                    className={cx(
                                        'review__histogram-bar-percent'
                                    )}
                                    style={{
                                        width: `${(fullFeedbackList!.filter(
                                            (item) =>
                                                Number.parseInt(
                                                    item.rate + ''
                                                ) === 5
                                        ).length *
                                                100) /
                                            totalFeedbacks
                                            }%`,
                                    }}
                                ></span>
                            </div>
                            <div className={cx('review__histogram-frequency')}>
                                {
                                    fullFeedbackList?.filter(
                                        (item) =>
                                            Number.parseInt(item.rate + '') ===
                                            5
                                    ).length
                                }
                            </div>
                        </div>
                        {/* 4 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(4)}
                            </div>
                            <div className={cx('review__histogram-bar')}>
                                <span
                                    className={cx(
                                        'review__histogram-bar-percent'
                                    )}
                                    style={{
                                        width: `${(fullFeedbackList!.filter(
                                            (item) =>
                                                Number.parseInt(
                                                    item.rate + ''
                                                ) === 4
                                        ).length *
                                                100) /
                                            totalFeedbacks
                                            }%`,
                                    }}
                                ></span>
                            </div>
                            <div className={cx('review__histogram-frequency')}>
                                {
                                    fullFeedbackList?.filter(
                                        (item) =>
                                            Number.parseInt(item.rate + '') ===
                                            4
                                    ).length
                                }
                            </div>
                        </div>
                        {/* 3 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(3)}
                            </div>
                            <div className={cx('review__histogram-bar')}>
                                <span
                                    className={cx(
                                        'review__histogram-bar-percent'
                                    )}
                                    style={{
                                        width: `${(fullFeedbackList!.filter(
                                            (item) =>
                                                Number.parseInt(
                                                    item.rate + ''
                                                ) === 3
                                        ).length *
                                                100) /
                                            totalFeedbacks
                                            }%`,
                                    }}
                                ></span>
                            </div>
                            <div className={cx('review__histogram-frequency')}>
                                {
                                    fullFeedbackList?.filter(
                                        (item) =>
                                            Number.parseInt(item.rate + '') ===
                                            3
                                    ).length
                                }
                            </div>
                        </div>
                        {/* 2 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(2)}
                            </div>
                            <div className={cx('review__histogram-bar')}>
                                <span
                                    className={cx(
                                        'review__histogram-bar-percent'
                                    )}
                                    style={{
                                        width: `${(fullFeedbackList!.filter(
                                            (item) =>
                                                Number.parseInt(
                                                    item.rate + ''
                                                ) === 2
                                        ).length *
                                                100) /
                                            totalFeedbacks
                                            }%`,
                                    }}
                                ></span>
                            </div>
                            <div className={cx('review__histogram-frequency')}>
                                {
                                    fullFeedbackList?.filter(
                                        (item) =>
                                            Number.parseInt(item.rate + '') ===
                                            2
                                    ).length
                                }
                            </div>
                        </div>
                        {/* 1 stars */}
                        <div className={cx('review__histogram-row')}>
                            <div className={cx('review__histogram-stars')}>
                                {renderRating(1)}
                            </div>
                            <div className={cx('review__histogram-bar')}>
                                <span
                                    className={cx(
                                        'review__histogram-bar-percent'
                                    )}
                                    style={{
                                        width: `${(fullFeedbackList!.filter(
                                            (item) =>
                                                Number.parseInt(
                                                    item.rate + ''
                                                ) === 1
                                        ).length *
                                                100) /
                                            totalFeedbacks
                                            }%`,
                                    }}
                                ></span>
                            </div>
                            <div className={cx('review__histogram-frequency')}>
                                {
                                    fullFeedbackList?.filter(
                                        (item) =>
                                            Number.parseInt(item.rate + '') ===
                                            1
                                    ).length
                                }
                            </div>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className={cx('review__actions')}>
                        <Button
                            rounded
                            primary
                            className={cx('review__actions-btn')}
                            onClick={() => setShowReviewForm(!showReviewForm)}
                        >
                            {!showReviewForm
                                ? 'Write a review'
                                : 'Cancel review'}
                        </Button>
                        <div
                            className={cx('review__form-inner', {
                                show: showReviewForm,
                            })}
                        >
                            <div>
                                <form
                                    action=""
                                    className={cx('review-form')}
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div className={cx('review-form__title')}>
                                        Write a review
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor=""
                                            className={cx('review-form__label')}
                                        >
                                            Rating
                                        </label>
                                        <div
                                            className={cx('review-form__stars')}
                                        >
                                            <input
                                                type="radio"
                                                id="rate-5"
                                                name="rating"
                                                className=""
                                                value="5"
                                                onChange={formik.handleChange}
                                                checked={
                                                    formik.values.rating === '5'
                                                }
                                            />
                                            <label
                                                htmlFor="rate-5"
                                                className="star-5 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                id="rate-4"
                                                className=""
                                                name="rating"
                                                value="4"
                                                onChange={formik.handleChange}
                                                checked={
                                                    formik.values.rating === '4'
                                                }
                                            />
                                            <label
                                                htmlFor="rate-4"
                                                className="star-4 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                id="rate-3"
                                                name="rating"
                                                className=""
                                                value="3"
                                                onChange={formik.handleChange}
                                                checked={
                                                    formik.values.rating === '3'
                                                }
                                            />
                                            <label
                                                htmlFor="rate-3"
                                                className="star-3 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                id="rate-2"
                                                name="rating"
                                                className=""
                                                value="2"
                                                onChange={formik.handleChange}
                                                checked={
                                                    formik.values.rating === '2'
                                                }
                                            />
                                            <label
                                                htmlFor="rate-2"
                                                className="star-2 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>

                                            <input
                                                type="radio"
                                                id="rate-1"
                                                name="rating"
                                                className=""
                                                value="1"
                                                onChange={formik.handleChange}
                                                checked={
                                                    formik.values.rating === '1'
                                                }
                                            />
                                            <label
                                                htmlFor="rate-1"
                                                className="star-1 fa-solid fa-star"
                                            >
                                                <FontAwesomeIcon
                                                    icon={starFill}
                                                />
                                            </label>
                                        </div>
                                        {formik.errors.rating &&
                                            formik.touched.rating && (
                                                <div
                                                    className={cx(
                                                        'review-form__error-mess'
                                                    )}
                                                >
                                                    <ErrorIcon
                                                        width="1.5rem"
                                                        height="1.5rem"
                                                    ></ErrorIcon>
                                                    <span className={cx('')}>
                                                        {formik.errors.rating}
                                                    </span>
                                                </div>
                                            )}
                                    </div>

                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Review Title
                                        </label>
                                        <input
                                            id="review-form__input"
                                            type="text"
                                            name="title"
                                            value={formik.values.title}
                                            className={cx('review-form__input')}
                                            placeholder="Give your review a title"
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.title &&
                                            formik.touched.title && (
                                                <div
                                                    className={cx(
                                                        'review-form__error-mess'
                                                    )}
                                                >
                                                    <ErrorIcon
                                                        width="1.5rem"
                                                        height="1.5rem"
                                                    ></ErrorIcon>
                                                    <span className={cx('')}>
                                                        {formik.errors.title}
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Review
                                        </label>
                                        <textarea
                                            id="review-form__input"
                                            name="review"
                                            value={formik.values.review}
                                            rows={5}
                                            className={cx('review-form__input')}
                                            placeholder="Write your comments here"
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.review &&
                                            formik.touched.review && (
                                                <div
                                                    className={cx(
                                                        'review-form__error-mess'
                                                    )}
                                                >
                                                    <ErrorIcon
                                                        width="1.5rem"
                                                        height="1.5rem"
                                                    ></ErrorIcon>
                                                    <span className={cx('')}>
                                                        {formik.errors.review}
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor=""
                                            className={cx('review-form__label')}
                                        >
                                            Picture/Video (optional)
                                        </label>
                                        <div
                                            className={cx(
                                                'review-form__file-wrapper'
                                            )}
                                        >
                                            <FontAwesomeIcon
                                                icon={faArrowUpFromBracket}
                                            />
                                            <input
                                                type="file"
                                                multiple
                                                className={cx(
                                                    'review-form__file'
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formik.values.name}
                                            id="review-form__input"
                                            className={cx('review-form__input')}
                                            placeholder="Enter your name (public)"
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.name &&
                                            formik.touched.name && (
                                                <div
                                                    className={cx(
                                                        'review-form__error-mess'
                                                    )}
                                                >
                                                    <ErrorIcon
                                                        width="1.5rem"
                                                        height="1.5rem"
                                                    ></ErrorIcon>
                                                    <span className={cx('')}>
                                                        {formik.errors.name}
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <label
                                            htmlFor="review-form__input"
                                            className={cx('review-form__label')}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formik.values.email}
                                            id="review-form__input"
                                            className={cx('review-form__input')}
                                            placeholder="Enter your email (private)"
                                            onChange={formik.handleChange}
                                        />
                                        {formik.errors.email &&
                                            formik.touched.email && (
                                                <div
                                                    className={cx(
                                                        'review-form__error-mess'
                                                    )}
                                                >
                                                    <ErrorIcon
                                                        width="1.5rem"
                                                        height="1.5rem"
                                                    ></ErrorIcon>
                                                    <span className={cx('')}>
                                                        {formik.errors.email}
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <p className={cx('review-form__desc')}>
                                            How we use your data: We’ll only
                                            contact you about the review you
                                            left, and only if necessary. By
                                            submitting your review, you agree to
                                            Judge.me’s terms, privacy and
                                            content policies.
                                        </p>
                                    </div>
                                    <div className={cx('review-form__group')}>
                                        <Button
                                            type="button"
                                            className={cx('review-form__btn', {
                                                'd-none': submitted,
                                            })}
                                            onClick={() =>
                                                setShowReviewForm(
                                                    !showReviewForm
                                                )
                                            }
                                        >
                                            Cancel review
                                        </Button>
                                        {submitted ? (
                                            <Button
                                                className={cx(
                                                    'review-form__btn'
                                                )}
                                                primary
                                                onClick={() => {
                                                    window.location.reload();
                                                    setShowReviewForm(false);
                                                    setTimeout(() => {
                                                        setSubmitted(false);
                                                    }, 300);
                                                }}
                                            >
                                                Refresh Page
                                            </Button>
                                        ) : (
                                            <Button
                                                className={cx(
                                                    'review-form__btn'
                                                )}
                                                type="submit"
                                                primary
                                            >
                                                Submit Review
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div
                        className={cx('review__submitted', {
                            'd-none': !submitted,
                        })}
                    >
                        <Button className={cx('review__submitted-icon')}>
                            <CheckIcon
                                width="3.2rem"
                                height="3.2rem"
                            ></CheckIcon>
                        </Button>
                        <p className={cx('review__submitted-title')}>
                            Review Submitted!
                        </p>
                        <p className={cx('review__submitted-desc')}>
                            Thank you! Please refresh the page in a few moments
                            to see your review.
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx('review__row-actions')}>
                <Tippy
                    visible={visible}
                    interactive
                    delay={[0, 300]}
                    placement="bottom-start"
                    onClickOutside={() => setVisible(false)}
                    render={(attrs) => (
                        <div className={cx('sort__options')}>
                            <label
                                htmlFor="option-1"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-1"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Most Recent',
                                    })}
                                    onClick={() => handleSortBy('Most Recent')}
                                >
                                    Most Recent
                                </span>
                            </label>
                            <label
                                htmlFor="option-4"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-4"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Oldest',
                                    })}
                                    onClick={() => handleSortBy('Oldest')}
                                >
                                    Oldest
                                </span>
                            </label>
                            <label
                                htmlFor="option-2"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-2"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Highest Rating',
                                    })}
                                    onClick={() =>
                                        handleSortBy('Highest Rating')
                                    }
                                >
                                    Highest Rating
                                </span>
                            </label>
                            <label
                                htmlFor="option-3"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-3"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Lowest Rating',
                                    })}
                                    onClick={() =>
                                        handleSortBy('Lowest Rating')
                                    }
                                >
                                    Lowest Rating
                                </span>
                            </label>

                            {/* <label
                                htmlFor="option-5"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-5"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Pictures First',
                                    })}
                                    onClick={() =>
                                        handleSortBy('Pictures First')
                                    }
                                >
                                    Pictures First
                                </span>
                            </label>
                            <label
                                htmlFor="option-6"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-6"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Videos First',
                                    })}
                                    onClick={() => handleSortBy('Videos First')}
                                >
                                    Videos First
                                </span>
                            </label>
                            <label
                                htmlFor="option-7"
                                className={cx('sort__option')}
                            >
                                <input
                                    hidden
                                    type="radio"
                                    name="sort"
                                    id="option-7"
                                    className={cx('sort__radio')}
                                />
                                <span
                                    className={cx('sort__text', {
                                        'primary-hover': true,
                                        active: sortBy === 'Most Helpful',
                                    })}
                                    onClick={() => handleSortBy('Most Helpful')}
                                >
                                    Most Helpful
                                </span>
                            </label> */}
                        </div>
                    )}
                >
                    <p
                        className={cx('sort__title')}
                        onClick={() => setVisible(!visible)}
                    >
                        {sortBy}
                        <span className={cx('sort__title-icon')}></span>
                    </p>
                </Tippy>
            </div>
            <div className={cx('review__body')}>
                {feedbackList?.map((item, index) => (
                    <div key={item.feedbackId} className={cx('review__item')}>
                        <div className={cx('review__profile-wrapper')}>
                            <Image
                                src={images.defaultAvatar}
                                alt="Avatar"
                                className={cx('review__profile-img')}
                            ></Image>
                        </div>
                        <div className={cx('review__top')}>
                            <p className={cx('review__author')}>
                                {item?.firstName + ' ' + item?.lastName + ''}
                            </p>
                            <div className={cx('review__stars')}>
                                {renderRating(Number.parseInt(item.rate + ''))}
                            </div>
                            <div className={cx('review__timestamp')}>
                                {item.updateAt?.substring(0, 10)}{' '}
                                {item.updateAt?.substring(11, 16)}
                            </div>

                            <div className={cx('review__content')}>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Review;

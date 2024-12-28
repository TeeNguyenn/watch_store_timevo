import React, { useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './Testimonial.module.scss';
import Image from '../../../../components/Image';
import { renderRating } from '../../../../utils/Functions';

const cx = classNames.bind(styles);

interface TestimonialItemProps {
    src: string;
    author: string;
    country: string;
    rate: number;
    content: string;
}

const TestimonialItem = ({
    src,
    author,
    country,
    rate,
    content,
}: TestimonialItemProps) => {
    return (
        <article
            className={cx('testimonial-item', {
                'testimonial-item-slide': true,
            })}
        >
            <div className={cx('testimonial-item__top')}>
                <div className={cx('testimonial-item__img-wrapper')}>
                    <Image
                        loading={'lazy'}
                        src={src}
                        alt="Testimonial image"
                    ></Image>
                </div>
                <div className={cx('testimonial-item__group')}>
                    <p className={cx('testimonial-item__author')}>{author}</p>
                    <p className={cx('testimonial-item__country')}>{country}</p>
                </div>
            </div>
            <div
                className={cx('testimonial-item__body')}
                data-aos="fade-in-up"
                data-aos-duration="1500"
                data-aos-easing="ease"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
            >
                <div className={cx('testimonial-item__stars')}>
                    {renderRating(rate)}
                </div>
                <p
                    className={cx('testimonial-item__content', {
                        'line-clamp': true,
                        'line-clamp-5': true,
                    })}
                >
                    {content}
                </p>
            </div>
        </article>
    );
};

export default TestimonialItem;

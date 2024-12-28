import React from 'react';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import Button from '../../../../components/Button';
import styles from './News.module.scss';

const cx = classNames.bind(styles);

interface NewsItemProps {
    src: string;
    date: string;
    name: string;
    desc: string;
}

const NewsItem = ({ src, date, name, desc }: NewsItemProps) => {
    return (
        <article className={cx('news-item')}>
            <div className={cx('news-item__media')}>
                <Link to={'#!'}>
                    <Image
                        src={src}
                        alt="News image"
                        loading={'lazy'}
                        className={cx('news-item__img')}
                    ></Image>
                </Link>
            </div>
            <div className={cx('news-item__info')}>
                <p className={cx('news-item__date')}>{date}</p>
                <h3>
                    <Link
                        to={'#!'}
                        className={cx('news-item__heading', {
                            'line-clamp': true,
                            'line-clamp-2': true,
                        })}
                    >
                        {name}
                    </Link>
                </h3>
                <p
                    className={cx('news-item__desc', {
                        'line-clamp': true,
                        'line-clamp-5': true,
                    })}
                >
                    {desc}
                </p>
                <Button
                    to="#!"
                    primary
                    rounded
                    className={cx('news-item__btn')}
                >
                    Read More
                </Button>
            </div>
        </article>
    );
};

export default NewsItem;

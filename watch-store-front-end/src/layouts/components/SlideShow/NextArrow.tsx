import React from 'react';
import classNames from 'classnames/bind';

import styles from './SlideShow.module.scss';
import { NextIcon } from '../../../components/Icons';

const cx = classNames.bind(styles);

interface NextArrowProps {
    className?: string;
    style?: any;
    onClick?: () => void;
}

const NextArrow = ({ className, style, onClick }: NextArrowProps) => {
    return (
        <div
            className={cx('slide-show__next-btn', className)}
            style={{ ...style }}
            onClick={onClick}
        >
            <span className={cx('slide-show__btn-text')}>Next</span>
            <NextIcon className={cx('slide-show__icon')}></NextIcon>
        </div>
    );
};

export default NextArrow;

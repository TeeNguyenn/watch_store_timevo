import React from 'react';
import classNames from 'classnames/bind';

import { PrevIcon } from '../../../components/Icons';
import styles from './SlideShow.module.scss';

const cx = classNames.bind(styles);

interface PrevArrowProps {
    className?: string;
    style?: any;
    onClick?: () => void;
}

const PrevArrow = ({ className, style, onClick }: PrevArrowProps) => {
    return (
        <div
            className={cx('slide-show__prev-btn', className)}
            style={{ ...style }}
            onClick={onClick}
        >
            <PrevIcon className={cx('slide-show__icon')}></PrevIcon>
            <span className={cx('slide-show__btn-text')}>Previous</span>
        </div>
    );
};

export default PrevArrow;

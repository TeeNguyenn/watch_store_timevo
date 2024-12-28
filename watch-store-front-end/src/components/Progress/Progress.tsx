import React from 'react';
import classNames from 'classnames/bind';
import styles from './Progress.module.scss';
import images from '../../assets/images';
import Image from '../Image';

const cx = classNames.bind(styles);

interface ProgressProps {
    className?: string;
}

const Progress = ({ className }: ProgressProps) => {
    return (
        <div className={cx('progress', className)}>
            <p className={cx('progress__title')}>
                Congratulations! You've got
                <span className={cx('progress__shipping')}>
                    {' '}
                    Free Shipping!
                </span>
            </p>
            <div className={cx('progress__bar')}>
                <div className={cx('progress__line')}></div>
            </div>
            <div className={cx('progress__icon-wrapper')}>
                <Image
                    src={images.shipping}
                    className={cx('progress__icon')}
                ></Image>
            </div>
        </div>
    );
};

export default Progress;

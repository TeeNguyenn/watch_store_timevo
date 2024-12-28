import React from 'react';

import classNames from 'classnames/bind';
import styles from './Featured.module.scss';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ChangingProgressProvider from './ChangingProgressProvider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatPrice } from '../../../../utils/Functions';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const cx = classNames.bind(styles);

interface FeaturedProps {
    totalSaleToday: number;
}

const Featured = (props: FeaturedProps) => {
    return (
        <div className={cx('featured')}>
            <div className={cx('featured__top')}>
                <h1 className={cx('featured__title')}>Total Revenue</h1>
                <MoreVertOutlinedIcon></MoreVertOutlinedIcon>
            </div>
            <div className={cx('featured__bottom')}>
                <div className={cx('featured__chart')}>
                    <ChangingProgressProvider
                        values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    >
                        {(percentage) => (
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    pathTransitionDuration: 0.95,
                                    // trailColor: '#82ca9d',
                                    pathColor: '#7c4eb9',
                                    textColor: '#7c4eb9',
                                })}
                            />
                        )}
                    </ChangingProgressProvider>
                </div>
                <p className={cx('featured__label')}>Total sales made today</p>
                <p className={cx('featured__amount')}>{formatPrice(props.totalSaleToday)}</p>
                <p className={cx('featured__desc')}>Previous transactions</p>
                <div className={cx('featured__summary')}>
                    <div className={cx('featured__item')}>
                        <div className={cx('featured__item-title')}>Target</div>
                        <div
                            className={cx('featured__item-result', 'negative')}
                        >
                            <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                            <div className={cx('featured__item-amount')}>
                                {formatPrice(19400)}
                            </div>
                        </div>
                    </div>
                    <div className={cx('featured__item')}>
                        <div className={cx('featured__item-title')}>
                            Last Week
                        </div>
                        <div
                            className={cx('featured__item-result', 'positive')}
                        >
                            <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                            <div className={cx('featured__item-amount')}>
                                {formatPrice(60400)}
                            </div>
                        </div>
                    </div>
                    <div className={cx('featured__item')}>
                        <div className={cx('featured__item-title')}>
                            Last Month
                        </div>
                        <div
                            className={cx('featured__item-result', 'negative')}
                        >
                            <KeyboardArrowDownOutlinedIcon></KeyboardArrowDownOutlinedIcon>
                            <div className={cx('featured__item-amount')}>
                                {formatPrice(73400)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;

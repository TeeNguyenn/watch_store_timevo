import React from 'react';
import classNames from 'classnames/bind';

import styles from './Heading.module.scss';

const cx = classNames.bind(styles);

interface HeadingProps {
    subHeading: string;
    title: string;
    desc?: string;
    className?: string;
}

const Heading = ({ subHeading, title, desc, className }: HeadingProps) => {
    return (
        <div
            className={cx('heading', className)}
            data-aos="fade-in-up"
            data-aos-duration="1500"
            data-aos-easing="ease"
            data-aos-once="true"
            data-aos-anchor-placement="top-bottom"
        >
            <h6 className={cx('', { 'sub-heading': true })}>{subHeading}</h6>
            <h2 className={cx('heading__title', { title: true })}>{title}</h2>
            {desc && (
                <p className={cx('heading__desc', { desc: true })}>{desc}</p>
            )}
        </div>
    );
};

export default Heading;

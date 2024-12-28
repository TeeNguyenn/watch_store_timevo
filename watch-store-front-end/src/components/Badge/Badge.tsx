import React from 'react';
import classNames from 'classnames/bind';
import styles from './Badge.module.scss';

const cx = classNames.bind(styles);

interface BadgeProps {
    className?: string;
    title: string;
}

const Badge = ({ className, title }: BadgeProps) => {
    return <div className={cx('badge', className)}>{title}</div>;
};

export default Badge;

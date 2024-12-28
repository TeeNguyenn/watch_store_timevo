import React from 'react';
import classNames from 'classnames/bind';
import styles from './PreLoader.module.scss';

const cx = classNames.bind(styles);

interface PreLoaderProps {
    show: boolean;
}

const PreLoader = ({ show }: PreLoaderProps) => {
    return <div className={cx('pre-loader', { show: show })}></div>;
};

export default PreLoader;

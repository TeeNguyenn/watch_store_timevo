import React from 'react';
import classNames from 'classnames/bind';
import styles from './List.module.scss';

const cx = classNames.bind(styles);

const List = () => {
    return <div className={cx('list')}></div>;
};

export default List;

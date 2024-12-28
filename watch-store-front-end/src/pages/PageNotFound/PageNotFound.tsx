import React from 'react';
import classNames from 'classnames/bind';

import styles from './PageNotFound.module.scss';
import Button from '../../components/Button';
import config from '../../config';

const cx = classNames.bind(styles);

interface PageNotFoundProps {
    fullScreen?: boolean;
}

const PageNotFound = (props: PageNotFoundProps) => {
    return (
        <div className={cx('', {
            'container-spacing': true,
            fullScreen: props.fullScreen
        })}>
            <div className={cx('page')}>
                <p className={cx('sub-text')}>404</p>
                <h1 className={cx('title')}>
                    The Page you're looking for can't found
                </h1>
                <p className={cx('desc')}>
                    You didn't break the internet, but we can't find what you
                    are looking for.
                </p>
                <Button
                    to={config.routes.home}
                    rounded
                    primary
                    className={cx('btn')}
                >
                    Back To Home
                </Button>
            </div>
        </div>
    );
};

export default PageNotFound;

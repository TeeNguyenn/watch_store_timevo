import React from 'react';
import classNames from 'classnames/bind';

import styles from './Breadcrumb.module.scss';
import { Link } from 'react-router-dom';
import { BreadcrumbSepIcon } from '../Icons';

const cx = classNames.bind(styles);



interface BreadcrumbProps {
    title?: string;
    links: any[];
}

const Breadcrumb = ({ title, links }: BreadcrumbProps) => {
    return (
        <div className={cx('breadcrumb')}>
            <h1 className={cx('title')}>{title}</h1>
            <div className={cx('links')}>
                {
                    links.map((link, index) =>
                        index !== links.length - 1 ? <>
                            <Link to={links[index].to} className={cx('link')}>
                                {links[index].name}
                            </Link>
                            <BreadcrumbSepIcon className={cx('sep')}></BreadcrumbSepIcon>
                        </> : <span className={cx('link')}>{links[links.length - 1].name}</span>

                    )
                }

            </div>
        </div>
    );
};

export default Breadcrumb;

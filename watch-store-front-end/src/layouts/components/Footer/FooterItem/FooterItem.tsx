import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../Footer.module.scss';
import { Link } from 'react-router-dom';
import { RightArrowIcon } from '../../../../components/Icons';

const cx = classNames.bind(styles);

interface ListProps {
    to: string;
    name: string;
}

interface FooterItemProps {
    title: string;
    list: Array<ListProps>;
}

const FooterItem = ({ title, list }: FooterItemProps) => {
    const [showList, setShowList] = useState(false);

    return (
        <div className={cx('footer-item')}>
            <h2
                className={cx('footer-item__title')}
                onClick={() => setShowList(!showList)}
            >
                {title}
                <span
                    className={cx('footer-item__icon', {
                        'd-none': true,
                        'd-md-block': true,
                        active: showList,
                    })}
                ></span>
            </h2>
            <ul
                className={cx('footer-item__list', {
                    show: showList,
                })}
            >
                {list.map((item, index) => (
                    <li key={index} className={cx('footer-item__item')}>
                        <Link
                            to={item.to}
                            className={cx('footer-item__item-link')}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterItem;

import React from 'react';
import classNames from 'classnames/bind';

import styles from './Faq.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import FaqComponent from '../../components/Faq';
import Feature from '../../components/Feature';
import cartImages from '../../assets/images/cart';
import config from '../../config';
const cx = classNames.bind(styles);

//fake featureList
const featureList: any[] = [
    {
        img: cartImages.icon3,
        title: 'Secured Payment',
        desc: [
            'Id diam maecenas ultricies mi eget mauris pharetra. Eleifend donec pretium.',
        ],
    },
    {
        img: cartImages.icon2,
        title: 'Cashback Guaranteed',
        desc: [
            'Egestas fringilla phasellus faucibus scelerisque eleifend. Mattis pellentesque. ',
        ],
    },
    {
        img: cartImages.icon1,
        title: 'In-store Pickup',
        desc: [
            'Morbi tristique senectus et netus et. Aliquet nec ullamcorper sit amet risus nullam.',
        ],
    },
];


const Faq = () => {
    return (
        <div className={cx('faq', { 'container-spacing': true })}>
            <Breadcrumb title="Faq" links={[{ to: config.routes.home, name: 'home' }, { name: 'Faq' }]}></Breadcrumb>
            <div className={cx('faq__content')}>
                <FaqComponent></FaqComponent>
            </div>
            <Feature
                className={cx('faq__feature')}
                featureList={featureList}
            ></Feature>
        </div>
    );
};

export default Faq;

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import ContactForm from '../../components/ContactForm';
import { AddressIcon, MailIcon, PhoneIcon } from '../../components/Icons';
import { Link } from 'react-router-dom';
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
            'At varius vel pharetra vel turpis nunc. A condimentum vitae sapien pellentesque. Dui sapien eget mi proin.',
        ],
    },
    {
        img: cartImages.icon2,
        title: 'Customer Support',
        desc: [
            'Tortor at risus viverra adipiscing at in tellus integer. Pulvinar neque laoreet suspendisse interdum.',
        ],
    },
    {
        img: cartImages.icon1,
        title: 'In-store Pickup',
        desc: [
            'Facilisi morbi tempus iaculis urna. Pellentesque nec nam aliquam sem et tortor consequat id.',
        ],
    },
];

const Contact = () => {
    return (
        <div className={cx('contact', { 'container-spacing': true })}>
            <Breadcrumb
                title="Contact"
                links={[{ to: config.routes.home, name: 'home' }, { name: 'Contact' }]}
            ></Breadcrumb>
            <div className={cx('contact__content')}>
                <div className={cx('contact__inner')}>
                    <div
                        className={cx('contact__row', {
                            row: true,
                            'row-cols-2': true,
                        })}
                    >
                        <div className="col">
                            <ContactForm
                                className={cx('contact__form')}
                                desc="Tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius. Non pulvinar neque laoreet suspendisse interdum consectetur libero.Magna fermentum iaculis eu non diam. "
                            ></ContactForm>
                        </div>
                        <div className="col">
                            <div className={cx('contact__address')}>
                                <div className={cx('contact__map')}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0887145900892!2d106.71422577480533!3d10.804517189345965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAx!5e0!3m2!1svi!2s!4v1724408294899!5m2!1svi!2s"
                                        width="100%"
                                        height="430"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Address"
                                    ></iframe>
                                </div>
                                <ul className={cx('contact__body')}>
                                    <li className={cx('contact__item')}>
                                        <AddressIcon
                                            width="3.5rem"
                                            height="3.5rem"
                                            className={cx('contact__icon')}
                                        ></AddressIcon>
                                        <span
                                            className={cx(
                                                'contact__contact-text'
                                            )}
                                        >
                                            No: 58 A, East Madison Street,
                                            Baltimore, MD, USA 4508
                                        </span>
                                    </li>
                                    <li className={cx('contact__item')}>
                                        <MailIcon
                                            width="3.5rem"
                                            height="3.5rem"
                                            className={cx('contact__icon')}
                                        ></MailIcon>
                                        <Link
                                            to={'mailto:tee@gmail.com'}
                                            className={cx(
                                                'contact__contact-text'
                                            )}
                                        >
                                            tee@gmail.com
                                        </Link>
                                    </li>
                                    <li className={cx('contact__item')}>
                                        <PhoneIcon
                                            width="3.5rem"
                                            height="3.5rem"
                                            className={cx('contact__icon')}
                                        ></PhoneIcon>
                                        <Link
                                            to={'tel:+84334897635'}
                                            className={cx(
                                                'contact__contact-text'
                                            )}
                                        >
                                            +8433 4897 635
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Feature
                className={cx('contact__feature')}
                featureList={featureList}
            ></Feature>
        </div>
    );
};

export default Contact;

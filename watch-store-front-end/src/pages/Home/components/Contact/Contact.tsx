import React from 'react';
import classNames from 'classnames/bind';

import styles from './Contact.module.scss';
import { AddressIcon, MailIcon, PhoneIcon } from '../../../../components/Icons';
import { Link } from 'react-router-dom';
import ContactForm from '../../../../components/ContactForm';

const cx = classNames.bind(styles);

const Contact = () => {
    return (
        <section className={cx('contact')}>
            <div
                className={cx('contact__row', {
                    row: true,
                    'row-cols-2': true,
                })}
            >
                <div className={cx('', { col: true, 'col-lg-12': true })}>
                    <div className={cx('contact__info')}>
                        <div className={cx('contact__group')}>
                            <AddressIcon
                                width="3.5rem"
                                height="3.5rem"
                                className={cx('contact__icon')}
                            ></AddressIcon>
                            <div className={cx('contact__body')}>
                                <h6 className={cx('contact__label')}>
                                    Locate us
                                </h6>
                                <address className={cx('contact__address')}>
                                    No: 58 A, East Madison Street, Baltimore,
                                    MD, USA 4508
                                </address>
                            </div>
                        </div>
                        <div className={cx('contact__group')}>
                            <MailIcon
                                className={cx('contact__icon')}
                                width="3.5rem"
                                height="3.5rem"
                            ></MailIcon>
                            <div className={cx('contact__body')}>
                                <h6 className={cx('contact__label')}>
                                    Chat with us
                                </h6>
                                <a
                                    href="mailto:tee@gmail.com"
                                    className={cx('contact__address')}
                                >
                                    tee@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className={cx('contact__group')}>
                            <PhoneIcon
                                className={cx('contact__icon')}
                                width="3.5rem"
                                height="3.5rem"
                            ></PhoneIcon>
                            <div className={cx('contact__body')}>
                                <h6 className={cx('contact__label')}>
                                    Call us
                                </h6>
                                <a
                                    href="tel:+84334897635"
                                    className={cx('contact__address')}
                                >
                                    +84-334897635
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('', { col: true, 'col-lg-12': true })}>
                    <ContactForm></ContactForm>
                </div>
            </div>
        </section>
    );
};

export default Contact;

import React from 'react';
import classNames from 'classnames/bind';

import Button from '../Button';
import Heading from '../../pages/Home/components/Heading';
import styles from './ContactForm.module.scss';

const cx = classNames.bind(styles);

interface ContactFormProps {
    desc?: string;
    className?: string;
}

const ContactForm = ({ desc, className }: ContactFormProps) => {
    return (
        <div className={className}>
            <Heading
                subHeading="CONTACT US"
                title="Get In Touch"
                className={cx('contact-form__heading')}
                desc={desc}
            ></Heading>
            <form action="" method="post">
                <div className={cx('contact-form__group')}>
                    <input
                        type="text"
                        placeholder="Name"
                        className={cx('contact-form__input')}
                    />
                </div>
                <div className={cx('contact-form__group')}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={cx('contact-form__input')}
                    />
                </div>
                <div className={cx('contact-form__group')}>
                    <input
                        type="number"
                        placeholder="Phone number"
                        className={cx('contact-form__input')}
                    />
                </div>
                <div className={cx('contact-form__group')}>
                    <input
                        type="text"
                        placeholder="Comment"
                        className={cx('contact-form__input')}
                    />
                </div>
                <div className={cx('contact-form__bottom')}>
                    <input
                        type="checkbox"
                        id="contact-form__checkbox"
                        className={cx('contact-form__checkbox')}
                        hidden
                    />
                    <label
                        htmlFor="contact-form__checkbox"
                        className={cx('contact-form__label')}
                    >
                        Save my name, email, and website in this browser.
                    </label>
                </div>
                <Button primary rounded className={cx('contact-form__btn')}>
                    Subscribe
                </Button>
            </form>
        </div>
    );
};

export default ContactForm;

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '../../../../components/Button';
import styles from './Companion.module.scss';
import Heading from '../Heading';
import Image from '../../../../components/Image';
import images from '../../../../assets/images/home';
import { CloseIcon } from '../../../../components/Icons';
import Card from '../../../../components/Card';
import { useMediaQuery } from 'react-responsive';

const cx = classNames.bind(styles);

const Companion = () => {
    const isMobileScreen = useMediaQuery({ query: '(max-width: 575.98px)' });

    const [showMobilePopup, setShowMobilePopup] = useState(false);

    return (
        <section className={cx('companion')}>
            <Heading
                className={cx('companion__heading')}
                subHeading="SMART FEATURES"
                title="The Ultimate Companion"
                desc="Sed Ut Perspiunde Omnis Iste Voluptatem Accusantium Doloremque Laudantium, Totam Rem Aperiam, Eaque Ipsa Quae Ab Illo Inventore Veritatis Et Quasi Architecto Beatae Vitae Dicta Sunt Explicabo."
            ></Heading>
            <div className={cx('companion__wrapper')}>
                <Image
                    src={images.companionImg}
                    className={cx('companion__img')}
                ></Image>
                <div className={cx('companion__item')}>
                    <Button
                        className={cx('companion__btn')}
                        onClick={() => setShowMobilePopup(true)}
                    ></Button>

                    {!isMobileScreen ? (
                        <div className={cx('companion__popup')}>
                            <div className={cx('companion__content')}>
                                <Card></Card>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={cx('mobile-popup', {
                                show: showMobilePopup,
                            })}
                        >
                            <div
                                className={cx('mobile-popup__overlay')}
                                onClick={() => setShowMobilePopup(false)}
                            ></div>
                            <Button
                                className={cx('mobile-popup__close-btn')}
                                onClick={() => setShowMobilePopup(false)}
                            >
                                <CloseIcon
                                    width="1rem"
                                    height="1rem"
                                ></CloseIcon>
                            </Button>
                            <div className={cx('mobile-popup__inner')}>
                                <div className={cx('mobile-popup__body')}>
                                    <Card
                                        soldOut
                                        className={cx('mobile-popup__card')}
                                    ></Card>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Companion;

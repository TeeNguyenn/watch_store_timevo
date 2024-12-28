import React from 'react';
import classNames from 'classnames/bind';

import styles from './Feature.module.scss';
import Image from '../../../../components/Image';
import images from '../../../../assets/images/home-feature';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const cx = classNames.bind(styles);

const Feature = () => {
    return (
        <div className={cx('feature')}>
            <div
                className={cx('feature__row', {
                    row: true,
                    'row-cols-2': true,
                    'row-cols-lg-1': true,
                })}
            >
                <div className={cx('feature__specification', { col: true })}>
                    <div className={cx('feature__top')}>
                        <h6
                            className={cx('feature__sub-heading', {
                                'sub-heading': true,
                            })}
                            data-aos="fade-up"
                            data-aos-duration="1500"
                            data-aos-easing="ease"
                            data-aos-once="true"
                            data-aos-anchor-placement="top-bottom"
                        >
                            Explore Functionality
                        </h6>
                        <h2
                            className={cx('feature__title', { title: true })}
                            data-aos="fade-up"
                            data-aos-duration="1500"
                            data-aos-easing="ease"
                            data-aos-once="true"
                            data-aos-anchor-placement="top-bottom"
                        >
                            Main Features
                        </h2>
                    </div>
                    <div
                        className={cx('feature__blocks')}
                        data-aos="fade-up"
                        data-aos-duration="1500"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-anchor-placement="top-bottom"
                    >
                        <div className={cx('feature__block')}>
                            <div className={cx('feature__icon-wrapper')}>
                                <Image
                                    src={images.batteryIcon}
                                    alt="Icon"
                                    className={cx('feature__icon')}
                                ></Image>
                            </div>
                            <div className={cx('feature__body')}>
                                <h5 className={cx('feature__heading')}>
                                    Extended Battery Life
                                </h5>
                                <p className={cx('feature__desc')}>
                                    {' '}
                                    Erat nam at lectus urna.
                                </p>
                            </div>
                        </div>
                        <div className={cx('feature__block')}>
                            <div className={cx('feature__icon-wrapper')}>
                                <Image
                                    src={images.voiceIcon}
                                    alt="Icon"
                                    className={cx('feature__icon')}
                                ></Image>
                            </div>
                            <div className={cx('feature__body')}>
                                <h5 className={cx('feature__heading')}>
                                    Microphone, Call, Track, Volume
                                </h5>
                                <p className={cx('feature__desc')}>
                                    {' '}
                                    Tristique senectus et netus
                                </p>
                            </div>
                        </div>
                        <div className={cx('feature__block')}>
                            <div className={cx('feature__icon-wrapper')}>
                                <Image
                                    src={images.connectIcon}
                                    alt="Icon"
                                    className={cx('feature__icon')}
                                ></Image>
                            </div>
                            <div className={cx('feature__body')}>
                                <h5 className={cx('feature__heading')}>
                                    Seamless Connectivity
                                </h5>
                                <p className={cx('feature__desc')}>
                                    {' '}
                                    Urna cursus eget nunc
                                </p>
                            </div>
                        </div>
                        <div className={cx('feature__block')}>
                            <div className={cx('feature__icon-wrapper')}>
                                <Image
                                    src={images.volumeIcon}
                                    alt="Icon"
                                    className={cx('feature__icon')}
                                ></Image>
                            </div>
                            <div className={cx('feature__body')}>
                                <h5 className={cx('feature__heading')}>
                                    Secure: Noise cancellation
                                </h5>
                                <p className={cx('feature__desc')}>
                                    {' '}
                                    Interdum consectetur libero
                                </p>
                            </div>
                        </div>
                        <div className={cx('feature__block')}>
                            <div className={cx('feature__icon-wrapper')}>
                                <Image
                                    src={images.waterfallIcon}
                                    alt="Icon"
                                    className={cx('feature__icon')}
                                ></Image>
                            </div>
                            <div className={cx('feature__body')}>
                                <h5 className={cx('feature__heading')}>
                                    IPX4: Sweat and Splash Resistant
                                </h5>
                                <p className={cx('feature__desc')}>
                                    {' '}
                                    Pellentesque eu tincidunt tortor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('feature__media', { col: true })}>
                    <div className={cx('feature__img-wrapper')}>
                        <Image
                            src={images.mediaImg}
                            className={cx('feature__img')}
                        ></Image>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;

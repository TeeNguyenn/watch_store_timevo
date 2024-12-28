import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Faq.module.scss';
import Image from '../Image';
import { PagingLeftArrowIcon } from '../Icons';
import aboutImages from '../../assets/images/about';

const cx = classNames.bind(styles);

const Faq = () => {
    const [showFaqDetail, setShowFaqDetail] = useState<number[]>([1]);

    const handleShowFaqDetail = (num: number) => {
        if (showFaqDetail.includes(num)) {
            const newArray = showFaqDetail.filter(
                (item, index) => item !== num
            );
            setShowFaqDetail(newArray);
        } else {
            setShowFaqDetail([...showFaqDetail, num]);
        }
    };

    return (
        <div
            className={cx('faq', {
                row: true,
                'row-cols-2': true,
                'row-cols-xl-1': true,
            })}
        >
            <div className={cx('faq__media', { col: true })}>
                <Image
                    src={aboutImages.aboutFaq}
                    className={cx('faq__img')}
                ></Image>
            </div>
            <div className={cx('', { col: true })}>
                <div className={cx('faq__content')}>
                    <div className={cx('faq__item')}>
                        <div
                            className={cx('faq__group')}
                            onClick={() => handleShowFaqDetail(1)}
                        >
                            <h3 className={cx('faq__title')}>
                                <span>01</span>
                                Can I customize the watch face on my smartwatch?
                            </h3>
                            <div
                                className={cx('faq__icon', {
                                    active: showFaqDetail.includes(1),
                                })}
                            >
                                <PagingLeftArrowIcon
                                    width="1.5rem"
                                    height="1.2rem"
                                ></PagingLeftArrowIcon>
                            </div>
                        </div>
                        <div
                            className={cx('faq__accordion', {
                                'content-box': true,
                                show: showFaqDetail.includes(1),
                            })}
                        >
                            <div>
                                <p>
                                    Cras adipiscing enim eu turpis egestas
                                    pretium aenean pharetra magna. Accumsan
                                    tortor posuere ac ut consequat semper.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('faq__item')}>
                        <div
                            className={cx('faq__group')}
                            onClick={() => handleShowFaqDetail(2)}
                        >
                            <h3 className={cx('faq__title')}>
                                <span>02</span>
                                How long does the battery last on the
                                smartwatch?
                            </h3>
                            <div
                                className={cx('faq__icon', {
                                    active: showFaqDetail.includes(2),
                                })}
                            >
                                <PagingLeftArrowIcon
                                    width="1.5rem"
                                    height="1.2rem"
                                ></PagingLeftArrowIcon>
                            </div>
                        </div>
                        <div
                            className={cx('faq__accordion', {
                                'content-box': true,
                                show: showFaqDetail.includes(2),
                            })}
                        >
                            <div>
                                <p>
                                    Pretium lectus quam id leo in vitae turpis
                                    massa. At quis risus sed vulputate odio ut
                                    enim blandit volutpat. Magna fringilla urna
                                    porttitor rhoncus dolor purus non enim.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('faq__item')}>
                        <div
                            className={cx('faq__group')}
                            onClick={() => handleShowFaqDetail(3)}
                        >
                            <h3 className={cx('faq__title')}>
                                <span>03</span>
                                Can I use third-party apps on my smartwatch?
                            </h3>
                            <div
                                className={cx('faq__icon', {
                                    active: showFaqDetail.includes(3),
                                })}
                            >
                                <PagingLeftArrowIcon
                                    width="1.5rem"
                                    height="1.2rem"
                                ></PagingLeftArrowIcon>
                            </div>
                        </div>
                        <div
                            className={cx('faq__accordion', {
                                'content-box': true,
                                show: showFaqDetail.includes(3),
                            })}
                        >
                            <div>
                                <p>
                                    Lacus vestibulum sed arcu non odio euismod
                                    lacinia at quis. Convallis posuere morbi leo
                                    urna molestie at elementum.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('faq__item')}>
                        <div
                            className={cx('faq__group')}
                            onClick={() => handleShowFaqDetail(4)}
                        >
                            <h3 className={cx('faq__title')}>
                                <span>04</span>
                                Is the smartwatch water-resistant or waterproof?
                            </h3>
                            <div
                                className={cx('faq__icon', {
                                    active: showFaqDetail.includes(4),
                                })}
                            >
                                <PagingLeftArrowIcon
                                    width="1.5rem"
                                    height="1.2rem"
                                ></PagingLeftArrowIcon>
                            </div>
                        </div>
                        <div
                            className={cx('faq__accordion', {
                                'content-box': true,
                                show: showFaqDetail.includes(4),
                            })}
                        >
                            <div>
                                <p>
                                    In nisl nisi scelerisque eu ultrices vitae.
                                    Vitae aliquet nec ullamcorper sit amet risus
                                    nullam eget. Tortor at auctor urna nunc.
                                    Molestie ac feugiat sed lectus vestibulum
                                    mattis ullamcorper velit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;

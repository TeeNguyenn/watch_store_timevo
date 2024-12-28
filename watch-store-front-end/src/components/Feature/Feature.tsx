import React from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import styles from './Feature.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

interface FeatureProps {
    className?: string;
    featureList: any;
}

const Feature = ({ className, featureList }: FeatureProps) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1199.98,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 575.98,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className={cx('feature', className, { 'feature-slider': true })}>
            <div className="slider-container">
                <Slider {...settings}>
                    {featureList.map((feature: any, index: number) => (
                        <div key={index} className={cx('feature__card')}>
                            <div className={cx('feature__img-wrapper')}>
                                <Image src={feature.img}></Image>
                            </div>
                            <h3 className={cx('feature__title')}>
                                {feature.title}
                            </h3>
                            <p className={cx('feature__desc')}>
                                {feature.desc.map((item: any) => (
                                    <span>
                                        {item}
                                        <br></br>
                                    </span>
                                ))}
                            </p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Feature;

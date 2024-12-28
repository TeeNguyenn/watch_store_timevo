import React from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import styles from './News.module.scss';
import images from '../../../../assets/images/home';
import NewsItem from './NewsItem';

const cx = classNames.bind(styles);

// Fake data
const newsList = [
    {
        src: images.blogImg01,
        date: ' 16 Mar 2024',
        name: 'Advanced Wearable Tech',
        desc: 'Viverra orci sagittis eu volutpat odio facilisis. Non sodales neque soda les ut etiam. Faucibus a pellentesque sit amet porttitor eget',
    },
    {
        src: images.blogImg02,
        date: ' 16 Mar 2024',
        name: 'Innovative Fitness Wearables',
        desc: 'Enim ut sem viverra aliquet eget. Faucibus purus in massa tempor nec feugiat. Tellus integer feugiat scelerisque varius morbi enim',
    },
];

const News = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1199.98,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className={cx('news', { 'news-slide': true })}>
            <h2
                className={cx('news__title')}
                data-aos="fade-in-up"
                data-aos-duration="1500"
                data-aos-easing="ease"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
            >
                Latest News
            </h2>
            <div className={cx('news__list')}>
                <div className="slider-container">
                    <Slider {...settings}>
                        {newsList.map((item, index) => (
                            <NewsItem
                                key={index}
                                src={item.src}
                                date={item.date}
                                name={item.name}
                                desc={item.desc}
                            ></NewsItem>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default News;

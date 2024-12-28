import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import styles from './Testimonial.module.scss';
import images from '../../../../assets/images/home';
import TestimonialItem from './TestimonialItem';
import Heading from '../Heading';

const cx = classNames.bind(styles);

// Fake data
const testimonialList = [
    {
        src: images.testimonialImg01,
        author: 'Robert Davis',
        country: '- USA',
        rate: 3.5,
        content:
            'Etiam non quam lacus suspendisse faucibus. Ultrices sagittis orci a scelerisque. At elementum eu facilisis sed odio. Cursus risus.',
    },
    {
        src: images.testimonialImg02,
        author: 'David Williams',
        country: '- Norway',
        rate: 3,
        content:
            'Lectus arcu bibendum at varius vel pharetra. Leo vel fringilla est ullamcorper eget nulla facilisi. Pellentesque habitant morbi.',
    },
    {
        src: images.testimonialImg03,
        author: 'John Smith',
        country: '- UK',
        rate: 4.5,
        content:
            'Molestie at elementum eu facilisis sed. Risus in hendrerit gravida rutrum quisque non tellus orci ac. Placerat vestibulum lectus mauris ultrices.',
    },
    {
        src: images.testimonialImg01,
        author: 'Robert Davis',
        country: '- USA',
        rate: 3,
        content:
            'Etiam non quam lacus suspendisse faucibus. Ultrices sagittis orci a scelerisque. At elementum eu facilisis sed odio. Cursus risus.',
    },
    {
        src: images.testimonialImg02,
        author: 'David Williams',
        country: '- Norway',
        rate: 3,
        content:
            'Lectus arcu bibendum at varius vel pharetra. Leo vel fringilla est ullamcorper eget nulla facilisi. Pellentesque habitant morbi.',
    },
    {
        src: images.testimonialImg03,
        author: 'John Smith',
        country: '- UK',
        rate: 3,
        content:
            'Molestie at elementum eu facilisis sed. Risus in hendrerit gravida rutrum quisque non tellus orci ac. Placerat vestibulum lectus mauris ultrices.',
    },
];

const Testimonial = () => {
    // set same height for all the items in slider
    // run only one
    // useEffect(() => {
    //     const handleMaxHeight = () => {
    //         let maxHeight = 0;

    //         const items = document.querySelectorAll('.testimonial-item-slide');

    //         items.forEach((item) => {
    //             const height = item.clientHeight;
    //             if (height > maxHeight) {
    //                 maxHeight = height;
    //             }
    //         });

    //         items.forEach((item) => {
    //             (item as HTMLElement).style.height = `${maxHeight}px`;
    //         });
    //     };

    //     window.addEventListener('resize', handleMaxHeight);

    //     return () => window.removeEventListener('resize', handleMaxHeight);
    // }, []);

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
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 575.98,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className={cx('testimonial', { 'testimonial-slide': true })}>
            <Heading
                subHeading="TESTIMONIAL"
                title="Feedback From Our Users"
                className={cx('testimonial__heading')}
            ></Heading>
            <div className={cx('testimonial__list')}>
                <div className="slider-container">
                    <Slider {...settings}>
                        {testimonialList.map((item, index) => (
                            <TestimonialItem
                                src={item.src}
                                author={item.author}
                                country={item.country}
                                rate={item.rate}
                                content={item.content}
                                key={index}
                            ></TestimonialItem>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;

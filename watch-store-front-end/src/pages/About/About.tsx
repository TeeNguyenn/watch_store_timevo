import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Slider from 'react-slick';

import Button from '../../components/Button';
import styles from './About.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Image from '../../components/Image';
import aboutImages from '../../assets/images/about';
import cartImages from '../../assets/images/cart';
import Feature from '../../components/Feature';
import Faq from '../../components/Faq';
import QuickBuy from '../../components/QuickBuy';
import { CloseIcon } from '../../components/Icons';
import config from '../../config';

const cx = classNames.bind(styles);

const sliderList = [
    {
        mainImg: aboutImages.mainSlider1,
        slideimg: aboutImages.slider1,
        title: 'Welcome to our online store, where sophistication meets innovation. Discover our collection of premium smartwatches crafted .',
        desc: 'Imperdiet nulla malesuada pellentesque elit eget gravida cum. Vulputate odio ut enim blandit volutpat.Morbi leo urna molestie at elementum eu facilisis.',
    },
    {
        mainImg: aboutImages.mainSlider2,
        slideimg: aboutImages.slider2,
        title: 'Step into the future of wearable technology at our online store. Explore our curated collection of premium smartwatches',
        desc: 'Amet nisl purus in mollis nunc sed id semper.Aliquam vestibulum mauris eu velit imperdiet venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed vestibulum venenatis sem et posuere.',
    },
    {
        mainImg: aboutImages.mainSlider3,
        slideimg: aboutImages.slider3,
        title: 'Experience the pinnacle of sophistication and innovation with our online store.',
        desc: 'Egestas sed sed risus pretium quam vulputate dignissim. Pellentesque habitant morbi tristique senectus et. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Pellentesque diam volutpat commodo sed egestas egestas fringilla.',
    },
];

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

const teamList: any[] = [
    {
        img: aboutImages.team1,
        name: 'Alex Thompson',
        pos: 'CEO',
    },
    {
        img: aboutImages.team2,
        name: 'Marketing Director',
        pos: 'Marketing Director',
    },
    {
        img: aboutImages.team3,
        name: 'Christopher Lee',
        pos: 'Product Tester',
    },
    {
        img: aboutImages.team4,
        name: 'Brian Hill',
        pos: 'Finance Manager',
    },
];

const About = () => {
    const links = [{ to: config.routes.home, name: 'home' }, { name: 'About us' }];

    // Slider
    const [nav1, setNav1] = useState<any>();
    const [nav2, setNav2] = useState<any>();

    const settings = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        draggable: false,

        responsive: [
            {
                breakpoint: 1199.98,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                    draggable: true,
                },
            },
            {
                breakpoint: 767.98,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    draggable: true,
                },
            },
            {
                breakpoint: 575.98,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    draggable: true,
                },
            },
        ],
    };

    return (
        <div className={cx('container', { 'container-spacing': true })}>
            <Breadcrumb links={links}></Breadcrumb>
            <div className={cx('about')}>
                <div className={cx('about__top')}>
                    <h2 className={cx('about__title')}>Discover Our Story</h2>
                    <p className={cx('about__desc')}>
                        Dictumst vestibulum rhoncus est pellentesque. Tortor at
                        risus viverra adipiscing at in tellus. Nunc sed blandit
                        libero volutpat sed cras ornare arcu dui. Tempor orci eu
                        lobortis elementum nibh tellus molestie nunc. Quis risus
                        sed vulputate odio ut enim blandit volutpat. Morbi
                        blandit cursus risus at. Elementum nibh tellus molestie
                        nunc non blandit massa enim nec. Quis varius quam
                        quisque id diam vel. Mattis nunc sed blandit libero
                        volutpat sed. Turpis egestas integer eget aliquet. Purus
                        faucibus ornare suspendisse sed nisi lacus sed.Quam
                        vulputate dignissim suspendisse in est ante in nibh.
                        Consequat semper viverra nam libero.
                    </p>
                    <Button
                        primary
                        rounded
                        className={cx('about__explore-btn')}
                    >
                        Explore More
                    </Button>
                </div>
                <div className={cx('about__slider', { 'about-slider': true })}>
                    <div className="slider-container">
                        {/* Main */}
                        <Slider
                            asNavFor={nav2!}
                            ref={(slider) => setNav1(slider)}
                            arrows={false}
                            speed={0}
                            fade={false}
                            waitForAnimate={false}
                            draggable={false}
                            touchMove={false}
                        >
                            {sliderList.map((img, index) => (
                                <div
                                    className={cx('about__inner', {
                                        row: true,
                                        'row-cols-2': true,
                                        'row-cols-lg-1': true,
                                    })}
                                >
                                    <div
                                        className={cx('about__img-wrapper', {
                                            col: true,
                                        })}
                                        key={index}
                                    >
                                        <Image
                                            src={img.mainImg}
                                            alt="Slider image"
                                            className={cx('about__main-img')}
                                        ></Image>
                                    </div>
                                    <div
                                        className={cx('about__slider-content', {
                                            col: true,
                                        })}
                                    >
                                        <h2
                                            className={cx(
                                                'about__slider-heading'
                                            )}
                                        >
                                            {img.title}
                                        </h2>
                                        <p className={cx('about__slider-desc')}>
                                            {img.desc}
                                        </p>
                                        <Button
                                            to="#!"
                                            primary
                                            rounded
                                            className={cx('about__slider-btn')}
                                        >
                                            Shop Now
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        {/* Slide */}
                        <Slider
                            asNavFor={nav1!}
                            ref={(slider) => setNav2(slider)}
                            slidesToShow={3}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            arrows={false}
                            speed={0}
                            draggable={false}
                            infinite={false}
                        >
                            {sliderList.map((img, index) => (
                                <div
                                    className={cx('about__slide-wrapper')}
                                    key={index}
                                >
                                    <Image
                                        src={img.mainImg}
                                        alt="Slider image"
                                        className={cx('about__slide-img')}
                                    ></Image>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
                <Feature
                    className={cx('about__feature')}
                    featureList={featureList}
                ></Feature>
                <div className={cx('about__faq')}>
                    <div
                        className={cx('about__faq-top')}
                        data-aos="fade-in-up"
                        data-aos-duration="1500"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-anchor-placement="top-bottom"
                        data-aos-offset="-500"
                    >
                        <h2 className={cx('about__faq-title')}>Faq</h2>
                        <p className={cx('about__faq-desc')}>
                            Amet nisl purus in mollis nunc sed id semper.Aliquam
                            vestibulum mauris eu velit imperdiet venenatis.
                            Class aptent taciti sociosqu ad litora torquent per
                            conubia nostra, per inceptos himenaeos. Sed
                            vestibulum venenatis sem et posuere.
                        </p>
                    </div>
                    <Faq></Faq>
                </div>
                <div
                    className={cx('about__banners')}
                    data-aos="fade-in-up"
                    data-aos-duration="1500"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-anchor-placement="top-bottom"
                    data-aos-offset="-500"
                >
                    <div
                        className={cx('', {
                            row: true,
                            'row-cols-2': true,
                            'row-cols-sm-1': true,
                        })}
                    >
                        <div className={cx('', { col: true })}>
                            <div className={cx('about__banner')}>
                                <div className={cx('about__banner-wrapper')}>
                                    <Image
                                        src={aboutImages.banner01}
                                        alt="Banner image"
                                        className={cx('about__banner-img')}
                                    ></Image>
                                </div>
                                <div className={cx('about__banner-content')}>
                                    <h5 className={cx('about__banner-title')}>
                                        Find Trends
                                    </h5>
                                    <h4 className={cx('about__banner-heading')}>
                                        Sync
                                    </h4>
                                    <p className={cx('about__banner-desc')}>
                                        Mus mauris vitae ultricies leo. Nisi
                                        quis eleifend quam adipiscing vitae
                                        proin sagittis nisl. Amet cursus sit
                                        amet dictum. Mauris ultrices eros in
                                        cursus turpis masew.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('', { col: true })}>
                            <div className={cx('about__banner')}>
                                <div className={cx('about__banner-wrapper')}>
                                    <Image
                                        src={aboutImages.banner02}
                                        alt="Banner image"
                                        className={cx('about__banner-img')}
                                    ></Image>
                                </div>
                                <div className={cx('about__banner-content')}>
                                    <h5 className={cx('about__banner-title')}>
                                        Connect Now
                                    </h5>
                                    <h4 className={cx('about__banner-heading')}>
                                        Edge
                                    </h4>
                                    <p className={cx('about__banner-desc')}>
                                        Leo vel fringilla est ullamcorper eget
                                        nulla facilisi etiam. Enim ut tellus
                                        elementum sagittis vitae et leo duis. In
                                        metus vulputate eu scelerisque felis
                                        imperdiet proin fermentum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('about__team', { 'about-team': true })}>
                    <h2
                        className={cx('about__team-title')}
                        data-aos="fade-in-up"
                        data-aos-duration="1500"
                        data-aos-easing="ease"
                        data-aos-once="true"
                        data-aos-anchor-placement="top-bottom"
                        data-aos-offset="-500"
                    >
                        Our Team
                    </h2>
                    <Slider {...settings}>
                        {teamList.map((member: any, index: number) => (
                            <article className={cx('about__team-item')}>
                                <div className={cx('about__team-wrapper')}>
                                    <Image
                                        src={member.img}
                                        alt="Member image"
                                    ></Image>
                                </div>
                                <div className={cx('about__team-content')}>
                                    <h4 className={cx('about__team-name')}>
                                        {member.name}
                                    </h4>
                                    <p className={cx('about__team-pos')}>
                                        {member.pos}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default About;

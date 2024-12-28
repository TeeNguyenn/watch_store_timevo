import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../../components/Button';
import styles from './VideoBanner.module.scss';
import { PauseIcon, PlayIcon } from '../../../../components/Icons';
import videos from '../../../../assets/videos';
import images from '../../../../assets/images/banner';

const cx = classNames.bind(styles);

const VideoBanner = () => {
    const [toggleBtn, setToggleBtn] = useState(false);
    const [removeAnimation, setRemoveAnimation] = useState(false);
    const [showDescription, setShowDescription] = useState(true);

    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handlePlayVideo = () => {
        setToggleBtn(!toggleBtn);
        setRemoveAnimation(true);
        setShowDescription(false);
        videoRef.current?.play();
    };
    const handlePauseVideo = () => {
        setToggleBtn(!toggleBtn);
        setRemoveAnimation(true);
        setShowDescription(true);
        videoRef.current?.pause();
    };

    const animateCustom = {
        transition: '',
    };

    if (!showDescription) {
        animateCustom.transition = 'all 0.3s linear !important';
    }

    return (
        <section className={cx('video-banner')}>
            <div
                style={animateCustom}
                className={cx('video-banner__top', { show: showDescription })}
                data-aos="fade-in-up"
                data-aos-duration="1500"
                data-aos-easing="ease"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
            >
                <h2 className={cx('video-banner__title', { title: true })}>
                    Built to Last
                </h2>
                <p className={cx('video-banner__desc', { desc: true })}>
                    Fringilla urna porttitor rhoncus dolor purus non enim
                    praesent. Adipiscing elit pellentesque habitant morbi
                    tristique senectusViverra nibh cras.
                </p>
            </div>
            <div className={cx('video-banner__video-wrapper')}>
                <video
                    ref={videoRef}
                    loop
                    muted={true}
                    className={cx('video-banner__video', {
                        remove: removeAnimation,
                    })}
                    poster={images.poster}
                >
                    <source src={videos.videoBanner} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className={cx('video-banner__icons')}>
                    <Button
                        className={cx('video-banner__icon', {
                            hide: toggleBtn,
                        })}
                        onClick={handlePlayVideo}
                    >
                        <PlayIcon></PlayIcon>
                    </Button>
                    {toggleBtn && (
                        <Button
                            className={cx('video-banner__icon')}
                            onClick={handlePauseVideo}
                        >
                            <PauseIcon></PauseIcon>
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default VideoBanner;

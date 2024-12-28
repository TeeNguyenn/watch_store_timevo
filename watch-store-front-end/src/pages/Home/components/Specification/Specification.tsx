import React from 'react';
import classNames from 'classnames/bind';

import styles from './Specification.module.scss';
import Image from '../../../../components/Image';
import icons from '../../../../assets/icons';
import images from '../../../../assets/images/home';
import Heading from '../Heading';

const cx = classNames.bind(styles);

const Specification = () => {
    return (
        <section className={cx('specification')}>
            <Heading
                subHeading="ENHANCED OPTIONS"
                title="Elevate Your Workouts"
                desc="Ut Lectus Arcu Bibendum At Varius Vel Pharetra Vel. Bibendum At
                Varius Vel Pharetra Vel Turpis Nunc Eget Lorem. Euismod In
                Pellentesque Massa Placerat Duis Ultricies."
            ></Heading>
            <div
                className={cx('specification__wrapper', {
                    row: true,
                    'row-cols-3': true,
                })}
            >
                {/* Left Block */}
                <div
                    className={cx('specification__block', { col: true })}
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-anchor-placement="top-bottom"
                >
                    {/* Block 1 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.bicycle}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Distance Tracking
                            </h5>
                            <p className={cx('specification__text')}>
                                {' '}
                                Aliquam nulla facilisi cras.
                            </p>
                        </div>
                    </div>
                    {/* Block 2 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.jogging}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Multi-Sport Modes
                            </h5>
                            <p className={cx('specification__text')}>
                                Diam quam nulla porttitor.
                            </p>
                        </div>
                    </div>
                    {/* Block 3 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.alarm}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Sleep Monitoring
                            </h5>
                            <p className={cx('specification__text')}>
                                Scelerisque varius morbi.
                            </p>
                        </div>
                    </div>
                    {/* Block 4 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.swim}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Water Resistance
                            </h5>
                            <p className={cx('specification__text')}>
                                Condimentum id venenatis
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main block */}
                <div
                    className={cx('specification__main', {
                        col: true,
                    })}
                >
                    <div className={cx('specification__block-img')}>
                        <Image
                            className={cx('specification__main-img')}
                            src={images.specificationImg}
                        ></Image>
                    </div>
                </div>

                {/* Right Block */}
                <div
                    className={cx('specification__block', { col: true })}
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-easing="ease"
                    data-aos-once="true"
                    data-aos-anchor-placement="top-bottom"
                >
                    {/* Block 1 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.meal}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Calorie Burn Tracking
                            </h5>
                            <p className={cx('specification__text')}>
                                Vel eros donec ac odiory
                            </p>
                        </div>
                    </div>
                    {/* Block 2 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.blood}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Blood Pressure Track
                            </h5>
                            <p className={cx('specification__text')}>
                                Eu ultrices vitae auctor
                            </p>
                        </div>
                    </div>
                    {/* Block 3 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.schedule}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Guided Breath Sessions
                            </h5>
                            <p className={cx('specification__text')}>
                                Malesuada pellentesque elit.
                            </p>
                        </div>
                    </div>
                    {/* Block 4 */}
                    <div className={cx('specification__support')}>
                        <div className={cx('specification__img-wrapper')}>
                            <Image
                                className={cx('specification__img')}
                                src={icons.joy}
                            ></Image>
                        </div>
                        <div className={cx('specification__body')}>
                            <h5 className={cx('specification__heading')}>
                                Joy Indicator
                            </h5>
                            <p className={cx('specification__text')}>
                                Est placerat in egestas erat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Specification;

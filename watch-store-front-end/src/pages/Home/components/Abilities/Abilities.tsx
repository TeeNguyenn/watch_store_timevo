import React from 'react';
import classNames from 'classnames/bind';

import styles from './Abilities.module.scss';
import Heading from '../Heading';
import images from '../../../../assets/images/home';
import AbilityItem from './AbilityItem';

const cx = classNames.bind(styles);

const abilityList = [
    {
        src: images.abilityImg01,
        title: 'Your Personal Assistant',
        desc: 'Malesuada pellentesque elit eget gravida cum. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Tellus in metus vulputate eu. Dolor sed viverra ipsum nunc aliquet bibendum.',
    },
    {
        src: images.abilityImg02,
        title: 'Advanced Sleep Analysis',
        desc: 'Sed enim ut sem viverra. Mattis vulputate enim nulla aliquet porttitor lacus luctus. Non diam phasellus vestibulum lorem. Amet risus nullam eget felis eget. Ut porttitor leo a diam sollicitudin tempor id.',
    },
    {
        src: images.abilityImg03,
        title: 'Seamless Integration',
        desc: 'Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Ut tortor pretium viverra suspendisse potenti nullam ac. Consectetur a erat nam at lectus urna duis.',
    },
    {
        src: images.abilityImg04,
        title: 'Swim-Proof Design',
        desc: 'Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Ut tortor pretium viverra suspendisse potenti nullam ac. Morbi leo urna molestie at elementum eu facilisis.',
    },
    {
        src: images.abilityImg05,
        title: 'Activity Reminders',
        desc: 'Justo laoreet sit amet cursus sit amet. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Nibh tellus molestie nunc non. Orci porta non pulvinar neque laoreet suspendisse.',
    },
    {
        src: images.abilityImg06,
        title: 'Health Insights',
        desc: 'Lectus arcu bibendum at varius vel pharetra vel turpis. Aliquet nec ullamcorper sit amet risus nullam eget felis. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh sed.',
    },
];

const Abilities = () => {
    return (
        <section className={cx('abilities')}>
            <Heading
                subHeading="ADVANCED ABILITIES"
                title="Advanced Functionalities"
                desc="Rhoncus Urna Neque Viverra Justo Nec Ultrices. Justo Laoreet Sit Amet Cursus. Dis Parturient Montes Nascetur Ridiculus Mus Mauris Vitae Ultricies."
            ></Heading>
            <div
                className={cx('abilities__row', {
                    row: true,
                    'row-cols-3': true,
                    'row-cols-md-2': true,
                    'row-cols-sm-1': true,
                })}
            >
                {abilityList.map((abilityItem, index) => (
                    <div className={cx('', { col: true })}>
                        <AbilityItem
                            src={abilityItem.src}
                            title={abilityItem.title}
                            desc={abilityItem.desc}
                        ></AbilityItem>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Abilities;

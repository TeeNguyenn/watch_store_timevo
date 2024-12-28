import React from 'react';
import classNames from 'classnames/bind';
import styles from './Abilities.module.scss';
import Image from '../../../../components/Image';

const cx = classNames.bind(styles);

interface AbilityItemProps {
    src: string;
    title: string;
    desc: string;
}

const AbilityItem = ({ src, title, desc }: AbilityItemProps) => {
    return (
        <article
            className={cx('ability-item')}
            data-aos="fade-in-up"
            data-aos-duration="1500"
            data-aos-easing="ease"
            data-aos-once="true"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="100"
        >
            <div className={cx('ability-item__img-wrapper')}>
                <Image
                    src={src}
                    alt="Ability Image"
                    className={cx('ability-item__img')}
                ></Image>
            </div>
            <div className={cx('ability-item__body')}>
                <h4
                    className={cx('ability-item__title', {
                        'line-clamp': true,
                    })}
                >
                    {title}
                </h4>
                <p
                    className={cx('ability-item__desc', {
                        'line-clamp': true,
                        'line-clamp-4': true,
                    })}
                >
                    {desc}
                </p>
            </div>
        </article>
    );
};

export default AbilityItem;

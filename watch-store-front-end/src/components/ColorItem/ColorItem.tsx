import React from 'react';
import classNames from 'classnames/bind';
import styles from './ColorItem.module.scss';

const cx = classNames.bind(styles);

interface ColorItemProps {
    width?: string;
    height?: string;
    red: number;
    green: number;
    blue: number;
    alpha?: number;
    active?: boolean;
    onClick?: () => void;
}

const ColorItem = ({
    width = '24px',
    height = '24px',
    red,
    green,
    blue,
    alpha = 1,
    active,
    onClick,
}: ColorItemProps) => {
    return (
        <div
            className={cx('color-item', {
                active,
            })}
            style={{
                width: width,
                height: height,
                borderRadius: '50%',
                backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
            }}
            onClick={onClick}
        ></div>
    );
};

export default ColorItem;

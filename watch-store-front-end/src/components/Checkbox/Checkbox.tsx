import React from 'react';
import classNames from 'classnames/bind';

import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

interface CheckboxProps {
    name: string;
    label: string;
    quantity?: string;
    checked?: boolean;
    className?: string;
    onClick?: () => void;
}

const Checkbox = ({
    name,
    label,
    quantity,
    checked,
    className,
    onClick,
}: CheckboxProps) => {
    return (
        <div className={cx('container', className)}>
            <input
                type="checkbox"
                id={name}
                className={cx('checkbox')}
                hidden
                checked={checked}
                onClick={onClick}
            />
            <label htmlFor={name} className={cx('label')}>
                {label}
            </label>
            <span className={cx('quantity')}>{quantity}</span>
        </div>
    );
};

export default Checkbox;

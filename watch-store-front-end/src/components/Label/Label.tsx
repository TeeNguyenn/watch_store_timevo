import React from 'react';
import classNames from 'classnames/bind';
import styles from './Label.module.scss';
import {
    CheckNoCircleIcon,
    CloseIcon,
    ErrorLabelIcon,
    ProcessingLabelIcon,
} from '../Icons';

const cx = classNames.bind(styles);

interface LabelProps {
    success?: boolean;
    unfulfilled?: boolean;
    warning?: boolean;
    processing?: boolean;
    fail?: boolean;
    title?: string;
    paymentStatus?: boolean;
    status?: string;
    paymentMethod?: string;
    cancel?: boolean;
    modifier?: boolean;
    style?: any;
    pending?: boolean;
}

const Label = ({
    title,
    success = false,
    unfulfilled = false,
    warning = false,
    processing = false,
    fail = false,
    paymentStatus = false,
    status,
    paymentMethod,
    cancel,
    modifier = false,
    pending = false,
    style
}: LabelProps) => {
    if (paymentMethod === 'Payment via VNPay') {
        if (!paymentStatus) {
            cancel = true;
            title = 'CANCELLED';
        } else {
            switch (status) {
                case 'PENDING':
                    pending = true;
                    title = 'PENDING';
                    break;
                case 'PROCESSING':
                    processing = true;
                    title = 'READY TO SHIP';
                    break;
                case 'SHIPPED':
                    success = true;
                    title = 'SHIPPED';
                    break;
                case 'DELIVERY':
                    success = true;
                    title = 'DELIVERED';
                    break;
                default:
                    break;
            }
        }
    } else {
        switch (status) {
            case 'PENDING':
                pending = true;
                title = 'PENDING';
                break;
            case 'PROCESSING':
                processing = true;
                title = 'READY TO SHIP';
                break;
            case 'SHIPPED':
                success = true;
                title = 'SHIPPED';
                break;
            case 'DELIVERY':
                success = true;
                title = 'DELIVERED';
                break;

            default:
                break;
        }
    }
    return (
        <div
            className={cx('label', {
                success,
                unfulfilled,
                warning,
                processing,
                fail,
                cancel,
                modifier,
                pending
            })}
        >
            <span>{title}</span>
            {success && <CheckNoCircleIcon></CheckNoCircleIcon>}
            {unfulfilled && <CheckNoCircleIcon></CheckNoCircleIcon>}
            {warning && <ErrorLabelIcon></ErrorLabelIcon>}
            {pending && <ProcessingLabelIcon></ProcessingLabelIcon>}
            {processing && <ErrorLabelIcon></ErrorLabelIcon>}
            {fail && <ErrorLabelIcon></ErrorLabelIcon>}
            {cancel && <CloseIcon width="0.7rem" height="0.7rem"></CloseIcon>}
        </div>
    );
};

export default Label;

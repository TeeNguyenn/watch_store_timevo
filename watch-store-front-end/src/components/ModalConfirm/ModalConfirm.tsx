import React, { ReactHTML } from 'react'
import classNames from 'classnames/bind'

import Button from '../Button'
import styles from './ModalConfirm.module.scss';

const cx = classNames.bind(styles);

interface ModalConfirmProps {
    title: string;
    children: any;
    handleConfirm: () => void;
    show: boolean;
    handleCloseModal: () => void;
}

const ModalConfirm = (props: ModalConfirmProps) => {
    return (
        <div className={cx('modal', { show: props.show })}>
            <div className={cx('overlay')} onClick={props.handleCloseModal}></div>
            <div className={cx('inner')}>
                <p className={cx('title')}>{props.title}</p>
                <p className={cx('desc')}>{props.children}</p>
                <div className={cx('actions')}>
                    <Button type='button' className={cx('cancel-btn')} onClick={props.handleCloseModal}>Cancel</Button>
                    <Button type='button' className={cx('confirm-btn')} onClick={() => props.handleConfirm()}>Confirm</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm
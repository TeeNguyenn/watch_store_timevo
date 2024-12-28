import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import styles from './ChangePassword.module.scss';
import { CheckIcon, ErrorIcon } from '../../components/Icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import config from '../../config';
import * as authServices from '../../services/authServices';
import UserLoginDTO from '../../dtos/UserLoginDTO';
import PreLoader from '../../components/PreLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import Image from '../../components/Image';
import images from '../../assets/images';
import PageNotFound from '../PageNotFound';
import * as userServices from '../../services/userServices';
import { notifyError, notifySuccess } from '../../utils/Functions';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

const ChangePassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const currentUser = localStorage.getItem('user_id');
    const { email } = useParams();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .min(8, 'Your password must be at least 8 characters.')
                .required('You must fill in this section.')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Password needs 8+ characters, uppercase, lowercase, number, special character.'
                ),
            password: Yup.string()
                .min(8, 'Your password must be at least 8 characters.')
                .required('You must fill in this section.')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Password needs 8+ characters, uppercase, lowercase, number, special character.'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Password does not match.')
                .required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            const fetchApi = async () => {
                setLoading(true);
                const res = await userServices.changePassword({
                    email,
                    old_password: values.oldPassword,
                    password: values.password,
                    retype_password: values.confirmPassword,
                });

                if (res.status === 'OK') {
                    setLoading(false);
                    formik.resetForm();
                    setTimeout(() => {
                        notifySuccess(res.message);
                    }, 0);
                } else {
                    setLoading(false);
                    formik.resetForm();
                    setTimeout(() => {
                        notifyError('Password change failed');
                    }, 0);
                }
            };

            fetchApi();
        },
    });

    if (!currentUser) {
        return <PageNotFound />;
    }

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <form className={cx('form')} onSubmit={formik.handleSubmit}>
            <div className={cx('form__heading')}>
                <h1 className={cx('form__title')}>👋 Change Password !</h1>
            </div>
            {/*Old Password */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid:
                            !formik.errors.oldPassword &&
                            formik.touched.oldPassword,
                    })}
                ></CheckIcon>
                <label htmlFor="oldPassword" className={cx('form__label')}>
                    Current Password
                </label>
                <input
                    value={formik.values.oldPassword}
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    // placeholder={'Current password'}
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.oldPassword && formik.touched.oldPassword && (
                    <div className={cx('form__error')}>
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.oldPassword}
                        </span>
                    </div>
                )}
            </div>
            {/* Password */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid:
                            !formik.errors.password && formik.touched.password,
                    })}
                ></CheckIcon>
                <label htmlFor="oldPassword" className={cx('form__label')}>
                    New Password
                </label>
                <input
                    value={formik.values.password}
                    type="password"
                    name="password"
                    id="password"
                    // placeholder={'New password'}
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                    <div className={cx('form__error')}>
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.password}
                        </span>
                    </div>
                )}
            </div>
            {/* Confirm password */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid:
                            !formik.errors.confirmPassword &&
                            formik.touched.confirmPassword,
                    })}
                ></CheckIcon>
                <label htmlFor="oldPassword" className={cx('form__label')}>
                    Confirm Password
                </label>
                <input
                    value={formik.values.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    // placeholder={'Confirm password'}
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                        <div className={cx('form__error')}>
                            <ErrorIcon
                                width="1.5rem"
                                height="1.5rem"
                            ></ErrorIcon>
                            <span className={cx('form__error-title')}>
                                {formik.errors.confirmPassword}
                            </span>
                        </div>
                    )}
            </div>
            <Button
                type="submit"
                rounded
                primary
                className={cx('form__submit-btn')}
            >
                Submit
            </Button>
        </form>
    );
};

export default ChangePassword;

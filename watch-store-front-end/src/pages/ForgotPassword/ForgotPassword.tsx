import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Button from '../../components/Button';
import { CheckIcon, ErrorIcon } from '../../components/Icons';
import styles from './ForgotPassword.module.scss';
import config from '../../config';
import * as authServices from '../../services/authServices';
import * as userServices from '../../services/userServices';
import { notifyError, notifySuccess } from '../../utils/Functions';
import PreLoader from '../../components/PreLoader';

const cx = classNames.bind(styles);

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.'),
            // .test(
            //     'checkEmailExists',
            //     'This email is not in use. Please re-enter your email.',
            //     async (value) => {
            //         if (!value) return true;
            //         const res = await authServices.checkExistEmail(value);
            //         return res; // res trả về true nếu email đã được sử dụng, false nếu chưa được sử dụng => để hiển thị lỗi
            //     }
            // ),
        }),
        onSubmit: (values) => {
            setLoading(true);
            const fetchApi = async () => {
                const res = await authServices.checkExistEmail(values.email);
                if (res) {
                    const res = await userServices.generateOTP(values.email);
                    if (res.status === 'OK') {
                        navigate(`/forgot-password/otp/${values.email}`);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setTimeout(() => {
                            notifyError(res.errorMessage);
                        }, 100);
                    }
                } else {
                    // formik.resetForm();
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                    setTimeout(() => {
                        notifyError(
                            'This email is not in use. Please re-enter your email.'
                        );
                    }, 300);
                }
            };
            fetchApi();
        },
    });

    const handleCancel = () => {
        navigate(config.routes.login);
    };

    if (loading) {
        return <PreLoader show />;
    }

    return (
        <div className={cx('forgot-password')}>
            <form className={cx('form')} onSubmit={formik.handleSubmit}>
                <div className={cx('form__heading')}>
                    <h1 className={cx('form__title', 'forgot-password__title')}>
                        Reset your password
                    </h1>
                    <p className={cx('form__desc')}>
                        We will send you an email to reset your password
                    </p>
                </div>
                {/* Email */}
                <div className={cx('form__group')}>
                    <CheckIcon
                        className={cx('form__icon', {
                            valid: !formik.errors.email && formik.touched.email,
                        })}
                    ></CheckIcon>
                    <input
                        value={formik.values.email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder={'Email'}
                        className={cx('form__input')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className={cx('form__error')}>
                            <ErrorIcon
                                width="1.5rem"
                                height="1.5rem"
                            ></ErrorIcon>
                            <span className={cx('form__error-title')}>
                                {formik.errors.email}
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
                <div>
                    <Button
                        to={config.routes.login}
                        className={cx('forgot-password__cancel-btn', {
                            'primary-hover': true,
                        })}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;

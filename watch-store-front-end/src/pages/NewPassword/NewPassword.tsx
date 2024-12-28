import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import styles from './NewPassword.module.scss';
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
import * as userServices from '../../services/userServices';
import { notifyError, notifySuccess } from '../../utils/Functions';
import { ToastContainer } from 'react-toastify';
import PageNotFound from '../PageNotFound';

const cx = classNames.bind(styles);

//api generate otp gọi lẻ gửi mail, gọi chẵn xóa
//api check otp cùng một otp (otp đúng nha) chỉ call đc 1 lần, gọi lần nữa bug :))

const NewPassword = () => {
    const navigate = useNavigate();
    const { email, otp } = useParams();
    // const [isVerify, setIsVerify] = useState(false);

    const otpLocal = localStorage.getItem('otpLocal'); //temp
    const [loading, setLoading] = useState(false); // temp default true

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
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
                const res = await userServices.forgotPassword({
                    email,
                    password: values.password,
                    retype_password: values.confirmPassword,
                });

                if (res.status === 'OK') {
                    formik.resetForm();
                    setLoading(false);
                    setTimeout(() => {
                        notifySuccess(
                            'Your password has been successfully reset.'
                        );
                        localStorage.removeItem('otpLocal'); //temp
                    }, 100);
                    setTimeout(() => {
                        navigate(config.routes.login);
                    }, 3000);
                } else {
                    setLoading(false);
                    setTimeout(() => {
                        notifyError(res.errorMessage);
                    }, 100);
                }
            };

            // if (isVerify) {
            //     fetchApi();
            // }
            fetchApi();
        },
    });

    //Ngan user nhap url de doi pass
    //Bật strict mode nên component render 2 lần logic k xìa đc :((
    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const res = await userServices.checkOTP(email + '', otp + '');

    //         // remove otp
    //         const resData = await userServices.generateOTP(email + '');  // strict mode call 2 lan

    //         if (res.status === "OK") {
    //             setIsVerify(true);
    //         }
    //         setLoading(false);
    //     }
    // }, [])
    // if (!otp || !email || !isVerify) {
    //     return <PageNotFound />
    // }

    if (!otp || !email || otp !== otpLocal || !otpLocal) {
        return <PageNotFound />;
    }

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <form className={cx('form')} onSubmit={formik.handleSubmit}>
            <div className={cx('form__heading')}>
                <h1 className={cx('form__title')}>👋 New Password !</h1>
            </div>
            {/* Password */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid:
                            !formik.errors.password && formik.touched.password,
                    })}
                ></CheckIcon>
                <input
                    value={formik.values.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder={'New password'}
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
                <input
                    value={formik.values.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={'Confirm password'}
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

export default NewPassword;

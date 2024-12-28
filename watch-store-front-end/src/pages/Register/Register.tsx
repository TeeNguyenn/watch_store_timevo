import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import styles from './Register.module.scss';
import { CheckIcon, ErrorIcon } from '../../components/Icons';
import * as authServices from '../../services/authServices';
import UserDTO from '../../dtos/UserDTO';
import { useDebounce } from '../../hooks';

const cx = classNames.bind(styles);

const Register = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(40, 'Your first name must be under 40 characters.')
                .required('You must fill in this section.'),
            lastName: Yup.string().max(
                40,
                'Your last name must be under 40 characters.'
            ),
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.')
                .test(
                    'checkEmailExists',
                    'Email already existed.',
                    async (value) => {
                        if (!value) return true;
                        const res = await authServices.checkExistEmail(value);
                        return !res; // res trả về true nếu email đã được sử dụng, phủ định res thành false để hiển thị lỗi
                    }
                ),
            phoneNumber: Yup.string()
                .matches(/^0\d{9}$/, 'Phone number is invalid.')
                .required('You must fill in this section.'),
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
            const data: UserDTO = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                phone_number: values.phoneNumber,
                password: values.password,
                retype_password: values.confirmPassword,
                role_ids: [2], //temp
            };
            const fetchApi = async () => {
                const res = await authServices.register(data);
                if (res) {
                    navigate('/account-status');
                }
            };
            fetchApi();
        },
    });

    return (
        <form className={cx('form')} onSubmit={formik.handleSubmit}>
            <div className={cx('form__heading')}>
                <h1 className={cx('form__title')}>
                    👋 Sign Up for a Stylish Journey
                </h1>
                <p className={cx('form__desc')}>
                    Already have an account?
                    <Link
                        to={'/login'}
                        className={cx('form__desc-link', {
                            'primary-hover': true,
                        })}
                    >
                        Sign in
                    </Link>
                </p>
            </div>
            {/* First name */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid:
                            !formik.errors.firstName &&
                            formik.touched.firstName,
                    })}
                ></CheckIcon>
                <input
                    value={formik.values.firstName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder={'First name'}
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                    <div className={cx('form__error')}>
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.firstName}
                        </span>
                    </div>
                )}
            </div>

            {/* Last name */}
            <div className={cx('form__group')}>
                <input
                    value={formik.values.lastName}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder={'Last name'}
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                    <div className={cx('form__error')}>
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.lastName}
                        </span>
                    </div>
                )}
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
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.email}
                        </span>
                    </div>
                )}
            </div>
            {/* Phone number */}
            <div className={cx('form__group')}>
                <CheckIcon
                    className={cx('form__icon', {
                        valid:
                            !formik.errors.phoneNumber &&
                            formik.touched.phoneNumber,
                    })}
                ></CheckIcon>
                <input
                    value={formik.values.phoneNumber + ''}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone number"
                    className={cx('form__input')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                    <div className={cx('form__error')}>
                        <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                        <span className={cx('form__error-title')}>
                            {formik.errors.phoneNumber}
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
                <input
                    value={formik.values.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder={'Password'}
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
                Create
            </Button>
        </form>
    );
};

export default Register;

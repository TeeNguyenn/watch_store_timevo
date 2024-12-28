import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../../components/Button';
import styles from './LoginModal.module.scss';
import { CheckIcon, CloseIcon, ErrorIcon } from '../../../components/Icons';
import AccountForm from '../../../components/AccountForm';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';
import * as authServices from '../../../services/authServices';
import PreLoader from '../../../components/PreLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import Image from '../../../components/Image';
import images from '../../../assets/images';
import { notifyError, notifySuccess } from '../../../utils/Functions';

const cx = classNames.bind(styles);

interface LoginModalProps {
    handleCloseLoginModal: () => void;
}

const LoginModal = ({ handleCloseLoginModal }: LoginModalProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const links = [
        {
            to: config.routes.forgotPassword,
            name: 'Forgot your password?',
        },
        {
            to: config.routes.register,
            name: 'Sign Up',
        },
    ];

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.'),
            password: Yup.string()
                .min(8, 'Your password must be at least 8 characters.')
                .required('You must fill in this section.')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Password needs 8+ characters, uppercase, lowercase, number, special character.'
                ),
        }),
        onSubmit: (values) => {
            const fetchApi = async () => {
                setLoading(true);
                const res = await authServices.login({
                    email: values.email,
                    password: values.password,
                });
                if (!res.token) {
                    setError(true);
                    setLoading(false);
                    setTimeout(() => {
                        notifyError('Login failed.', 2000);
                    }, 0);
                    return;
                } else {
                    localStorage.removeItem('wishlist');
                    handleCloseLoginModal();
                    setTimeout(() => {
                        notifySuccess('Login successful.', 2000);
                    }, 0);
                }
            };
            fetchApi();
        },
    });

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        formik.handleChange(e);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        formik.handleChange(e);
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('login-modal')}>
            <div className={cx('login-modal__inner')}>
                <Button
                    className={cx('login-modal__close-btn')}
                    onClick={handleCloseLoginModal}
                >
                    <CloseIcon width="1.4rem" height="1.4rem"></CloseIcon>
                </Button>

                <form
                    className={cx('form', 'login-modal__form')}
                    onSubmit={formik.handleSubmit}
                >
                    <div className={cx('form__heading')}>
                        <h1 className={cx('form__title')}>
                            👋 Step into Style !
                        </h1>
                        <p className={cx('form__desc')}>
                            Aliquam vestibulum mauris eu velit imperdiet
                            venenatis. Clasent taciti sociosqu ad litora
                            torquent per conubia nostra
                        </p>
                    </div>
                    {/* Email */}
                    <div className={cx('form__group')}>
                        <CheckIcon
                            className={cx('form__icon', {
                                valid:
                                    !formik.errors.email &&
                                    formik.touched.email,
                            })}
                        ></CheckIcon>
                        <input
                            value={formik.values.email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder={'Email'}
                            className={cx('form__input')}
                            onChange={handleChangeEmail}
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
                    {/* Password */}
                    <div className={cx('form__group')}>
                        <CheckIcon
                            className={cx('form__icon', {
                                valid:
                                    !formik.errors.password &&
                                    formik.touched.password,
                            })}
                        ></CheckIcon>
                        <input
                            value={formik.values.password}
                            type="password"
                            name="password"
                            id="password"
                            placeholder={'Password'}
                            className={cx('form__input')}
                            onChange={handleChangePassword}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <div className={cx('form__error')}>
                                <ErrorIcon
                                    width="1.5rem"
                                    height="1.5rem"
                                ></ErrorIcon>
                                <span className={cx('form__error-title')}>
                                    {formik.errors.password}
                                </span>
                            </div>
                        )}
                        {error && (
                            <div className={cx('form__error')}>
                                <ErrorIcon
                                    width="1.5rem"
                                    height="1.5rem"
                                ></ErrorIcon>
                                <span className={cx('form__error-title')}>
                                    Wrong email or password. Please try again.
                                </span>
                            </div>
                        )}
                    </div>
                    {links && (
                        <div className={cx('form__links')}>
                            {links.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.to}
                                    onClick={handleCloseLoginModal}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                    <Button
                        type="submit"
                        rounded
                        primary
                        className={cx('form__submit-btn')}
                    >
                        Sign in
                    </Button>
                    <div className={cx('form__others')}>
                        <span className={cx('form__separate')}></span>
                        <span className={cx('form__text')}>OR</span>
                        <span className={cx('form__separate')}></span>
                    </div>
                    <div className={cx('form__bottom')}>
                        <Button
                            className={cx('form__btn')}
                            type="button"
                            leftIcon={
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    style={{ color: '#084ca3' }}
                                />
                            }
                        >
                            Facebook
                        </Button>
                        <Button
                            className={cx('form__btn')}
                            type="button"
                            leftIcon={<Image src={images.logoGoogle}></Image>}
                        >
                            Google
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;

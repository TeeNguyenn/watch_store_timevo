import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '../../components/Button';
import styles from './AdminNewCustomer.module.scss';
import Image from '../../components/Image';
import images from '../../assets/images';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import Navbar from '../Dashboard/components/navbar';
import { useEffect, useState } from 'react';
import * as authServices from '../../services/authServices';
import UserDTO from '../../dtos/UserDTO';
import { ErrorIcon } from '../../components/Icons';
import { ToastContainer, toast } from 'react-toastify';
import PreLoader from '../../components/PreLoader';
import { useParams } from 'react-router-dom';
import UserModel from '../../models/UserModel';
import * as userServices from '../../services/userServices';
import { notifyError, notifySuccess } from '../../utils/Functions';

// component use for new & edit customer


const cx = classNames.bind(styles);

const AdminNewCustomer = () => {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('')


    // Get customerId from url
    const { customerId } = useParams();

    let customerIdNumber = 0;
    try {
        customerIdNumber = parseInt(customerId + '');
        if (Number.isNaN(customerIdNumber)) {
            customerIdNumber = 0;
        }
    } catch (error) {
        customerIdNumber = 0;
        console.log('Error:', error);
    }

    // get all users
    useEffect(() => {
        if (customerIdNumber) {
            const fetchApi = async () => {
                setLoading(true);
                const responseData = await userServices.getAllUser();

                responseData.result.forEach(userItem => {
                    if (customerIdNumber === userItem.userId) {
                        formik.setValues({
                            firstName: userItem.firstName,
                            lastName: userItem.lastName,
                            email: userItem.email,
                            phoneNumber: userItem.phoneNumber,
                            password: 'Tee080503@', //temp
                            country: '',
                            address: userItem?.address || '',
                        })
                        setAvatar(userItem.avatar || '');
                        setLoading(false);
                        return;
                    }
                });
            };

            fetchApi();
        }

    }, [customerIdNumber]);


    const notifyNewCustomerSuccess = () => {
        toast.success('Account registered! Check email to activate.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }; //error payment chua hien thong bao


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            country: '',
            address: '',
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
                        if (customerIdNumber) return true;
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
            // country: Yup.string()
            //     .max(20, 'Your first name must be under 20 characters.')
            //     .required('You must fill in this section.'),
            // address: Yup.string()
            //     .max(40, 'Your first name must be under 40 characters.')
            //     .required('You must fill in this section.'),
        }),
        onSubmit: (values) => {

            const data: UserDTO = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                phone_number: values.phoneNumber,
                password: values.password,
                retype_password: values.password,
                role_ids: [2], //temp
            };
            if (customerIdNumber) {

                const data: any = {
                    userId: customerIdNumber + '',
                    infos: {
                        first_name: values.firstName,
                        last_name: values.lastName,
                        phone_number: values.phoneNumber,
                        address: values.address,
                        email: values.email
                    }
                };
                const fetchApi = async () => {
                    setLoading(true);

                    // Tạo form data và thêm file
                    const formData = new FormData();
                    formData.append("file", file);

                    if (file) {
                        const resData = await userServices.putAvatarUser(customerIdNumber + '', formData);

                        if (resData.errorMessage) {

                            setTimeout(() => {
                                setLoading(false);
                            }, 200);
                            setTimeout(() => {
                                notifyError(resData.errorMessage)
                            }, 300);
                            return;
                        }
                    }

                    const res = await userServices.putUser(data);

                    if (res.status !== 'OK') {
                        setTimeout(() => {
                            setLoading(false);
                        }, 200);
                        setTimeout(() => {
                            notifyError('An error occurred.')
                        }, 300);
                        return;
                    }

                    setLoading(false);
                    setTimeout(() => {
                        notifySuccess('Change user information successfully');
                    }, 100);
                }

                fetchApi();
            } else {
                const fetchApi = async () => {
                    setLoading(true);
                    const res = await authServices.register(data);
                    if (res) {
                        formik.resetForm();
                        setLoading(false);
                        setTimeout(() => {
                            notifyNewCustomerSuccess();
                        }, 100);
                    }
                };
                fetchApi();
            }
        },
    });

    if (loading) {
        return <PreLoader show></PreLoader>;
    }


    return (

        <div className={cx('new')}>
            <ToastContainer />
            <div className={cx('new__top')}>
                <h1 className={cx('new__title')}>{!customerIdNumber ? 'Add New User' : 'Edit User'}</h1>
            </div>
            <div className={cx('new__bottom')}>
                <div className={cx('new__left', { 'd-none': !customerIdNumber })}>
                    <Image
                        src={
                            file ? URL.createObjectURL(file) : avatar ? avatar : images.defaultAvatar
                        }
                        alt="avatar"
                        className={cx('new__avatar')}
                    ></Image>
                </div>
                <div className={cx('new__right')}>
                    <form action="" className={cx('form')} onSubmit={formik.handleSubmit}>
                        <div className={cx('form__input', { 'd-none': !customerIdNumber })}>
                            <label htmlFor="file">
                                Image:{' '}
                                <DriveFolderUploadOutlined
                                    className={cx('form__icon')}
                                />
                            </label>
                            <input
                                type="file"
                                id="file"
                                accept="image/jpeg, image/png, image/gif, image/bmp"
                                style={{
                                    display: 'none',
                                }}
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setFile(e.target.files[0])
                                    }
                                }
                                }
                            />
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="firstName">First name</label>
                            <input
                                value={formik.values.firstName}
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your first name"
                            />
                            {formik.errors.firstName && formik.touched.firstName && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.4rem" height="1.4rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.firstName}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input', { 'd-none': true })}>
                            <label htmlFor="country">Country</label>
                            <input
                                value={formik.values.country}
                                type="text"
                                name="country"
                                id="country"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your country"
                            />
                            {formik.errors.country && formik.touched.country && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.4rem" height="1.4rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.country}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input')}>
                            <label htmlFor="lastName">Last name</label>
                            <input
                                value={formik.values.lastName}
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={formik.handleChange}
                                placeholder="Enter your last name"
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
                        <div className={cx('form__input')}>
                            <label htmlFor="phoneNumber">Phone</label>
                            <input
                                value={formik.values.phoneNumber + ''}
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your phone number"
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
                        <div className={cx('form__input')}>
                            <label htmlFor="email">Email</label>
                            <input
                                value={formik.values.email}
                                type="email"
                                name="email"
                                id="email"
                                disabled={!!customerIdNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your email"
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
                        <div className={cx('form__input')}>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={formik.values.address}
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your address"
                            />
                            {formik.errors.address && formik.touched.address && (
                                <div className={cx('form__error')}>
                                    <ErrorIcon width="1.5rem" height="1.5rem"></ErrorIcon>
                                    <span className={cx('form__error-title')}>
                                        {formik.errors.address}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={cx('form__input', { 'd-none': customerIdNumber })}>
                            <label htmlFor="password">Password</label>
                            <input
                                value={formik.values.password}
                                type="password"
                                name="password"
                                id="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your password"
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
                        <Button
                            primary
                            type="submit"
                            className={cx('form__btn')}
                        >
                            {customerIdNumber ? 'Change' : 'Send'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default AdminNewCustomer;

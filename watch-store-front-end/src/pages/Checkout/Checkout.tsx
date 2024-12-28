import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Tippy from '@tippyjs/react/headless';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../../components/Button';
import styles from './Checkout.module.scss';
import config from '../../config';
import Image from '../../components/Image';
import images from '../../assets/images';
import checkoutImages from '../../assets/images/checkout';
import {
    CartIcon,
    CheckIcon,
    CheckNoCircleIcon,
    ErrorIcon,
} from '../../components/Icons';
import Checkbox from '../../components/Checkbox';
import * as cartItemServices from '../../services/cartItemServices';
import * as productServices from '../../services/productServices';
import ProductModel from '../../models/ProductModel';
import PreLoader from '../../components/PreLoader';
import { convertToVND, formatPrice } from '../../utils/Functions';
import * as paymentMethodServices from '.././../services/paymentMethodServices';
import PaymentMethodModel from '../../models/PaymentMethodModel';
import * as orderServices from '../../services/orderServices';
import OrderDTO from '../../dtos/OrderDTO';
import * as shippingMethodServices from '../../services/shippingMethodServices';
import ShippingMethodModel from '../../models/ShippingMethodModel';
import icons from '../../assets/icons';
import PageNotFound from '../PageNotFound';
import * as paymentServices from '../../services/paymentServices';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';

const cx = classNames.bind(styles);

const Checkout = () => {
    const [checkRadio, setCheckRadio] = useState(2);
    const [provinceList, setProvinceList] = useState<any[]>([]);
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [communeList, setCommuneList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const refProvinceSelect = React.useRef<HTMLSelectElement>(null);
    const refDistrictSelect = React.useRef<HTMLSelectElement>(null);
    const currentUser = localStorage.getItem('user_id');

    const [productList, setProductList] = useState<ProductModel[]>([]);
    const [paymentMethodList, setPaymentMethodList] = useState<
        PaymentMethodModel[]
    >([]);
    const [shippingMethodList, setShippingMethodList] = useState<
        ShippingMethodModel[]
    >([]);

    const checkoutCart = JSON.parse(localStorage.getItem('products') + '');


    const navigate = useNavigate();
    const [showSelectShippingMethod, setShowSelectShippingMethod] =
        useState(false);
    const [activeShippingMethod, setActiveShippingMethod] = useState<any>(1);
    const [tempShippingMethod, setTempShippingMethod] = useState<any>(1);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const responseCode = queryParams.get('vnp_ResponseCode');
    const orderId = queryParams.get('order_Id');
    const [notFound, setNotFound] = useState(false);

    const notifyPaymentFailure = () => {
        toast.error('Payment order failed!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }; //error payment chua hien thong bao

    useEffect(() => {
        if (responseCode) {
            setLoading(true);
            const currentOrderId = localStorage.getItem('orderId');

            const fetchApi = async () => {
                const res = await orderServices.getOrderByOrderId(orderId + '');

                // Truong hop order chua thanh toan va nguoi dung gia mao url
                if (res.payment_status !== true) {
                    setTimeout(() => {
                        setLoading(false);
                        notifyPaymentFailure();
                        return;
                    }, 200);
                } else {
                    navigate(config.routes.orderSuccessful);
                    setTimeout(() => {
                        setLoading(false);
                    }, 200);
                }
            };

            if (responseCode !== '00') {
                // run 2 lan do bat che do strict mode, moi truong production khong bi
                setTimeout(() => {
                    setLoading(false);
                    notifyPaymentFailure();
                }, 200);
            } else if (responseCode === '00' && orderId !== currentOrderId) {
                // Truong hop nguoi dung su dung orderId cua order truoc de thanh toan order hien tai
                setNotFound(true);
            } else if (responseCode === '00' && orderId === currentOrderId) {
                fetchApi();
            }
        }
    }, [responseCode, orderId]);

    useEffect(() => {
        if (currentUser && checkoutCart) {
            setLoading(true);
            let result: ProductModel[] = [];
            const fetchApi = async (cartItem: any) => {
                const res = await productServices.getProductById(
                    cartItem.product_id
                );

                result.push(res);

                if (result.length === checkoutCart.length) {
                    setProductList(result);
                    let totalTemp = 0;
                    result.forEach((productItem, index) => {
                        if (productItem.discount) {
                            totalTemp =
                                totalTemp +
                                checkoutCart.at(index).quantity *
                                productItem.price *
                                (1 - productItem.discount / 100);
                        } else {
                            totalTemp =
                                checkoutCart.at(index).quantity * productItem.price;
                        }
                    });
                    setTotal(totalTemp);

                    setLoading(false);
                    return;
                }
            };

            const getCheckoutCart = async (checkoutCart: any) => {
                for await (const item of checkoutCart) {
                    await fetchApi(item);

                }
            };

            getCheckoutCart(checkoutCart);
            // checkoutCart.forEach((item: any, index: number) => {
            //     setTimeout(() => {
            //         fetchApi(item);
            //     }, index * 500);
            // });
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await paymentMethodServices.getAllPaymentMethod();
            const resData = await shippingMethodServices.getAllShippingMethod();
            setPaymentMethodList(res);
            setShippingMethodList(resData);
            setActiveShippingMethod(resData.at(0)?.shippingMethodId);
            setTempShippingMethod(resData.at(0)?.shippingMethodId);
        };

        fetchApi();
    }, []);

    //call api address
    useEffect(() => {
        axios
            .get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => {
                setProvinceList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChangeProvince = (event: any) => {
        // Call api district
        axios
            .get(
                `https://esgoo.net/api-tinhthanh/2/${refProvinceSelect.current?.value}.htm`
            )
            .then((response) => {
                setDistrictList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        formik.handleChange(event);
    };

    const handleChangeDistrict = (event: any) => {
        // Call api commune
        axios
            .get(
                `https://esgoo.net/api-tinhthanh/3/${refDistrictSelect.current?.value}.htm`
            )
            .then((response) => {
                setCommuneList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        formik.handleChange(event);
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            telephone: '',
            email: '',
            province_city: '',
            district: '',
            commune: '',
            payment: 'Cash on delivery',
            apartment: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('You must fill in this section.'),
            telephone: Yup.string()
                .matches(/^0\d{9}$/, 'Phone number is invalid.')
                .required('You must fill in this section.'),
            email: Yup.string()
                .email('Invalid email.')
                .required('You must fill in this section.'),
            province_city: Yup.string().required(
                'You must fill in this section.'
            ),
            district: Yup.string().required('You must fill in this section.'),
            commune: Yup.string().required('You must fill in this section.'),
            payment: Yup.string().required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            //call api
            // console.log(values);

            // Get Province/City name
            const province: any = provinceList.filter(
                (item) => item.id === values.province_city
            );
            // console.log(province[0].full_name);

            // Get district name
            const district: any = districtList.filter(
                (item) => item.id === values.district
            );
            // console.log(district[0].full_name);

            // Get commune name
            const commune: any = communeList.filter(
                (item) => item.id === values.commune
            );
            // console.log(commune[0].full_name);

            const paymentMethodId = paymentMethodList.filter(
                (item) => item.name === values.payment
            );

            const totalMoney = shippingMethodList.map(
                (item) =>
                    item.shippingMethodId === activeShippingMethod &&
                    (item?.cost ? item?.cost + total : total)
            );

            const data = {
                user_id: Number.parseInt(currentUser + ''),
                first_name: values.fullName,
                last_name: '',
                email: values.email,
                phone_number: values.telephone,
                address: values.apartment
                    ? `${values.apartment}, ${commune[0].full_name}, ${district[0].full_name}, ${province[0].full_name}`
                    : `${commune[0].full_name}, ${district[0].full_name}, ${province[0].full_name}`,
                note: '',
                total_money: Number.parseFloat(totalMoney.at(0) + ''),
                sub_total: total,
                shipping_method_id: activeShippingMethod,
                payment_method_id: Number.parseInt(
                    paymentMethodId.at(0)?.paymentMethodId + ''
                ),
                payment_status: false,
                shipping_address: values.apartment
                    ? `${values.apartment}, ${commune[0].full_name}, ${district[0].full_name}, ${province[0].full_name}`
                    : `${commune[0].full_name}, ${district[0].full_name}, ${province[0].full_name}`,
                cart_items: checkoutCart,
            };

            // Checkout for COD
            if (paymentMethodId.at(0)?.paymentMethodId + '' === '2') {
                const fetchApi = async () => {
                    // setLoading(true);

                    const res = await orderServices.postOrder(data);

                    if (res.message === 'Insert Successfully') {
                        setTimeout(() => {
                            localStorage.setItem('orderId', res.data.id);
                            navigate(config.routes.orderSuccessful);
                        }, 200);
                    } else {
                        console.log('Error!');
                        setLoading(false);
                    }
                };
                fetchApi();
            } else {
                //VPN PAY

                // console.log(totalMoney);

                const fetchApi = async () => {
                    const res = await orderServices.postOrder(data);

                    if (res.message === 'Insert Successfully') {
                        localStorage.setItem('orderId', res.data.id);
                    } else {
                        console.log('Error!');
                        setLoading(false);
                    }

                    const response = await paymentServices.getPaymentViaVNPAY(
                        convertToVND(Number.parseFloat(totalMoney.at(0) + '')),
                        'NCB',
                        res.data.id
                    );

                    // Redirect to vnpay
                    if (response.status === 'Ok') {
                        window.location.href = response.url;

                        // window.open(response.url, '_blank');
                    }
                };
                fetchApi();
            }
        },
    });

    const handleShippingMethod = () => {
        document.body.classList.add('hide-scroll');
        setShowSelectShippingMethod(true);
    };

    const handleCloseShippingMethod = () => {
        document.body.classList.remove('hide-scroll');
        setShowSelectShippingMethod(false);
        setTempShippingMethod(activeShippingMethod);
    };

    const handleConfirm = () => {
        document.body.classList.remove('hide-scroll');
        setShowSelectShippingMethod(false);
        setActiveShippingMethod(tempShippingMethod);
    };

    if (!checkoutCart || checkoutCart.length === 0 || notFound) {
        return <PageNotFound></PageNotFound>;
    }
    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('checkout')}>
            <header className={cx('banner')}>
                <div className={cx('banner__inner')}>
                    <Link
                        to={config.routes.home}
                        className={cx('banner__logo-link')}
                    >
                        <Image
                            src={images.logo}
                            alt="Logo"
                            className={cx('banner__logo')}
                        ></Image>
                    </Link>
                    <Link
                        to={config.routes.cart}
                        className={cx('banner__cart', {
                            'primary-hover': true,
                        })}
                    >
                        <CartIcon width="2.4rem" height="2.4rem"></CartIcon>
                    </Link>
                </div>
            </header>
            <div className={cx('checkout__inner')}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={cx('checkout__row', { row: true })}>
                        {/* Info */}
                        <div
                            className={cx('', {
                                col: true,
                                'col-7': true,
                                'col-lg-12': true,
                            })}
                        >
                            <div className={cx('checkout__info')}>
                                <div className={cx('checkout__info-inner')}>
                                    <main className={cx('checkout__main')}>
                                        {/* Contact */}
                                        <div
                                            className={cx('checkout__contact')}
                                        >
                                            <div
                                                className={cx(
                                                    'checkout__contact-row'
                                                )}
                                            >
                                                <h2
                                                    className={cx(
                                                        'checkout__title'
                                                    )}
                                                >
                                                    Contact
                                                </h2>
                                                <Link
                                                    to={config.routes.login}
                                                    className={cx(
                                                        'checkout__login-link',
                                                        {
                                                            'd-none':
                                                                currentUser,
                                                        }
                                                    )}
                                                >
                                                    Log in
                                                </Link>
                                            </div>

                                            <div
                                                className={cx(
                                                    'checkout__field'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'checkout__group'
                                                    )}
                                                >
                                                    <input
                                                        value={
                                                            formik.values
                                                                .fullName
                                                        }
                                                        type="text"
                                                        className={cx(
                                                            'checkout__input'
                                                        )}
                                                        id="fullName"
                                                        name="fullName"
                                                        placeholder=""
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="fullName"
                                                        className={cx(
                                                            'checkout__label'
                                                        )}
                                                    >
                                                        Full name
                                                    </label>
                                                    {formik.errors.fullName &&
                                                        formik.touched
                                                            .fullName && (
                                                            <div
                                                                className={cx(
                                                                    'checkout__error-mess'
                                                                )}
                                                            >
                                                                <ErrorIcon
                                                                    width="1.5rem"
                                                                    height="1.5rem"
                                                                ></ErrorIcon>
                                                                <span
                                                                    className={cx(
                                                                        ''
                                                                    )}
                                                                >
                                                                    {
                                                                        formik
                                                                            .errors
                                                                            .fullName
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
                                                <div
                                                    className={cx(
                                                        'checkout__group'
                                                    )}
                                                >
                                                    <input
                                                        value={
                                                            formik.values
                                                                .telephone + ''
                                                        }
                                                        type="text"
                                                        className={cx(
                                                            'checkout__input'
                                                        )}
                                                        id="telephone"
                                                        name="telephone"
                                                        placeholder=""
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="telephone"
                                                        className={cx(
                                                            'checkout__label'
                                                        )}
                                                    >
                                                        Mobile phone number
                                                    </label>
                                                    {formik.errors.telephone &&
                                                        formik.touched
                                                            .telephone && (
                                                            <div
                                                                className={cx(
                                                                    'checkout__error-mess'
                                                                )}
                                                            >
                                                                <ErrorIcon
                                                                    width="1.5rem"
                                                                    height="1.5rem"
                                                                ></ErrorIcon>
                                                                <span
                                                                    className={cx(
                                                                        ''
                                                                    )}
                                                                >
                                                                    {
                                                                        formik
                                                                            .errors
                                                                            .telephone
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <input
                                                    value={formik.values.email}
                                                    type="email"
                                                    className={cx(
                                                        'checkout__input'
                                                    )}
                                                    id="email"
                                                    name="email"
                                                    placeholder=""
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className={cx(
                                                        'checkout__label'
                                                    )}
                                                >
                                                    Email
                                                </label>
                                                {formik.errors.email &&
                                                    formik.touched.email && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .email
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                        {/* Delivery */}
                                        <div
                                            className={cx('checkout__delivery')}
                                        >
                                            <h2
                                                className={cx(
                                                    'checkout__title'
                                                )}
                                            >
                                                Delivery
                                            </h2>
                                            {/* Country */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    name="country"
                                                    id="country"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                >
                                                    <option value="">
                                                        Country/Region
                                                    </option>
                                                    <option value="VN" selected>
                                                        Vietnam
                                                    </option>
                                                </select>
                                            </div>
                                            {/* Province/City */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    ref={refProvinceSelect}
                                                    value={
                                                        formik.values
                                                            .province_city
                                                    }
                                                    name="province_city"
                                                    id="province_city"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                    onChange={
                                                        handleChangeProvince
                                                    }
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value="">
                                                        Province/City
                                                    </option>
                                                    {provinceList.map(
                                                        (province) => (
                                                            <option
                                                                key={
                                                                    province.id
                                                                }
                                                                value={
                                                                    province.id
                                                                }
                                                            >
                                                                {
                                                                    province.full_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {formik.errors.province_city &&
                                                    formik.touched
                                                        .province_city && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .province_city
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                            {/* district */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    ref={refDistrictSelect}
                                                    value={
                                                        formik.values.district
                                                    }
                                                    name="district"
                                                    id="district"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                    onChange={
                                                        handleChangeDistrict
                                                    }
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value="">
                                                        District
                                                    </option>
                                                    {districtList.map(
                                                        (district) => (
                                                            <option
                                                                key={
                                                                    district.id
                                                                }
                                                                value={
                                                                    district.id
                                                                }
                                                            >
                                                                {
                                                                    district.full_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {formik.errors.district &&
                                                    formik.touched.district && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .district
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                            {/* commune */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <select
                                                    value={
                                                        formik.values.commune
                                                    }
                                                    name="commune"
                                                    id="commune"
                                                    className={cx(
                                                        'checkout__select'
                                                    )}
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    onBlur={formik.handleBlur}
                                                >
                                                    <option value="">
                                                        Ward/Commune
                                                    </option>
                                                    {communeList.map(
                                                        (commune) => (
                                                            <option
                                                                key={commune.id}
                                                                value={
                                                                    commune.id
                                                                }
                                                            >
                                                                {
                                                                    commune.full_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {formik.errors.commune &&
                                                    formik.touched.commune && (
                                                        <div
                                                            className={cx(
                                                                'checkout__error-mess'
                                                            )}
                                                        >
                                                            <ErrorIcon
                                                                width="1.5rem"
                                                                height="1.5rem"
                                                            ></ErrorIcon>
                                                            <span
                                                                className={cx(
                                                                    ''
                                                                )}
                                                            >
                                                                {
                                                                    formik
                                                                        .errors
                                                                        .commune
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                            </div>
                                            {/* Apartment */}
                                            <div
                                                className={cx(
                                                    'checkout__group'
                                                )}
                                            >
                                                <input
                                                    value={
                                                        formik.values.apartment
                                                    }
                                                    type="text"
                                                    className={cx(
                                                        'checkout__input'
                                                    )}
                                                    id="apartment"
                                                    name="apartment"
                                                    placeholder="Apartment, suite, etc.
                                                        (optional)"
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                />

                                                <span
                                                    className={cx(
                                                        'checkout__error'
                                                    )}
                                                ></span>
                                            </div>
                                            <Checkbox
                                                className={cx(
                                                    'checkout__checkbox'
                                                )}
                                                name={'save'}
                                                label="Save this information for next time"
                                            ></Checkbox>
                                        </div>
                                        {/* Shipping Method */}
                                        <div>
                                            <h2
                                                className={cx(
                                                    'checkout__title'
                                                )}
                                            >
                                                Shipping method
                                            </h2>
                                            <div
                                                className={cx(
                                                    'checkout__shipping-group'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'checkout__shipping-img-wrapper'
                                                    )}
                                                >
                                                    <Image
                                                        src={icons.shipping}
                                                        className={cx(
                                                            'checkout__shipping-img'
                                                        )}
                                                    ></Image>
                                                </div>
                                                <div
                                                    className={cx(
                                                        'checkout__shipping-body'
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'checkout__shipping-top'
                                                        )}
                                                    >
                                                        <p
                                                            className={cx(
                                                                'checkout__shipping-name'
                                                            )}
                                                        >
                                                            {shippingMethodList.map(
                                                                (item) =>
                                                                    item.shippingMethodId ===
                                                                    activeShippingMethod &&
                                                                    item.name
                                                            )}
                                                        </p>
                                                        <Button
                                                            type="button"
                                                            className={cx(
                                                                'checkout__shipping-change-btn'
                                                            )}
                                                            onClick={
                                                                handleShippingMethod
                                                            }
                                                        >
                                                            Change
                                                        </Button>
                                                        <p
                                                            className={cx(
                                                                'checkout__shipping-cost'
                                                            )}
                                                        >
                                                            {shippingMethodList.map(
                                                                (item) =>
                                                                    item.shippingMethodId ===
                                                                    activeShippingMethod &&
                                                                    formatPrice(
                                                                        Number.parseFloat(
                                                                            item.cost +
                                                                            ''
                                                                        )
                                                                    )
                                                            )}
                                                        </p>
                                                    </div>
                                                    <p
                                                        className={cx(
                                                            'checkout__shipping-desc',
                                                            {
                                                                'line-clamp':
                                                                    true,
                                                            }
                                                        )}
                                                    >
                                                        {shippingMethodList.map(
                                                            (item) =>
                                                                item.shippingMethodId ===
                                                                activeShippingMethod &&
                                                                item.desc
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Change shipping method */}
                                        <div
                                            className={cx('shipping', {
                                                active: showSelectShippingMethod,
                                            })}
                                        >
                                            <div
                                                className={cx(
                                                    'shipping__overlay'
                                                )}
                                                onClick={
                                                    handleCloseShippingMethod
                                                }
                                            ></div>
                                            <div
                                                className={cx(
                                                    'shipping__inner'
                                                )}
                                            >
                                                <div
                                                    className={cx(
                                                        'shipping__top'
                                                    )}
                                                >
                                                    <h2
                                                        className={cx(
                                                            'checkout__title'
                                                        )}
                                                    >
                                                        Select shipping method
                                                    </h2>
                                                    <p
                                                        className={cx(
                                                            'shipping__title'
                                                        )}
                                                    >
                                                        SHIPPING CHANNEL LINKED
                                                        WITH TIMEVO
                                                    </p>
                                                    <p
                                                        className={cx(
                                                            'shipping__sub-title'
                                                        )}
                                                    >
                                                        You can track your order
                                                        on the Timevo app when
                                                        choosing one of the
                                                        shipping units:
                                                    </p>
                                                </div>
                                                <div
                                                    className={cx(
                                                        'shipping__list'
                                                    )}
                                                >
                                                    {shippingMethodList.map(
                                                        (item) => (
                                                            <div
                                                                key={
                                                                    item.shippingMethodId
                                                                }
                                                                className={cx(
                                                                    'shipping__item',
                                                                    {
                                                                        active:
                                                                            tempShippingMethod ===
                                                                            item.shippingMethodId,
                                                                    }
                                                                )}
                                                                onClick={() =>
                                                                    setTempShippingMethod(
                                                                        item.shippingMethodId
                                                                    )
                                                                }
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        'shipping__content'
                                                                    )}
                                                                >
                                                                    <div
                                                                        className={cx(
                                                                            'shipping__row'
                                                                        )}
                                                                    >
                                                                        <p
                                                                            className={cx(
                                                                                'shipping__name'
                                                                            )}
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </p>
                                                                        <p
                                                                            className={cx(
                                                                                'shipping__price'
                                                                            )}
                                                                        >
                                                                            {formatPrice(
                                                                                Number.parseFloat(
                                                                                    item.cost +
                                                                                    ''
                                                                                )
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <p
                                                                        className={cx(
                                                                            'shipping__desc',
                                                                            {
                                                                                'line-clamp':
                                                                                    true,
                                                                            }
                                                                        )}
                                                                    >
                                                                        {
                                                                            item.desc
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <CheckNoCircleIcon></CheckNoCircleIcon>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <div
                                                    className={cx(
                                                        'shipping__bottom'
                                                    )}
                                                >
                                                    <Button
                                                        type="button"
                                                        className={cx(
                                                            'shipping__cancel-btn'
                                                        )}
                                                        onClick={
                                                            handleCloseShippingMethod
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        primary
                                                        className={cx(
                                                            'shipping__confirm-btn'
                                                        )}
                                                        onClick={handleConfirm}
                                                    >
                                                        Confirm
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Payment method */}
                                        <div
                                            className={cx('checkout__payment')}
                                        >
                                            <h2
                                                className={cx(
                                                    'checkout__title'
                                                )}
                                            >
                                                Payment method
                                            </h2>
                                            <div
                                                className={cx(
                                                    'checkout__payment-list'
                                                )}
                                            >
                                                {paymentMethodList.map(
                                                    (paymentMethod) => (
                                                        <div
                                                            className={cx(
                                                                'checkout__radio-wrapper'
                                                            )}
                                                            key={
                                                                paymentMethod.paymentMethodId
                                                            }
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="payment"
                                                                id={
                                                                    paymentMethod.name
                                                                }
                                                                value={
                                                                    paymentMethod.name
                                                                }
                                                                hidden
                                                                checked={
                                                                    checkRadio ===
                                                                    paymentMethod.paymentMethodId &&
                                                                    formik
                                                                        .values
                                                                        .payment ===
                                                                    paymentMethod.name
                                                                }
                                                                className={cx(
                                                                    'checkout__radio'
                                                                )}
                                                                onChange={
                                                                    formik.handleChange
                                                                }
                                                                onBlur={
                                                                    formik.handleBlur
                                                                }
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    paymentMethod.name
                                                                }
                                                                className={cx(
                                                                    'checkout__radio-label'
                                                                )}
                                                                onClick={() =>
                                                                    setCheckRadio(
                                                                        paymentMethod.paymentMethodId
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    paymentMethod.name
                                                                }
                                                                {paymentMethod.name ===
                                                                    'Payment via VNPay' && (
                                                                        <Image
                                                                            src={
                                                                                checkoutImages.vnpay
                                                                            }
                                                                            className={cx(
                                                                                'checkout__radio-img'
                                                                            )}
                                                                        ></Image>
                                                                    )}
                                                            </label>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className={cx(
                                                'checkout__submit-btn',
                                                {
                                                    'd-lg-none': true,
                                                }
                                            )}
                                        >
                                            Pay now
                                        </Button>
                                    </main>
                                    <footer
                                        className={cx('checkout__footer', {
                                            'd-lg-none': true,
                                        })}
                                    >
                                        <p
                                            className={cx(
                                                'checkout__footer-label'
                                            )}
                                        >
                                            All rights reserved tee
                                        </p>
                                    </footer>
                                </div>
                            </div>
                        </div>
                        {/* Calculate */}
                        <div
                            className={cx('', {
                                col: true,
                                'col-5': true,
                                'col-lg-12': true,
                            })}
                        >
                            <div className={cx('checkout__calculate')}>
                                <h2
                                    className={cx('checkout__title', {
                                        'd-none': true,
                                        'd-lg-block': true,
                                    })}
                                >
                                    Order summary
                                </h2>
                                <div className={cx('checkout__product-list')}>
                                    {productList.map((productItem, index) => (
                                        <div
                                            key={productItem.productId}
                                            className={cx(
                                                'checkout__product-item'
                                            )}
                                        >
                                            <div
                                                className={cx(
                                                    'checkout__product-media'
                                                )}
                                            >
                                                <Image
                                                    src={
                                                        productItem.productImages
                                                            .filter(
                                                                (item) =>
                                                                    item.colorId ===
                                                                    checkoutCart.at(
                                                                        index
                                                                    )
                                                                        .color_id &&
                                                                    item.isMainImage
                                                            )
                                                            .at(0)?.imageUrl ||
                                                        ''
                                                    }
                                                    className={cx(
                                                        'checkout__product-img'
                                                    )}
                                                ></Image>
                                                <p
                                                    className={cx(
                                                        'checkout__product-quantity'
                                                    )}
                                                >
                                                    {
                                                        checkoutCart.at(index)
                                                            .quantity
                                                    }
                                                </p>
                                            </div>
                                            <div
                                                className={cx(
                                                    'checkout__product-content'
                                                )}
                                            >
                                                <p
                                                    className={cx(
                                                        'checkout__product-name'
                                                    )}
                                                >
                                                    {productItem.title}
                                                </p>
                                                <p
                                                    className={cx(
                                                        'checkout__product-styles'
                                                    )}
                                                >
                                                    {
                                                        productItem.colors
                                                            .filter(
                                                                (item) =>
                                                                    item.colorId ===
                                                                    checkoutCart.at(
                                                                        index
                                                                    ).color_id
                                                            )
                                                            .at(0)?.name
                                                    }{' '}
                                                    /{' '}
                                                    {productItem?.screenSizes
                                                        ?.filter(
                                                            (item) =>
                                                                item.sizeId ===
                                                                checkoutCart.at(
                                                                    index
                                                                ).screen_size_id
                                                        )
                                                        .at(0)?.size +
                                                        ' Inches'}{' '}
                                                    /{' '}
                                                    {
                                                        productItem?.materials
                                                            ?.filter(
                                                                (item) =>
                                                                    item.materialId ===
                                                                    checkoutCart.at(
                                                                        index
                                                                    )
                                                                        .material_id
                                                            )
                                                            .at(0)?.name
                                                    }
                                                </p>
                                            </div>
                                            <div
                                                className={cx(
                                                    'checkout__product-price'
                                                )}
                                            >
                                                {productItem.discount
                                                    ? formatPrice(
                                                        checkoutCart.at(index)
                                                            .quantity *
                                                        productItem.price *
                                                        (1 -
                                                            productItem.discount /
                                                            100)
                                                    )
                                                    : formatPrice(
                                                        checkoutCart.at(index)
                                                            .quantity *
                                                        productItem.price
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={cx('checkout__summary')}>
                                    <div
                                        className={cx('checkout__summary-row')}
                                    >
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            Subtotal
                                        </span>
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                    <div
                                        className={cx('checkout__summary-row')}
                                    >
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            Shipping
                                        </span>
                                        <span
                                            className={cx(
                                                'checkout__summary-text'
                                            )}
                                        >
                                            {shippingMethodList.map(
                                                (item) =>
                                                    item.shippingMethodId ===
                                                    activeShippingMethod &&
                                                    formatPrice(
                                                        Number.parseFloat(
                                                            item.cost + ''
                                                        )
                                                    )
                                            )}
                                        </span>
                                    </div>
                                    <div
                                        className={cx('checkout__summary-row')}
                                    >
                                        <span
                                            className={cx(
                                                'checkout__summary-total'
                                            )}
                                        >
                                            Total
                                        </span>
                                        <span
                                            className={cx(
                                                'checkout__summary-price'
                                            )}
                                        >
                                            {shippingMethodList.map(
                                                (item) =>
                                                    item.shippingMethodId ===
                                                    activeShippingMethod &&
                                                    formatPrice(
                                                        item.cost
                                                            ? item.cost + total
                                                            : total
                                                    )
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className={cx('checkout__submit-btn', {
                                        'd-none': true,
                                        'd-lg-block': true,
                                    })}
                                >
                                    Pay now
                                </Button>
                                <footer
                                    className={cx('checkout__footer', {
                                        'd-none': true,
                                        'd-lg-block': true,
                                    })}
                                >
                                    <p className={cx('checkout__footer-label')}>
                                        All rights reserved tee
                                    </p>
                                </footer>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;

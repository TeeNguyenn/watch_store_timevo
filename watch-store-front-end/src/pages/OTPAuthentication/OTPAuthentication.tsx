import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './OTPAuthentication.module.scss';
import Button from '../../components/Button';
import { verify } from './verify';
import { useNavigate, useParams } from 'react-router-dom';
import * as userServices from '../../services/userServices';
import { notifyError } from '../../utils/Functions';
import { ToastContainer } from 'react-toastify';
import PageNotFound from '../PageNotFound';
import PreLoader from '../../components/PreLoader';

const cx = classNames.bind(styles);

const OTPAuthentication = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false);
    const [countdown, setCountDown] = useState(60);
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { email } = useParams();

    useEffect(() => {
        if (email) {
            verify();

            // Đặt timeout để bắt đầu interval sau 2 giây
            const timeoutId = setTimeout(() => {
                intervalRef.current = setInterval(() => {
                    setCountDown((prevCountDown) => {
                        if (prevCountDown <= 1) {
                            const fetchApi = async () => {
                                // remove otp
                                const res = await userServices.generateOTP(
                                    email + ''
                                );
                            };
                            fetchApi();

                            if (intervalRef.current)
                                clearInterval(intervalRef.current); // Ngừng interval khi countdown bằng 0
                            return 0;
                        }
                        return prevCountDown - 1;
                    });
                }, 1000);
            }, 1000);

            // Cleanup timeout khi component unmount
            return () => clearTimeout(timeoutId);
        }
    }, [email]);

    const handleVerify = () => {
        // if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) {
        //     notifyError('Please enter full OTP code.')
        //     return;
        // }

        const fetchApi = async () => {
            const otp = input1 + input2 + input3 + input4 + input5 + input6;
            const res = await userServices.checkOTP(email + '', otp);
            if (res.status === 'OK') {
                // Nào checkOTP bên NewPassword thì uncmt
                // if (intervalRef.current) {
                //     clearInterval(intervalRef.current)
                //     intervalRef.current = null;
                // }

                // temp
                localStorage.setItem('otpLocal', otp);

                navigate(`/forgot-password/new/${email}/${otp}`);
            } else {
                // setLoading(false);
                setTimeout(() => {
                    notifyError('OTP authentication failed');
                }, 100);
            }
        };

        if (email) {
            fetchApi();
        }
    };

    const handleResend = async () => {
        setLoading(true);
        const res = await userServices.generateOTP(email + '');
        window.location.reload();
    };

    if (!email) {
        return <PageNotFound />;
    }

    if (loading) {
        return <PreLoader show />;
    }

    return (
        <div className="container-spacing">
            <div className="">
                <div className={cx('wrapper')}>
                    <div className={cx('content')}>
                        <div className={cx('card')}>
                            <div className={cx('card__body')}>
                                <h4 className={cx('card__title')}>
                                    OTP Authentication
                                </h4>
                                <p className={cx('card__desc')}>
                                    Enter the 6 digit OTP sent to your email.
                                </p>

                                <div
                                    className={cx('otp-field', {
                                        field: true,
                                    })}
                                >
                                    <input
                                        value={input1}
                                        onChange={(e) =>
                                            setInput1(e.target.value)
                                        }
                                        type="number"
                                    />
                                    <input
                                        value={input2}
                                        onChange={(e) =>
                                            setInput2(e.target.value)
                                        }
                                        type="number"
                                        disabled
                                    />
                                    <input
                                        value={input3}
                                        onChange={(e) =>
                                            setInput3(e.target.value)
                                        }
                                        type="number"
                                        disabled
                                    />
                                    <input
                                        value={input4}
                                        onChange={(e) =>
                                            setInput4(e.target.value)
                                        }
                                        type="number"
                                        disabled
                                    />
                                    <input
                                        value={input5}
                                        onChange={(e) =>
                                            setInput5(e.target.value)
                                        }
                                        type="number"
                                        disabled
                                    />
                                    <input
                                        value={input6}
                                        onChange={(e) =>
                                            setInput6(e.target.value)
                                        }
                                        type="number"
                                        disabled
                                    />
                                </div>

                                <Button
                                    primary
                                    className={cx('btn', {
                                        'verify-btn': true,
                                    })}
                                    onClick={() => handleVerify()}
                                >
                                    Verify
                                </Button>

                                <p className={cx('resend')}>
                                    Didn't receive an OTP?
                                    <Button
                                        className={cx('resend-btn', {
                                            active: countdown <= 0,
                                        })}
                                        onClick={handleResend}
                                    >
                                        Request again
                                    </Button>{' '}
                                    <span
                                        className={cx('count-down', {
                                            hide: countdown <= 0,
                                        })}
                                    >
                                        {countdown}s
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPAuthentication;

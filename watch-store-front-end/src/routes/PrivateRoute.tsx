import React, { useEffect, useState } from 'react';
import * as userServices from '../services/userServices';
import PageNotFound from '../pages/PageNotFound';
import PreLoader from '../components/PreLoader';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const currentUser = localStorage.getItem('user_id');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                setLoading(true);
                const res = await userServices.getUserDetail();
                if (res.role) {
                    setIsAdmin(res?.role?.some(roleItem => roleItem.id === 1));     // id = 1 is role admin
                    setLoading(false);
                }
            };
            fetchApi();
        } else {
            setLoading(false);
        }
    }, [])

    // if (loading) {
    //     return <PreLoader show />
    // }

    // if (!isAdmin && !loading) {
    //     return <PageNotFound fullScreen></PageNotFound>
    // }

    return (
        <>
            {
                loading ? <PreLoader show /> : !isAdmin ? <PageNotFound fullScreen /> :
                    props.children
            }
        </>
    );
};

export default PrivateRoute;
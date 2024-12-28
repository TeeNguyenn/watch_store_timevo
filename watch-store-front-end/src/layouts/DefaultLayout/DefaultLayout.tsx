import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface DefaultLayoutProps {
    children: JSX.Element;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    );
};

export default DefaultLayout;

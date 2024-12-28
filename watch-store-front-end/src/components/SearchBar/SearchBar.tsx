import React from 'react';
import classNames from 'classnames/bind';

import styles from './SearchBar.module.scss';
import Button from '../Button';
import Search from '../Search/Search';
import { CloseIcon } from '../Icons';

const cx = classNames.bind(styles);

interface SearchBarProps {
    title?: string;
    keyword?: string;
    handleCloseSearchModal?: () => void;
}

const SearchBar = ({
    title,
    keyword,
    handleCloseSearchModal,
}: SearchBarProps) => {
    return (
        <div className={cx('search-modal__top')}>
            <Button
                onClick={handleCloseSearchModal}
                className={cx('close-btn', { 'd-none': title })}
                leftIcon={
                    <CloseIcon
                        className={cx('icon')}
                        height="1.5rem"
                        width="1.5rem"
                    ></CloseIcon>
                }
            ></Button>
            <h2 className={cx('title')}>
                {title || 'What are you looking for ?'}
            </h2>
            <Search
                className={cx('input-box')}
                keyword={keyword}
                handleCloseSearchModal={handleCloseSearchModal}
            ></Search>
            <div className={cx('popular')}>
                <p className={cx('label')}>Popular searches:</p>
                <Button href="#!" className={cx('btn')}>
                    Featured
                </Button>
                <Button href="#!" className={cx('btn')}>
                    Trendy
                </Button>
                <Button href="#!" className={cx('btn')}>
                    Sale
                </Button>
                <Button href="#!" className={cx('btn')}>
                    New
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;

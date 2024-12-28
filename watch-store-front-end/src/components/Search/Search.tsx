import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import Button from '../Button';
import styles from './Search.module.scss';
import { CloseIcon, SearchIcon } from '../Icons';
import Image from '../Image';
import { Link, useNavigate, useParams } from 'react-router-dom';
import images from '../../assets/images';
import Price from '../Price';
import * as productServices from '../../services/productServices';
import ProductModel from '../../models/ProductModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';
import { useDebounce } from '../../hooks';

const cx = classNames.bind(styles);

interface SearchProps {
    className?: string;
    keyword?: string;
    adminSearch?: boolean;
    handleCloseSearchModal?: () => void;
}

const Search = ({
    className,
    keyword,
    adminSearch = false,
    handleCloseSearchModal,
}: SearchProps) => {
    const refInput = useRef<HTMLInputElement | null>(null);
    const [searchResult, setSearchResult] = useState<ProductModel[]>([]);
    const [searchValue, setSearchValue] = useState(keyword || '');
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const responseData = await productServices.getAllProduct(
                1,
                3,
                '',
                '',
                '',
                '',
                debounced
            );
            setSearchResult(responseData.result);

            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInputValue = e.target.value;

        if (!searchInputValue.startsWith(' ')) {
            setSearchValue(searchInputValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        refInput.current?.focus();
    };

    const handleSubmit = () => {
        if (!debounced) {
            return;
        }

        if (adminSearch) {
            return; //temp
        }
        navigate(`${config.routes.searchResult}?keyword=${debounced}`);
        if (!handleCloseSearchModal) return;
        handleCloseSearchModal();
    };

    return (
        <Tippy
            visible={visible && searchResult.length > 0 && !adminSearch} //adminSearch temp
            interactive
            delay={[0, 300]}
            offset={[0, 5]}
            placement="bottom-start"
            onClickOutside={() => setVisible(false)}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                    <h2 className={cx('search-result__title')}>Products</h2>
                    <div className={cx('search-result__list')}>
                        {searchResult.map((item, index) => (
                            <Link
                                key={index}
                                to={`/products/${item.productId}`}
                                className={cx('search-result__item')}
                                onClick={handleCloseSearchModal}
                            >
                                <Image
                                    src={item.thumbnail}
                                    className={cx('search-result__img')}
                                    fallback={images.noProductImg}
                                ></Image>
                                <div className={cx('search-result__content')}>
                                    <p className={cx('search-result__name')}>
                                        {item.title}
                                    </p>
                                    <Price
                                        className={cx('search-result__price')}
                                        price={item.price}
                                        // discount={item.discount}
                                    ></Price>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        >
            <div className={cx('input-box', className)}>
                <input
                    ref={refInput}
                    value={searchValue}
                    className={cx('input')}
                    type="text"
                    placeholder="Search"
                    onChange={handleChange}
                    onFocus={() => setVisible(true)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                {searchValue && !loading && (
                    <Button className={cx('reset-btn')} onClick={handleClear}>
                        <CloseIcon width="1.1rem" height="1.1rem"></CloseIcon>
                    </Button>
                )}

                {loading && (
                    <Button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </Button>
                )}
                <Button className={cx('search-btn')} onClick={handleSubmit}>
                    <SearchIcon width="2rem" height="2rem"></SearchIcon>
                </Button>
            </div>
        </Tippy>
    );
};

export default Search;

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '../../components/Button';
import styles from './Blog.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Search from '../../components/Search';
import Image from '../../components/Image';
import newsImages from '../../assets/images/news';
import CardItem from '../../layouts/components/CardItem';
import images from '../../assets/images';
import Price from '../../components/Price';
import Pagination from '../../components/Pagination';
import { CloseIcon, FilterIcon } from '../../components/Icons';
import config from '../../config';

const cx = classNames.bind(styles);

// fake blog list
const blogList = [1, 2, 3, 4, 5, 6];

//fake search result list
const searchResult = [1, 2, 3, 4, 5];

const Blog = () => {
    const links = [{ to: config.routes.home, name: 'home' }, { name: 'News' }];


    const [currentPage, setCurrentPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };
    return (
        <div className={cx('', { 'container-spacing': true })}>
            <Breadcrumb title="News" links={links}></Breadcrumb>
            <div
                className={cx('blog__overlay', {
                    'd-none': true,
                    'd-lg-block': showFilter,
                })}
                onClick={() => setShowFilter(false)}
            ></div>
            <div className={cx('blog__row', { row: true })}>
                <div
                    className={cx('blog-sidebar', {
                        col: true,
                        show: showFilter,
                    })}
                >
                    <aside className={cx('blog-sidebar__inner')}>
                        <Button
                            className={cx('blog-sidebar__close-btn', {
                                'd-none': true,
                                'd-lg-block': true,
                            })}
                            onClick={() => setShowFilter(false)}
                        >
                            <CloseIcon
                                width="1.5rem"
                                height="1.5rem"
                            ></CloseIcon>
                        </Button>
                        {/* Search */}
                        <HeadlessTippy
                            interactive
                            placement="bottom-start"
                            render={(attrs) => (
                                <div
                                    className={cx('search-result')}
                                    tabIndex={-1}
                                    {...attrs}
                                >
                                    <h2 className={cx('search-result__title')}>
                                        Products
                                    </h2>
                                    <div className={cx('search-result__list')}>
                                        {searchResult.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={'#!'}
                                                className={cx(
                                                    'search-result__item'
                                                )}
                                            >
                                                <Image
                                                    src={images.cartItem}
                                                    className={cx(
                                                        'search-result__img'
                                                    )}
                                                ></Image>
                                                <div
                                                    className={cx(
                                                        'search-result__content'
                                                    )}
                                                >
                                                    <p
                                                        className={cx(
                                                            'search-result__name'
                                                        )}
                                                    >
                                                        Bluetooth Calling Watch
                                                    </p>
                                                    {/* <Price
                                                        className={cx(
                                                            'search-result__price'
                                                        )}
                                                    ></Price> */}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        >
                            <div className={cx('blog-sidebar__search-wrapper')}>
                                <Search
                                    className={cx('blog-sidebar__search')}
                                ></Search>
                            </div>
                        </HeadlessTippy>
                        {/* Recent Posts */}
                        <div className={cx('blog-sidebar__posts')}>
                            <h5 className={cx('blog__title')}>Recent Posts</h5>
                            <ul className={cx('blog-sidebar__post-list')}>
                                <li className={cx('blog-sidebar__post-item')}>
                                    <Link
                                        to={'#!'}
                                        className={cx(
                                            'blog-sidebar__post-media'
                                        )}
                                    >
                                        <Image
                                            src={newsImages.post01}
                                            className={cx(
                                                'blog-sidebar__post-img'
                                            )}
                                        ></Image>
                                    </Link>
                                    <div
                                        className={cx(
                                            'blog-sidebar__post-content'
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                'blog-sidebar__post-date'
                                            )}
                                        >
                                            16 Mar 2024
                                        </p>
                                        <h6>
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'blog-sidebar__post-title',
                                                    { 'primary-hover': true }
                                                )}
                                            >
                                                Innovative Fitness Wearables
                                            </Link>
                                        </h6>
                                    </div>
                                </li>
                                <li className={cx('blog-sidebar__post-item')}>
                                    <Link
                                        to={'#!'}
                                        className={cx(
                                            'blog-sidebar__post-media'
                                        )}
                                    >
                                        <Image
                                            src={newsImages.post02}
                                            className={cx(
                                                'blog-sidebar__post-img'
                                            )}
                                        ></Image>
                                    </Link>
                                    <div
                                        className={cx(
                                            'blog-sidebar__post-content'
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                'blog-sidebar__post-date'
                                            )}
                                        >
                                            16 Mar 2024
                                        </p>
                                        <h6>
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'blog-sidebar__post-title',
                                                    { 'primary-hover': true }
                                                )}
                                            >
                                                Advanced Wearable Tech
                                            </Link>
                                        </h6>
                                    </div>
                                </li>
                                <li className={cx('blog-sidebar__post-item')}>
                                    <Link
                                        to={'#!'}
                                        className={cx(
                                            'blog-sidebar__post-media'
                                        )}
                                    >
                                        <Image
                                            src={newsImages.post03}
                                            className={cx(
                                                'blog-sidebar__post-img'
                                            )}
                                        ></Image>
                                    </Link>
                                    <div
                                        className={cx(
                                            'blog-sidebar__post-content'
                                        )}
                                    >
                                        <p
                                            className={cx(
                                                'blog-sidebar__post-date'
                                            )}
                                        >
                                            16 Mar 2024
                                        </p>
                                        <h6>
                                            <Link
                                                to={'#!'}
                                                className={cx(
                                                    'blog-sidebar__post-title',
                                                    { 'primary-hover': true }
                                                )}
                                            >
                                                Next-Gen Fitness Trackers
                                            </Link>
                                        </h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Tags */}
                        <div className={cx('blog-sidebar__tags')}>
                            <p className={cx('blog__title')}>Tags</p>
                            <div className={cx('blog-sidebar__categories')}>
                                <Button
                                    to="#!"
                                    className={cx('blog-sidebar__tag-btn')}
                                >
                                    dailywear
                                </Button>
                                <Button
                                    to="#!"
                                    className={cx('blog-sidebar__tag-btn')}
                                >
                                    display
                                </Button>
                                <Button
                                    to="#!"
                                    className={cx('blog-sidebar__tag-btn')}
                                >
                                    fitness
                                </Button>
                                <Button
                                    to="#!"
                                    className={cx('blog-sidebar__tag-btn')}
                                >
                                    smartwatch
                                </Button>
                            </div>
                        </div>
                        {/* Hot Deals */}
                        <div className={cx('blog-sidebar__deals')}>
                            <p className={cx('blog__title')}>Hot Deals</p>
                            <CardItem
                                className={cx('blog-sidebar__deals-item')}
                            // soldOut
                            ></CardItem>
                        </div>
                        {/* Latest Products */}
                        <div className={cx('blog-sidebar__latest-products')}>
                            <p className={cx('blog__title')}>Latest Products</p>
                            <div className={cx('blog-sidebar__latest-list')}>
                                <div
                                    className={cx('blog-sidebar__latest-item')}
                                >
                                    <Link
                                        to={'#!'}
                                        className={cx(
                                            'blog-sidebar__latest-wrapper'
                                        )}
                                    >
                                        <Image
                                            src={images.cartItem}
                                            alt="Latest product image"
                                            className={cx(
                                                'blog-sidebar__latest-img'
                                            )}
                                        ></Image>
                                    </Link>
                                    <div
                                        className={cx(
                                            'blog-sidebar__latest-content'
                                        )}
                                    >
                                        <Link
                                            to={'#!'}
                                            className={cx(
                                                'blog-sidebar__latest-link',
                                                { 'primary-hover': true }
                                            )}
                                        >
                                            {' '}
                                            Bluetooth Calling Watch
                                        </Link>
                                        {/* <Price
                                            className={cx(
                                                'blog-sidebar__latest-price'
                                            )}
                                        ></Price> */}
                                    </div>
                                </div>
                                <div
                                    className={cx('blog-sidebar__latest-item')}
                                >
                                    <Link
                                        to={'#!'}
                                        className={cx(
                                            'blog-sidebar__latest-wrapper'
                                        )}
                                    >
                                        <Image
                                            src={images.cartItem}
                                            alt="Latest product image"
                                            className={cx(
                                                'blog-sidebar__latest-img'
                                            )}
                                        ></Image>
                                    </Link>
                                    <div
                                        className={cx(
                                            'blog-sidebar__latest-content'
                                        )}
                                    >
                                        <Link
                                            to={'#!'}
                                            className={cx(
                                                'blog-sidebar__latest-link',
                                                { 'primary-hover': true }
                                            )}
                                        >
                                            {' '}
                                            Bluetooth Calling Watch
                                        </Link>
                                        {/* <Price
                                            className={cx(
                                                'blog-sidebar__latest-price'
                                            )}
                                        ></Price> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                <div
                    className={cx('blog-list', {
                        col: true,
                    })}
                >
                    <div
                        className={cx('blog__filter', {
                            'd-none': true,
                            'd-lg-block': true,
                        })}
                        onClick={() => setShowFilter(true)}
                    >
                        <Button
                            leftIcon={<FilterIcon></FilterIcon>}
                            className={cx('blog__filter-btn')}
                        >
                            Filter
                        </Button>
                    </div>
                    <section className={cx('blog-list__inner')}>
                        <div className="row row-cols-2 row-cols-xxl-1">
                            {blogList.map((item, index) => (
                                <div className="col">
                                    <div key={index} className={cx('card')}>
                                        <Link
                                            to={'#!'}
                                            className={cx(
                                                'card__thumbnail-wrapper'
                                            )}
                                        >
                                            <Image
                                                src={newsImages.post01}
                                                className={cx(
                                                    'card__thumbnail'
                                                )}
                                                loading={'lazy'}
                                            ></Image>
                                        </Link>
                                        <div className={cx('card__content')}>
                                            <p className={cx('card__date')}>
                                                16 Mar 2024
                                            </p>
                                            <h3>
                                                <Link
                                                    to={'#!'}
                                                    className={cx(
                                                        'card__title',
                                                        {
                                                            'primary-hover':
                                                                true,
                                                        }
                                                    )}
                                                >
                                                    Innovative Fitness Wearables
                                                </Link>
                                            </h3>
                                            <p
                                                className={cx('card__desc', {
                                                    'line-clamp': true,
                                                    'line-clamp-6': true,
                                                })}
                                            >
                                                Enim ut sem viverra aliquet
                                                eget. Faucibus purus in massa
                                                tempor nec feugiat. Tellus
                                                integer feugiat scelerisque
                                                varius morbi enim scelerisque
                                                varius morbi enim scelerisque
                                                varius morbi enim
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPage={5}
                            pagination={pagination}
                        ></Pagination>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Blog;

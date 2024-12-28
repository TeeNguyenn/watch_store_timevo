import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useMediaQuery } from 'react-responsive';
import Tippy from '@tippyjs/react/headless';
import { Spin } from 'antd';


import Button from '../../components/Button';
import styles from './Shop.module.scss';
import Breadcrumb from '../../components/Breadcrumb';
import Sidebar from './components/Sidebar';
import {
    CloseIcon,
    FilterIcon,
    RightArrowIcon,
    ShowFourTheProductIcon,
    ShowOneTheProductIcon,
    ShowThreeTheProductIcon,
    ShowTwoTheProductIcon,
    ShowVerticalTheProductIcon,
} from '../../components/Icons';
import Card from './components/Card';
import Pagination from '../../components/Pagination';
import * as productServices from '../../services/productServices';
import PreLoader from '../../components/PreLoader';
import CollectionModel from '../../models/CollectionModel';
import * as collectionServices from '../../services/collectionServices';
import CategoryModel from '../../models/CategoryModel';
import ColorModel from '../../models/ColorModel';
import MaterialModel from '../../models/MaterialModel';
import * as categoryServices from '../../services/categoryServices';
import * as colorServices from '../../services/colorServices';
import * as materialServices from '../../services/materialServices';
import MobileFilter from './components/MobileFilter';
import MobileFilterList from './components/MobileFilterList';
import config from '../../config';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import * as favoriteServices from '../../services/favoriteServices';
import { getWishlist } from '../../components/Wishlist/wishlistSlice';

const cx = classNames.bind(styles);

// fake breadcrumb
const links = [
    {
        to: config.routes.home,
        name: 'Home',
    },
    { to: '#!', name: 'Shop' },
];

const Shop = () => {
    const [sort, setSort] = useState('');
    const [sortBy, setSortBy] = useState('Popularity');
    const [visible, setVisible] = useState(false);
    const [showOption, setShowOption] = useState(4);

    const [currentMobileFilter, setCurrentMobileFilter] = useState('');
    const [collectionId, setCollectionId] = useState<string>('');
    const [collectionList, setCollectionList] = useState<CollectionModel[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<any>({
        list: [],
        ids: [],
    });
    const [colorFilter, setColorFilter] = useState<any>({
        list: [],
        ids: [],
    });
    const [materialFilter, setMaterialFilter] = useState<any>({
        list: [],
        ids: [],
    });
    const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
    const [colorList, setColorList] = useState<ColorModel[]>([]);
    const [materialList, setMaterialList] = useState<MaterialModel[]>([]);
    const [showQuickBuy, setShowQuickBuy] = useState(false);

    const isXlScreen = useMediaQuery({ query: '(max-width: 1199.98px)' });
    const isLgScreen = useMediaQuery({ query: '(max-width: 991.98px)' });

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    // api
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState<any[]>([]);
    const currentUser = localStorage.getItem('user_id');

    const dispatch = useAppDispatch();
    // const wishlistStatus = useAppSelector((state: RootState) => state.wishlists.status);

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState('');

    const handleSortBy = (name: string) => {
        if (name === sortBy) {
            return;
        }
        setSortBy(name);
        setVisible(false);

        switch (name) {
            case 'Unpopularity':
                setSort('popularity');
                break;
            case 'Popularity':
                setSort('');
                break;
            case 'Price, low to high':
                setSort('low');
                break;
            case 'Price, high to low':
                setSort('high');
                break;
            case 'Date, old to new':
                setSort('oldest');
                break;
            case 'Date, new to old':
                setSort('latest');
                break;

            default:
                break;
        }
    };

    const pagination = (presentPage: number) => {
        setCurrentPage(presentPage);
    };

    useEffect(() => {
        if (isXlScreen) {
            setShowOption(3);
        }
        if (isLgScreen) {
            setShowOption(2);
        }
    }, []);

    // get all product
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            if (currentUser) {
                const res = await favoriteServices.getFavoriteByUserId(
                    currentUser + ''
                );

                await dispatch(
                    getWishlist({
                        id: currentUser + '',
                        currentPage: 1,
                        limit: res.totalProduct,
                    })
                );
            }

            const responseData = await productServices.getAllProduct(
                currentPage,
                12,
                collectionId,
                categoryFilter.ids.join(',') + '',
                colorFilter.ids.join(',') + '',
                materialFilter.ids.join(',') + '',
                '',
                sort,
                minPrice,
                maxPrice
            );

            if (responseData) {
                setProductList(responseData.result);
                setTotalPage(responseData.totalPage);
            }

            const collectionData = await collectionServices.getAllCollection();
            setCollectionList(collectionData);
            const categoryData = await categoryServices.getAllCategory();
            setCategoryList(categoryData);
            const colorData = await colorServices.getAllColor();
            setColorList(colorData);
            const materialData = await materialServices.getAllMaterial();
            setMaterialList(materialData);

            setLoading(false);
        };

        fetchApi();
    }, [
        currentUser,
        currentPage,
        collectionId,
        categoryFilter,
        colorFilter,
        materialFilter,
        sort,
        minPrice,
        maxPrice
    ]);


    const handleFilterCollection = (activeCollection: string) => {
        setCurrentPage(1);
        setCollectionId(activeCollection);
    };

    const handleChangeMinPrice = (value: string) => {
        console.log(value);

        setMinPrice(value);
    }

    const handleChangeMaxPrice = (value: string) => {
        setMaxPrice(value);
    }

    const handleFilterCategory = (data: any) => {
        setCurrentPage(1);
        setCurrentMobileFilter('category');

        if (!data.id) {
            setCategoryFilter({
                list: [],
                ids: [],
            });
            return;
        }

        if (categoryFilter.ids.includes(data.id)) {
            const newArr = categoryFilter.list.filter(
                (item: any) => item.value + '' !== data.id + ''
            );
            const newIds = categoryFilter.ids.filter(
                (item: any) => item + '' !== data.id + ''
            );
            setCategoryFilter({
                list: [...newArr],
                ids: [...newIds],
            });
        } else {
            setCategoryFilter({
                list: [
                    ...categoryFilter.list,
                    { value: data.id, name: data.name },
                ],
                ids: [...categoryFilter.ids, data.id],
            });
        }
    };

    const handleFilterColor = (data: any) => {
        setCurrentPage(1);
        setCurrentMobileFilter('color');

        if (!data.id) {
            setColorFilter({
                list: [],
                ids: [],
            });
            return;
        }

        if (colorFilter.ids.includes(data.id)) {
            const newArr = colorFilter.list.filter(
                (item: any) => item.value + '' !== data.id + ''
            );
            const newIds = colorFilter.ids.filter(
                (item: any) => item + '' !== data.id + ''
            );
            setColorFilter({
                list: [...newArr],
                ids: [...newIds],
            });
        } else {
            setColorFilter({
                list: [
                    ...colorFilter.list,
                    { value: data.id, name: data.name },
                ],
                ids: [...colorFilter.ids, data.id],
            });
        }
    };

    const handleFilterMaterial = (data: any) => {
        setCurrentPage(1);
        setCurrentMobileFilter('material');

        if (!data.id) {
            setMaterialFilter({
                list: [],
                ids: [],
            });
            return;
        }

        if (materialFilter.ids.includes(data.id)) {
            const newArr = materialFilter.list.filter(
                (item: any) => item.value + '' !== data.id + ''
            );
            const newIds = materialFilter.ids.filter(
                (item: any) => item + '' !== data.id + ''
            );
            setMaterialFilter({
                list: [...newArr],
                ids: [...newIds],
            });
        } else {
            setMaterialFilter({
                list: [
                    ...materialFilter.list,
                    { value: data.id, name: data.name },
                ],
                ids: [...materialFilter.ids, data.id],
            });
        }
    };

    const handleShowQuickBuy = (isShow: boolean) => {
        setShowQuickBuy(isShow);
    };

    if (loading) {
        // window.scrollTo(0, 0);
        return <PreLoader show></PreLoader>;
    }

    return (
        <div className={cx('', 'container-spacing')}>
            <div
                className={cx('shop', {
                    'show-quick-buy': showQuickBuy,
                })}
            >
                <Breadcrumb title="Products" links={links}></Breadcrumb>
                <div className={cx('shop__row', { row: true })}>
                    <div
                        className={cx('sidebar', {
                            col: true,
                            'col-3': true,
                            'col-xl-4': true,
                            'd-lg-none': true,
                        })}
                    >
                        {!isLgScreen && (
                            <Sidebar
                                collectionId={collectionId}
                                collectionList={collectionList}
                                categoryFilter={categoryFilter}
                                categoryList={categoryList}
                                colorFilter={colorFilter}
                                colorList={colorList}
                                materialFilter={materialFilter}
                                materialList={materialList}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                handleFilterCollection={handleFilterCollection}
                                handleFilterCategory={handleFilterCategory}
                                handleFilterColor={handleFilterColor}
                                handleFilterMaterial={handleFilterMaterial}
                                handleShowQuickBuy={handleShowQuickBuy}
                                handleChangeMinPrice={handleChangeMinPrice}
                                handleChangeMaxPrice={handleChangeMaxPrice}
                            ></Sidebar>
                        )}
                    </div>
                    <div
                        className={cx('product', {
                            col: true,
                            'col-9': true,
                            'col-xl-8': true,
                            'col-lg-12': true,
                        })}
                    >
                        <div
                            className={cx('product__top')}
                            style={{
                                marginBottom:
                                    isLgScreen &&
                                        (categoryFilter.ids.length > 0 ||
                                            colorFilter.ids.length > 0 ||
                                            materialFilter.ids.length > 0)
                                        ? '0px'
                                        : '60px',
                            }}
                        >
                            <div
                                className={cx('product__count-wrapper', {
                                    'd-lg-none': true,
                                })}
                            >
                                <h2 className={cx('product__count')}>
                                    {/* Showing 1-11 of 11 Results */}
                                </h2>
                            </div>

                            {/* Mobile menu */}
                            {isLgScreen && (
                                <MobileFilter
                                    currentMobileFilter={currentMobileFilter}
                                    categoryFilter={categoryFilter}
                                    categoryList={categoryList}
                                    colorFilter={colorFilter}
                                    colorList={colorList}
                                    materialFilter={materialFilter}
                                    materialList={materialList}
                                    // minPrice={minPrice}
                                    // maxPrice={maxPrice}
                                    handleFilterCategory={handleFilterCategory}
                                    handleFilterColor={handleFilterColor}
                                    handleFilterMaterial={handleFilterMaterial}
                                ></MobileFilter>
                            )}

                            <div className={cx('product__show-options')}>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 2,
                                    })}
                                    onClick={() => setShowOption(2)}
                                >
                                    <ShowTwoTheProductIcon></ShowTwoTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 11,
                                        'd-none': true,
                                        'd-sm-flex': true,
                                    })}
                                    onClick={() => setShowOption(11)}
                                >
                                    <ShowOneTheProductIcon></ShowOneTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 3,
                                        'd-md-none': true,
                                    })}
                                    onClick={() => setShowOption(3)}
                                >
                                    <ShowThreeTheProductIcon></ShowThreeTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 4,
                                        'd-xl-none': true,
                                    })}
                                    onClick={() => setShowOption(4)}
                                >
                                    <ShowFourTheProductIcon></ShowFourTheProductIcon>
                                </div>
                                <div
                                    className={cx('product__show-option', {
                                        active: showOption === 1,
                                        'd-sm-none': true,
                                    })}
                                    onClick={() => setShowOption(1)}
                                >
                                    <ShowVerticalTheProductIcon></ShowVerticalTheProductIcon>
                                </div>
                            </div>

                            <div className={cx('sort', { 'd-lg-none': true })}>
                                <div className={cx('sort__wrapper')}>
                                    <label
                                        htmlFor=""
                                        className={cx('sort__label')}
                                    >
                                        Sort by:
                                    </label>

                                    <Tippy
                                        visible={visible}
                                        interactive
                                        delay={[0, 300]}
                                        offset={[5, 5]}
                                        placement="bottom-end"
                                        onClickOutside={() => setVisible(false)}
                                        render={(attrs) => (
                                            <div
                                                className={cx('sort__options')}
                                            >
                                                {/* <label
                                                    htmlFor="option-1"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-1"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Unpopularity',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Unpopularity'
                                                            )
                                                        }
                                                    >
                                                        Unpopularity
                                                    </span>
                                                </label> */}
                                                <label
                                                    htmlFor="option-2"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-2"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Popularity',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Popularity'
                                                            )
                                                        }
                                                    >
                                                        Popularity
                                                    </span>
                                                </label>
                                                {/* <label
                                                    htmlFor="option-3"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-3"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Alphabetically, A-Z',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Alphabetically, A-Z'
                                                            )
                                                        }
                                                    >
                                                        Alphabetically, A-Z
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-4"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-4"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Alphabetically, Z-A',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Alphabetically, Z-A'
                                                            )
                                                        }
                                                    >
                                                        Alphabetically, Z-A
                                                    </span>
                                                </label> */}
                                                <label
                                                    htmlFor="option-5"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-5"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Price, low to high',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Price, low to high'
                                                            )
                                                        }
                                                    >
                                                        Price, low to high
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-6"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-6"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Price, high to low',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Price, high to low'
                                                            )
                                                        }
                                                    >
                                                        Price, high to low
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-7"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-7"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Date, old to new',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Date, old to new'
                                                            )
                                                        }
                                                    >
                                                        Date, old to new
                                                    </span>
                                                </label>
                                                <label
                                                    htmlFor="option-8"
                                                    className={cx(
                                                        'sort__option'
                                                    )}
                                                >
                                                    <input
                                                        hidden
                                                        type="radio"
                                                        name="sort"
                                                        id="option-8"
                                                        className={cx(
                                                            'sort__radio'
                                                        )}
                                                    />
                                                    <span
                                                        className={cx(
                                                            'sort__text',
                                                            {
                                                                'primary-hover':
                                                                    true,
                                                                active:
                                                                    sortBy ===
                                                                    'Date, new to old',
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            handleSortBy(
                                                                'Date, new to old'
                                                            )
                                                        }
                                                    >
                                                        Date, new to old
                                                    </span>
                                                </label>
                                            </div>
                                        )}
                                    >
                                        <p
                                            className={cx('sort__title')}
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {sortBy}
                                            <span
                                                className={cx(
                                                    'sort__title-icon'
                                                )}
                                            ></span>
                                        </p>
                                    </Tippy>
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu - filter list */}
                        {isLgScreen && (
                            <MobileFilterList
                                categoryFilter={categoryFilter}
                                categoryList={categoryList}
                                colorFilter={colorFilter}
                                colorList={colorList}
                                materialFilter={materialFilter}
                                materialList={materialList}
                                handleFilterCategory={handleFilterCategory}
                                handleFilterColor={handleFilterColor}
                                handleFilterMaterial={handleFilterMaterial}
                            ></MobileFilterList>
                        )}

                        <div className={cx('product__inner')}>
                            <div
                                className={cx('product__list', {
                                    row: true,
                                    'row-cols-4': showOption === 4,
                                    'row-cols-3': showOption === 3,
                                    'row-cols-2': showOption === 2,
                                    'row-cols-1':
                                        showOption === 1 || showOption === 11,
                                })}
                            >
                                {productList.length === 0 && (
                                    <div className={cx('product__empty')}>
                                        No products found
                                        <br></br>
                                        Use fewer filters or remove all
                                    </div>
                                )}
                                {productList.map((productItem, index) => (
                                    <Card
                                        key={productItem.id}
                                        oneProduct={showOption === 1}
                                        twoProduct={showOption === 2}
                                        threeProduct={showOption === 3}
                                        fourProduct={showOption === 4}
                                        productItem={productItem}
                                        handleShowQuickBuy={handleShowQuickBuy}
                                    ></Card>
                                ))}
                            </div>
                        </div>

                        <Pagination
                            hide={productList.length === 0}
                            currentPage={currentPage}
                            totalPage={totalPage}
                            pagination={pagination}
                        ></Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;

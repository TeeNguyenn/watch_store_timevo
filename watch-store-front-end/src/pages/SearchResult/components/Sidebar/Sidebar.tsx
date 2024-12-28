import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '../../../../components/Button';
import styles from './Sidebar.module.scss';
import Checkbox from '../../../../components/Checkbox';

import { formatPrice, splitArrayAtIndex } from '../../../../utils/Functions';
import * as productServices from '../../../../services/productServices';
import ProductModel from '../../../../models/ProductModel';
import ColorItem from '../../../../components/ColorItem';
import { boolean } from 'yup';
import { useDebounce } from '../../../../hooks';

const cx = classNames.bind(styles);

interface SidebarProps {
    collectionId?: string;
    collectionList?: any[];
    categoryFilter: any;
    categoryList?: any[];
    colorFilter: any;
    colorList?: any[];
    materialFilter: any;
    materialList?: any[];
    minPrice?: string;
    maxPrice?: string;

    handleFilterCollection?: (activeCollection: string) => void;
    handleFilterCategory?: (data: any) => void;
    handleFilterColor?: (data: any) => void;
    handleFilterMaterial?: (data: any) => void;
    handleChangeMinPrice?: (value: string) => void;
    handleChangeMaxPrice?: (value: string) => void;
}

const Sidebar = React.memo(
    ({
        collectionId,
        collectionList,
        categoryFilter,
        categoryList = [],
        colorFilter,
        colorList = [],
        materialFilter,
        materialList = [],
        minPrice,
        maxPrice,
        handleFilterCollection,
        handleFilterCategory = () => { },
        handleFilterColor = () => { },
        handleFilterMaterial = () => { },
        handleChangeMinPrice = (value: string) => { },
        handleChangeMaxPrice = (value: string) => { },
    }: SidebarProps) => {
        useState(collectionId);
        const [showMore, setShowMore] = useState(0);
        const [showOptionFilter, setShowOptionFilter] = useState<number[]>([]);

        const [minPriceValue, setMinPriceValue] = useState(minPrice || '');
        const [maxPriceValue, setMaxPriceValue] = useState(maxPrice || '');

        const debouncedMinPrice = useDebounce(minPriceValue, 500);
        const debouncedMaxPrice = useDebounce(maxPriceValue, 500);

        // api
        useEffect(() => {
            if (!debouncedMinPrice.trim()) {
                return;
            } else {
                handleChangeMinPrice(debouncedMinPrice);
            }
        }, [debouncedMinPrice])

        useEffect(() => {
            if (!debouncedMaxPrice.trim()) {
                return;
            } else {
                handleChangeMaxPrice(debouncedMaxPrice);
            }
        }, [debouncedMaxPrice])

        // Show / hide filter options
        const [categoryShow, categoryHide] = splitArrayAtIndex(
            categoryList,
            10
        );
        const [colorShow, colorHide] = splitArrayAtIndex(colorList, 10);

        const handleShowMore = (num: number) => {
            if (num === showMore) {
                setShowMore(0);
                return;
            }
            setShowMore(num);
        };

        const handleShowOptionFilter = (num: number) => {
            if (showOptionFilter.includes(num)) {
                const newArray = showOptionFilter.filter(
                    (item, index) => item !== num
                );
                setShowOptionFilter(newArray);
            } else {
                setShowOptionFilter([...showOptionFilter, num]);
            }
        };

        // Remove all filter
        const handleRemoveFilter = () => {
            handleFilterCategory({});

            handleFilterColor({});
            handleFilterMaterial({});
            handleChangeMinPrice('');
            handleChangeMaxPrice('');
        };

        const handleCategoryChange = (data: any = {}) => {
            if (!handleFilterCategory) return;
            handleFilterCategory(data);
        };

        const handleColorChange = (data: any = {}) => {
            if (!handleFilterColor) return;
            handleFilterColor(data);
        };

        const handleMaterialChange = (data: any = {}) => {
            if (!handleFilterMaterial) return;
            handleFilterMaterial(data);
        };

        return (
            <aside className={cx('sidebar', { 'sidebar-card-slider': true })}>
                <div className={cx('filter')}>
                    <div className={cx('filter__top')}>
                        <div className={cx('filter__wrapper')}>
                            <h2 className={cx('filter__title')}>Filter:</h2>
                            <Button
                                className={cx('filter__remove-btn', {
                                    'primary-hover': true,
                                    'd-none':
                                        categoryFilter.ids.length === 0 &&
                                        colorFilter.ids.length === 0 &&
                                        materialFilter.ids.length === 0,
                                })}
                                onClick={() => handleRemoveFilter()}
                            >
                                Remove all
                            </Button>
                        </div>
                        <ul className={cx('filter__list')}>
                            {
                                (minPrice || maxPrice) && <li>
                                    <Button
                                        rightIcon={<span>×</span>}
                                        className={cx('filter__item', {
                                            'primary-hover': true,
                                        })}
                                        onClick={() => {
                                            handleChangeMinPrice('');
                                            handleChangeMaxPrice('');

                                        }

                                        }
                                    >
                                        {`${formatPrice(Number(minPrice || 0))}-${formatPrice(Number(maxPrice || 10000))}`}

                                    </Button>
                                </li>
                            }
                            {categoryFilter.list.map(
                                (item: any, index: any) => (
                                    <li key={index}>
                                        <Button
                                            rightIcon={<span>×</span>}
                                            className={cx('filter__item', {
                                                'primary-hover': true,
                                            })}
                                            onClick={() =>
                                                handleCategoryChange({
                                                    id: item.value,
                                                    name: item.name,
                                                })
                                            }
                                        >
                                            {`Category: ${item.name}`}
                                        </Button>
                                    </li>
                                )
                            )}
                            {colorFilter.list.map((item: any, index: any) => (
                                <li key={index}>
                                    <Button
                                        rightIcon={<span>×</span>}
                                        className={cx('filter__item', {
                                            'primary-hover': true,
                                        })}
                                        onClick={() =>
                                            handleColorChange({
                                                id: item.value,
                                                name: item.name,
                                            })
                                        }
                                    >
                                        {`Color: ${item.name}`}
                                    </Button>
                                </li>
                            ))}
                            {materialFilter.list.map(
                                (item: any, index: any) => (
                                    <li key={index}>
                                        <Button
                                            rightIcon={<span>×</span>}
                                            className={cx('filter__item', {
                                                'primary-hover': true,
                                            })}
                                            onClick={() =>
                                                handleColorChange({
                                                    id: item.value,
                                                    name: item.name,
                                                })
                                            }
                                        >
                                            {`Material: ${item.name}`}
                                        </Button>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/*Avalability */}
                    <div className={cx('availability', {
                        'd-none': true
                    })}>
                        <p
                            className={cx('sidebar__title')}
                            onClick={() => handleShowOptionFilter(1)}
                        >
                            Availability
                            <span className={cx('sidebar__title-quantity')}>
                                (1)
                            </span>
                            <span
                                className={cx('sidebar__title-icon', {
                                    hide: showOptionFilter.includes(1),
                                })}
                            ></span>
                        </p>
                        <div
                            className={cx('detail__list', {
                                'd-none': showOptionFilter.includes(1),
                            })}
                        >
                            <Checkbox
                                name="avalability-1"
                                label="In stock"
                                quantity="(9)"
                                checked
                            ></Checkbox>
                            <Checkbox
                                name="avalability-2"
                                label="Out of stock"
                                quantity="(2)"
                            ></Checkbox>
                        </div>
                    </div>
                    {/* Price */}
                    <div className={cx('price')}>
                        <p
                            className={cx('sidebar__title')}
                            onClick={() => handleShowOptionFilter(2)}
                        >
                            Price
                            <span
                                className={cx('sidebar__title-icon', {
                                    hide: showOptionFilter.includes(2),
                                })}
                            ></span>
                        </p>
                        <div
                            className={cx('detail__list', {
                                'd-none': showOptionFilter.includes(2),
                            })}
                        >
                            <p className={cx('price__header')}>
                                The highest price is 10000$
                            </p>
                            <div className={cx('price__range')}>
                                <span className={cx('price__unit')}>$</span>
                                <div className={cx('price__group')}>
                                    <input
                                        value={minPriceValue}
                                        className={cx('price__input')}
                                        type="number"
                                        placeholder="0"
                                        min={0}
                                        max={10000}
                                        onChange={(e) => setMinPriceValue(e.target.value)}
                                        onBlur={(e) => {
                                            if (Number(e.target.value) < 0) {
                                                setMinPriceValue('0')
                                            }
                                        }}
                                    />
                                </div>
                                <div className={cx('price__group')}>
                                    <input
                                        value={maxPriceValue}
                                        className={cx('price__input')}
                                        type="number"
                                        placeholder="10000"
                                        min={0}
                                        max={10000}
                                        onChange={(e) => setMaxPriceValue(e.target.value)}
                                        onBlur={(e) => {
                                            if (Number(e.target.value) > 10000) {
                                                setMaxPriceValue('10000')
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*More filter */}
                    <div className={cx('more-filter')}>
                        <p
                            className={cx('sidebar__title')}
                            onClick={() => handleShowOptionFilter(3)}
                        >
                            Category
                            {categoryFilter.ids.length > 0 &&
                                ` (${categoryFilter.ids.length})`}
                            <span
                                className={cx('sidebar__title-icon', {
                                    hide: showOptionFilter.includes(3),
                                })}
                            ></span>
                        </p>
                        <div
                            className={cx('detail__list', {
                                'd-none': showOptionFilter.includes(3),
                            })}
                        >
                            <div>
                                {categoryShow.map((item) => (
                                    <Checkbox
                                        key={item.categoryId}
                                        name={item.name + ''}
                                        label={item.name + ''}
                                        quantity={`(${item.totalProduct})`}
                                        onClick={() =>
                                            handleCategoryChange({
                                                id: item.categoryId,
                                                name: item.name,
                                            })
                                        }
                                        checked={categoryFilter.ids.includes(
                                            item.categoryId
                                        )}
                                    ></Checkbox>
                                ))}
                            </div>
                            {/* Show more */}
                            {categoryHide.length > 0 && (
                                <>
                                    <div
                                        className={cx('more-filter__hide', {
                                            'd-none': showMore !== 1,
                                        })}
                                    >
                                        {categoryHide.map((item) => (
                                            <Checkbox
                                                key={item.categoryId}
                                                name={item.name + ''}
                                                label={item.name + ''}
                                                quantity={`(${item.totalProduct})`}
                                                onClick={() =>
                                                    handleCategoryChange({
                                                        id: item.categoryId,
                                                        name: item.name,
                                                    })
                                                }
                                                checked={categoryFilter.ids.includes(
                                                    item.categoryId
                                                )}
                                            ></Checkbox>
                                        ))}
                                    </div>
                                    <Button
                                        leftIcon={
                                            <span>
                                                {showMore !== 1 ? '+' : '-'}
                                            </span>
                                        }
                                        className={cx('sidebar__more-btn')}
                                        onClick={() => handleShowMore(1)}
                                    >
                                        {showMore !== 1
                                            ? 'Show more'
                                            : 'Show less'}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Color */}
                    <div className={cx('color')}>
                        <p
                            className={cx('sidebar__title')}
                            onClick={() => handleShowOptionFilter(4)}
                        >
                            Color
                            {colorFilter.ids.length > 0 &&
                                ` (${colorFilter.ids.length})`}
                            <span
                                className={cx('sidebar__title-icon', {
                                    hide: showOptionFilter.includes(4),
                                })}
                            ></span>
                        </p>
                        <div
                            className={cx('detail__list', {
                                'd-none': showOptionFilter.includes(4),
                            })}
                        >
                            <ul className={cx('color__list')}>
                                {colorShow.map((colorItem, index) => (
                                    <li
                                        className={cx('color__item')}
                                        key={colorItem.colorId}
                                    >
                                        <label
                                            htmlFor=""
                                            className={cx('color__label')}
                                        >
                                            <ColorItem
                                                width="3rem"
                                                height="3rem"
                                                red={colorItem.red}
                                                green={colorItem.green}
                                                blue={colorItem.blue}
                                                onClick={() =>
                                                    handleColorChange({
                                                        id: colorItem.colorId,
                                                        name: colorItem.name,
                                                    })
                                                }
                                                active={colorFilter.ids.includes(
                                                    colorItem.colorId
                                                )}
                                            ></ColorItem>
                                        </label>
                                    </li>
                                ))}
                                {/* Hide item */}
                                {colorHide.map((colorItem, index) => (
                                    <li
                                        className={cx('color__item', {
                                            'd-none': showMore !== 2,
                                        })}
                                        key={index}
                                    >
                                        <label
                                            htmlFor=""
                                            className={cx('color__label')}
                                        >
                                            <ColorItem
                                                width="3rem"
                                                height="3rem"
                                                red={colorItem.red}
                                                green={colorItem.green}
                                                blue={colorItem.blue}
                                                onClick={() =>
                                                    handleColorChange({
                                                        id: colorItem.colorId,
                                                        name: colorItem.name,
                                                    })
                                                }
                                                active={colorFilter.ids.includes(
                                                    colorItem.colorId
                                                )}
                                            ></ColorItem>
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {colorHide.length > 0 && (
                                <Button
                                    leftIcon={
                                        <span>
                                            {showMore !== 2 ? '+' : '-'}
                                        </span>
                                    }
                                    className={cx('sidebar__more-btn')}
                                    onClick={() => handleShowMore(2)}
                                >
                                    {showMore !== 2 ? 'Show more' : 'Show less'}
                                </Button>
                            )}
                        </div>
                    </div>
                    {/*Material */}
                    <div className={cx('more-filter')}>
                        <p
                            className={cx('sidebar__title')}
                            onClick={() => handleShowOptionFilter(5)}
                        >
                            Material
                            {materialFilter.ids.length > 0 &&
                                ` (${materialFilter.ids.length})`}
                            <span
                                className={cx('sidebar__title-icon', {
                                    hide: showOptionFilter.includes(5),
                                })}
                            ></span>
                        </p>
                        <div
                            className={cx(
                                'detail__list',
                                'detail__list--last',
                                {
                                    'd-none': showOptionFilter.includes(5),
                                }
                            )}
                        >
                            {materialList.map((item) => (
                                <Checkbox
                                    key={item.materialId}
                                    name={item.name + ''}
                                    label={item.name + ''}
                                    quantity={`(${item.totalProduct})`}
                                    onClick={() =>
                                        handleMaterialChange({
                                            id: item.materialId,
                                            name: item.name,
                                        })
                                    }
                                    checked={materialFilter.ids.includes(
                                        item.materialId
                                    )}
                                ></Checkbox>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
);

export default Sidebar;

import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MobileFilterList.module.scss';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);

interface MobileFilterListProps {
    categoryFilter: any;
    categoryList?: any[];
    colorFilter: any;
    colorList?: any[];
    materialFilter: any;
    materialList?: any[];

    handleFilterCategory?: (data: any) => void;
    handleFilterColor?: (data: any) => void;
    handleFilterMaterial?: (data: any) => void;
}

const MobileFilterList = ({
    categoryFilter,
    categoryList = [],
    colorFilter,
    colorList = [],
    materialFilter,
    materialList = [],
    handleFilterCategory = () => {},
    handleFilterColor = () => {},
    handleFilterMaterial = () => {},
}: MobileFilterListProps) => {
    const handleRemoveAll = () => {
        handleFilterCategory({});
        handleFilterColor({});
        handleFilterMaterial({});
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
        <div
            className={cx('mobile-menu__filter-container', {
                'd-none':
                    categoryFilter.ids.length === 0 &&
                    colorFilter.ids.length === 0 &&
                    materialFilter.ids.length === 0,
            })}
        >
            <div className={cx('mobile-menu__filter-list')}>
                {categoryFilter.list.map((item: any, index: any) => (
                    <div
                        key={index}
                        className={cx('mobile-menu__filter-item-wrapper')}
                    >
                        <Button
                            rightIcon={<span>×</span>}
                            className={cx('mobile-menu__filter-item', {
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
                    </div>
                ))}
                {colorFilter.list.map((item: any, index: any) => (
                    <div
                        key={index}
                        className={cx('mobile-menu__filter-item-wrapper')}
                    >
                        <Button
                            rightIcon={<span>×</span>}
                            className={cx('mobile-menu__filter-item', {
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
                    </div>
                ))}
                {materialFilter.list.map((item: any, index: any) => (
                    <div
                        key={index}
                        className={cx('mobile-menu__filter-item-wrapper')}
                    >
                        <Button
                            rightIcon={<span>×</span>}
                            className={cx('mobile-menu__filter-item', {
                                'primary-hover': true,
                            })}
                            onClick={() =>
                                handleMaterialChange({
                                    id: item.value,
                                    name: item.name,
                                })
                            }
                        >
                            {`Material: ${item.name}`}
                        </Button>
                    </div>
                ))}
                <Button
                    className={cx('mobile-menu__filter-remove-all', {
                        'primary-hover': true,
                    })}
                    onClick={() => handleRemoveAll()}
                >
                    Remove all
                </Button>
            </div>
        </div>
    );
};

export default MobileFilterList;

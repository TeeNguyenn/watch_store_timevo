import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import Button from '../../../../components/Button';
import styles from './MobileFilter.module.scss';
import {
    CloseIcon,
    FilterIcon,
    RightArrowIcon,
} from '../../../../components/Icons';

const cx = classNames.bind(styles);

interface MobileFilterProps {
    currentMobileFilter?: string;
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

const MobileFilter = ({
    currentMobileFilter,
    categoryFilter,
    categoryList = [],
    colorFilter,
    colorList = [],
    materialFilter,
    materialList = [],
    handleFilterCategory = () => {},
    handleFilterColor = () => {},
    handleFilterMaterial = () => {},
}: MobileFilterProps) => {
    const [showMobileSubMenu, setShowMobileSubMenu] = useState(0);
    const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);

    useEffect(() => {
        if (showMobileSubMenu || showMobileFilterModal) {
            document.body.classList.add('hide-scroll');
            document
                .querySelector('.mobile-toolbar-footer')
                ?.classList.add('hide');
        } else {
            document.body.classList.remove('hide-scroll');
            document
                .querySelector('.mobile-toolbar-footer')
                ?.classList.remove('hide');
        }
    }, [showMobileSubMenu, showMobileFilterModal]);

    useEffect(() => {
        if (
            currentMobileFilter === 'category' &&
            categoryFilter.ids.length > 0
        ) {
            setShowMobileFilterModal(true);
            setShowMobileSubMenu(3);
        } else if (
            currentMobileFilter === 'color' &&
            colorFilter.ids.length > 0
        ) {
            setShowMobileFilterModal(true);
            setShowMobileSubMenu(4);
        } else if (
            currentMobileFilter === 'material' &&
            materialFilter.ids.length > 0
        ) {
            setShowMobileFilterModal(true);
            setShowMobileSubMenu(5);
        } else if (
            currentMobileFilter &&
            (categoryFilter.ids.length === 0 ||
                colorFilter.ids.length === 0 ||
                materialFilter.ids.length === 0)
        ) {
            setShowMobileFilterModal(true);
        }
    }, []);

    const handleApply = () => {
        setShowMobileFilterModal(false);
        setShowMobileSubMenu(0);
    };

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
            className={cx('mobile-menu', {
                'd-none': true,
                'd-lg-flex': true,
            })}
        >
            <Button
                leftIcon={<FilterIcon></FilterIcon>}
                className={cx('mobile-menu__btn', {
                    modifier: showMobileFilterModal,
                })}
                onClick={() => setShowMobileFilterModal(true)}
            >
                Filter and sort
            </Button>

            <div
                className={cx('mobile-menu__modal', {
                    show: showMobileFilterModal,
                })}
            >
                <div
                    className={cx('mobile-menu__overlay')}
                    onClick={() => handleApply()}
                ></div>
                <div className={cx('mobile-menu__inner')}>
                    <div className={cx('mobile-menu__top')}>
                        <div className={cx('mobile-menu__wrapper')}>
                            <h2 className={cx('mobile-menu__title')}>Filter</h2>
                            <p className={cx('mobile-menu__text')}>
                                11 products
                            </p>
                        </div>
                        <Button
                            className={cx('mobile-menu__close-btn', {
                                'primary-hover': true,
                            })}
                            onClick={() => handleApply()}
                        >
                            <CloseIcon></CloseIcon>
                        </Button>
                    </div>
                    <div className={cx('mobile-menu__main')}>
                        {/* Availability */}
                        <div className={cx('mobile-menu__group')}>
                            <div
                                className={cx('mobile-menu__container', {
                                    'primary-hover': true,
                                })}
                                onClick={() => setShowMobileSubMenu(1)}
                            >
                                <p className={cx('mobile-menu__label')}>
                                    Availability
                                </p>
                                <RightArrowIcon></RightArrowIcon>
                            </div>
                            {/* sub-menu */}
                            <div
                                className={cx('mobile-menu__sub-menu', {
                                    show: showMobileSubMenu === 1,
                                })}
                            >
                                <Button
                                    leftIcon={
                                        <RightArrowIcon
                                            className={cx(
                                                'mobile-menu__back-icon'
                                            )}
                                        ></RightArrowIcon>
                                    }
                                    className={cx('mobile-menu__back-btn', {
                                        'primary-hover': true,
                                    })}
                                    onClick={() => setShowMobileSubMenu(0)}
                                >
                                    Availability
                                </Button>
                                <div className={cx('mobile-menu__list')}>
                                    <div
                                        className={cx('mobile-menu__item', {
                                            'primary-hover': true,
                                        })}
                                    >
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="Filter-Availability-mobile-1"
                                            className={cx(
                                                'mobile-menu__checkbox'
                                            )}
                                            hidden
                                        />
                                        <label
                                            htmlFor="Filter-Availability-mobile-1"
                                            className={cx(
                                                'mobile-menu__checkbox-label'
                                            )}
                                        >
                                            In Stock
                                            <span
                                                className={cx(
                                                    'mobile-menu__quantity'
                                                )}
                                            >
                                                (9)
                                            </span>
                                        </label>
                                    </div>
                                    <div
                                        className={cx('mobile-menu__item', {
                                            'primary-hover': true,
                                        })}
                                    >
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="Filter-Availability-mobile-2"
                                            hidden
                                            className={cx(
                                                'mobile-menu__checkbox'
                                            )}
                                        />
                                        <label
                                            htmlFor="Filter-Availability-mobile-2"
                                            className={cx(
                                                'mobile-menu__checkbox-label'
                                            )}
                                        >
                                            Out of stock
                                            <span
                                                className={cx(
                                                    'mobile-menu__quantity'
                                                )}
                                            >
                                                (2)
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className={cx('mobile-menu__footer')}>
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleRemoveAll()}
                                    >
                                        clear
                                    </Button>
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleApply()}
                                    >
                                        apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Price */}
                        <div className={cx('mobile-menu__group')}>
                            <div
                                className={cx('mobile-menu__container', {
                                    'primary-hover': true,
                                })}
                                onClick={() => setShowMobileSubMenu(2)}
                            >
                                <p className={cx('mobile-menu__label')}>
                                    Price
                                </p>
                                <RightArrowIcon></RightArrowIcon>
                            </div>
                            {/* sub-menu */}
                            <div
                                className={cx('mobile-menu__sub-menu', {
                                    show: showMobileSubMenu === 2,
                                })}
                            >
                                <Button
                                    leftIcon={
                                        <RightArrowIcon
                                            className={cx(
                                                'mobile-menu__back-icon'
                                            )}
                                        ></RightArrowIcon>
                                    }
                                    className={cx('mobile-menu__back-btn', {
                                        'primary-hover': true,
                                    })}
                                    onClick={() => setShowMobileSubMenu(0)}
                                >
                                    Price
                                </Button>
                                <div>
                                    <p
                                        className={cx(
                                            'mobile-menu__price-desc'
                                        )}
                                    >
                                        The highest price is $61.3351
                                    </p>
                                    <div
                                        className={cx(
                                            'mobile-menu__price-range'
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                'mobile-menu__price-unit'
                                            )}
                                        >
                                            $
                                        </span>
                                        <div
                                            className={cx(
                                                'mobile-menu__price-field'
                                            )}
                                        >
                                            <input
                                                type="number"
                                                className={cx(
                                                    'mobile-menu__price-input'
                                                )}
                                                placeholder="0"
                                                max={61.3351}
                                                min={0}
                                            />
                                        </div>
                                        <span
                                            className={cx(
                                                'mobile-menu__price-unit'
                                            )}
                                        >
                                            $
                                        </span>
                                        <div
                                            className={cx(
                                                'mobile-menu__price-field'
                                            )}
                                        >
                                            <input
                                                type="number"
                                                className={cx(
                                                    'mobile-menu__price-input'
                                                )}
                                                placeholder="61.3351"
                                                max={61.3351}
                                                min={0}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('mobile-menu__footer')}>
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleRemoveAll()}
                                    >
                                        clear
                                    </Button>
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleApply()}
                                    >
                                        apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Category */}
                        <div className={cx('mobile-menu__group')}>
                            <div
                                className={cx('mobile-menu__container', {
                                    'primary-hover': true,
                                })}
                                onClick={() => setShowMobileSubMenu(3)}
                            >
                                <p className={cx('mobile-menu__label')}>
                                    Category
                                </p>
                                <RightArrowIcon></RightArrowIcon>
                            </div>
                            {/* sub-menu */}
                            <div
                                className={cx('mobile-menu__sub-menu', {
                                    show: showMobileSubMenu === 3,
                                })}
                            >
                                <Button
                                    leftIcon={
                                        <RightArrowIcon
                                            className={cx(
                                                'mobile-menu__back-icon'
                                            )}
                                        ></RightArrowIcon>
                                    }
                                    className={cx('mobile-menu__back-btn', {
                                        'primary-hover': true,
                                    })}
                                    onClick={() => setShowMobileSubMenu(0)}
                                >
                                    Category
                                </Button>
                                <div className={cx('mobile-menu__list')}>
                                    {categoryList.map((item, index) => (
                                        <div
                                            key={index}
                                            className={cx('mobile-menu__item', {
                                                'primary-hover': true,
                                            })}
                                        >
                                            <input
                                                type="checkbox"
                                                name={item.name}
                                                id={item.name}
                                                className={cx(
                                                    'mobile-menu__checkbox'
                                                )}
                                                hidden
                                                checked={categoryFilter.ids.includes(
                                                    item.categoryId
                                                )}
                                            />
                                            <label
                                                htmlFor={item.name}
                                                className={cx(
                                                    'mobile-menu__checkbox-label'
                                                )}
                                                onClick={() =>
                                                    handleCategoryChange({
                                                        id: item.categoryId,
                                                        name: item.name,
                                                    })
                                                }
                                            >
                                                {item.name}
                                                <span
                                                    className={cx(
                                                        'mobile-menu__quantity'
                                                    )}
                                                >
                                                    ({item.totalProduct})
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className={cx('mobile-menu__footer', {
                                        modifier: true,
                                    })}
                                >
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleRemoveAll()}
                                    >
                                        clear
                                    </Button>
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleApply()}
                                    >
                                        apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Color */}
                        <div className={cx('mobile-menu__group')}>
                            <div
                                className={cx('mobile-menu__container', {
                                    'primary-hover': true,
                                })}
                                onClick={() => setShowMobileSubMenu(4)}
                            >
                                <p className={cx('mobile-menu__label')}>
                                    Color
                                </p>
                                <RightArrowIcon></RightArrowIcon>
                            </div>
                            {/* sub-menu */}
                            <div
                                className={cx('mobile-menu__sub-menu', {
                                    show: showMobileSubMenu === 4,
                                })}
                            >
                                <Button
                                    leftIcon={
                                        <RightArrowIcon
                                            className={cx(
                                                'mobile-menu__back-icon'
                                            )}
                                        ></RightArrowIcon>
                                    }
                                    className={cx('mobile-menu__back-btn', {
                                        'primary-hover': true,
                                    })}
                                    onClick={() => setShowMobileSubMenu(0)}
                                >
                                    Color
                                </Button>
                                <div className={cx('mobile-menu__list')}>
                                    {colorList.map((item) => (
                                        <div
                                            className={cx('mobile-menu__item', {
                                                'primary-hover': true,
                                            })}
                                        >
                                            <input
                                                type="checkbox"
                                                name={item.name}
                                                id={item.name}
                                                className={cx(
                                                    'mobile-menu__checkbox'
                                                )}
                                                hidden
                                                checked={colorFilter.ids.includes(
                                                    item.colorId
                                                )}
                                            />
                                            <label
                                                htmlFor={item.name}
                                                className={cx(
                                                    'mobile-menu__checkbox-label'
                                                )}
                                                onClick={() =>
                                                    handleColorChange({
                                                        id: item.colorId,
                                                        name: item.name,
                                                    })
                                                }
                                            >
                                                {item.name}
                                                <span
                                                    className={cx(
                                                        'mobile-menu__quantity'
                                                    )}
                                                >
                                                    ({item.totalProduct})
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className={cx('mobile-menu__footer', {
                                        modifier: true,
                                    })}
                                >
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleRemoveAll()}
                                    >
                                        clear
                                    </Button>
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleApply()}
                                    >
                                        apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Material */}
                        <div className={cx('mobile-menu__group')}>
                            <div
                                className={cx('mobile-menu__container', {
                                    'primary-hover': true,
                                })}
                                onClick={() => setShowMobileSubMenu(5)}
                            >
                                <p className={cx('mobile-menu__label')}>
                                    Material
                                </p>
                                <RightArrowIcon></RightArrowIcon>
                            </div>
                            {/* sub-menu */}
                            <div
                                className={cx('mobile-menu__sub-menu', {
                                    show: showMobileSubMenu === 5,
                                })}
                            >
                                <Button
                                    leftIcon={
                                        <RightArrowIcon
                                            className={cx(
                                                'mobile-menu__back-icon'
                                            )}
                                        ></RightArrowIcon>
                                    }
                                    className={cx('mobile-menu__back-btn', {
                                        'primary-hover': true,
                                    })}
                                    onClick={() => setShowMobileSubMenu(0)}
                                >
                                    Material
                                </Button>
                                <div className={cx('mobile-menu__list')}>
                                    {materialList.map((item) => (
                                        <div
                                            key={item.materialId}
                                            className={cx('mobile-menu__item', {
                                                'primary-hover': true,
                                            })}
                                        >
                                            <input
                                                type="checkbox"
                                                name={item.name}
                                                id={item.name}
                                                className={cx(
                                                    'mobile-menu__checkbox'
                                                )}
                                                hidden
                                                checked={materialFilter.ids.includes(
                                                    item.materialId
                                                )}
                                            />
                                            <label
                                                htmlFor={item.name}
                                                className={cx(
                                                    'mobile-menu__checkbox-label'
                                                )}
                                                onClick={() =>
                                                    handleMaterialChange({
                                                        id: item.materialId,
                                                        name: item.name,
                                                    })
                                                }
                                            >
                                                {item.name}
                                                <span
                                                    className={cx(
                                                        'mobile-menu__quantity'
                                                    )}
                                                >
                                                    ({item.totalProduct})
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className={cx('mobile-menu__footer', {
                                        modifier: true,
                                    })}
                                >
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleRemoveAll()}
                                    >
                                        clear
                                    </Button>
                                    <Button
                                        primary
                                        className={cx(
                                            'mobile-menu__footer-btn'
                                        )}
                                        onClick={() => handleApply()}
                                    >
                                        apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* Sort by */}
                        <div className={cx('mobile-menu__group')}>
                            <div className={cx('mobile-menu__container')}>
                                <p className={cx('mobile-menu__label')}>
                                    Sort by:
                                </p>
                                <select
                                    name="sort_by"
                                    id=""
                                    className={cx('mobile-menu__sort-select')}
                                >
                                    <option value="manual">Featured</option>
                                    <option value="best-selling">
                                        Best selling
                                    </option>
                                    <option value="title-ascending" selected>
                                        Alphabetically, A-Z
                                    </option>
                                    <option value="title-descending">
                                        Alphabetically, Z-A
                                    </option>
                                    <option value="price-ascending">
                                        Price, low to high
                                    </option>
                                    <option value="price-descending">
                                        Price, high to low
                                    </option>
                                    <option value="created-ascending">
                                        Date, old to new
                                    </option>
                                    <option value="created-descending">
                                        Date, new to old
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('mobile-menu__footer')}>
                            <Button
                                primary
                                className={cx('mobile-menu__footer-btn')}
                                onClick={() => handleRemoveAll()}
                            >
                                remove all
                            </Button>
                            <Button
                                primary
                                className={cx('mobile-menu__footer-btn')}
                                onClick={() => handleApply()}
                            >
                                apply
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileFilter;

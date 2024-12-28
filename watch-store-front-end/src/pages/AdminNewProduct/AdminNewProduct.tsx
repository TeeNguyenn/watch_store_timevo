import classNames from 'classnames/bind';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS của Quill
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import Tippy from '@tippyjs/react/headless';

import Button from '../../components/Button';
import styles from './AdminNewProduct.module.scss';
import Image from '../../components/Image';
import images from '../../assets/images';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import Navbar from '../Dashboard/components/navbar';
import { useEffect, useState } from 'react';
import {
    AttributeIcon,
    CheckIcon,
    CheckNoCircleIcon,
    CloseIcon,
    ErrorIcon,
    GlobalIcon,
    PricingIcon,
    RestockIcon,
    SecureIcon,
    TransitionIcon,
} from '../../components/Icons';
import { Link, useParams } from 'react-router-dom';
import * as productServices from '../../services/productServices';
import * as categoryServices from '../../services/categoryServices';
import CategoryModel from '../../models/CategoryModel';
import CollectionModel from '../../models/CollectionModel';
import * as collectionServices from '../../services/collectionServices';
import PreLoader from '../../components/PreLoader';
import * as colorServices from '../../services/colorServices';
import ColorModel from '../../models/ColorModel';
import * as materialServices from '../../services/materialServices';
import MaterialModel from '../../models/MaterialModel';
import ScreenSizeModel from '../../models/ScreenSizeModel';
import * as screenSizeServices from '../../services/screenSizeServices';
import * as variantService from '../../services/variantService';
import * as productImageServices from '../../services/productImageServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faLayerGroup,
    faPalette,
    faPenRuler,
} from '@fortawesome/free-solid-svg-icons';
import { notifySuccess } from '../../utils/Functions';
import ProductModel from '../../models/ProductModel';
import VariantModel from '../../models/VariantModel';

// component use for new & edit product

interface Variant {
    color: string;
    size: string;
    material: string;
}

interface ColorImages {
    [color: string]: File[];
}

const cx = classNames.bind(styles);

const AdminNewProduct = () => {
    const [imagesByColor, setImagesByColor] = useState<ColorImages>({});
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedColorList, setSelectedColorList] = useState<string[]>([]);
    // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [activeInventory, setActiveInventory] = useState<number>(1);
    const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
    const [collectionList, setCollectionList] = useState<CollectionModel[]>([]);
    const [price, setPrice] = useState<any>();
    const [salePrice, setSalePrice] = useState<any>();
    const [quantity, setQuantity] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [colorList, setColorList] = useState<ColorModel[]>([]);
    const [materialList, setMaterialList] = useState<MaterialModel[]>([]);
    const [screenSizeList, setScreenList] = useState<ScreenSizeModel[]>([]);

    const [desc, setDesc] = useState('');
    const [showNewModal, setShowNewModal] = useState(0);

    // Add new
    const [categoryName, setCategoryName] = useState('');
    const [collectionName, setCollectionName] = useState('');
    const [colorName, setColorName] = useState('');
    const [colorCode, setColorCode] = useState('');
    const [size, setSize] = useState('');
    const [materialName, setMaterialName] = useState('');

    // image Colors
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownOption, setShowDropdownOption] = useState(-1);

    // Get productId from url
    const { productId } = useParams();

    let productIdNumber = 0;
    try {
        productIdNumber = parseInt(productId + '');
        if (Number.isNaN(productIdNumber)) {
            productIdNumber = 0;
        }
    } catch (error) {
        productIdNumber = 0;
        console.log('Error:', error);
    }

    const [variants, setVariants] = useState<Variant[]>(
        productIdNumber
            ? []
            : [
                { color: '', size: '', material: '' }, // Tùy chọn ban đầu
                // { color: '', size: '', material: '' },
            ]
    );

    const notifyNewProductSuccess = () => {
        toast.success('Product added successfully.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyWarning = (message: string) => {
        toast.warning(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyError = (message: string) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            categoryId: '',
            collectionIds: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(40, 'Tittle must be under 100 characters.')
                .min(10, 'Tittle must be above 10 characters.')
                .required('You must fill in this section.'),
        }),
        onSubmit: (values) => {
            if (!values.title) {
                notifyWarning('Please enter product title');
                return;
            }

            if (!price) {
                notifyWarning('Please enter product price');
                return;
            }

            if (!quantity) {
                notifyWarning('Please enter product quantity');
                return;
            }
            if (!desc) {
                notifyWarning('Please enter product description');
                return;
            }

            const productData = {
                title: values.title,
                price: price,
                description: desc,
                specification: editorContent,
                discount: ((price - salePrice) * 100) / price,
                average_rate: 4,
                quantity_stock: quantity,
                category_id: Number.parseInt(values.categoryId),
                // collection_ids: values.collectionIds.split('').map(Number),
                collection_ids: [values.collectionIds],
            };

            const fetchApi = async () => {
                setLoading(true);

                let productResponse: any;

                if (productIdNumber) {
                    productResponse = await productServices.putProduct(
                        productData,
                        productIdNumber
                    );
                } else {
                    productResponse = await productServices.postProduct(
                        productData
                    );
                }

                console.log(productResponse.data.id);

                let isEmpty = false;

                const variantData = variants.map((variant) => {
                    if (!variant.color || !variant.size || !variant.material) {
                        isEmpty = true;
                    }
                    return {
                        product_id: productResponse.data.id,
                        color_id: +variant.color,
                        screen_size_id: +variant.size,
                        material_id: +variant.material,
                        // quantity
                    };
                });

                let variantResponse: any;

                if (productIdNumber) {
                    // delete variants truoc do
                    const res = await variantService.deleteVariants(
                        productResponse.data.id
                    );
                    if (res.status === 'OK') {
                        variantResponse = await variantService.putVariants(
                            variantData,
                            productResponse.data.id
                        );
                    }
                } else {
                    variantResponse = await variantService.postVariants(
                        variantData
                    );
                }

                if (isEmpty) {
                    const res = await productServices.deleteProductItem(
                        productResponse.data.id
                    );
                    setLoading(false);
                    setTimeout(() => {
                        notifyWarning('Variant is empty');
                    }, 100);
                    return;
                }

                if (variantResponse.status === 'CONFLICT') {
                    const res = await productServices.deleteProductItem(
                        productResponse.data.id
                    );
                    formik.resetForm();
                    setPrice('');
                    setSalePrice('');
                    setQuantity('');
                    setEditorContent('');
                    setImagesByColor({});
                    setVariants([{ color: '', size: '', material: '' }]);
                    setDesc('');

                    setLoading(false);
                    setTimeout(() => {
                        notifyError('Variant is duplicated');
                    }, 100);
                    return;
                }

                // upload images song song
                // Tạo một mảng các Promise để upload tất cả ảnh của từng color
                const uploadPromises = Object.entries(imagesByColor).map(
                    ([color, files]) => {
                        const formData = new FormData();
                        files.forEach((file) => {
                            formData.append('files', file);
                        });

                        return productImageServices.putProductImage(
                            formData,
                            productResponse.data.id,
                            Number(color)
                        );
                    }
                );

                // Thực hiện tất cả các upload song song bằng Promise.all
                const responses = await Promise.all(uploadPromises);
                responses.forEach((response, index) => {
                    const color = Object.keys(imagesByColor)[index];
                    console.log(`Kết quả từ API cho màu ${color}:`, response);
                });

                if (
                    productIdNumber &&
                    productResponse.status === 'OK' &&
                    variantResponse.status === 'OK'
                ) {
                    setLoading(false);
                    setTimeout(() => {
                        notifySuccess('Product updated successfully.');
                    }, 100);
                    return;
                }

                if (
                    productResponse.status === 'CREATED' &&
                    variantResponse.status === 'CREATED'
                ) {
                    formik.resetForm();
                    setPrice('');
                    setSalePrice('');
                    setQuantity('');
                    setEditorContent('');
                    setImagesByColor({});
                    setVariants([{ color: '', size: '', material: '' }]);
                    setDesc('');

                    setLoading(false);
                    setTimeout(() => {
                        notifyNewProductSuccess();
                    }, 100);
                }
            };
            fetchApi();
        },
    });

    // Quill.js --- editor
    const [editorContent, setEditorContent] = useState<string>(''); //for specification
    const handleEditorChange = (value: string) => {
        setEditorContent(value);
    };
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link'],
        ],
    };
    const formats = [
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'align',
        'link',
    ];

    useEffect(() => {
        const fetchApi = async () => {
            const categoryData = await categoryServices.getAllCategory();
            setCategoryList(categoryData);
            const collectionData = await collectionServices.getAllCollection();
            setCollectionList(collectionData);
            const colorData = await colorServices.getAllColor();
            setColorList(colorData);
            const materialData = await materialServices.getAllMaterial();
            setMaterialList(materialData);
            const screenSizeData = await screenSizeServices.getAllScreenSize();
            setScreenList(screenSizeData);
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const responseData = await productServices.getProductById(
                productIdNumber
            );
            formik.setFieldValue('title', responseData.title);
            setDesc(responseData.desc);
            setEditorContent(responseData.specification);
            setPrice(responseData.price);
            setSalePrice(
                responseData.discount
                    ? (
                        responseData.price *
                        (1 - responseData.discount / 100)
                    ).toFixed(2)
                    : responseData.price
            );
            setQuantity(responseData.quantityStock);
            formik.setFieldValue(
                'categoryId',
                responseData.category.categoryId
            );

            if (responseData.collections) {
                formik.setFieldValue(
                    'collectionIds',
                    responseData.collections[0].collectionId
                );
            }

            let newVariants: Variant[] = [];
            responseData.variants?.forEach((variantRes) =>
                newVariants.push({
                    color: variantRes.color.colorId + '',
                    size: variantRes.screenSize.sizeId + '',
                    material: variantRes.material.materialId + '',
                })
            );
            setVariants(newVariants);

            let newSelectedColorList: string[] = [];
            responseData.colors.forEach((color) =>
                newSelectedColorList.push(color.colorId + '')
            );
            setSelectedColorList(newSelectedColorList);
            setSelectedColor(newSelectedColorList[0]);

            responseData.colors.forEach((color) => {
                // Lay ra mang anh theo color id
                const productImagesByColor = responseData.productImages.filter(
                    (productImage) => productImage.colorId === color.colorId
                );
                convertUrlsToFiles(productImagesByColor).then((files) => {
                    // Cập nhật ảnh cho màu hiện tại
                    setImagesByColor((prev) => ({
                        ...prev,
                        [color.colorId]: files,
                    }));
                });
            });
            setLoading(false);
        };
        if (productIdNumber) {
            fetchApi();
        } else {
            const fetchApi = async () => {
                const categoryData = await categoryServices.getAllCategory();
                formik.setFieldValue(
                    'categoryId',
                    categoryData.at(0)?.categoryId
                );
                const collectionData =
                    await collectionServices.getAllCollection();
                formik.setFieldValue(
                    'collectionIds',
                    collectionData.at(0)?.collectionId
                );
            };
            fetchApi();
        }
    }, [productIdNumber]);

    const convertUrlsToFiles = async (images: any): Promise<File[]> => {
        const files: File[] = await Promise.all(
            images.map(async (image: any, index: any) => {
                const response = await fetch(image.imageUrl);
                const blob = await response.blob();
                return new File([blob], image.imageName, { type: blob.type });
            })
        );
        return files;
    };

    // Hàm xử lý khi chọn màu
    const handleColorChange = (colorId: string) => {
        setSelectedColor(colorId);
        setShowDropdown(false);
    };

    // Hàm xử lý khi chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length && event.target.files?.length > 6) {
            notifyWarning('Enter up to 6 images per color.');
            return;
        }

        if (event.target.files && selectedColor) {
            const files = Array.from(event.target.files);

            const validFile = files.find(
                (file) =>
                    file.name.includes('.jpg') ||
                    file.name.includes('.png') ||
                    file.name.includes('.gif') ||
                    file.name.includes('.bmp')
            );

            if (!validFile) {
                notifyError('Only jpg, png, gif, bmp files are allowed');
                return;
            }

            // Cập nhật ảnh cho màu hiện tại
            setImagesByColor((prev) => ({
                ...prev,
                [selectedColor]: files,
            }));
        }
    };

    // Hàm xóa file theo index
    const handleRemoveFile = (index: number) => {
        const updatedFiles = imagesByColor[selectedColor].filter(
            (file, i) => i !== index
        );

        setImagesByColor((prev) => ({
            ...prev,
            [selectedColor]: updatedFiles,
        }));
    };

    const addOption = () => {
        setVariants([...variants, { color: '', size: '', material: '' }]);
    };

    const removeOption = (index: number) => {
        const updatedVariants = variants.filter((_, i) => i !== index);

        const colorList = updatedVariants.map((variant) => variant.color);
        const result: string[] = [];
        colorList?.forEach((colorId) => {
            let count = 0;
            for (let index = 0; index < result.length; index++) {
                if (colorId === result[index]) {
                    count++;
                    break;
                }
            }
            if (count === 0) {
                result.push(colorId);
            }
        });

        const sortResult = result.sort((a: any, b: any) => a - b);

        if (sortResult.length === 0) {
            // setSelectedColor('Color');
        }

        setSelectedColorList(sortResult);
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleSelectChange = (
        index: number,
        field: keyof Variant,
        value: string
    ) => {
        const updatedVariants = variants.map((variant, i) =>
            i === index ? { ...variant, [field]: value } : variant
        );
        const colorList = updatedVariants.map((variant) => variant.color);
        const result: string[] = [];
        colorList?.forEach((colorId) => {
            let count = 0;
            for (let index = 0; index < result.length; index++) {
                if (colorId === result[index]) {
                    count++;
                    break;
                }
            }
            if (count === 0) {
                result.push(colorId);
            }
        });

        const sortResult = result.sort((a: any, b: any) => a - b);

        setSelectedColorList(sortResult);
        setVariants(updatedVariants);
        setShowDropdownOption(-1);
    };

    const handleNewCategory = async () => {
        if (!categoryName.trim()) {
            notifyWarning('Please fill in information before adding');
            return;
        }

        //check Category is exist?
        const resCategory = await categoryServices.getAllCategory();
        const categoryItem = resCategory.find(
            (item) => item.name === categoryName
        );

        if (categoryItem) {
            notifyError('Category has been added.');
        } else {
            const res = await categoryServices.postCategory({
                name: categoryName,
            });
            if (res.status === 'CREATED') {
                notifySuccess('Category added successfully.');
            }
        }
        setCategoryName('');
    };

    const handleNewCollection = async () => {
        if (!collectionName.trim()) {
            notifyWarning('Please fill in information before adding');
            return;
        }

        //check collection is exist?
        const resCollection = await collectionServices.getAllCollection();
        const collectionItem = resCollection.find(
            (item) => item.name === collectionName
        );

        if (collectionItem) {
            notifyError('Collection has been added.');
        } else {
            const res = await collectionServices.postCollection({
                name: collectionName,
            });
            if (res.status === 'CREATED') {
                notifySuccess('Collection added successfully.');
            }
        }
        setCollectionName('');
    };

    const handleNewColor = async () => {
        if (!colorName.trim()) {
            notifyWarning('Please fill in information before adding');
            return;
        }

        // convert hex to rgba
        const r = parseInt(colorCode.slice(1, 3), 16);
        const g = parseInt(colorCode.slice(3, 5), 16);
        const b = parseInt(colorCode.slice(5, 7), 16);

        //check color is exist?
        const resColor = await colorServices.getAllColor();
        const colorItem = resColor.find(
            (item) => item.red === r && item.green === g && item.blue === b
        );

        if (colorItem) {
            notifyError('Color has been added.');
        } else {
            const res = await colorServices.postColor({
                name: colorName,
                red: Number(r),
                green: Number(g),
                blue: Number(b),
                alpha: 1,
            });

            if (res.status === 'CREATED') {
                notifySuccess('Color added successfully.');
            }
        }

        setColorName('');
        setColorCode('#000000');
    };

    const handleNewScreenSize = async () => {
        if (!size.trim()) {
            notifyWarning('Please fill in information before adding');
            return;
        }

        //check size is exist?
        const resScreenSize = await screenSizeServices.getAllScreenSize();
        const screenSizeItem = resScreenSize.find(
            (item) => item.size === Number(size)
        );

        if (screenSizeItem) {
            notifyError('Size has been added.');
        } else {
            const res = await screenSizeServices.postScreenSize({
                size: Number(size),
            });
            if (res.status === 'CREATED') {
                notifySuccess('Size added successfully.');
            }
        }
        setSize('');
    };
    const handleNewMaterial = async () => {
        if (!materialName.trim()) {
            notifyWarning('Please fill in information before adding');
            return;
        }

        //check material is exist?
        const resMaterial = await materialServices.getAllMaterial();
        const materialItem = resMaterial.find(
            (item) => item.name === materialName
        );

        if (materialItem) {
            notifyError('Material has been added.');
        } else {
            const res = await materialServices.postMaterial({
                name: materialName,
            });

            if (res.status === 'CREATED') {
                notifySuccess('Material added successfully.');
            }
        }
        setMaterialName('');
    };

    if (loading) {
        return <PreLoader show></PreLoader>;
    }

    return (
        <>
            <form className={cx('new')} onSubmit={formik.handleSubmit}>
                <div className={cx('new__top')}>
                    <h1 className={cx('new__title')}>
                        {productIdNumber ? 'Edit product' : 'Add a product'}
                    </h1>
                    <div className={cx('new__row')}>
                        <p className={cx('new__text')}>
                            Orders placed across your store
                        </p>
                        <div>
                            <Button type="button" className={cx('new__btn')}>
                                Discard
                            </Button>
                            <Button type="button" className={cx('new__btn')}>
                                Save draft
                            </Button>
                            <Button
                                type="submit"
                                primary
                                className={cx('new__btn')}
                            >
                                {productIdNumber
                                    ? 'Change product'
                                    : 'Publish product'}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ width: '100%' }}>
                    <div className="row">
                        <div className="col col-8">
                            <div className={cx('new__left')}>
                                <div className={cx('product')}>
                                    <h4 className={cx('new__label')}>
                                        Product Title
                                    </h4>
                                    <input
                                        value={formik.values.title}
                                        type="text"
                                        name="title"
                                        id="title"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={cx('product__title-input')}
                                        placeholder="Write title here..."
                                    />
                                    {formik.errors.title &&
                                        formik.touched.title && (
                                            <div
                                                className={cx('product__error')}
                                            >
                                                <ErrorIcon
                                                    width="1.4rem"
                                                    height="1.4rem"
                                                ></ErrorIcon>
                                                <span
                                                    className={cx(
                                                        'form__error-title'
                                                    )}
                                                >
                                                    {formik.errors.title}
                                                </span>
                                            </div>
                                        )}
                                    <h4
                                        className={cx('new__label')}
                                        style={{ marginTop: 30 }}
                                    >
                                        Product Subtitle
                                    </h4>
                                    <textarea
                                        value={desc}
                                        name="desc"
                                        id="desc"
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                        className={cx('product__title-input')}
                                        placeholder="Write subtitle here..."
                                        style={{
                                            resize: 'none',
                                            fontFamily: 'var(--font-family)',
                                        }}
                                    />
                                    <h4
                                        className={cx('new__label')}
                                        style={{ marginTop: 30 }}
                                    >
                                        Product Description
                                    </h4>
                                    <div className={cx('product__editor')}>
                                        <ReactQuill
                                            value={editorContent}
                                            onChange={handleEditorChange}
                                            modules={modules}
                                            formats={formats}
                                            theme="snow"
                                            placeholder="Write description here..."
                                            className={cx('product__quill')}
                                        />
                                        {/* <div> */}
                                        {/* <h3>Output:</h3> */}
                                        {/* Dùng dangerouslySetInnerHTML để hiển thị nội dung HTML */}
                                        {/* <div dangerouslySetInnerHTML={{ __html: editorContent }} /> */}
                                        {/* </div> */}
                                    </div>
                                    <h4 className={cx('new__label')}>
                                        Display images
                                    </h4>
                                    {/* Color */}
                                    {/* <select
                                        name="colorImg"
                                        id="colorImg"
                                        value={selectedColor}
                                        className={cx(
                                            'checkout__select'
                                        )}
                                        onChange={handleColorChange}
                                        style={{ width: '35%' }}
                                    >
                                        <option value="" disabled selected>
                                            Color
                                        </option >
                                        {
                                            selectedColorList.map(colorItem => <option key={colorItem} value={colorItem} style={{ color: `rgba(${colorList.find(item => item.colorId + '' === colorItem)?.red}, ${colorList.find(item => item.colorId + '' === colorItem)?.green}, ${colorList.find(item => item.colorId + '' === colorItem)?.blue}, 1)` }}>
                                                {colorList.filter(item => item.colorId + '' === colorItem).at(0)?.name}
                                            </option>)
                                        }
                                    </select> */}
                                    <Tippy
                                        visible={
                                            showDropdown &&
                                            selectedColorList.length > 0
                                        }
                                        interactive
                                        delay={[0, 300]}
                                        offset={[0, 5]}
                                        placement="bottom-start"
                                        onClickOutside={() =>
                                            setShowDropdown(false)
                                        }
                                        render={(attrs) => (
                                            <div
                                                className={cx(
                                                    'color-select__container'
                                                )}
                                            >
                                                {selectedColorList.map(
                                                    (colorItem) => (
                                                        <div
                                                            key={colorItem}
                                                            className={cx(
                                                                'color-select__item'
                                                            )}
                                                            style={{
                                                                color: `rgba(${colorList.find(
                                                                    (
                                                                        item
                                                                    ) =>
                                                                        item.colorId +
                                                                        '' ===
                                                                        colorItem
                                                                )?.red
                                                                    }, ${colorList.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.colorId +
                                                                            '' ===
                                                                            colorItem
                                                                    )?.green
                                                                    }, ${colorList.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.colorId +
                                                                            '' ===
                                                                            colorItem
                                                                    )?.blue
                                                                    }, 1)`,
                                                            }}
                                                            onClick={() =>
                                                                handleColorChange(
                                                                    colorItem
                                                                )
                                                            }
                                                        >
                                                            {
                                                                colorList.find(
                                                                    (item) =>
                                                                        item.colorId +
                                                                        '' ===
                                                                        colorItem
                                                                )?.name
                                                            }
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    >
                                        <Button
                                            type="button"
                                            className={cx('color-select')}
                                            leftIcon={
                                                <span
                                                    className={cx(
                                                        'color-select__shape'
                                                    )}
                                                    style={{
                                                        backgroundColor: `rgba(${colorList.find(
                                                            (item) =>
                                                                item.colorId +
                                                                '' ===
                                                                selectedColor
                                                        )?.red
                                                            }, ${colorList.find(
                                                                (item) =>
                                                                    item.colorId +
                                                                    '' ===
                                                                    selectedColor
                                                            )?.green
                                                            }, ${colorList.find(
                                                                (item) =>
                                                                    item.colorId +
                                                                    '' ===
                                                                    selectedColor
                                                            )?.blue
                                                            }, 1)`,
                                                    }}
                                                ></span>
                                            }
                                            rightIcon={
                                                <FontAwesomeIcon
                                                    width={12}
                                                    height={12}
                                                    icon={faChevronDown}
                                                />
                                            }
                                            onClick={() =>
                                                setShowDropdown(!showDropdown)
                                            }
                                        >
                                            {colorList.find(
                                                (item) =>
                                                    item.colorId + '' ===
                                                    selectedColor
                                            )?.name || 'Color'}
                                        </Button>
                                    </Tippy>
                                    <div
                                        className={cx(
                                            'product__file-container'
                                        )}
                                    >
                                        {selectedColor &&
                                            imagesByColor[selectedColor] &&
                                            imagesByColor[selectedColor].map(
                                                (file, index) => (
                                                    <div
                                                        key={index}
                                                        className={cx(
                                                            'product__file-wrapper'
                                                        )}
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(
                                                                file
                                                            )}
                                                            alt={file.name}
                                                            className={cx(
                                                                'product__file-img'
                                                            )}
                                                        />
                                                        <Button
                                                            type="button"
                                                            className={cx(
                                                                'product__close-btn'
                                                            )}
                                                            onClick={() =>
                                                                handleRemoveFile(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <CloseIcon
                                                                width="8"
                                                                height="8"
                                                            ></CloseIcon>
                                                        </Button>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                    <label
                                        htmlFor="input"
                                        className={cx(
                                            'product__img-container',
                                            {
                                                // disable: !selectedColor
                                            }
                                        )}
                                        onClick={(e) => {
                                            if (!selectedColor) {
                                                e.preventDefault();
                                                notifyWarning(
                                                    'Please select color before uploading image.'
                                                );
                                            }
                                        }}
                                    >
                                        <input
                                            type="file"
                                            multiple
                                            hidden
                                            id="input"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                        <div className={cx('product__inner')}>
                                            <span>Drag your photo here </span>
                                            <span>or</span>
                                            <label
                                                htmlFor="input"
                                                className={cx('product__btn')}
                                            >
                                                Browse from device
                                            </label>
                                            <br />
                                            <Image
                                                src={images.addImg}
                                                alt="icon"
                                                className={cx('product__icon')}
                                            ></Image>
                                        </div>
                                    </label>
                                    <h4 className={cx('new__label')}>
                                        Inventory
                                    </h4>
                                    <div className={cx('inventory')}>
                                        <div className="row">
                                            <div className="col col-4">
                                                <div
                                                    className={cx(
                                                        'inventory__tablist'
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'inventory__tab-item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    1,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setActiveInventory(
                                                                1
                                                            )
                                                        }
                                                    >
                                                        <PricingIcon></PricingIcon>
                                                        <span>Pricing</span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__tab-item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    2,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setActiveInventory(
                                                                2
                                                            )
                                                        }
                                                    >
                                                        <RestockIcon></RestockIcon>
                                                        <span>Restock</span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__tab-item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    3,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setActiveInventory(
                                                                3
                                                            )
                                                        }
                                                    >
                                                        <TransitionIcon></TransitionIcon>
                                                        <span>Shipping</span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__tab-item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    4,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setActiveInventory(
                                                                4
                                                            )
                                                        }
                                                    >
                                                        <GlobalIcon></GlobalIcon>
                                                        <span>
                                                            Global Delivery
                                                        </span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__tab-item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    5,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setActiveInventory(
                                                                5
                                                            )
                                                        }
                                                    >
                                                        <AttributeIcon></AttributeIcon>
                                                        <span>Attributes</span>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__tab-item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    6,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setActiveInventory(
                                                                6
                                                            )
                                                        }
                                                    >
                                                        <SecureIcon></SecureIcon>
                                                        <span>Advanced</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col col-8">
                                                <div
                                                    className={cx(
                                                        'inventory__list'
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            'inventory__item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    1,
                                                            }
                                                        )}
                                                    >
                                                        <div className="row row-cols-2">
                                                            <div className="col">
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Regular
                                                                    price
                                                                </h5>
                                                                <input
                                                                    value={
                                                                        price
                                                                    }
                                                                    type="number"
                                                                    className={cx(
                                                                        'inventory__input'
                                                                    )}
                                                                    placeholder="$$$"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setPrice(
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col">
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Sale price
                                                                </h5>
                                                                <input
                                                                    value={
                                                                        salePrice
                                                                    }
                                                                    type="number"
                                                                    className={cx(
                                                                        'inventory__input'
                                                                    )}
                                                                    placeholder="$$$"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSalePrice(
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    2,
                                                            }
                                                        )}
                                                    >
                                                        <h5
                                                            className={cx(
                                                                'inventory__label'
                                                            )}
                                                        >
                                                            Add to Stock
                                                        </h5>
                                                        <div
                                                            className={cx(
                                                                'inventory__quantity-wrapper'
                                                            )}
                                                        >
                                                            <input
                                                                value={quantity}
                                                                type="number"
                                                                placeholder="Quantity"
                                                                className={cx(
                                                                    'inventory__input'
                                                                )}
                                                                style={{
                                                                    maxWidth:
                                                                        '385px',
                                                                }}
                                                                onChange={(e) =>
                                                                    setQuantity(
                                                                        Number.parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                type="button"
                                                                primary
                                                                leftIcon={
                                                                    <CheckNoCircleIcon
                                                                        width="1.6rem"
                                                                        height="1.6rem"
                                                                    ></CheckNoCircleIcon>
                                                                }
                                                                className={cx(
                                                                    'inventory__btn',
                                                                    {
                                                                        'd-none':
                                                                            true,
                                                                    }
                                                                )}
                                                            >
                                                                Confirm
                                                            </Button>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'inventory__bottom',
                                                                {
                                                                    'd-none':
                                                                        true,
                                                                }
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'inventory__row'
                                                                )}
                                                            >
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Product in
                                                                    stock now:
                                                                </h5>
                                                                <span>
                                                                    $1,090
                                                                </span>
                                                                <Button
                                                                    type="button"
                                                                    style={{
                                                                        padding: 0,
                                                                    }}
                                                                >
                                                                    <svg
                                                                        width={
                                                                            12
                                                                        }
                                                                        height={
                                                                            12
                                                                        }
                                                                        aria-hidden="true"
                                                                        focusable="false"
                                                                        data-prefix="fas"
                                                                        data-icon="rotate"
                                                                        role="img"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 512 512"
                                                                    >
                                                                        <path
                                                                            fill="currentColor"
                                                                            d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
                                                                        ></path>
                                                                    </svg>
                                                                </Button>
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    'inventory__row'
                                                                )}
                                                            >
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Product in
                                                                    transit:
                                                                </h5>
                                                                <span>
                                                                    {' '}
                                                                    5000
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    'inventory__row'
                                                                )}
                                                            >
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Last time
                                                                    restocked:
                                                                </h5>
                                                                <span>
                                                                    30th June,
                                                                    2024
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    'inventory__row'
                                                                )}
                                                            >
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Total stock
                                                                    over
                                                                    lifetime:
                                                                </h5>
                                                                <span>
                                                                    20,000
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    3,
                                                            }
                                                        )}
                                                    >
                                                        <h5
                                                            className={cx(
                                                                'inventory__label'
                                                            )}
                                                        >
                                                            Shipping Type
                                                        </h5>
                                                        <div
                                                            className={cx(
                                                                'inventory__shipping-type'
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'checkout__radio-wrapper'
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    id="seller"
                                                                    hidden
                                                                    className={cx(
                                                                        'checkout__radio'
                                                                    )}
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        'seller'
                                                                    }
                                                                    className={cx(
                                                                        'checkout__radio-label'
                                                                    )}
                                                                >
                                                                    Fullfilled
                                                                    by Seller
                                                                </label>
                                                            </div>
                                                            <p
                                                                className={cx(
                                                                    'inventory__desc'
                                                                )}
                                                            >
                                                                You’ll be
                                                                responsible for
                                                                product
                                                                delivery.
                                                                <br />
                                                                Any damage or
                                                                delay during
                                                                shipping may
                                                                cost you a
                                                                Damage fee.
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'inventory__shipping-type'
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'checkout__radio-wrapper'
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    id="seller"
                                                                    hidden
                                                                    checked
                                                                    className={cx(
                                                                        'checkout__radio'
                                                                    )}
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        'seller'
                                                                    }
                                                                    className={cx(
                                                                        'checkout__radio-label'
                                                                    )}
                                                                >
                                                                    Fullfilled
                                                                    by Timevo
                                                                </label>
                                                            </div>
                                                            <p
                                                                className={cx(
                                                                    'inventory__desc'
                                                                )}
                                                            >
                                                                Your product,
                                                                Our
                                                                responsibility.
                                                                <br />
                                                                For a measly
                                                                fee, we will
                                                                handle the
                                                                delivery process
                                                                for you.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    4,
                                                            }
                                                        )}
                                                    >
                                                        <h5
                                                            className={cx(
                                                                'inventory__label'
                                                            )}
                                                        >
                                                            Global Delivery
                                                        </h5>
                                                        <div
                                                            className={cx(
                                                                'inventory__shipping-type'
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'checkout__radio-wrapper'
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    id="seller"
                                                                    hidden
                                                                    className={cx(
                                                                        'checkout__radio'
                                                                    )}
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        'seller'
                                                                    }
                                                                    className={cx(
                                                                        'checkout__radio-label'
                                                                    )}
                                                                >
                                                                    Worldwide
                                                                    delivery
                                                                </label>
                                                            </div>
                                                            <p
                                                                className={cx(
                                                                    'inventory__desc'
                                                                )}
                                                            >
                                                                Only available
                                                                with Shipping
                                                                method:{' '}
                                                                <Link
                                                                    to={'#!'}
                                                                    style={{
                                                                        color: 'var(--primary-second-color)',
                                                                        fontSize:
                                                                            '1.4rem',
                                                                    }}
                                                                >
                                                                    Fullfilled
                                                                    by Timevo
                                                                </Link>
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'inventory__shipping-type'
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'checkout__radio-wrapper'
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    id="seller"
                                                                    hidden
                                                                    className={cx(
                                                                        'checkout__radio'
                                                                    )}
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        'seller'
                                                                    }
                                                                    className={cx(
                                                                        'checkout__radio-label'
                                                                    )}
                                                                >
                                                                    Selected
                                                                    Countries
                                                                </label>
                                                            </div>
                                                            <select
                                                                name="country"
                                                                id="country"
                                                                className={cx(
                                                                    'checkout__select'
                                                                )}
                                                            >
                                                                <option
                                                                    value=""
                                                                    disabled
                                                                >
                                                                    Country/Region
                                                                </option>
                                                                <option
                                                                    value="VN"
                                                                    selected
                                                                >
                                                                    Vietnam
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'inventory__shipping-type'
                                                            )}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    'checkout__radio-wrapper'
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    id="seller"
                                                                    hidden
                                                                    checked
                                                                    className={cx(
                                                                        'checkout__radio'
                                                                    )}
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        'seller'
                                                                    }
                                                                    className={cx(
                                                                        'checkout__radio-label'
                                                                    )}
                                                                >
                                                                    Local
                                                                    delivery
                                                                </label>
                                                            </div>
                                                            <p
                                                                className={cx(
                                                                    'inventory__desc'
                                                                )}
                                                            >
                                                                Deliver to your
                                                                country of
                                                                residence{' '}
                                                                <Link
                                                                    to={'#!'}
                                                                    style={{
                                                                        color: 'var(--primary-second-color)',
                                                                        fontSize:
                                                                            '1.4rem',
                                                                    }}
                                                                >
                                                                    {' '}
                                                                    Change
                                                                    profile
                                                                    address
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    5,
                                                            }
                                                        )}
                                                    >
                                                        <h5
                                                            className={cx(
                                                                'inventory__label'
                                                            )}
                                                        >
                                                            Attributes
                                                        </h5>
                                                        <div
                                                            className={cx(
                                                                'inventory__checkbox-wrapper'
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id="inventory__checkbox1"
                                                                className={cx(
                                                                    'inventory__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="inventory__checkbox1"
                                                                className={cx(
                                                                    'inventory__label-checkbox'
                                                                )}
                                                            >
                                                                Fragile Product
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'inventory__checkbox-wrapper'
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id="inventory__checkbox2"
                                                                className={cx(
                                                                    'inventory__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="inventory__checkbox2"
                                                                className={cx(
                                                                    'inventory__label-checkbox'
                                                                )}
                                                            >
                                                                Biodegradable
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'inventory__checkbox-wrapper'
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id="inventory__checkbox3"
                                                                className={cx(
                                                                    'inventory__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="inventory__checkbox3"
                                                                className={cx(
                                                                    'inventory__label-checkbox'
                                                                )}
                                                            >
                                                                Frozen Product
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="Max. allowed Temperature"
                                                                className={cx(
                                                                    'inventory__input'
                                                                )}
                                                                style={{
                                                                    marginLeft:
                                                                        '28px',
                                                                    maxWidth:
                                                                        '350px',
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                'inventory__checkbox-wrapper'
                                                            )}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id="inventory__checkbox4"
                                                                className={cx(
                                                                    'inventory__checkbox'
                                                                )}
                                                                hidden
                                                            />
                                                            <label
                                                                htmlFor="inventory__checkbox4"
                                                                className={cx(
                                                                    'inventory__label-checkbox'
                                                                )}
                                                            >
                                                                Expiry Date of
                                                                Product
                                                            </label>
                                                            <input
                                                                type="date"
                                                                placeholder="Max. allowed Temperature"
                                                                className={cx(
                                                                    'inventory__input'
                                                                )}
                                                                style={{
                                                                    marginLeft:
                                                                        '28px',
                                                                    maxWidth:
                                                                        '350px',
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            'inventory__item',
                                                            {
                                                                active:
                                                                    activeInventory ===
                                                                    6,
                                                            }
                                                        )}
                                                    >
                                                        <h5
                                                            className={cx(
                                                                'inventory__label'
                                                            )}
                                                            style={{
                                                                marginBottom:
                                                                    '16px',
                                                            }}
                                                        >
                                                            Advanced
                                                        </h5>

                                                        <div className="row row-cols-2">
                                                            <div className="col">
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Product ID
                                                                    Type
                                                                </h5>
                                                                <select
                                                                    name="country"
                                                                    id="country"
                                                                    className={cx(
                                                                        'checkout__select'
                                                                    )}
                                                                >
                                                                    <option
                                                                        value="ISBN"
                                                                        selected
                                                                    >
                                                                        ISBN
                                                                    </option>
                                                                    <option value="UPC">
                                                                        UPC
                                                                    </option>
                                                                    <option value="EAN">
                                                                        EAN
                                                                    </option>
                                                                    <option value="JAN">
                                                                        JAN
                                                                    </option>
                                                                </select>
                                                            </div>
                                                            <div className="col">
                                                                <h5
                                                                    className={cx(
                                                                        'inventory__label'
                                                                    )}
                                                                >
                                                                    Product ID
                                                                </h5>
                                                                <input
                                                                    type="number"
                                                                    className={cx(
                                                                        'inventory__input'
                                                                    )}
                                                                    placeholder="ISBN Number"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-4">
                            <div className={cx('new__right')}>
                                <div className={cx('organize')}>
                                    <h4
                                        className={cx('new__label')}
                                        style={{ marginBottom: '24px' }}
                                    >
                                        Organize
                                    </h4>
                                    {/* Category */}
                                    <div className={cx('organize__group')}>
                                        <div className={cx('organize__top')}>
                                            <h5
                                                className={cx(
                                                    'organize__title'
                                                )}
                                            >
                                                Category
                                            </h5>
                                            <Button
                                                type="button"
                                                className={cx('organize__btn')}
                                                onClick={() =>
                                                    setShowNewModal(4)
                                                }
                                            >
                                                Add new category
                                            </Button>
                                        </div>
                                        <select
                                            value={formik.values.categoryId}
                                            name="categoryId"
                                            id="categoryId"
                                            className={cx('checkout__select')}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            {categoryList.map((category) => (
                                                <option
                                                    key={category.categoryId}
                                                    value={category.categoryId}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.errors.categoryId &&
                                            formik.touched.categoryId && (
                                                <div
                                                    className={cx(
                                                        'product__error'
                                                    )}
                                                >
                                                    <ErrorIcon
                                                        width="1.4rem"
                                                        height="1.4rem"
                                                    ></ErrorIcon>
                                                    <span
                                                        className={cx(
                                                            'form__error-title'
                                                        )}
                                                    >
                                                        {
                                                            formik.errors
                                                                .categoryId
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                    {/* Vendor */}
                                    <div className={cx('organize__group')}>
                                        <div className={cx('organize__top')}>
                                            <h5
                                                className={cx(
                                                    'organize__title'
                                                )}
                                            >
                                                Vendor
                                            </h5>
                                            <Button
                                                type="button"
                                                className={cx('organize__btn')}
                                            >
                                                Add new vendor
                                            </Button>
                                        </div>
                                        <select
                                            name="country"
                                            id="country"
                                            className={cx('checkout__select')}
                                        >
                                            <option value="Sennheiser" selected>
                                                Sennheiser
                                            </option>
                                            <option value="Fitz">Fitz</option>
                                            <option value="Fitz">
                                                Skullcandy
                                            </option>
                                            <option value="Fitz">
                                                Bluedio
                                            </option>
                                            <option value="Fitz">Skyup</option>
                                        </select>
                                    </div>
                                    {/* Collection */}
                                    <div className={cx('organize__group')}>
                                        <div className={cx('organize__top')}>
                                            <h5
                                                className={cx(
                                                    'organize__title'
                                                )}
                                            >
                                                Collection
                                            </h5>
                                            <Button
                                                type="button"
                                                className={cx('organize__btn')}
                                                onClick={() =>
                                                    setShowNewModal(5)
                                                }
                                            >
                                                Add new collection
                                            </Button>
                                        </div>
                                        <select
                                            name="collectionIds"
                                            id="collectionIds"
                                            className={cx('checkout__select')}
                                            value={formik.values.collectionIds}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            {collectionList.map(
                                                (collection) => (
                                                    <option
                                                        key={
                                                            collection.collectionId
                                                        }
                                                        value={
                                                            collection.collectionId
                                                        }
                                                    >
                                                        {collection.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    {/* Tags */}
                                    <div className={cx('organize__group')}>
                                        <div className={cx('organize__top')}>
                                            <h5
                                                className={cx(
                                                    'organize__title'
                                                )}
                                            >
                                                Tags
                                            </h5>
                                            <Button
                                                type="button"
                                                className={cx('organize__btn')}
                                            >
                                                View all tags
                                            </Button>
                                        </div>
                                        <select
                                            name="country"
                                            id="country"
                                            className={cx('checkout__select')}
                                        >
                                            <option value="Sennheiser" selected>
                                                Sennheiser
                                            </option>
                                            <option value="Fitz">Fitz</option>
                                            <option value="Fitz">
                                                Skullcandy
                                            </option>
                                            <option value="Fitz">
                                                Bluedio
                                            </option>
                                            <option value="Fitz">Skyup</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={cx('organize')}>
                                    <h4 className={cx('new__label')}>
                                        Variants
                                    </h4>
                                    <div
                                        className={cx('organize__news')}
                                        style={{ marginBottom: '24px' }}
                                    >
                                        <Button
                                            type="button"
                                            className={cx('organize__new-btn')}
                                            rightIcon={
                                                <FontAwesomeIcon
                                                    icon={faPalette}
                                                />
                                            }
                                            onClick={() => setShowNewModal(1)}
                                        >
                                            Add new color
                                        </Button>
                                        <Button
                                            type="button"
                                            className={cx('organize__new-btn')}
                                            rightIcon={
                                                <FontAwesomeIcon
                                                    icon={faPenRuler}
                                                />
                                            }
                                            onClick={() => setShowNewModal(2)}
                                        >
                                            Add new size
                                        </Button>
                                        <Button
                                            type="button"
                                            className={cx('organize__new-btn')}
                                            rightIcon={
                                                <FontAwesomeIcon
                                                    icon={faLayerGroup}
                                                />
                                            }
                                            onClick={() => setShowNewModal(3)}
                                        >
                                            Add new material
                                        </Button>
                                    </div>
                                    {/* Options */}
                                    {variants.map((variant, index) => (
                                        <div
                                            className={cx(
                                                'organize__group',
                                                'modifier'
                                            )}
                                            key={index}
                                        >
                                            <div
                                                className={cx('organize__top')}
                                            >
                                                <h5
                                                    className={cx(
                                                        'organize__title'
                                                    )}
                                                >
                                                    Option {index + 1}
                                                </h5>
                                                <Button
                                                    type="button"
                                                    className={cx(
                                                        'organize__btn'
                                                    )}
                                                    onClick={() =>
                                                        removeOption(index)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                            {/* Color */}
                                            {/* <select
                                                name="color"
                                                id="color"
                                                value={variant.color}
                                                className={cx(
                                                    'checkout__select'
                                                )}
                                                onChange={(e) => handleSelectChange(index, 'color', e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    Color
                                                </option>
                                                {
                                                    colorList.map(colorItem => <option key={colorItem.colorId} value={colorItem.colorId}>
                                                        {colorItem.name}
                                                    </option>)
                                                }
                                            </select> */}
                                            <Tippy
                                                visible={
                                                    showDropdownOption === index
                                                }
                                                interactive
                                                delay={[0, 300]}
                                                offset={[0, -1]}
                                                placement="bottom-start"
                                                onClickOutside={() =>
                                                    setShowDropdownOption(-1)
                                                }
                                                render={(attrs) => (
                                                    <div
                                                        className={cx(
                                                            'color-select__container'
                                                        )}
                                                        style={{
                                                            width: '100%',
                                                            minWidth: '100%',
                                                        }}
                                                    >
                                                        {colorList.map(
                                                            (colorItem) => (
                                                                <div
                                                                    key={
                                                                        colorItem.colorId
                                                                    }
                                                                    className={cx(
                                                                        'color-select__item'
                                                                    )}
                                                                    style={{
                                                                        color: `rgba(${colorItem.red}, ${colorItem.green}, ${colorItem.blue}, 1)`,
                                                                    }}
                                                                    onClick={() =>
                                                                        handleSelectChange(
                                                                            index,
                                                                            'color',
                                                                            colorItem.colorId +
                                                                            ''
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        colorItem.name
                                                                    }
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            >
                                                <Button
                                                    type="button"
                                                    className={cx(
                                                        'color-select'
                                                    )}
                                                    leftIcon={
                                                        <span
                                                            className={cx(
                                                                'color-select__shape'
                                                            )}
                                                            style={{
                                                                backgroundColor: `rgba(${colorList.find(
                                                                    (
                                                                        item
                                                                    ) =>
                                                                        item.colorId +
                                                                        '' ===
                                                                        variant.color
                                                                )?.red
                                                                    }, ${colorList.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.colorId +
                                                                            '' ===
                                                                            variant.color
                                                                    )?.green
                                                                    }, ${colorList.find(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.colorId +
                                                                            '' ===
                                                                            variant.color
                                                                    )?.blue
                                                                    }, 1)`,
                                                            }}
                                                        ></span>
                                                    }
                                                    rightIcon={
                                                        <FontAwesomeIcon
                                                            width={10}
                                                            height={10}
                                                            icon={faChevronDown}
                                                        />
                                                    }
                                                    style={{
                                                        width: '100%',
                                                        marginBottom: '16px',
                                                    }}
                                                    onClick={() =>
                                                        setShowDropdownOption(
                                                            (prevIndex) =>
                                                                prevIndex ===
                                                                    index
                                                                    ? -1
                                                                    : index
                                                        )
                                                    }
                                                >
                                                    {colorList.find(
                                                        (item) =>
                                                            item.colorId +
                                                            '' ===
                                                            variant.color
                                                    )?.name || 'Color'}
                                                </Button>
                                            </Tippy>
                                            {/* Size */}
                                            <select
                                                name="size"
                                                id="size"
                                                value={variant.size}
                                                className={cx(
                                                    'checkout__select'
                                                )}
                                                onChange={(e) =>
                                                    handleSelectChange(
                                                        index,
                                                        'size',
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Size
                                                </option>
                                                {screenSizeList.map((item) => (
                                                    <option
                                                        value={item.sizeId}
                                                        key={item.sizeId}
                                                    >
                                                        {item.size}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* Material */}
                                            <select
                                                name="material"
                                                id="material"
                                                value={variant.material}
                                                className={cx(
                                                    'checkout__select'
                                                )}
                                                onChange={(e) =>
                                                    handleSelectChange(
                                                        index,
                                                        'material',
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    selected
                                                >
                                                    Material
                                                </option>
                                                {materialList.map((item) => (
                                                    <option
                                                        value={item.materialId}
                                                        key={item.materialId}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        className={cx('organize__add-btn')}
                                        onClick={addOption}
                                    >
                                        {variants.length === 0
                                            ? 'Add an option'
                                            : 'Add another option'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* New color */}
            <div
                className={cx('new-modal', {
                    show: showNewModal === 1,
                })}
            >
                <div
                    className={cx('new-modal__overlay')}
                    onClick={() => setShowNewModal(0)}
                ></div>
                <div className={cx('new-modal__inner')}>
                    <h5 className={cx('new-modal__heading')}>Add New Color</h5>
                    <div className={cx('new-modal__content')}>
                        <div className={cx('new-modal__input')}>
                            <label htmlFor="firstName">Color name</label>
                            <input
                                value={colorName}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter color name"
                                onChange={(e) => setColorName(e.target.value)}
                            />
                        </div>
                        <div className={cx('new-modal__input-container')}>
                            <label htmlFor="code">Pick a color</label>
                            <input
                                value={colorCode}
                                type="color"
                                name="code"
                                id="code"
                                onChange={(e) => setColorCode(e.target.value)}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                type="button"
                                className={cx('new-modal__cancel-btn')}
                                onClick={() => setShowNewModal(0)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                primary
                                className={cx('new-modal__add-btn')}
                                onClick={handleNewColor}
                            >
                                Add new
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* New Size */}
            <div
                className={cx('new-modal', {
                    show: showNewModal === 2,
                })}
            >
                <div
                    className={cx('new-modal__overlay')}
                    onClick={() => setShowNewModal(0)}
                ></div>
                <div className={cx('new-modal__inner')}>
                    <h5 className={cx('new-modal__heading')}>Add New Size</h5>
                    <div className={cx('new-modal__content')}>
                        <div className={cx('new-modal__input')}>
                            <label htmlFor="firstName">Size</label>
                            <input
                                value={size}
                                type="number"
                                min={0}
                                max={255}
                                name="size"
                                id="size"
                                placeholder="Enter size value"
                                onChange={(e) => setSize(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                type="button"
                                className={cx('new-modal__cancel-btn')}
                                onClick={() => setShowNewModal(0)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                primary
                                className={cx('new-modal__add-btn')}
                                onClick={handleNewScreenSize}
                            >
                                Add new
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* New Material */}
            <div
                className={cx('new-modal', {
                    show: showNewModal === 3,
                })}
            >
                <div
                    className={cx('new-modal__overlay')}
                    onClick={() => setShowNewModal(0)}
                ></div>
                <div className={cx('new-modal__inner')}>
                    <h5 className={cx('new-modal__heading')}>
                        Add New Material
                    </h5>
                    <div className={cx('new-modal__content')}>
                        <div className={cx('new-modal__input')}>
                            <label htmlFor="firstName">Material name</label>
                            <input
                                value={materialName}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter color name"
                                onChange={(e) =>
                                    setMaterialName(e.target.value)
                                }
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                type="button"
                                className={cx('new-modal__cancel-btn')}
                                onClick={() => setShowNewModal(0)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                primary
                                className={cx('new-modal__add-btn')}
                                onClick={handleNewMaterial}
                            >
                                Add new
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* New Category */}
            <div
                className={cx('new-modal', {
                    show: showNewModal === 4,
                })}
            >
                <div
                    className={cx('new-modal__overlay')}
                    onClick={() => setShowNewModal(0)}
                ></div>
                <div className={cx('new-modal__inner')}>
                    <h5 className={cx('new-modal__heading')}>
                        Add New Category
                    </h5>
                    <div className={cx('new-modal__content')}>
                        <div className={cx('new-modal__input')}>
                            <label htmlFor="firstName">Category name</label>
                            <input
                                value={categoryName}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter category name"
                                onChange={(e) =>
                                    setCategoryName(e.target.value)
                                }
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                type="button"
                                className={cx('new-modal__cancel-btn')}
                                onClick={() => setShowNewModal(0)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                primary
                                className={cx('new-modal__add-btn')}
                                onClick={handleNewCategory}
                            >
                                Add new
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* New Collection */}
            <div
                className={cx('new-modal', {
                    show: showNewModal === 5,
                })}
            >
                <div
                    className={cx('new-modal__overlay')}
                    onClick={() => setShowNewModal(0)}
                ></div>
                <div className={cx('new-modal__inner')}>
                    <h5 className={cx('new-modal__heading')}>
                        Add New Collection
                    </h5>
                    <div className={cx('new-modal__content')}>
                        <div className={cx('new-modal__input')}>
                            <label htmlFor="firstName">Collection name</label>
                            <input
                                value={collectionName}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter collection name"
                                onChange={(e) =>
                                    setCollectionName(e.target.value)
                                }
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                type="button"
                                className={cx('new-modal__cancel-btn')}
                                onClick={() => setShowNewModal(0)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                primary
                                className={cx('new-modal__add-btn')}
                                onClick={handleNewCollection}
                            >
                                Add new
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminNewProduct;

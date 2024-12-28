import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';

import images from '../../assets/images';
import styles from './Image.module.scss';

interface ImageProps {
    src: string;
    className?: string;
    alt?: string;
    loading?: any;
    fallback?: string;
}

const Image = forwardRef(
    (
        {
            src,
            className,
            alt = '',
            loading,
            fallback: customFallback,
            ...props
        }: ImageProps,
        ref: React.Ref<HTMLImageElement>
    ) => {
        // fallback: sử dung default image khi ảnh bị lỗi
        // có thể truyền một default image khác qua prop fallback
        const [fallback, setFallback] = useState('');
        const [errorNum, setErrorNum] = useState(0);

        const handleError = () => {
            setErrorNum(errorNum + 1);
            setFallback(customFallback || images.noImg);
        };

        // If 'src' is error and 'fallback' is error then use default image
        if (errorNum === 2) {
            setFallback(images.noImg);
            setErrorNum(errorNum + 1);
        }

        return (
            <img
                ref={ref}
                className={classNames(styles.wrapper, className)}
                src={fallback || src || images.noProductImg}
                alt={alt}
                loading={loading}
                {...props}
                onError={handleError}
            />
        );
    }
);

export default Image;

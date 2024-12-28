import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starFill } from '@fortawesome/free-solid-svg-icons';
import {
    faStarHalfStroke,
    faStar as star,
} from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';

export const renderRating = (rate: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i - rate < 1 && i - rate > 0) {
            stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />);
            continue;
        }

        if (i <= rate) {
            stars.push(<FontAwesomeIcon icon={starFill} />);
        } else {
            stars.push(<FontAwesomeIcon icon={star} />);
        }
    }
    return stars;
};

export const imageMagnifier = (selector: string, percentage: number) => {
    const imgWrapperList = document.querySelectorAll<HTMLElement>(selector);

    imgWrapperList.forEach(function (imgWrapperElement, index) {
        const imgElement = imgWrapperElement.querySelector<HTMLElement>('img');

        // Event Mouse Enter
        imgWrapperElement?.addEventListener('mouseenter', () => {
            imgElement!.style.width = percentage + '%';
            imgElement!.style.height = percentage + '%';
        });

        // Event Mouse Leave
        imgWrapperElement?.addEventListener('mouseleave', () => {
            imgElement!.style.width = '100%';
            imgElement!.style.height = '100%';
            imgElement!.style.top = '0';
            imgElement!.style.left = '0';
        });

        // Event Mouse Move
        imgWrapperElement?.addEventListener('mousemove', function (mouseEvent) {
            let obj = imgWrapperElement;
            let obj_left = 0;
            let obj_top = 0;
            let xpos: any;
            let ypos: any;
            let left = 0;

            while (obj.offsetParent) {
                obj_left += obj.offsetLeft;
                obj_top += obj.offsetTop;
                obj = obj.offsetParent as HTMLElement;
            }

            if (mouseEvent) {
                //FireFox
                xpos = mouseEvent.pageX;
                ypos = mouseEvent.pageY;
            }

            xpos! -= obj_left;
            ypos! -= obj_top;

            xpos = xpos + this.clientWidth * index;

            const imgWidth = imgElement?.clientWidth;
            const imgHeight = imgElement?.clientHeight;

            imgElement!.style.top = `
            -${((imgHeight! - this!.clientHeight) * ypos!) / this.clientHeight
                }px`;

            left = ((imgWidth! - this!.clientWidth) * xpos!) / this.clientWidth;

            imgElement!.style.left = `-${left}px`;
        });

        // // Change height of the image wrapper
        function changeHeight() {
            imgWrapperElement!.style.height =
                imgWrapperElement?.clientWidth + 'px';
        }

        changeHeight();

        // // changeHeight
        window.addEventListener('resize', changeHeight);
    });
};

export function formatPrice(amount: number) {
    // Nếu số tiền lớn hơn hoặc bằng 1 triệu, chia số tiền cho 1 nghìn và thêm chữ "K"
    if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(2)}K`;
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function convertToVND(amount: number, exchangeRate: number = 24835) {
    return Number.parseInt(amount * exchangeRate + ''); // Tính số tiền theo tỷ giá hối đoái
    // return new Intl.NumberFormat('vi-VN', {
    //     style: 'currency',
    //     currency: 'VND',
    // }).format(amountInVND);
}

export function splitArrayAtIndex(arr: any[], index: number) {
    const firstPart = arr.slice(0, index);
    const secondPart = arr.slice(index);
    return [firstPart, secondPart];
}

export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    let formattedDate = date.toLocaleString('en-US', options);

    // Thay " at " bằng dấu phẩy
    formattedDate = formattedDate.replace(' at ', ', ');

    return formattedDate;
}

export function getMonth(orderDate: number) {
    const today = new Date(orderDate);

    // Mảng chứa tên các tháng bằng tiếng Anh
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const month = months[today.getMonth()]; // Lấy tên tháng từ mảng

    return month;
}

export function getCurrentDate(orderDate: number) {
    const today = new Date(orderDate);

    const day = today.getDate();
    const year = today.getFullYear();

    // Mảng chứa tên các tháng bằng tiếng Anh
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const month = months[today.getMonth()]; // Lấy tên tháng từ mảng

    return `${month} ${day}, ${year}`;
}

export function getCurrentHour(orderDate: number) {
    const today = new Date(orderDate);

    // Lấy giờ, phút và giây
    let hours = today.getHours();
    const minutes = today.getMinutes();

    // Xác định AM hoặc PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Chuyển đổi giờ sang định dạng 12 giờ
    hours = hours % 12;
    hours = hours ? hours : 12; // Giờ 0 sẽ chuyển thành 12

    // Format lại phút cho đủ 2 chữ số
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesFormatted} ${ampm}`;
}

export function getCurrentDateWithHour(
    orderDate: number,
    isHasYear: boolean = false
) {
    const today = new Date(orderDate);

    const day = today.getDate();
    const year = today.getFullYear();

    // Mảng chứa tên các tháng bằng tiếng Anh
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const month = months[today.getMonth()]; // Lấy tên tháng từ mảng

    // Lấy giờ, phút và giây
    let hours = today.getHours();
    const minutes = today.getMinutes();

    // Xác định AM hoặc PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Chuyển đổi giờ sang định dạng 12 giờ
    hours = hours % 12;
    hours = hours ? hours : 12; // Giờ 0 sẽ chuyển thành 12

    // Format lại phút cho đủ 2 chữ số
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    if (isHasYear) {
        return `${month} ${day}, ${year} ${hours}:${minutesFormatted} ${ampm}`;
    }

    return `${month} ${day}, ${hours}:${minutesFormatted} ${ampm}`;
}

export function timeAgo(orderTimeInMilliseconds: number) {
    const now = Date.now(); // Thời gian hiện tại
    const elapsedTime = now - orderTimeInMilliseconds; // Thời gian đã trôi qua (milliseconds)

    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Giả sử tháng có 30 ngày
    const years = Math.floor(days / 365); // Giả sử năm có 365 ngày

    if (years > 0) {
        return years === 1 ? '1 year ago' : `${years} years ago`;
    } else if (months > 0) {
        return months === 1 ? '1 month ago' : `${months} months ago`;
    } else if (weeks > 0) {
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
        return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
    }
}

export function isToday(milliseconds: number) {
    const inputDate = new Date(milliseconds);
    const today = new Date();

    return (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
    );
}

export const notifySuccess = (message: string, time = 3000) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const notifyWarning = (message: string, time = 3000) => {
    toast.warning(message, {
        position: 'top-right',
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const notifyError = (message: string, time = 3000) => {
    toast.error(message, {
        position: 'top-right',
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

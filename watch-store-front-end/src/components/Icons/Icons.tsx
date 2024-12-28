interface SearchIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const SearchIcon = ({ width, height, className }: SearchIconProps) => (
    <svg
        className={className}
        width={width || '2rem'}
        height={height || '2rem'}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5.92188 10.0183C5.92188 7.85883 7.67181 6.10889 9.83132 6.10889"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M10.7553 18.0273C15.326 17.6274 18.7071 13.598 18.3072 9.02731C17.9073 4.45663 13.8779 1.07553 9.3072 1.47541C4.73652 1.87529 1.35542 5.90473 1.7553 10.4754C2.15518 15.0461 6.18462 18.4272 10.7553 18.0273Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M15.6953 15.8826L17.65 17.8373"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface ErrorIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ErrorIcon = ({ width, height, className }: ErrorIconProps) => (
    <svg
        className={className}
        width={width || '1.2rem'}
        height={height || '1.2rem'}
        aria-hidden="true"
        focusable="false"
        role="presentation"
        viewBox="0 0 13 13"
    >
        <circle
            cx="6.5"
            cy="6.50049"
            r="5.5"
            stroke="white"
            strokeWidth="2"
        ></circle>
        <circle
            cx="6.5"
            cy="6.5"
            r="5.5"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.7"
        ></circle>
        <path
            d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
            fill="white"
        ></path>
        <path
            d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="0.7"
        ></path>
    </svg>
);

interface ErrorLabelIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ErrorLabelIcon = ({
    width,
    height,
    className,
}: ErrorLabelIconProps) => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </g>
    </svg>
);

interface PricingIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const PricingIcon = ({
    width,
    height,
    className,
}: PricingIconProps) => (
    <svg className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><g><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></g></svg>
);

interface RestockIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const RestockIcon = ({
    width,
    height,
    className,
}: RestockIconProps) => (
    <svg className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><g><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></g></svg>
);

interface TransitionIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const TransitionIcon = ({
    width,
    height,
    className,
}: TransitionIconProps) => (
    <svg className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><g><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></g></svg>
);

interface GlobalIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const GlobalIcon = ({
    width,
    height,
    className,
}: GlobalIconProps) => (
    <svg className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><g><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></g></svg>
);

interface AttributeIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const AttributeIcon = ({
    width,
    height,
    className,
}: AttributeIconProps) => (
    <svg className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><g><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></g></svg>
);

interface SecureIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const SecureIcon = ({
    width,
    height,
    className,
}: SecureIconProps) => (
    <svg className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><g><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></g></svg>
);

interface LogoIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const LogoIcon = ({ width, height, className }: LogoIconProps) => (
    <svg
        className={className}
        width={width || '155px'}
        height={height || '40px'}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 198 55"
    >
        <path
            stroke-width="7"
            stroke="black"
            fill="black"
            d="M103.61 43.6911V29.7329H119.028V28.9148H103.61V15.2467H120.706V14.4287H102.751V44.509H121.306V43.6911H103.61Z"
        />
        <path
            stroke-width="7"
            stroke="black"
            fill="black"
            d="M51.6721 13.9216V44.5093H52.5212V15.071L51.7134 13.9216H51.6721Z"
        />
        <path
            stroke-width="7"
            stroke="black"
            fill="black"
            d="M89.2842 22.2673V44.5091H90.1436V21.0973H90.1023L89.2842 22.2673Z"
        />
        <path
            stroke-width="7"
            stroke="black"
            fill="black"
            d="M37.7871 14.4288H36.9277V44.4988H37.7871V14.4288Z"
        />
        <path
            stroke-width="7"
            stroke="black"
            fill="black"
            d="M4 15.2468H13.3399V44.5091H14.189V15.2468H23.529V14.4288H4V15.2468Z"
        />
        <path
            stroke-width="7"
            stroke="#B299D2"
            fill="#B299D2"
            d="M86.2461 11L69.7334 37.681C69.5676 37.5982 69.3917 37.5464 69.1949 37.5464C69.0293 37.5464 68.8635 37.5774 68.7185 37.6395L60 25.2243V26.6637L68.1387 38.1365C68.0248 38.323 67.9523 38.5404 67.9523 38.7785C67.9523 39.462 68.5011 40.0211 69.1949 40.0211C69.8784 40.0211 70.4375 39.4723 70.4375 38.7785C70.4375 38.5508 70.3754 38.3333 70.2614 38.1469L78.6307 24.8234L87 12L91.5 6L89 6.5L86.2461 11Z"
            clip-rule="evenodd"
            fill-rule="evenodd"
        />
        <path
            stroke-width="7"
            stroke="black"
            d="M159.353 14.6979H160.275L146.855 43.9601M146.855 43.9601L146.5 45L133.415 14.6979H134.43C142.931 34.6306 137.66 22.2568 146.855 43.9601Z"
        />
        <path
            stroke-miterlimit="10"
            stroke-width="7"
            stroke="black"
            d="M180.141 44.4263C187.779 44.4263 193.97 38.2352 193.97 30.5979C193.97 22.9606 187.779 16.7694 180.141 16.7694C172.504 16.7694 166.312 22.9606 166.312 30.5979C166.312 38.2352 172.504 44.4263 180.141 44.4263Z"
        />
    </svg>
);

interface ProcessingLabelIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ProcessingLabelIcon = ({
    width,
    height,
    className,
}: ProcessingLabelIconProps) => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </g>
    </svg>
);

interface RightIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const RightIcon = ({ width, height, className }: RightIconProps) => (
    <svg
        className={className}
        width={width || '0.8rem'}
        height={height || '1.2rem'}
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="angle-right"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
    >
        <path
            fill="currentColor"
            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
        ></path>
    </svg>
);

interface AddressIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const AddressIcon = ({ width, height, className }: AddressIconProps) => (
    <svg
        className={className}
        width={width || '2.4rem'}
        height={height || '2.4rem'}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_1174_857)">
            <path
                d="M12.691 0C12.987 0.0343691 13.2835 0.0654872 13.5796 0.103107C15.6518 0.365985 17.3924 1.26005 18.7965 2.76532C19.9954 4.05045 20.7153 5.56223 20.9301 7.29276C21.2228 9.64984 20.5946 11.7519 19.0793 13.6041C17.6138 15.3955 16.156 17.1925 14.6796 18.9755C13.5492 20.341 11.4584 20.3424 10.3241 18.9746C8.77694 17.1084 7.23404 15.239 5.72203 13.3459C4.66998 12.0287 4.12638 10.5119 4.01709 8.83798C3.75432 4.80007 6.54931 1.1992 10.4952 0.270309C10.9746 0.157448 11.4745 0.12633 11.9649 0.0561982C12.0809 0.0394781 12.1958 0.0185779 12.3118 0C12.4382 0 12.5646 0 12.691 0ZM19.2047 8.34706C19.1406 7.87472 19.113 7.39494 19.007 6.93189C18.2297 3.53538 14.8549 1.25215 11.2056 1.95068C7.83514 2.5958 5.4488 5.69135 5.88739 9.14266C6.03897 10.3358 6.48564 11.4073 7.24925 12.3469C8.7185 14.155 10.1977 15.9552 11.6722 17.7591C12.1569 18.3522 12.8483 18.3508 13.3344 17.7558C14.7053 16.0787 16.06 14.3881 17.4551 12.7301C18.5323 11.4496 19.1653 10.0256 19.2052 8.34706H19.2047Z"
                fill="currentcolor"
            ></path>
            <path
                d="M12.4937 22.2582C14.0568 22.236 15.5762 22.0195 17.0267 21.4381C17.6213 21.1998 18.1794 20.8992 18.6401 20.4523C19.3003 19.8113 19.3416 19.2152 18.7318 18.5332C18.3442 18.1001 18.4197 17.4444 18.8629 17.1572C19.2386 16.9138 19.732 16.9572 20.0512 17.2865C21.2756 18.5494 21.3288 20.2071 20.13 21.5148C19.3236 22.3944 18.2829 22.9148 17.1616 23.2999C16.1314 23.6536 15.0694 23.8831 13.9789 23.9408C13.1221 23.9861 12.2582 24.0276 11.4037 23.9764C9.56945 23.8669 7.7993 23.4832 6.19538 22.5592C5.35899 22.0776 4.64894 21.4667 4.24855 20.5769C3.709 19.3787 4.08564 18.1144 5.0137 17.2287C5.33809 16.9194 5.88286 16.93 6.22531 17.2232C6.55777 17.5076 6.62949 18.0179 6.38347 18.3767C6.3222 18.4658 6.24668 18.5452 6.17734 18.6288C5.71948 19.1815 5.69906 19.7541 6.20441 20.268C6.53213 20.6009 6.92159 20.8983 7.3329 21.1273C8.40202 21.7221 9.58275 21.9954 10.7977 22.1294C11.361 22.1912 11.9285 22.2162 12.4942 22.2582H12.4937Z"
                fill="currentcolor"
            ></path>
            <path
                d="M7 8.5034C7.04942 5.97185 8.98932 3.99864 11.5082 4C14.0388 4.00136 16.005 5.9832 16 8.50794C15.995 11.0222 14.0433 12.9936 11.515 13C8.99884 13.0063 7.0544 11.0395 7 8.5034ZM11.4995 11.2369C13.0264 11.2374 14.2174 10.0377 14.2446 8.52382C14.2714 7.01906 12.9947 5.76396 11.5236 5.75488C10.0311 5.7458 8.76944 7.00817 8.76355 8.48842C8.75765 9.98637 10.0239 11.276 11.4995 11.2374V11.2369Z"
                fill="currentcolor"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_1174_857">
                <rect width="24" height="24" fill="white"></rect>
            </clipPath>
        </defs>
    </svg>
);

interface DeliveryIconProps {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const DeliveryIcon = ({
    width,
    height,
    className,
    onClick,
}: DeliveryIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '3rem'}
        height={height || '3rem'}
        viewBox="0 0 38.197 21.5"
    >
        <g
            id="Group_25127"
            data-name="Group 25127"
            transform="translate(-1083.836 -1161.835)"
        >
            <path
                id="Path_54444"
                data-name="Path 54444"
                d="M76.155,6.988H95.1a.132.132,0,0,1,.132.132V23.868"
                transform="translate(1014.583 1155.597)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></path>
            <line
                id="Line_317"
                data-name="Line 317"
                x1="4.357"
                transform="translate(1090.739 1179.465)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_318"
                data-name="Line 318"
                x1="11.098"
                transform="translate(1101.294 1179.465)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <path
                id="Path_54445"
                data-name="Path 54445"
                d="M291.733,32.235h6.362a.4.4,0,0,1,.338.188l4.479,7.216a1.261,1.261,0,0,1,.19.665v5.1a1.46,1.46,0,0,1-1.46,1.46h-1.3"
                transform="translate(818.182 1132.596)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></path>
            <circle
                id="Ellipse_200"
                data-name="Ellipse 200"
                cx="3.068"
                cy="3.068"
                r="3.068"
                transform="translate(1112.393 1176.449)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></circle>
            <path
                id="Path_54446"
                data-name="Path 54446"
                d="M131.987,165.909a3.068,3.068,0,1,1-3.068-3.068A3.068,3.068,0,0,1,131.987,165.909Z"
                transform="translate(969.308 1013.608)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></path>
            <path
                id="Path_54447"
                data-name="Path 54447"
                d="M340,62.32h-3.635a.293.293,0,0,0-.289.346l.765,4.31a.415.415,0,0,0,.408.341h6.064"
                transform="translate(777.784 1105.187)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></path>
            <line
                id="Line_319"
                data-name="Line 319"
                x2="4.116"
                transform="translate(1086.602 1165.636)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_320"
                data-name="Line 320"
                x2="4.389"
                transform="translate(1088.04 1169.229)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_321"
                data-name="Line 321"
                x2="5.754"
                transform="translate(1086.714 1176.415)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_322"
                data-name="Line 322"
                x2="5.88"
                transform="translate(1084.586 1172.822)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
        </g>
    </svg>
);

interface ZoomInIconProps {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const ZoomInIcon = ({
    width,
    height,
    className,
    onClick,
}: ZoomInIconProps) => (
    <svg
        className={className}
        width={width || '2.4rem'}
        height={height || '2.4rem'}
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="m15.97 17.031c-2.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007zm-.744 6.26h-2.5c-.414 0-.75.336-.75.75s.336.75.75.75h2.5v2.5c0 .414.336.75.75.75s.75-.336.75-.75v-2.5h2.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-2.5v-2.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fillRule="nonzero"
        />
    </svg>
);

interface ShareIconProps {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const ShareIcon = ({
    width,
    height,
    className,
    onClick,
}: ShareIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '1.4rem'}
        height={height || '1.5rem'}
        viewBox="0 0 13.584 14.811"
    >
        <g
            id="Group_25123"
            data-name="Group 25123"
            transform="translate(-1424.541 -929.799)"
        >
            <line
                id="Line_314"
                data-name="Line 314"
                x2="3.826"
                y2="2.242"
                transform="translate(1428.868 938.727)"
                fill="none"
                stroke="currentcolor"
                strokeLinejoin="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_315"
                data-name="Line 315"
                x1="3.826"
                y2="2.242"
                transform="translate(1428.868 934.545)"
                fill="none"
                stroke="currentcolor"
                strokeLinejoin="round"
                strokeWidth="1.5"
            ></line>
            <ellipse
                id="Ellipse_197"
                data-name="Ellipse 197"
                cx="1.92"
                cy="1.92"
                rx="1.92"
                ry="1.92"
                transform="translate(1425.291 935.837)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            ></ellipse>
            <ellipse
                id="Ellipse_198"
                data-name="Ellipse 198"
                cx="1.92"
                cy="1.92"
                rx="1.92"
                ry="1.92"
                transform="translate(1432.43 940.02)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            ></ellipse>
            <ellipse
                id="Ellipse_199"
                data-name="Ellipse 199"
                cx="1.92"
                cy="1.92"
                rx="1.92"
                ry="1.92"
                transform="translate(1431.635 933.574) rotate(-45)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            ></ellipse>
        </g>
    </svg>
);

interface ShippingDetailIconProps {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const ShippingDetailIcon = ({
    width,
    height,
    className,
    onClick,
}: ShippingDetailIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || '3rem'}
        height={height || '3rem'}
        viewBox="0 0 27.969 21.5"
    >
        <g
            id="Group_25129"
            data-name="Group 25129"
            transform="translate(-1025.238 -1129.238)"
        >
            <rect
                id="Rectangle_8802"
                data-name="Rectangle 8802"
                width="26.469"
                height="20"
                rx="3"
                transform="translate(1025.988 1129.988)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></rect>
            <line
                id="Line_323"
                data-name="Line 323"
                x2="26.469"
                transform="translate(1025.988 1134.55)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_324"
                data-name="Line 324"
                x2="12.4"
                transform="translate(1031.041 1138.374)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_325"
                data-name="Line 325"
                x2="16.364"
                transform="translate(1031.041 1142.115)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
            <line
                id="Line_326"
                data-name="Line 326"
                x2="13.721"
                transform="translate(1031.041 1145.855)"
                fill="none"
                stroke="currentcolor"
                strokeLinecap="round"
                strokeWidth="1.5"
            ></line>
        </g>
    </svg>
);

interface SubMenuIconProps {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const SubMenuIcon = ({
    width,
    height,
    className,
    onClick,
}: SubMenuIconProps) => (
    <svg
        onClick={onClick}
        className={className}
        width={width || '2.6rem'}
        height={height || '2.6rem'}
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.07812 1H15.25"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M1.07812 10H10.8906"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M1.07812 19H19.0781"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface DashboardIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const DashboardIcon = ({
    width,
    height,
    className,
}: DashboardIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </g>
    </svg>
);

interface LockIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const LockIcon = ({ width, height, className }: LockIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </g>
    </svg>
);

interface LogoutIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const LogoutIcon = ({ width, height, className }: LogoutIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </g>
    </svg>
);

interface ResetIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ResetIcon = ({ width, height, className }: ResetIconProps) => (
    <svg
        className={className}
        width={width || '1.28rem'}
        height={height || '1.28rem'}
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="key"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
    >
        <path
            fill="currentColor"
            d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"
        ></path>
    </svg>
);

interface SettingIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const SettingIcon = ({ width, height, className }: SettingIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </g>
    </svg>
);

interface HelpIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const HelpIcon = ({ width, height, className }: HelpIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </g>
    </svg>
);

interface MobileUserIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const MobileUserIcon = ({
    width,
    height,
    className,
}: MobileUserIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14 15.1429C17.6293 15.1429 20.5714 12.2007 20.5714 8.57143C20.5714 4.94213 17.6293 2 14 2C10.3707 2 7.42859 4.94213 7.42859 8.57143C7.42859 12.2007 10.3707 15.1429 14 15.1429Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M2 26C2 19.9984 5.18545 15.1428 11.8182 15.1428H16.1818C22.8145 15.1428 26 19.9984 26 26"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface MobileWishlistIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const MobileWishlistIcon = ({
    width,
    height,
    className,
}: MobileWishlistIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14.0049 7.14229C14.2049 6.89288 16.9785 3.53895 20.5819 4.13951C23.3687 4.60224 25.0053 7.15217 25.5453 8.44846C27.3053 12.6721 23.8485 17.9393 17.0384 23.8629C15.295 25.379 12.5916 25.379 10.8482 23.8629C4.06472 17.959 0.704572 12.7639 2.46129 8.54032C3.0013 7.24403 4.63806 4.5333 7.42481 4.07057C11.0282 3.47001 13.8016 6.89288 14.0017 7.14558L14.0049 7.14229Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface MobileShopIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const MobileShopIcon = ({
    width,
    height,
    className,
}: MobileShopIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M26.9964 14.9982H1L2.04343 8.74467C2.27451 7.35097 3.4805 6.33276 4.89225 6.33276H23.1078C24.5195 6.33276 25.7255 7.35459 25.9566 8.74467L27 14.9982H26.9964Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M2.44385 2H25.5517"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M2.44385 14.9982V22.2194C2.44385 23.8153 3.73645 25.1079 5.33233 25.1079H13.9978C15.5937 25.1079 16.8863 23.8153 16.8863 22.2194V14.9982"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M25.5522 14.9982V25.1079"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface MobileHomeIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const MobileHomeIcon = ({
    width,
    height,
    className,
}: MobileHomeIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24.1081 10.9814V25.1061C24.1081 25.9041 23.4618 26.5504 22.6638 26.5504H19.7754C18.9774 26.5504 18.3311 25.9041 18.3311 25.1061V22.2177C18.3311 20.6218 17.0385 19.3292 15.4426 19.3292H12.5541C10.9582 19.3292 9.66565 20.6218 9.66565 22.2177V25.1061C9.66565 25.9041 9.01935 26.5504 8.2214 26.5504H5.33292C4.53497 26.5504 3.88867 25.9041 3.88867 25.1061V10.9814"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M1 13.5521L12.0809 2.79614C13.175 1.73462 14.825 1.73462 15.919 2.79614L27 13.5521"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface OrderSuccessIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const OrderSuccessIcon = ({
    width,
    height,
    className,
}: OrderSuccessIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '4rem'}
        height={height || '4rem'}
        viewBox="0 0 40 40"
        fill="currentColor"
    >
        <path
            d="M27.7824 17.1998L27.7825 17.1997C28.0339 16.9589 28.1794 16.6282 28.1871 16.2802C28.1948 15.9322 28.0641 15.5953 27.8236 15.3437C27.5831 15.092 27.2526 14.946 26.9046 14.9379C26.5566 14.9298 26.2196 15.0601 25.9676 15.3002L25.9676 15.3003L17.7075 23.1851L14.0324 19.6753L14.0324 19.6752C13.7804 19.4351 13.4434 19.3048 13.0954 19.3129C12.7474 19.321 12.4169 19.467 12.1764 19.7187C11.936 19.9703 11.8052 20.3072 11.8129 20.6552C11.8206 21.0032 11.9661 21.3339 12.2175 21.5747L12.2176 21.5747L16.8001 25.9497L16.8002 25.9498C17.0449 26.1827 17.3698 26.3125 17.7075 26.3125C18.0453 26.3125 18.3702 26.1827 18.6149 25.9498L18.6149 25.9498L27.7824 17.1998ZM11.0067 6.54059C13.6687 4.76189 16.7984 3.81251 20 3.8125C24.2916 3.81747 28.4061 5.52453 31.4408 8.55921C34.4755 11.5939 36.1825 15.7084 36.1875 20.0001C36.1875 23.2016 35.2381 26.3313 33.4594 28.9933C31.6807 31.6553 29.1526 33.7301 26.1947 34.9553C23.2368 36.1805 19.982 36.5011 16.842 35.8765C13.7019 35.2519 10.8176 33.7102 8.55372 31.4463C6.28985 29.1824 4.74814 26.2981 4.12355 23.158C3.49895 20.018 3.81951 16.7632 5.04471 13.8053C6.2699 10.8474 8.34469 8.31929 11.0067 6.54059Z"
            fill="white"
            stroke="white"
            strokeWidth="0.125"
        ></path>
    </svg>
);

interface CheckIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const CheckIcon = ({ width, height, className }: CheckIconProps) => (
    <svg
        className={className}
        width={width || '2.4rem'}
        height={height || '2.4rem'}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
    >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
);

interface CheckNoCircleIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const CheckNoCircleIcon = ({
    width,
    height,
    className,
}: CheckNoCircleIconProps) => (
    <svg
        className={className}
        width={width || '1.2rem'}
        height={height || '1.2rem'}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <g>
            <polyline points="20 6 9 17 4 12"></polyline>
        </g>
    </svg>
);

interface ModifierIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ModifierIcon = ({
    width,
    height,
    className,
}: ModifierIconProps) => (
    <svg
        className={className}
        width={width || '1.6rem'}
        height={height || '1.6rem'}
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="pen"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
    >
        <path
            fill="currentColor"
            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
        ></path>
    </svg>
);

interface FilterIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const FilterIcon = ({ width, height, className }: FilterIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
        width={width || '2rem'}
        height={height || '2rem'}
    >
        <path d="M19,2H5A3,3,0,0,0,2,5V6.17a3,3,0,0,0,.25,1.2l0,.06a2.81,2.81,0,0,0,.59.86L9,14.41V21a1,1,0,0,0,.47.85A1,1,0,0,0,10,22a1,1,0,0,0,.45-.11l4-2A1,1,0,0,0,15,19V14.41l6.12-6.12a2.81,2.81,0,0,0,.59-.86l0-.06A3,3,0,0,0,22,6.17V5A3,3,0,0,0,19,2ZM13.29,13.29A1,1,0,0,0,13,14v4.38l-2,1V14a1,1,0,0,0-.29-.71L5.41,8H18.59ZM20,6H4V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path>
    </svg>
);

interface PagingLeftArrowIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const PagingLeftArrowIcon = ({
    width,
    height,
    className,
}: PagingLeftArrowIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={className}
        width={width || '1rem'}
        height={height || '0.8rem'}
        viewBox="0 0 10.511 8.19"
        fill="currentColor"
    >
        <defs>
            <clipPath id="clipPath">
                <rect
                    id="Rectangle_22"
                    width="10.511"
                    height="8.19"
                    fill="currentColor"
                ></rect>
            </clipPath>
        </defs>
        <g id="Group_9">
            <path
                id="Path_6"
                d="M.062,4.407l0-.01a.8.8,0,0,1-.042-.142s0-.005,0-.008a.792.792,0,0,1,0-.3s0-.005,0-.008a.81.81,0,0,1,.042-.142l0-.01a.816.816,0,0,1,.07-.133l0-.008a.825.825,0,0,1,.1-.127L3.516.24A.819.819,0,0,1,4.674,1.4L2.8,3.276h6.9a.819.819,0,0,1,0,1.638H2.8L4.674,6.792A.819.819,0,1,1,3.516,7.951L.241,4.676a.821.821,0,0,1-.1-.127l0-.008a.816.816,0,0,1-.07-.133"
            ></path>
        </g>
    </svg>
);

interface RightArrowIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const RightArrowIcon = ({
    width,
    height,
    className,
}: RightArrowIconProps) => (
    <svg
        className={className}
        width={width || '1.5rem'}
        height={height || '2.6rem'}
        viewBox="0 0 14 10"
        fill="none"
        aria-hidden="true"
        focusable="false"
        role="presentation"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
            fill="currentColor"
        ></path>
    </svg>
);

interface BreadcrumbSepIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const BreadcrumbSepIcon = ({
    width,
    height,
    className,
}: BreadcrumbSepIconProps) => (
    <svg
        className={className}
        width={width || '1rem'}
        height={height || '1rem'}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M 7.75 1.34375 L 6.25 2.65625 L 14.65625 12 L 6.25 21.34375 L 7.75 22.65625 L 16.75 12.65625 L 17.34375 12 L 16.75 11.34375 Z"></path>
    </svg>
);

interface ShowOneTheProductIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ShowOneTheProductIcon = ({
    width,
    height,
    className,
}: ShowOneTheProductIconProps) => (
    <svg
        className={className}
        width={width || '1.8rem'}
        height={height || '1.8rem'}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 23 23"
    >
        <rect
            x="6"
            y="6"
            width="10"
            height="10"
            rx="3"
            fill="currentcolor"
        ></rect>
    </svg>
);

interface ShowTwoTheProductIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ShowTwoTheProductIcon = ({
    width,
    height,
    className,
}: ShowTwoTheProductIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '2.3rem'}
        height={height || '2.3rem'}
        viewBox="0 0 23 23"
        fill="none"
    >
        <rect width="10" height="10" rx="3" fill="currentcolor"></rect>
        <rect y="13" width="10" height="10" rx="3" fill="currentcolor"></rect>
        <rect x="13" width="10" height="10" rx="3" fill="currentcolor"></rect>
        <rect
            x="13"
            y="13"
            width="10"
            height="10"
            rx="3"
            fill="currentcolor"
        ></rect>
    </svg>
);

interface ShowThreeTheProductIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ShowThreeTheProductIcon = ({
    width,
    height,
    className,
}: ShowThreeTheProductIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '2.2rem'}
        height={height || '2.2rem'}
        viewBox="0 0 22 22"
        fill="none"
    >
        <rect width="6" height="6" rx="2" fill="currentcolor"></rect>
        <rect y="8" width="6" height="6" rx="2" fill="currentcolor"></rect>
        <rect y="16" width="6" height="6" rx="2" fill="currentcolor"></rect>
        <rect x="8" width="6" height="6" rx="2" fill="currentcolor"></rect>
        <rect x="16" width="6" height="6" rx="2" fill="currentcolor"></rect>
        <rect
            x="8"
            y="8"
            width="6"
            height="6"
            rx="2"
            fill="currentcolor"
        ></rect>
        <rect
            x="8"
            y="16"
            width="6"
            height="6"
            rx="2"
            fill="currentcolor"
        ></rect>
        <rect
            x="16"
            y="8"
            width="6"
            height="6"
            rx="2"
            fill="currentcolor"
        ></rect>
        <rect
            x="16"
            y="16"
            width="6"
            height="6"
            rx="2"
            fill="currentcolor"
        ></rect>
    </svg>
);

interface ShowVerticalTheProductIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ShowVerticalTheProductIcon = ({
    width,
    height,
    className,
}: ShowVerticalTheProductIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '2.2rem'}
        height={height || '2.2rem'}
        viewBox="0 0 22 22"
        fill="none"
    >
        <rect width="6" height="6" rx="1" fill="currentcolor"></rect>
        <rect
            x="8"
            y="2"
            width="14"
            height="2"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect y="8" width="6" height="6" rx="1" fill="currentcolor"></rect>
        <rect
            x="8"
            y="10"
            width="14"
            height="2"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect y="16" width="6" height="6" rx="1" fill="currentcolor"></rect>
        <rect
            x="8"
            y="18"
            width="14"
            height="2"
            rx="1"
            fill="currentcolor"
        ></rect>
    </svg>
);

interface ShowFourTheProductIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ShowFourTheProductIcon = ({
    width,
    height,
    className,
}: ShowFourTheProductIconProps) => (
    <svg
        className={className}
        width={width || '2.7rem'}
        height={height || '2.1rem'}
        viewBox="0 0 27 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0.5"
            width="5.00014"
            height="5"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="7.5"
            width="5.00014"
            height="5"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="14.5"
            width="5.00014"
            height="5"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="21.5"
            width="5.00014"
            height="5"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="0.5"
            y="16"
            width="5.00014"
            height="4.99998"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="7.5"
            y="16"
            width="5.00014"
            height="4.99998"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="14.5"
            y="16"
            width="5.00014"
            height="4.99998"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="21.5"
            y="16"
            width="5.00014"
            height="4.99998"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="0.5"
            y="8"
            width="5.00014"
            height="4.99996"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="7.5"
            y="8"
            width="5.00014"
            height="4.99996"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="14.5"
            y="8"
            width="5.00014"
            height="4.99996"
            rx="1"
            fill="currentcolor"
        ></rect>
        <rect
            x="21.5"
            y="8"
            width="5.00014"
            height="4.99996"
            rx="1"
            fill="currentcolor"
        ></rect>
    </svg>
);

interface UpArrowIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const UpArrowIcon = ({ width, height, className }: UpArrowIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '1.8rem'}
        height={height || '1.8rem'}
        viewBox="0 0 21 19"
        fill="none"
    >
        <path
            d="M10.5 18.9651C11.2893 18.9651 11.9286 18.3259 11.9286 17.5366L11.9286 4.91515L18.0607 11.0473C18.6179 11.6044 19.5214 11.6044 20.0821 11.0473C20.3607 10.7687 20.5 10.4044 20.5 10.0366C20.5 9.66872 20.3607 9.30443 20.0821 9.02586L11.5107 0.454435C11.4429 0.386577 11.3714 0.329435 11.2929 0.275863C11.2571 0.250864 11.2214 0.236579 11.1821 0.21515C11.1357 0.190151 11.0929 0.161577 11.0464 0.14372C11 0.125864 10.95 0.111578 10.9 0.0972915C10.8607 0.0865779 10.8214 0.0687213 10.7786 0.0615783C10.5929 0.0258632 10.4036 0.0258632 10.2179 0.0615783C10.175 0.0687213 10.1357 0.0865779 10.0964 0.0972915C10.0464 0.111578 10 0.122291 9.95 0.14372C9.90357 0.165149 9.85714 0.190151 9.81429 0.21515C9.77857 0.236579 9.73929 0.250864 9.70357 0.275863C9.625 0.329435 9.55357 0.386577 9.48571 0.454435L0.917857 9.02586C0.360714 9.58301 0.360714 10.4901 0.917857 11.0473C1.475 11.6044 2.37857 11.6044 2.93929 11.0473L9.07143 4.91515L9.07143 17.5366C9.07143 18.3259 9.71071 18.9651 10.5 18.9651Z"
            fill="currentcolor"
        ></path>
    </svg>
);

interface PrevIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const PrevIcon = ({ width, height, className }: PrevIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '0.9rem'}
        height={height || '1rem'}
        viewBox="0 0 9 10"
        fill="none"
    >
        <path
            d="M9 7.68983L9 9.48305H7.42353L2.40675 4.46218V9.5L0 9.5L0 1.64416L1.37283 0.5L8.89836 0.5V2.82257L4.13568 2.82257L9 7.68983Z"
            fill="currentcolor"
        ></path>
    </svg>
);

interface NextIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const NextIcon = ({ width, height, className }: NextIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '0.9rem'}
        height={height || '1rem'}
        viewBox="0 0 11 11"
        fill="none"
    >
        <path
            d="M0 8.78757V10.9793H1.9268L8.05841 4.84267V11H11V1.39841L9.32209 0H0.124223V2.8387H5.94528L0 8.78757Z"
            fill="currentcolor"
        ></path>
    </svg>
);

interface PlayIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const PlayIcon = ({ width, height, className }: PlayIconProps) => (
    <svg
        className={className}
        width={width || '1.4rem'}
        height={height || '1.96rem'}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        role="presentation"
        fill="none"
        viewBox="0 0 10 14"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.48177 0.814643C0.81532 0.448245 0 0.930414 0 1.69094V12.2081C0 12.991 0.858787 13.4702 1.52503 13.0592L10.5398 7.49813C11.1918 7.09588 11.1679 6.13985 10.4965 5.77075L1.48177 0.814643Z"
            fill="currentColor"
        ></path>
    </svg>
);

interface PauseIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const PauseIcon = ({ width, height, className }: PauseIconProps) => (
    <svg
        className={className}
        width={width || '1.4rem'}
        height={height || '2.1rem'}
        viewBox="0 0 8 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
    >
        <path
            d="M1.2 0.75C0.813401 0.75 0.5 0.985051 0.5 1.275V10.725C0.5 11.0149 0.813401 11.25 1.2 11.25C1.5866 11.25 1.9 11.0149 1.9 10.725V1.275C1.9 0.985051 1.5866 0.75 1.2 0.75Z"
            fill="currentColor"
        ></path>
        <path
            d="M6.8 0.75C6.4134 0.75 6.1 0.985051 6.1 1.275V10.725C6.1 11.0149 6.4134 11.25 6.8 11.25C7.1866 11.25 7.5 11.0149 7.5 10.725V1.275C7.5 0.985051 7.1866 0.75 6.8 0.75Z"
            fill="currentColor"
        ></path>
    </svg>
);

interface MailIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const MailIcon = ({ width, height, className }: MailIconProps) => (
    <svg
        className={className}
        width={width || '2.4rem'}
        height={height || '2.4rem'}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_1174_850)">
            <path
                d="M24 16.5518C23.9516 16.8595 23.9154 17.1705 23.852 17.4754C23.368 19.8132 21.5622 21.547 19.2282 21.9113C18.9129 21.9603 18.592 21.9943 18.2734 21.9948C14.0838 22.0005 9.89426 22.0019 5.70422 21.9972C3.02535 21.9943 0.791009 20.2454 0.172159 17.6523C0.064083 17.1993 0.0128645 16.7222 0.0100452 16.256C-0.00546131 13.7515 0.00111719 11.2467 0.00299677 8.74227C0.00534624 5.95189 1.8431 3.67919 4.56567 3.11668C4.93735 3.03976 5.32501 3.00673 5.70516 3.00626C9.89473 2.9987 14.0843 2.9987 18.2743 3.00248C21.0519 3.00484 23.3144 4.86226 23.8717 7.59224C23.9295 7.87443 23.9577 8.1623 24 8.4478V16.5518ZM11.9848 20.1515C14.1186 20.1515 16.2524 20.153 18.3862 20.1496C18.5958 20.1496 18.8072 20.1322 19.0144 20.1015C20.7408 19.8472 22.1383 18.2318 22.1406 16.4811C22.1449 13.8275 22.1425 11.1735 22.1397 8.52C22.1397 8.35672 22.1214 8.19156 22.0955 8.02969C21.8014 6.18596 20.2441 4.84905 18.3876 4.84858C14.12 4.84716 9.85244 4.8481 5.58439 4.84858C5.45141 4.84858 5.31749 4.84291 5.18593 4.85754C3.29742 5.06518 1.84216 6.69326 1.84075 8.6007C1.83887 11.1995 1.83887 13.7983 1.84075 16.3971C1.84216 18.4682 3.5178 20.1492 5.58205 20.1515C7.71583 20.1539 9.84962 20.152 11.9834 20.152L11.9848 20.1515Z"
                fill="currentcolor"
            ></path>
            <path
                d="M12.4222 13.9969C11.3295 14.037 10.0621 13.6906 8.95112 12.898C7.44568 11.8236 5.95127 10.7358 4.45303 9.65208C3.93282 9.27538 3.85267 8.7266 4.25387 8.32359C4.59652 7.97988 5.10953 7.94822 5.54576 8.25984C6.44365 8.90135 7.33578 9.55 8.23031 10.196C8.81003 10.6146 9.39023 11.0318 9.9685 11.4518C11.4706 12.5418 13.3484 12.5485 14.8721 11.4674C16.3747 10.4015 17.8768 9.33512 19.3784 8.26742C19.6313 8.08731 19.8919 7.94956 20.2326 8.01777C20.6136 8.094 20.8584 8.30085 20.9615 8.64457C21.0695 9.00433 20.9462 9.30971 20.6405 9.53439C20.0214 9.98956 19.3899 10.4305 18.7622 10.8758C17.8432 11.5285 16.9246 12.1816 16.0032 12.8316C14.9532 13.5725 14.0433 13.8886 12.4217 13.9964L12.4222 13.9969Z"
                fill="currentcolor"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_1174_850">
                <rect width="24" height="24" fill="white"></rect>
            </clipPath>
        </defs>
    </svg>
);

interface PhoneIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const PhoneIcon = ({ width, height, className }: PhoneIconProps) => (
    <svg
        className={className}
        width={width || '2.4rem'}
        height={height || '2.4rem'}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_1174_840)">
            <path
                d="M15.0822 24C14.8287 23.9662 14.5757 23.9276 14.3218 23.8999C12.6453 23.7146 11.0769 23.1772 9.61061 22.3672C6.0671 20.4104 3.33811 17.6384 1.44809 14.0563C0.751145 12.7357 0.278521 11.329 0.0904123 9.84471C-0.313552 6.65944 0.63828 3.92175 2.90358 1.65234C3.35269 1.2024 3.83895 0.754818 4.38541 0.441698C5.73462 -0.33076 7.37493 -0.0641844 8.48336 1.03926C9.04863 1.60203 9.60308 2.17655 10.142 2.76424C11.7522 4.52119 11.1855 7.22409 9.01007 8.20482C8.71097 8.33976 8.41564 8.48268 8.11326 8.60915C7.32038 8.94108 6.83177 9.97259 7.06455 10.8875C7.26395 11.6708 7.66321 12.3454 8.15841 12.9651C9.21793 14.2909 10.3903 15.5025 11.8369 16.4141C12.4115 16.7761 13.0304 17.0441 13.7344 16.9774C14.4281 16.9115 14.9891 16.6031 15.3334 15.9811C15.5106 15.6614 15.6498 15.3191 15.7942 14.9825C16.7282 12.8052 19.5211 12.219 21.2475 13.8433C21.7883 14.3525 22.3164 14.8758 22.8507 15.3915C23.4808 16.0004 23.8655 16.7291 23.9445 17.6097C23.9492 17.6605 23.9807 17.7094 24 17.7588V18.1339C23.9802 18.1913 23.9478 18.2477 23.9426 18.3065C23.8951 18.8627 23.7282 19.3841 23.4023 19.8321C23.114 20.2285 22.789 20.6027 22.4467 20.9539C20.8534 22.5872 18.9544 23.6309 16.6623 23.8984C16.4164 23.9271 16.1718 23.9657 15.9268 23.9995H15.0822V24ZM15.4815 22.1485C15.4852 22.1692 15.489 22.1899 15.4923 22.2111C16.13 22.1142 16.7785 22.062 17.403 21.9121C19.1487 21.4922 20.5148 20.4687 21.6656 19.1269C22.3587 18.3187 22.3169 17.4118 21.5518 16.6671C21.0528 16.1819 20.5524 15.6981 20.0511 15.2157C19.1948 14.3911 17.9156 14.6506 17.4458 15.7399C17.2944 16.0911 17.1279 16.4357 16.9699 16.7841C16.3835 18.0752 14.5405 19.086 12.8846 18.755C12.1063 18.5994 11.3859 18.3098 10.7336 17.8697C8.90379 16.636 7.37305 15.0958 6.14893 13.2608C5.67349 12.5485 5.36123 11.7639 5.22673 10.904C4.9803 9.33177 5.92414 7.64111 7.12522 7.07928C7.50002 6.90392 7.87295 6.72526 8.24964 6.55506C9.32421 6.07128 9.58051 4.81645 8.77164 3.95607C8.2628 3.41493 7.74692 2.88037 7.22538 2.35145C6.56935 1.68619 5.6227 1.63353 4.92575 2.25178C4.471 2.65517 4.02706 3.08018 3.63486 3.54375C2.44789 4.94621 1.83089 6.56729 1.8229 8.41874C1.81678 9.87574 2.14268 11.2589 2.75686 12.5622C4.58339 16.4372 7.44171 19.3112 11.3003 21.1702C12.6128 21.8025 14.0095 22.1565 15.481 22.1485H15.4815Z"
                fill="currentcolor"
            ></path>
            <path
                d="M23.9995 5.68712C23.9521 5.98822 23.9166 6.29209 23.8549 6.59042C23.381 8.88052 21.6144 10.5717 19.3255 10.9328C16.3384 11.4043 13.5332 9.34371 13.0671 6.36044C12.6098 3.43165 14.534 0.643262 17.4787 0.0950968C20.5851 -0.483086 23.4345 1.64261 23.8968 4.6402C23.9318 4.86603 23.9655 5.09231 24 5.31814V5.68666L23.9995 5.68712ZM18.491 1.79686C16.4729 1.74837 14.79 3.47922 14.778 5.47746C14.7656 7.51449 16.4636 9.2084 18.4642 9.2181C20.4906 9.2278 22.1818 7.52881 22.1887 5.51579C22.196 3.49215 20.5049 1.75576 18.491 1.79686Z"
                fill="currentcolor"
            ></path>
            <path
                d="M18.7305 4.96983C18.8959 4.96983 19.0274 4.9584 19.1571 4.97191C19.6322 5.02022 19.9869 5.4135 19.9997 5.9481C20.0111 6.43333 19.7363 6.9274 19.2603 6.96585C18.7587 7.00585 18.2492 7.01832 17.7503 6.96117C17.2875 6.90818 17.0175 6.49464 17.0083 5.94446C16.9977 5.31479 16.9968 4.68461 17.0083 4.05494C17.0193 3.45749 17.419 2.98628 17.8782 3.00031C18.3418 3.01433 18.7106 3.46476 18.7287 4.05338C18.738 4.34484 18.7305 4.63681 18.7305 4.97087V4.96983Z"
                fill="currentcolor"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_1174_840">
                <rect width="24" height="24" fill="white"></rect>
            </clipPath>
        </defs>
    </svg>
);

interface RemoveIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const RemoveIcon = ({ width, height, className }: RemoveIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '2.4rem'}
        height={height || '2.4rem'}
        viewBox="0 0 17 22"
        fill="none"
    >
        <path
            d="M10.9849 21H6.01515C3.76592 21 1.89157 19.2613 1.74163 17.0213L1.0026 6.152C0.959754 5.53333 1.45244 5 2.08436 5H14.9263C15.5476 5 16.0402 5.52267 15.9974 6.14133L15.2584 17.0213C15.1084 19.2613 13.2341 21 10.9849 21Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M6 16V9"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M11 9V16"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M1 2H16"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M9 2V1"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface ShippingIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ShippingIcon = ({
    width,
    height,
    className,
}: ShippingIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '3rem'}
        height={height || '2.2rem'}
        viewBox="0 0 23.159 21.5"
    >
        <path
            id="Line_352"
            data-name="Line 352"
            d="M6.47.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H6.47A.75.75,0,0,1,7.22,0,.75.75,0,0,1,6.47.75Z"
            transform="translate(7.496 5.637)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54601"
            data-name="Path 54601"
            d="M19.659,25.363H5.678a1.817,1.817,0,0,1-1.815-1.815V5.678A1.817,1.817,0,0,1,5.678,3.863H19.544a1.817,1.817,0,0,1,1.815,1.815V10.84a.75.75,0,0,1-1.5,0V5.678a.315.315,0,0,0-.315-.315H5.678a.316.316,0,0,0-.315.315v17.87a.315.315,0,0,0,.315.315H19.659a.315.315,0,0,0,.315-.315V20.936a.75.75,0,0,1,1.5,0v2.612A1.817,1.817,0,0,1,19.659,25.363Z"
            transform="translate(-3.863 -3.863)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54602"
            data-name="Path 54602"
            d="M186.027,111.452h0a1.15,1.15,0,0,1-1.062-1.582l1.485-3.653a.75.75,0,0,1,.164-.248l6.21-6.215a2.1,2.1,0,0,1,2.965,0l.784.784a2.1,2.1,0,0,1,0,2.965l-6.21,6.215a.75.75,0,0,1-.248.165l-3.653,1.485A1.149,1.149,0,0,1,186.027,111.452Zm1.755-4.531-1.114,2.742,2.742-1.114,6.1-6.108a.6.6,0,0,0,0-.844l-.784-.784a.6.6,0,0,0-.844,0Z"
            transform="translate(-174.027 -93.427)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_353"
            data-name="Line 353"
            d="M2.688,3.438a.748.748,0,0,1-.53-.22L-.53.53A.75.75,0,0,1-.53-.53.75.75,0,0,1,.53-.53L3.219,2.158a.75.75,0,0,1-.53,1.28Z"
            transform="translate(18.539 7.649)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54603"
            data-name="Path 54603"
            d="M213.588,213.576a.748.748,0,0,1-.53-.22l-2.688-2.688a.75.75,0,0,1,1.061-1.061l2.688,2.688a.75.75,0,0,1-.53,1.28Z"
            transform="translate(-197.783 -197.067)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_354"
            data-name="Line 354"
            d="M0,3.931a.748.748,0,0,1-.53-.22.75.75,0,0,1,0-1.061L2.651-.53a.75.75,0,0,1,1.061,0,.75.75,0,0,1,0,1.061L.53,3.711A.748.748,0,0,1,0,3.931Z"
            transform="translate(15.567 10.13)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54604"
            data-name="Path 54604"
            d="M47.82,71.078a.75.75,0,0,1-.57-.263l-.963-1.128a.75.75,0,1,1,1.14-.974l.354.415.958-1.28a.75.75,0,0,1,1.2.9l-1.52,2.031a.75.75,0,0,1-.576.3Z"
            transform="translate(-43.574 -63.729)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_355"
            data-name="Line 355"
            d="M5.126.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H5.126a.75.75,0,0,1,.75.75A.75.75,0,0,1,5.126.75Z"
            transform="translate(7.496 10.734)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54605"
            data-name="Path 54605"
            d="M47.82,156.094a.75.75,0,0,1-.57-.263l-.963-1.128a.75.75,0,0,1,1.14-.974l.354.415.958-1.28a.75.75,0,1,1,1.2.9l-1.52,2.031a.75.75,0,0,1-.576.3Z"
            transform="translate(-43.574 -143.648)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_356"
            data-name="Line 356"
            d="M2.427.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H2.427a.75.75,0,0,1,.75.75A.75.75,0,0,1,2.427.75Z"
            transform="translate(7.496 15.831)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54606"
            data-name="Path 54606"
            d="M47.82,241.109a.75.75,0,0,1-.57-.263l-.963-1.128a.75.75,0,1,1,1.141-.974l.354.415.958-1.28a.75.75,0,1,1,1.2.9l-1.52,2.031a.75.75,0,0,1-.576.3Z"
            transform="translate(-43.574 -223.567)"
            fill="currentcolor"
        ></path>
    </svg>
);

interface DiscountIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const DiscountIcon = ({
    width,
    height,
    className,
}: DiscountIconProps) => (
    <svg
        id="Component_63_1"
        data-name="Component 63 – 1"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '3rem'}
        height={height || '2.2rem'}
        viewBox="0 0 29.339 21.5"
    >
        <path
            id="Rectangle_8832"
            data-name="Rectangle 8832"
            d="M3-.75H24.839A3.754,3.754,0,0,1,28.589,3V17a3.754,3.754,0,0,1-3.75,3.75H3A3.754,3.754,0,0,1-.75,17V3A3.754,3.754,0,0,1,3-.75Zm21.839,20A2.253,2.253,0,0,0,27.089,17V3A2.253,2.253,0,0,0,24.839.75H3A2.253,2.253,0,0,0,.75,3V17A2.253,2.253,0,0,0,3,19.25Z"
            transform="translate(0.75 0.75)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_339"
            data-name="Line 339"
            d="M2.524.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H2.524a.75.75,0,0,1,.75.75A.75.75,0,0,1,2.524.75Z"
            transform="translate(0.75 10.75)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_340"
            data-name="Line 340"
            d="M10.22.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H10.22a.75.75,0,0,1,.75.75A.75.75,0,0,1,10.22.75Z"
            transform="translate(18.369 10.75)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_341"
            data-name="Line 341"
            d="M0,6.822a.75.75,0,0,1-.75-.75V0A.75.75,0,0,1,0-.75.75.75,0,0,1,.75,0V6.072A.75.75,0,0,1,0,6.822Z"
            transform="translate(10.566 14.677)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_342"
            data-name="Line 342"
            d="M0,6.229a.75.75,0,0,1-.75-.75V0A.75.75,0,0,1,0-.75.75.75,0,0,1,.75,0V5.479A.75.75,0,0,1,0,6.229Z"
            transform="translate(10.566 0.75)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54586"
            data-name="Path 54586"
            d="M127.382,79.8c-.186,0-.349,0-.492,0l-.259,0a.75.75,0,0,1-.73-.923c.033-.137.818-3.382,2.535-4.762a3.52,3.52,0,0,1,2.209-.823,2.955,2.955,0,0,1,2.223,1,2.719,2.719,0,0,1,.672,2.046,3.036,3.036,0,0,1-1.091,2.108A7.811,7.811,0,0,1,127.382,79.8Zm3.263-5.015a2.041,2.041,0,0,0-1.269.492,7.134,7.134,0,0,0-1.745,3.021,6.2,6.2,0,0,0,3.866-1.019,1.529,1.529,0,0,0,.547-1.063,1.234,1.234,0,0,0-.293-.931A1.454,1.454,0,0,0,130.645,74.79Z"
            transform="translate(-116.064 -67.705)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54587"
            data-name="Path 54587"
            d="M55.374,79.8a7.812,7.812,0,0,1-5.067-1.362,3.036,3.036,0,0,1-1.091-2.108,2.719,2.719,0,0,1,.672-2.046,2.955,2.955,0,0,1,2.223-1,3.52,3.52,0,0,1,2.208.822c1.717,1.38,2.5,4.625,2.535,4.762a.75.75,0,0,1-.73.923l-.259,0C55.722,79.8,55.56,79.8,55.374,79.8ZM52.111,74.79a1.454,1.454,0,0,0-1.107.5,1.234,1.234,0,0,0-.293.931,1.529,1.529,0,0,0,.547,1.063A6.2,6.2,0,0,0,55.123,78.3a7.155,7.155,0,0,0-1.744-3.021A2.041,2.041,0,0,0,52.111,74.79Z"
            transform="translate(-45.559 -67.705)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_343"
            data-name="Line 343"
            d="M3.206,3.956a.748.748,0,0,1-.53-.22L-.53.53A.75.75,0,0,1-.53-.53.75.75,0,0,1,.53-.53L3.736,2.675a.75.75,0,0,1-.53,1.28Z"
            transform="translate(10.566 11.353)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_344"
            data-name="Line 344"
            d="M0,3.956a.748.748,0,0,1-.53-.22.75.75,0,0,1,0-1.061L2.675-.53a.75.75,0,0,1,1.061,0,.75.75,0,0,1,0,1.061L.53,3.736A.748.748,0,0,1,0,3.956Z"
            transform="translate(7.359 11.353)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_345"
            data-name="Line 345"
            d="M5.515.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H5.515a.75.75,0,0,1,.75.75A.75.75,0,0,1,5.515.75Z"
            transform="translate(19.479 15.268)"
            fill="currentcolor"
        ></path>
        <path
            id="Line_346"
            data-name="Line 346"
            d="M2.757.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H2.757a.75.75,0,0,1,.75.75A.75.75,0,0,1,2.757.75Z"
            transform="translate(19.479 17.776)"
            fill="currentcolor"
        ></path>
    </svg>
);

interface GiftIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const GiftIcon = ({ width, height, className }: GiftIconProps) => (
    <svg
        data-name="Component 61 – 1"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '3rem'}
        height={height || '2.2rem'}
        viewBox="0 0 19.287 21.5"
    >
        <path
            id="Path_54595"
            data-name="Path 54595"
            d="M39.792,213.235H25.173a.75.75,0,0,1-.749-.711l-.477-9.042a.75.75,0,1,1,1.5-.079l.439,8.331h13.2l.439-8.331a.75.75,0,1,1,1.5.079l-.477,9.042A.75.75,0,0,1,39.792,213.235Z"
            transform="translate(-22.839 -191.735)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54596"
            data-name="Path 54596"
            d="M196.616,104.734h-5.767a.75.75,0,0,1,0-1.5h5.615v-3.1h-6.84a.75.75,0,0,1,0-1.5h6.992a1.35,1.35,0,0,1,1.348,1.348v3.408A1.35,1.35,0,0,1,196.616,104.734Z"
            transform="translate(-178.677 -93.407)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54597"
            data-name="Path 54597"
            d="M10.979,104.734H5.212c-.835,0-1.348-.932-1.348-1.6V99.726a1.032,1.032,0,0,1,.637-.989,1.8,1.8,0,0,1,.711-.107H12.2a.75.75,0,1,1,0,1.5H5.364v3a.376.376,0,0,0,.033.1h5.582a.75.75,0,0,1,0,1.5Z"
            transform="translate(-3.864 -93.407)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54598"
            data-name="Path 54598"
            d="M165.994,16.189a.751.751,0,0,1-.714-.98,7.142,7.142,0,0,1,2.152-3.15,3.869,3.869,0,0,1,2.723-.97,2.223,2.223,0,0,1,1.569.795,2.155,2.155,0,0,1,.5,1.761,2.666,2.666,0,0,1-1.26,1.771,7.713,7.713,0,0,1-1.741.739.75.75,0,1,1-.441-1.434,6.265,6.265,0,0,0,1.4-.584,1.19,1.19,0,0,0,.566-.74.682.682,0,0,0-.18-.561.74.74,0,0,0-.54-.253,2.364,2.364,0,0,0-1.616.612,5.705,5.705,0,0,0-1.7,2.472A.75.75,0,0,1,165.994,16.189Z"
            transform="translate(-156.35 -10.682)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54599"
            data-name="Path 54599"
            d="M65.288,9.37a.749.749,0,0,1-.24-.04,5.487,5.487,0,0,1-1.517-.761A2.657,2.657,0,0,1,62.7,4.911a2.415,2.415,0,0,1,1.712-1.017,4.034,4.034,0,0,1,3.018.907A5.839,5.839,0,0,1,69.441,8.51a.75.75,0,1,1-1.484.221A4.364,4.364,0,0,0,66.48,5.96a2.565,2.565,0,0,0-1.854-.581.946.946,0,0,0-.685.378c-.448.654.122,1.338.485,1.608a4.01,4.01,0,0,0,1.1.544.75.75,0,0,1-.24,1.461Z"
            transform="translate(-59.055 -3.862)"
            fill="currentcolor"
        ></path>
        <path
            id="Path_54600"
            data-name="Path 54600"
            d="M144.936,113.73a.75.75,0,0,1-.75-.75v-12.85h-1.107v12.85a.75.75,0,1,1-1.5,0v-13.6a.75.75,0,0,1,.75-.75h2.607a.75.75,0,0,1,.75.75v13.6A.75.75,0,0,1,144.936,113.73Z"
            transform="translate(-133.989 -93.408)"
            fill="currentcolor"
        ></path>
    </svg>
);

interface CartIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const CartIcon = ({ width, height, className }: CartIconProps) => (
    <svg
        className={className}
        width={width || '1.7rem'}
        height={height || '2.1rem'}
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.3166 19.7513H3.40213C2.21719 19.7513 1.27974 18.7663 1.36473 17.6088L2.28218 6.66884C2.32468 6.15134 2.75966 5.75134 3.27963 5.75134H13.4391C13.9591 5.75134 14.3916 6.14884 14.4366 6.66884L15.354 17.6088C15.439 18.7663 14.5016 19.7513 13.3166 19.7513Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M5.35938 8.75134V3.75134C5.35938 2.64634 6.25437 1.75134 7.35938 1.75134H9.35938C10.4644 1.75134 11.3594 2.64634 11.3594 3.75134V8.75134"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface UserIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const UserIcon = ({ width, height, className }: UserIconProps) => (
    <svg
        className={className}
        width={width || '2.1rem'}
        height={height || '2.1rem'}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.0234 19.7513C14.994 19.7513 19.0234 15.7219 19.0234 10.7513C19.0234 5.78078 14.994 1.75134 10.0234 1.75134C5.05288 1.75134 1.02344 5.78078 1.02344 10.7513C1.02344 15.7219 5.05288 19.7513 10.0234 19.7513Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M10.0227 11.5695C11.8302 11.5695 13.2955 10.1043 13.2955 8.29678C13.2955 6.4893 11.8302 5.02405 10.0227 5.02405C8.21525 5.02405 6.75 6.4893 6.75 8.29678C6.75 10.1043 8.21525 11.5695 10.0227 11.5695Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M15.7447 17.7005C15.592 13.4687 13.092 11.5696 10.0247 11.5696C6.95741 11.5696 4.45741 13.4687 4.30469 17.7005"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface CloseIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const CloseIcon = ({ width, height, className }: CloseIconProps) => (
    <svg
        className={className}
        width={width || '1.8rem'}
        height={height || '1.8rem'}
        id="Group_24924"
        data-name="Group 24924"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 25 25"
    >
        <defs>
            <clipPath id="clipPath">
                <rect
                    id="Rectangle_8252"
                    data-name="Rectangle 8252"
                    width="18"
                    height="18"
                    fill="currentcolor"
                ></rect>
            </clipPath>
        </defs>
        <g id="Group_24923" data-name="Group 24923">
            <path
                id="Path_38934"
                data-name="Path 38934"
                d="M23.214,25a1.78,1.78,0,0,1-1.263-.523L.523,3.048A1.786,1.786,0,0,1,3.048.523L24.477,21.952A1.786,1.786,0,0,1,23.214,25"
                transform="translate(0)"
                fill="currentcolor"
            ></path>
            <path
                id="Path_38935"
                data-name="Path 38935"
                d="M1.786,25A1.786,1.786,0,0,1,.523,21.952L21.952.523a1.786,1.786,0,1,1,2.525,2.525L3.048,24.477A1.78,1.78,0,0,1,1.786,25"
                transform="translate(0 0)"
                fill="currentcolor"
            ></path>
        </g>
    </svg>
);

interface HeartIconProps {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const HeartIcon = ({
    width,
    height,
    className,
    onClick,
}: HeartIconProps) => (
    <svg
        className={className}
        width={width || '1.8rem'}
        height={height || '1.8rem'}
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            d="M1.04297 5.85212C0.723013 3.5431 2.21909 1.26351 4.55949 1.02232C6.32517 0.839949 7.88938 1.79297 8.59743 3.23427C8.7663 3.57841 9.23437 3.57841 9.40323 3.23427C10.1113 1.79297 11.6755 0.839949 13.4412 1.02232C15.7816 1.26351 17.2747 3.5431 16.9577 5.85212C16.2141 11.2378 9.00033 16 9.00033 16C9.00033 16 1.78656 11.2378 1.04297 5.85212Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface ActiveHeartIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const ActiveHeartIcon = ({
    width,
    height,
    className,
}: ActiveHeartIconProps) => (
    <svg
        className={className}
        width={width || '1.8rem'}
        height={height || '1.8rem'}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
    >
        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>
);

interface CompareIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const CompareIcon = ({ width, height, className }: CompareIconProps) => (
    <svg
        className={className}
        width={width || '1.8rem'}
        height={height || '1.8rem'}
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5 10L1.73898 7.09097C0.753673 6.21319 0.753673 4.78681 1.73898 3.90903L5 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16 6L1 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M13 10L16.261 12.909C17.2463 13.7868 17.2463 15.2132 16.261 16.091L13 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M2 15L17 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface QuickByIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const QuickByIcon = ({ width, height, className }: QuickByIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        width={width || '2.4rem'}
        height={height || '1.7rem'}
        viewBox="0 0 24 17"
        fill="none"
    >
        <path
            d="M12 4C18.4504 4 22 10 22 10C22 10 18.4504 16 12 16C5.54956 16 2 10.0002 2 10.0002C2 10.0002 5.54956 4.00023 12 4.00023V4Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M13.275 11.3815C14.056 10.6005 14.0488 9.34145 13.2588 8.56943C12.4688 7.79742 11.1953 7.80474 10.4142 8.58579C9.63316 9.36684 9.6404 10.6258 10.4304 11.3979C11.2204 12.1699 12.4939 12.1626 13.275 11.3815Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M12 1V4.00003"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M6 3L7 6"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M1 6L2 7"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M19 3L17 6"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M23 6L21 8"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface AddToCartIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const AddToCartIcon = ({
    width,
    height,
    className,
}: AddToCartIconProps) => (
    <svg
        className={className}
        width={width || '1.7rem'}
        height={height || '2.1rem'}
        viewBox="0 0 17 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13.3166 19.7513H3.40213C2.21719 19.7513 1.27974 18.7663 1.36473 17.6088L2.28218 6.66884C2.32468 6.15134 2.75966 5.75134 3.27963 5.75134H13.4391C13.9591 5.75134 14.3916 6.14884 14.4366 6.66884L15.354 17.6088C15.439 18.7663 14.5016 19.7513 13.3166 19.7513Z"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M5.35938 8.75134V3.75134C5.35938 2.64634 6.25437 1.75134 7.35938 1.75134H9.35938C10.4644 1.75134 11.3594 2.64634 11.3594 3.75134V8.75134"
            stroke="currentcolor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

interface CompareFillIconProps {
    width?: string;
    height?: string;
    className?: string;
}

export const CompareFillIcon = ({
    width,
    height,
    className,
}: CompareFillIconProps) => (
    <svg
        className={className}
        width={width || '1.8rem'}
        height={height || '1.8rem'}
        fill="currentcolor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 18 18"
        xmlSpace="preserve"
    >
        <path
            d="M9,17.5c-1.2,0-2.3-0.2-3.3-0.7c-1-0.4-1.9-1.1-2.7-1.8s-1.4-1.7-1.8-2.7S0.5,10.2,0.5,9s0.2-2.3,0.7-3.3S2.2,3.8,3,3
	s1.7-1.4,2.7-1.8S7.8,0.5,9,0.5c0.9,0,1.8,0.1,2.6,0.4c0.8,0.3,1.6,0.6,2.3,1.1l-1.2,1.3c-0.5-0.3-1.1-0.6-1.7-0.8
	C10.3,2.3,9.7,2.2,9,2.2c-1.9,0-3.5,0.7-4.8,2s-2,2.9-2,4.8s0.7,3.5,2,4.8s2.9,2,4.8,2s3.5-0.7,4.8-2s2-2.9,2-4.8c0-0.3,0-0.5,0-0.8
	c0-0.3-0.1-0.5-0.1-0.7L17,6.1c0.2,0.5,0.3,0.9,0.4,1.4c0.1,0.5,0.1,1,0.1,1.5c0,1.2-0.2,2.3-0.7,3.3c-0.4,1-1.1,1.9-1.8,2.7
	s-1.7,1.4-2.7,1.8C11.3,17.3,10.2,17.5,9,17.5z M7.8,12.9L4.2,9.3l1.2-1.2l2.4,2.4L16.3,2l1.2,1.2L7.8,12.9z"
        />
    </svg>
);

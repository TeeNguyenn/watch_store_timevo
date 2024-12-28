import config from '../config';

import About from '../pages/About';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import Faq from '../pages/Faq';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Detail from '../pages/Detail';
import ActiveAccount from '../pages/ActiveAccount';
import Checkout from '../pages/Checkout';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import OrderSuccess from '../pages/OrderSuccess';
import Compare from '../pages/Compare';
import PageNotFound from '../pages/PageNotFound';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import OrderDetails from '../pages/OrderDetails';
import SearchResult from '../pages/SearchResult';
import Dashboard from '../pages/Dashboard';
import { AdminLayout } from '../layouts';
import AdminCustomers from '../pages/AdminCustomers';
import AdminProducts from '../pages/AdminProducts';
import AdminNewCustomer from '../pages/AdminNewCustomer';
import AdminDetailCustomer from '../pages/AdminDetailCustomer';
import AdminOrders from '../pages/AdminOrders';
import AdminOrderDetails from '../pages/AdminOrderDetails';
import AdminNewProduct from '../pages/AdminNewProduct';
import OTPAuthentication from '../pages/OTPAuthentication';
import NewPassword from '../pages/NewPassword';
import ChangePassword from '../pages/ChangePassword';

const publicRoutes: Array<any> = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.shop,
        component: Shop,
    },
    {
        path: config.routes.about,
        component: About,
    },
    {
        path: config.routes.blog,
        component: Blog,
    },
    {
        path: config.routes.faq,
        component: Faq,
    },
    {
        path: config.routes.contact,
        component: Contact,
    },
    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.detail,
        component: Detail,
    },
    {
        path: config.routes.accountStatus,
        component: ActiveAccount,
    },
    {
        path: config.routes.checkout,
        component: Checkout,
        layout: null,
    },
    {
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.wishlist,
        component: Wishlist,
    },
    {
        path: config.routes.orderSuccessful,
        component: OrderSuccess,
    },
    {
        path: config.routes.compare,
        component: Compare,
    },
    {
        path: config.routes.pageNotFound,
        component: PageNotFound,
    },
    {
        path: config.routes.forgotPassword,
        component: ForgotPassword,
    },
    {
        path: config.routes.forgotPasswordOTP,
        component: OTPAuthentication,
    },
    {
        path: config.routes.forgotPasswordNew,
        component: NewPassword,
    },
    {
        path: config.routes.changePassword,
        component: ChangePassword,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.orderDetails,
        component: OrderDetails,
    },
    {
        path: config.routes.searchResult,
        component: SearchResult,
    },


];
const privateRoutes: Array<any> = [
    // admin
    {
        path: config.routes.adminDashboard,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminCustomers,
        component: AdminCustomers,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminNewCustomer,
        component: AdminNewCustomer,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminEditCustomer,
        component: AdminNewCustomer,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminDetailCustomer,
        component: AdminDetailCustomer,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminProducts,
        component: AdminProducts,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminNewProduct,
        component: AdminNewProduct,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminEditProduct,
        component: AdminNewProduct,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminOrders,
        component: AdminOrders,
        layout: AdminLayout,
    },
    {
        path: config.routes.adminOrderDetails,
        component: AdminOrderDetails,
        layout: AdminLayout,
    },
];

export { publicRoutes, privateRoutes };

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import ClubsTable from '../pages/dashboard/clubs';
import AboutUs from '../pages/dashboard/about-us';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Disclaimer from '../pages/dashboard/disclaimer';
import Profile from '../pages/dashboard/profile';
import NotificaitonPage from '../pages/dashboard/notification';


const router = createBrowserRouter([
    {
        path: '/',
        element:  <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard/> },
            {path:"users",element:<Users/>},
            {path:"clubs-deck",element:<ClubsTable/>},
            {path:"about-us",element:<AboutUs/>},
            {path:"privacy-policy",element:<PrivacyPolicy/>},
            {path:"terms-of-service",element:<TermsAndCondition/>},
            {path:"disclaimer",element:<Disclaimer/>},
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <NotificaitonPage /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
   
]);

export default router;

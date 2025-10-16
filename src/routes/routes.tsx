import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import ServiceDeck from '../pages/dashboard/service-deck';
import NDA from '../pages/dashboard/nda';
import Asset from '../pages/dashboard/asset';
import TrainingMaterial from '../pages/dashboard/training-material';
import Profile from '../pages/dashboard/profile';
import SupportInboxTable from '../pages/dashboard/support/SupportSection';


const router = createBrowserRouter([
    {
        path: '/',
        element:  <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <NDA/> },
            {path:"asset",element:<Asset/>},
            { path: 'service-deck', element: <ServiceDeck/> },
            { path: 'training-material', element: <TrainingMaterial/> },
            {path:"profile",element:<Profile/>},
            {path:"support",element:<SupportInboxTable/>},
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
   
]);

export default router;

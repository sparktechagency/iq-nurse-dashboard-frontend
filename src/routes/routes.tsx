import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Profile from '../pages/dashboard/profile';
import Notification from '../pages/dashboard/notification';
import Packages from '../pages/dashboard/package';
import StudyNotes from '../pages/dashboard/study-notes';
import PatientAssessment from '../pages/dashboard/patient-assessment';
import ClinicalSkills from '../pages/dashboard/clinical-skills';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import BodySystem from '../pages/dashboard/body-system';
import ExamsPage from '../pages/dashboard/exams';
import TemplatesPage from '../pages/dashboard/templates';
import FlashcardsPage from '../pages/dashboard/flashcards';
import FAQPage from '../pages/dashboard/faq';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: "users", element: <Users /> },
            { path: "package", element: <Packages /> },
            { path: "study-notes", element: <StudyNotes /> },
            { path: "body-system", element: <BodySystem /> },
            { path: "patient-assessment", element: <PatientAssessment /> },
            { path: "clinical-skills", element: <ClinicalSkills /> }, 
            { path: "templates", element: <TemplatesPage /> }, 
            { path: "exams", element: <ExamsPage /> }, 
            { path: "flashcards", element: <FlashcardsPage /> }, 
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "terms-and-condition", element: <TermsAndCondition /> },
            { path: "faq", element: <FAQPage /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;

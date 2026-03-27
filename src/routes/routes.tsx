import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Profile from '../pages/dashboard/profile';
import Notification from '../pages/dashboard/notification';
import Packages from '../pages/dashboard/package';
import ClinicalSkills from '../pages/dashboard/clinical-skills';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import BodySystem from '../pages/dashboard/body-system';
import ExamsPage from '../pages/dashboard/exams';
import TemplatesPage from '../pages/dashboard/templates';
import ErrorPage from '../pages/error/ErrorPage';
// import StudyNotesPage from '../pages/dashboard/study-notes';
import SubcategoryTopicsPage from '../pages/dashboard/study-notes/SubCategoryIndex';
import AddBodySystem from '../pages/dashboard/body-system/add-body-system';
import CategorySkillsPage from '../pages/dashboard/clinical-skills/skills';
import TopicQuestionsPage from '../pages/dashboard/exams/topic-questions';
import FAQCategoryPage from '../pages/dashboard/faq';
import FAQs from '../pages/dashboard/faq/faqs';
import StudyNoteCategory from '../pages/dashboard/study-notes/StudyNoteCategory';
import DosageCalculationPage from '../pages/dashboard/dosage-calculation';
import StudyNoteMainTopic from '../pages/dashboard/study-notes/StudyNoteMainTopic';
import ECGMasteryMainTopic from '../pages/dashboard/ecg-mastery';
import ECGMasteryCategoryPage from '../pages/dashboard/ecg-mastery/subcategory';
import DiagnosticMainTopic from '../pages/dashboard/diagnostic-tests-laboratory';
import DiagnosticCategoryPage from '../pages/dashboard/diagnostic-tests-laboratory/subcategory';
import PracticeQuestionsPage from '../pages/dashboard/diagnostic-tests-laboratory/practice-questions';
import DosageCalculationQuestionsPage from '../pages/dashboard/dosage-calculation/practice-questions';
import PracticalSkillsMainTopic from '../pages/dashboard/practical-skills';
import PracticalSkillsCategoryPage from '../pages/dashboard/practical-skills/subcategory';
import PracticalSkillsQuestionsPage from '../pages/dashboard/practical-skills/practice-questions';
import CheatSheetsMainTopic from '../pages/dashboard/cheat-sheets';
import CheatSheetsCategoryPage from '../pages/dashboard/cheat-sheets/subcategory';
import NursingAssessmentsPage from '../pages/dashboard/nursing-assessments';
import CarePlansMainTopic from '../pages/dashboard/care-plans';
import CarePlansCategoryPage from '../pages/dashboard/care-plans/subcategory';
import FlashCardsPage from '../pages/dashboard/flashcards';
import ECGMasteryQuestionsPage from '../pages/dashboard/ecg-mastery/practice-questions';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'users', element: <Users /> },
            { path: 'package', element: <Packages /> },
            // study notes
            { path: 'study-notes', element: <StudyNoteMainTopic /> },
            { path: 'study-notes/:category', element: <StudyNoteCategory /> },
            { path: 'study-notes/:category/:subcategory', element: <SubcategoryTopicsPage /> },
            // { path: 'study-notes/:category', element: <StudyNotesPage /> },

            //body system
            { path: 'body-system', element: <BodySystem /> },
            { path: 'body-system/add-body-system', element: <AddBodySystem /> },

            // dosage calculation
            { path: 'dosage-calculation', element: <DosageCalculationPage /> },
            { path: 'dosage-calculation/practice-questions', element: <DosageCalculationQuestionsPage /> },

            { path: 'ecg-mastery', element: <ECGMasteryMainTopic /> },
            { path: 'ecg-mastery/practice-questions', element: <ECGMasteryQuestionsPage /> },
            { path: 'ecg-mastery/:category', element: <ECGMasteryCategoryPage /> },

            //practical-skills
            { path: 'practical-skills', element: <PracticalSkillsMainTopic /> },
            { path: 'practical-skills/practice-questions', element: <PracticalSkillsQuestionsPage /> },
            { path: 'practical-skills/:category', element: <PracticalSkillsCategoryPage /> },

            //cheat-sheets
            { path: 'cheat-sheets', element: <CheatSheetsMainTopic /> },
            { path: 'cheat-sheets/:category', element: <CheatSheetsCategoryPage /> },

            //diagnostic-tests
            { path: 'diagnostic-tests', element: <DiagnosticMainTopic /> },
            { path: 'diagnostic-tests/practice-questions', element: <PracticeQuestionsPage /> },
            { path: 'diagnostic-tests/:category', element: <DiagnosticCategoryPage /> },

            { path: 'nursing-assessments', element: <NursingAssessmentsPage /> },

            { path: 'care-plans', element: <CarePlansMainTopic /> },
            { path: 'care-plans/:category', element: <CarePlansCategoryPage /> },

            { path: 'clinical-skills', element: <ClinicalSkills /> },
            { path: 'clinical-skills/:categoryId', element: <CategorySkillsPage /> },
            { path: 'templates', element: <TemplatesPage /> },
            { path: 'exam', element: <ExamsPage /> },
            { path: 'exam/:topicId', element: <TopicQuestionsPage /> },
            { path: 'flashcards', element: <FlashCardsPage /> },
            // { path: 'flashcards/:category', element: <FlashcardList /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
            { path: 'privacy-policy', element: <PrivacyPolicy /> },
            { path: 'terms-and-condition', element: <TermsAndCondition /> },
            { path: 'faq', element: <FAQCategoryPage /> },
            { path: 'faq/:category', element: <FAQs /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;

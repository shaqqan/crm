import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/dashboard.page';
import FinancePage from '@/pages/finance/Ffinance.page';
import GroupPage from '@/pages/groups/Group.page';
import LeadsPage from '@/pages/leads/Leads.page';
import { MentorsPage } from '@/pages/mentors/Mentors.page';
import EmployeesAttendancePage from '@/pages/reports/employees-attendance/EmployeesAttendance.page';
import GraduatesReportPage from '@/pages/reports/graduates-report/GraduatesReport.page';
import LidsReportPage from '@/pages/reports/lids-report/LidsReport.page';
// Reports pages
import StudentsPaymentsPage from '@/pages/reports/students-payments/StudentsPayments.page';
import StudentsRatingPage from '@/pages/reports/students-rating/StudentsRating.page';
import StudentsReportPage from '@/pages/reports/students-report/StudentsReport.page';
import BotNotificationsPage from '@/pages/settings/activities-history/bot-notifications/BotNotifications.page';
import LogsLoginPage from '@/pages/settings/activities-history/logs-login/Logs-login.page';
import PaymentsPage from '@/pages/settings/activities-history/payments/Payments.page';
import SentSmsHistoryPage from '@/pages/settings/activities-history/sent-sms-history/SentSmsHistory.page';
import EmployeesPage from '@/pages/settings/CEO/employees/Employees.page';
import GeneralSettingsPage from '@/pages/settings/CEO/general-settings/General-settings.page';
import RolesPage from '@/pages/settings/CEO/roles/Roles.page';
import FormsPage from '@/pages/settings/forms/Forms.page';
import TelegramIntegrationPage from '@/pages/settings/integration/telegram-integration/TelegramIntegration.page';
import ApplicationFormsPage from '@/pages/settings/office/application-forms/ApplicationForms.page';
import BranchesPage from '@/pages/settings/office/branches/Branches.page';
import CoursesPage from '@/pages/settings/office/course/Courses.page';
import DepartmentsPage from '@/pages/settings/office/departments/Departments.page';
import HolidaysPage from '@/pages/settings/office/holidays/Holidays.page';
import PaymentTypesPage from '@/pages/settings/office/payment-types/PaymentTypes.page';
import RoomsPage from '@/pages/settings/office/rooms/Rooms.page';
import SchoolsPage from '@/pages/settings/office/schools/Schools.page';
// Settings pages
import SmsPage from '@/pages/settings/sms/Sms.page';
import StudentsPage from '@/pages/students/Students.page';
import MainLayout from '../layouts/main-layout/main/main-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/leads',
        element: <LeadsPage />,
      },
      {
        path: '/mentors',
        element: <MentorsPage />,
      },
      {
        path: '/groups',
        element: <GroupPage />,
      },
      {
        path: '/students',
        element: <StudentsPage />,
      },
      {
        path: '/finance',
        element: <FinancePage />,
      },

      {
        path: '/settings',
        children: [
          {
            path: 'sms',
            element: <SmsPage />,
          },
          {
            path: 'office',
            children: [
              {
                path: 'courses',
                element: <CoursesPage />,
              },
              {
                path: 'rooms',
                element: <RoomsPage />,
              },
              {
                path: 'holidays',
                element: <HolidaysPage />,
              },
              {
                path: 'branches',
                element: <BranchesPage />,
              },
              {
                path: 'departments',
                element: <DepartmentsPage />,
              },
              {
                path: 'schools',
                element: <SchoolsPage />,
              },
              {
                path: 'payment-types',
                element: <PaymentTypesPage />,
              },
              {
                path: 'application-forms',
                element: <ApplicationFormsPage />,
              },
            ],
          },
          {
            path: 'ceo',
            children: [
              {
                path: 'general-settings',
                element: <GeneralSettingsPage />,
              },
              {
                path: 'employees',
                element: <EmployeesPage />,
              },
              {
                path: 'roles',
                element: <RolesPage />,
              },
            ],
          },
          {
            path: 'activities-history',
            children: [
              {
                path: 'payments',
                element: <PaymentsPage />,
              },
              {
                path: 'logs-login',
                element: <LogsLoginPage />,
              },
            ],
          },
          {
            path: 'forms',
            element: <FormsPage />,
          },
          {
            path: 'integration',
            children: [
              {
                path: 'telegram-integration',
                element: <TelegramIntegrationPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/bot-notifications',
        element: <BotNotificationsPage />,
      },
      {
        path: '/sent-sms-history',
        element: <SentSmsHistoryPage />,
      },
      {
        path: '/forms',
        element: <FormsPage />,
      },
      {
        path: '/telegram-integration',
        element: <TelegramIntegrationPage />,
      },
      {
        path: '/reports',
        children: [
          {
            path: 'students-payments',
            element: <StudentsPaymentsPage />,
          },
          {
            path: 'employees-attendance',
            element: <EmployeesAttendancePage />,
          },
          {
            path: 'students-rating',
            element: <StudentsRatingPage />,
          },
          {
            path: 'lids-report',
            element: <LidsReportPage />,
          },
          {
            path: 'students-report',
            element: <StudentsReportPage />,
          },
          {
            path: 'graduates-report',
            element: <GraduatesReportPage />,
          },
        ],
      },
      {
        path: '/students-payments',
        element: <StudentsPaymentsPage />,
      },
      {
        path: '/employees-attendance',
        element: <EmployeesAttendancePage />,
      },
      {
        path: '/students-rating',
        element: <StudentsRatingPage />,
      },
      {
        path: '/lids-report',
        element: <LidsReportPage />,
      },
      {
        path: '/students-report',
        element: <StudentsReportPage />,
      },
      {
        path: '/graduates-report',
        element: <GraduatesReportPage />,
      },
      {
        path: '*',
        element: <>404 not found</>,
      },
    ],
  },
]);

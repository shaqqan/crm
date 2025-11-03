import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/dashboard.page';
import FinancePage from '@/pages/finance/Ffinance.page';
import GroupPage from '@/pages/groups/Group.page';
import LeadsPage from '@/pages/leads/Leads.page';
import { MentorsPage } from '@/pages/mentors/Mentors.page';
import LogsLoginPage from '@/pages/settings/activities-history/logs-login/Logs-login.page';
import PaymentsPage from '@/pages/settings/activities-history/payments/Payments.page';
import EmployeesPage from '@/pages/settings/CEO/employees/Employees.page';
import GeneralSettingsPage from '@/pages/settings/CEO/general-settings/General-settings.page';
import CoursesPage from '@/pages/settings/office/course/Courses.page';
import HolidaysPage from '@/pages/settings/office/holidays/Holidays.page';
import RoomsPage from '@/pages/settings/office/rooms/Rooms.page';
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
        ],
      },
      {
        path: '*',
        element: <>404 not found</>,
      },
    ],  
  },
]);

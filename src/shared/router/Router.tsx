import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '@/pages/dashboard/dashboard.page';
import LeadsPage from '@/pages/leads/Leads.page';
import { MentorsPage } from '@/pages/mentors/Mentors.page';
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
    ],
  },
]);

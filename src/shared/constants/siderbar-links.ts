import {
  FaBell,
  FaBook,
  FaBuilding,
  FaCalendar,
  FaCog,
  FaFileAlt,
  FaHistory,
  FaHome,
  FaLink,
  FaList,
  FaMoneyBill,
  FaSchool,
  FaSignInAlt,
  FaSms,
  FaStar,
  FaTelegram,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from 'react-icons/fa';

export type SidebarChild = {
  id: string;
  link?: string;
  label: string;
  Icon: any;
  children?: SidebarChild[];
};

export type SidebarLink = {
  id: string;
  link?: string;
  label: string;
  Icon: any;
  children?: SidebarChild[];
};

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: '1',
    link: '/dashboard',
    label: 'Bosh sahifa',
    Icon: FaHome,
  },
  {
    id: '2',
    link: '/leads',
    label: 'Lidlar',
    Icon: FaList,
  },
  {
    id: '3',
    link: '/mentors',
    label: 'O`qituvchilar',
    Icon: FaUserTie,
  },
  //   Guruhlar
  {
    id: '4',
    link: '/groups',
    label: 'Guruhlar',
    Icon: FaUsers,
  },
  //   O'quvchilar
  {
    id: '5',
    link: '/students',
    label: "O'quvchilar",
    Icon: FaUserGraduate,
  },
  //   Moliya
  {
    id: '6',
    link: '/finance',
    label: 'Moliya',
    Icon: FaMoneyBill,
  },

  //   Sozlamar
  {
    id: '8',
    label: 'Sozlamar',
    Icon: FaCog,
    children: [
      // SMS Sozlamalari
      {
        id: '8-1',
        link: '/settings/sms',
        label: 'SMS Sozlamalari',
        Icon: FaSms,
      },
      // Ofis
      {
        id: '8-2',
        link: '/office-settings',
        label: 'Ofis',
        Icon: FaBuilding,
        children: [
          // Kurslar
          {
            id: '8-2-1',
            link: '/settings/office/courses',
            label: 'Kurslar',
            Icon: FaBook,
          },
          //   Xonalar
          {
            id: '8-2-2',
            link: '/settings/office/rooms',
            label: 'Xonalar',
            Icon: FaBuilding,
          },
          //   Dam olish kunlari
          {
            id: '8-2-3',
            link: '/settings/office/holidays',
            label: 'Dam olish kunlari',
            Icon: FaCalendar,
          },
        ],
      },
      //   CEO
      {
        id: '8-3',
        link: '/ceo',
        label: 'CEO',
        Icon: FaUserTie,
        children: [
          // Umumiy sozlamalar
          {
            id: '8-3-1',
            link: '/settings/ceo/general-settings',
            label: 'Umumiy sozlamalar',
            Icon: FaCog,
          },
          // Xodimlar
          {
            id: '8-3-2',
            link: '/settings/ceo/employees',
            label: 'Xodimlar',
            Icon: FaUserTie,
          },
        ],
      },
      // Harakatlar tarixi
      {
        id: '8-4',
        link: '/activities-history',
        label: 'Harakatlar tarixi',
        Icon: FaHistory,
        children: [
          // Tolovlar
          {
            id: '8-4-1',
            link: '/settings/activities-history/payments',
            label: 'To`lovlar',
            Icon: FaMoneyBill,
          },
          //   Tizimga kirishlar
          {
            id: '8-4-2',
            link: '/settings/activities-history/logs-login',
            label: 'Tizimga kirishlar',
            Icon: FaSignInAlt,
          },
          // Bot xabarnoma
          {
            id: '8-4-3',
            link: '/bot-notifications',
            label: 'Bot xabarnoma',
            Icon: FaBell,
          },
          //   Yuborilgan SMSlar
          {
            id: '8-4-4',
            link: '/sent-sms-history',
            label: 'Yuborilgan SMSlar',
            Icon: FaSms,
          },
        ],
      },
      //   Formalar
      {
        id: '8-5',
        link: '/forms',
        label: 'Formalar',
        Icon: FaFileAlt,
      },
      // Integratsiya
      {
        id: '8-6',
        link: '/integration',
        label: 'Integratsiya',
        Icon: FaLink,
        children: [
          // Telegram
          {
            id: '8-6-1',
            link: '/telegram-integration',
            label: 'Telegram Bot',
            Icon: FaTelegram,
          },
        ],
      },
    ],
  },

  //   Hisobotlar
  {
    id: '7',
    link: '/reports',
    label: 'Hisobotlar',
    Icon: FaFileAlt,
    children: [
      // O'quvchilar to'lovi
      {
        id: '7-1',
        link: '/students-payments',
        label: "O'quvchilar to'lovi",
        Icon: FaMoneyBill,
      },

      // Xodimlar Davomati
      {
        id: '7-2',
        link: '/employees-attendance',
        label: 'Xodimlar Davomati',
        Icon: FaUserTie,
      },
      // Talabalar reytingi
      {
        id: '7-3',
        link: '/students-rating',
        label: 'Talabalar reytingi',
        Icon: FaStar,
      },
      // Lidlar Hisoboti
      {
        id: '7-4',
        link: '/lids-report',
        label: 'Lidlar Hisoboti',
        Icon: FaList,
      },
      // O'quvchilar Hisoboti
      {
        id: '7-5',
        link: '/students-report',
        label: "O'quvchilar Hisoboti",
        Icon: FaUserGraduate,
      },
      // Bitiruvchilar
      {
        id: '7-6',
        link: '/graduates-report',
        label: 'Bitiruvchilar',
        Icon: FaUserGraduate,
      },
    ],
  },
];

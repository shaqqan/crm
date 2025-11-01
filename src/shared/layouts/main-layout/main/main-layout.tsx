import { Suspense, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppShell, Breadcrumbs, Burger, Center, Loader, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';

const MainLayout = () => {
  const theme = useMantineTheme();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  // Media queries
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter((path) => path);
    const breadcrumbItems = [{ title: 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const title = path.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
      breadcrumbItems.push({ title, href: currentPath });
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = generateBreadcrumbs();

  return (
    <AppShell
      layout="alt"
      header={{ height: isMobile ? 60 : 72 }}
      navbar={{
        width: sidebarCollapsed ? 72 : 250,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: false },
      }}
      padding={0}
    >
      <AppShell.Header withBorder={false}>
        {isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              padding: '0 16px',
              justifyContent: 'space-between',
            }}
          >
            <Burger opened={mobileOpened} onClick={toggleMobile} size="sm" />
            <img src="/images/logo.png" alt="Logo" width={24} height={24} />
          </div>
        )}
        {!isMobile && <Header />}
      </AppShell.Header>

      <AppShell.Navbar withBorder={false}>
        <Navbar
          collapsed={isMobile ? false : sidebarCollapsed}
          onToggle={() => {
            if (isMobile) {
              toggleMobile();
            } else {
              setSidebarCollapsed((prev) => !prev);
            }
          }}
        />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          backgroundColor: theme.colors.grayscales[1],
          minHeight: '100vh',
          transition: 'all 0.2s ease',
        }}
      >
        <div
          style={{
            padding: isMobile ? '12px 16px' : isTablet ? '16px 24px' : '20px 40px',
          }}
        >
          {location.pathname !== '/' && (
            <Breadcrumbs
              mb={isMobile ? 12 : 20}
              styles={{
                separator: { color: theme.colors.grayscales[5] },
                breadcrumb: {
                  fontSize: isMobile ? '12px' : '14px',
                  color: theme.colors.grayscales[6],
                  textDecoration: 'none',
                  '&:hover': { color: theme.colors.primary[6], textDecoration: 'underline' },
                  '&[data-active]': { color: theme.colors.primary[6], fontWeight: 600 },
                },
              }}
            >
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                return isLast ? (
                  <span key={item.href} data-active>
                    {item.title}
                  </span>
                ) : (
                  <Link key={item.href} to={item.href}>
                    {item.title}
                  </Link>
                );
              })}
            </Breadcrumbs>
          )}

          <Suspense
            fallback={
              <Center mt={30}>
                <Loader color="var(--mantine-color-primary-6)" type="dots" />
              </Center>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;

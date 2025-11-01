import { useState } from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Image,
  NavLink,
  Popover,
  ScrollArea,
  Stack,
  Tooltip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SIDEBAR_LINKS, SidebarChild, SidebarLink } from '@/shared/constants/siderbar-links';
import styles from './navbar.module.css';

interface NavbarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Navbar = ({ collapsed, onToggle }: NavbarProps) => {
  const t = (key: string) => key;
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const currentPath = pathname.split('/').slice(0, 3).join('/');

  const hasActiveChild = (children?: SidebarChild[]): boolean =>
    !!children?.some((child) => child.link === currentPath || hasActiveChild(child.children));

  const findOpenParents = (links: SidebarLink[] | SidebarChild[]): string[] => {
    const openIds: string[] = [];
    const checkLink = (link: SidebarLink | SidebarChild) => {
      if (link.link === currentPath) openIds.push(link.id);
      if (link.children) {
        const childHasActive = hasActiveChild(link.children);
        if (childHasActive) {
          openIds.push(link.id);
          link.children.forEach(checkLink);
        }
      }
    };
    links.forEach(checkLink);
    return openIds;
  };

  const [openLinkIds, setOpenLinkIds] = useState<string[]>(() => findOpenParents(SIDEBAR_LINKS));
  const handleParentClick = (linkId: string) =>
    setOpenLinkIds((prev) =>
      prev.includes(linkId) ? prev.filter((id) => id !== linkId) : [...prev, linkId]
    );

  const renderNavLink = (link: SidebarLink | SidebarChild, level: number = 0) => {
    const navLinkContent = (
      <NavLink
        variant="filled"
        leftSection={
          <link.Icon
            size={isMobile ? 20 : 16}
            stroke={1.5}
            className={
              currentPath === link.link ? styles['main-link-icon-active'] : styles['main-link-icon']
            }
          />
        }
        className={styles['main-link']}
        component={Link}
        to={link.link || ''}
        label={!collapsed ? t(link.label) : undefined}
        key={link.id}
        active={currentPath === link.link}
        opened={openLinkIds.includes(link.id)}
        onClick={!collapsed && link.children ? () => handleParentClick(link.id) : undefined}
        styles={{
          root: {
            justifyContent: collapsed ? 'center' : 'flex-start',
            alignItems: 'center',
            paddingLeft: `calc(var(--mantine-spacing-md) * ${level + 1})`,
            fontSize: isMobile ? '15px' : '14px',
          },
          body: { display: collapsed ? 'none' : 'flex' },
          label: { marginLeft: level > 0 ? '10px' : '0px' },
        }}
      >
        {!collapsed && link.children?.map((child) => renderNavLink(child, level + 1))}
      </NavLink>
    );

    if (collapsed && !link.children) {
      return (
        <Tooltip key={link.id} label={t(link.label)} position="right" withArrow>
          {navLinkContent}
        </Tooltip>
      );
    }

    if (collapsed && link.children) {
      const popoverTargetNavLink = (
        <NavLink
          variant="filled"
          leftSection={
            <link.Icon
              size={20}
              stroke={1.5}
              className={
                currentPath === link.link
                  ? styles['main-link-icon-active']
                  : styles['main-link-icon']
              }
            />
          }
          className={styles['main-link']}
          component="div"
          label={undefined}
          key={link.id}
          active={currentPath === link.link || hasActiveChild(link.children)}
          styles={{
            root: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            body: { display: 'none' },
          }}
        />
      );

      return (
        <Popover key={link.id} position="right-start" withArrow>
          <Popover.Target>{popoverTargetNavLink}</Popover.Target>
          <Popover.Dropdown p={6}>
            <Stack gap={2}>
              {link.children.map((child) => (
                <NavLink
                  key={child.id}
                  component={Link}
                  to={child.link || ''}
                  label={t(child.label)}
                  leftSection={
                    <child.Icon
                      size={18}
                      stroke={1.5}
                      className={
                        currentPath === child.link
                          ? styles['main-link-icon-active']
                          : styles['main-link-icon']
                      }
                    />
                  }
                  active={currentPath === child.link}
                  className={styles['main-link']}
                  styles={{
                    root: {
                      justifyContent: 'flex-start',
                      minWidth: 150,
                    },
                  }}
                />
              ))}
            </Stack>
          </Popover.Dropdown>
        </Popover>
      );
    }

    return navLinkContent;
  };

  const navbarWidth = isMobile ? 250 : collapsed ? 72 : 250;

  return (
    <Box style={{ width: navbarWidth, transition: 'width 0.15s ease' }}>
      <Flex
        h={isMobile ? 60 : 72}
        align="center"
        justify={collapsed && !isMobile ? 'center' : 'space-between'}
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: collapsed && !isMobile ? undefined : '0 16px',
        }}
      >
        {collapsed && !isMobile ? (
          <Image
            src="/images/logo.png"
            alt="Logo"
            w={28}
            h={28}
            onClick={onToggle}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <>
            <Flex align="center" gap={8}>
              <img
                src="/images/logo.png"
                alt="Logo"
                width={isMobile ? 24 : 28}
                height={isMobile ? 24 : 28}
              />
              <h1 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t('navbar.title')}</h1>
            </Flex>

            {!isMobile && (
              <ActionIcon
                variant="transparent"
                color="var(--mantine-color-grayscales-7)"
                onClick={onToggle}
                size={28}
              >
                <IconChevronLeft stroke={1.5} size={20} />
              </ActionIcon>
            )}
          </>
        )}
      </Flex>
      <Divider orientation="horizontal" color="var(--mantine-color-grayscales-2)" size="xs" />

      <ScrollArea h={isMobile ? 'calc(100vh - 60px)' : 'calc(100vh - 72px)'}>
        <Stack gap={isMobile ? 2 : 4} p={isMobile ? 8 : undefined}>
          {SIDEBAR_LINKS.map((link) => renderNavLink(link))}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

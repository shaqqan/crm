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
// SIDEBAR_LINKS, SidebarChild, SidebarLink turlarini o'zgartirishlar bilan moslash
import { SIDEBAR_LINKS, SidebarChild, SidebarLink } from '@/shared/constants/siderbar-links';
import styles from './navbar.module.css';

interface NavbarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Navbar = ({ collapsed, onToggle }: NavbarProps) => {
  // O'zgartirish: t funksiyasini soddalashtirilgan holda saqlaymiz
  const t = (key: string) => key;
  const { pathname } = useLocation();
  // Faqat birinchi 3 qismni olib, /home/dashboard yoki /admin/users kabi yo'llarni kuzatish
  const currentPath = pathname.split('/').slice(0, 3).join('/');

  // Faol bolasi borligini tekshirish
  const hasActiveChild = (children?: SidebarChild[]): boolean =>
    !!children?.some((child) => child.link === currentPath || hasActiveChild(child.children));

  // Ochiq bo'lishi kerak bo'lgan ota-onalarni topish
  const findOpenParents = (links: SidebarLink[] | SidebarChild[]): string[] => {
    const openIds: string[] = [];
    const checkLink = (link: SidebarLink | SidebarChild) => {
      // Agar joriy link faol bo'lsa, ID'sini qo'shamiz
      if (link.link === currentPath) openIds.push(link.id);
      if (link.children) {
        // Agar bolalar orasida faol link bo'lsa, ID'sini qo'shamiz va bolalarni tekshirishni davom ettiramiz
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

  // 🔹 Render single NavLink (with tooltip + submenu)
  const renderNavLink = (link: SidebarLink | SidebarChild, level: number = 0) => {
    // Kengaytirilgan holat uchun asosiy NavLink komponenti
    const navLinkContent = (
      <NavLink
        variant="filled"
        // Icon mantine komponentlari emas, balki prop orqali keladi
        leftSection={
          <link.Icon
            size={16}
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
        // Agar yopilmagan bo'lsa va bolalari bo'lsa, ochish/yopish funksiyasini qo'shamiz
        onClick={!collapsed && link.children ? () => handleParentClick(link.id) : undefined}
        styles={{
          root: {
            justifyContent: collapsed ? 'center' : 'flex-start',
            alignItems: 'center',
            paddingLeft: `calc(var(--mantine-spacing-md) * ${level + 1})`, // Child links for indentation
          },
          body: { display: collapsed ? 'none' : 'flex' }, // label va o'q faqat ochiq holatda ko'rinadi
          label: { marginLeft: level > 0 ? '10px' : '0px' }, // Indent label slightly if it's a child
        }}
      >
        {/* Faqat ochiq holatda va NavLink child emas, balki JSX children sifatida */}
        {!collapsed && link.children?.map((child) => renderNavLink(child, level + 1))}
      </NavLink>
    );

    // 1. Yopilgan holat, bolalari yo'q: Tooltip
    if (collapsed && !link.children) {
      return (
        <Tooltip key={link.id} label={t(link.label)} position="right" withArrow>
          {navLinkContent}
        </Tooltip>
      );
    }

    // 2. Yopilgan holat, bolalari bor: Popover (Submenu)
    if (collapsed && link.children) {
      // Popover.Target uchun NavLink. Bu NavLink faqat Iconni ko'rsatadi
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
          component="div" // Link emas, chunki bu Popover'ni ochadi
          label={undefined}
          key={link.id}
          active={currentPath === link.link || hasActiveChild(link.children)} // O'zgartirish: Faol bolasi bo'lsa ham active bo'lsin
          styles={{
            root: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            body: { display: 'none' }, // labelni yashirish
          }}
        />
      );

      return (
        <Popover key={link.id} position="right-start" withArrow>
          <Popover.Target>{popoverTargetNavLink}</Popover.Target>
          <Popover.Dropdown p={6}>
            <Stack gap={2}>
              {/* Popover ichidagi bolalar */}
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
                        currentPath === child.link // O'zgartirish: child.linkni tekshirish
                          ? styles['main-link-icon-active']
                          : styles['main-link-icon']
                      }
                    />
                  }
                  active={currentPath === child.link}
                  className={styles['main-link']}
                  styles={{
                    root: {
                      // Popover ichidagi linklar uchun stillar
                      justifyContent: 'flex-start',
                      minWidth: 150, // Popover o'lchamini belgilash uchun
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

  return (
    <Box style={{ width: collapsed ? 72 : 250, transition: 'width 0.15s ease' }}>
      <Flex
        h={72}
        align="center"
        justify={collapsed ? 'center' : 'space-between'}
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: collapsed ? undefined : '0 16px',
        }}
      >
        {collapsed ? (
          <Image
            src="/src/assets/images/logo.png"
            alt="Logo"
            w={28}
            h={28}
            onClick={onToggle}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <>
            <Flex align="center" gap={8}>
              <img src="/src/assets/images/logo.png" alt="Logo" width={28} height={28} />
              <h1>{t('navbar.title')}</h1>
            </Flex>

            <ActionIcon
              variant="transparent"
              color="var(--mantine-color-grayscales-7)"
              onClick={onToggle}
              size={28}
            >
              <IconChevronLeft stroke={1.5} size={20} />
            </ActionIcon>
          </>
        )}
      </Flex>
      <Divider orientation="horizontal" color="var(--mantine-color-grayscales-2)" size="xs" />

      <ScrollArea h="calc(100vh - 72px)">
        <Stack gap={4}>{SIDEBAR_LINKS.map((link) => renderNavLink(link))}</Stack>
      </ScrollArea>
    </Box>
  );
};

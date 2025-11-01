import { HiOutlineSearch } from 'react-icons/hi';
import { ActionIcon, Box, Flex, Menu, Text, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Branch } from './branch';
import { Language } from './language';
import { Learn } from './learn';
import { NotificationButton } from './notification';
import { Telegram } from './telegram';
import UserButton from './user';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isLaptop = useMediaQuery('(max-width: 1440px)');

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        padding: isMobile ? '0 12px' : '0 16px',
        height: '100%',
        gap: isMobile ? '8px' : '16px',
      }}
    >
      {/* Branch - desktop only */}
      {!isTablet && (
        <Branch
          branches={[
            { id: '3', name: 'UNI ACADEMY BRANCH 2' },
            { id: '4', name: 'UNI ACADEMY BRANCH 3' },
            { id: '5', name: 'UNI ACADEMY BRANCH 4' },
            { id: '6', name: 'UNI ACADEMY BRANCH 5' },
          ]}
        />
      )}

      {/* Search bar */}
      <Flex>
        <TextInput
          placeholder={isMobile ? '' : 'Search'}
          size={isMobile ? 'sm' : isTablet ? 'sm' : 'md'}
          rightSection={
            <ActionIcon variant="transparent" size={isMobile ? 'sm' : 'md'}>
              <HiOutlineSearch
                size={isMobile ? '18px' : isTablet ? '20px' : '24px'}
                color="var(--mantine-color-grayscales-5)"
              />
            </ActionIcon>
          }
          styles={{
            input: {
              paddingRight: isMobile ? '32px' : undefined,
            },
          }}
        />
      </Flex>

      {/* Right section */}
      <Flex
        gap={isLaptop ? 8 : 12}
        align="center"
        style={{
          height: '100%',
          padding: 'var(--mantine-spacing-sm)',
        }}
      >
        {/* Phone - hide on mobile and small tablets */}
        {!isTablet && (
          <Flex gap={3} direction="column" align="center">
            <Text
              size={isLaptop ? 'md' : 'xl'}
              fw={500}
              style={{ lineHeight: '12px', color: 'var(--mantine-color-grayscales-7)' }}
            >
              +998 99 958-71-58
            </Text>
            <Text
              size="xs"
              fw={400}
              style={{ lineHeight: '16px', color: 'var(--mantine-color-grayscales-6)' }}
            >
              Qo'llab-quvvatlash
            </Text>
          </Flex>
        )}

        <NotificationButton count={100} />

        {/* Telegram - hide on mobile */}
        {!isMobile && <Telegram />}

        {/* Learn - hide on tablets and mobile */}
        {!isLaptop && <Learn />}

        <Language
          languages={[
            {
              id: '1',
              name: 'Qaraqalpaqsha',
              icon: 'https://commons.wikimedia.org/wiki/File:Flag_of_Karakalpakstan.svg#/media/File:Flag_of_Karakalpakstan.svg',
            },
            {
              id: '2',
              name: "O'zbekcha",
              icon: 'https://commons.wikimedia.org/wiki/File:Flag_of_Uzbekistan.svg#/media/File:Flag_of_Uzbekistan.svg',
            },
            {
              id: '3',
              name: 'Русский',
              icon: 'https://commons.wikimedia.org/wiki/File:Flag_of_Russia.svg#/media/File:Flag_of_Russia.svg',
            },
            {
              id: '4',
              name: 'English',
              icon: 'https://commons.wikimedia.org/wiki/File:Flag_of_United_States.svg#/media/File:Flag_of_United_States.svg',
            },
          ]}
        />

        <UserButton
          image="https://via.placeholder.com/150"
          name={isLaptop ? 'A. Berdimuratov' : 'Aizbek Berdimuratov'}
          userRole="Super Admin"
        />
      </Flex>
    </Flex>
  );
};

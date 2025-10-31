import { HiOutlineBell, HiOutlineSearch } from 'react-icons/hi';
import { Box, Button, Flex, Input, Text, TextInput } from '@mantine/core';
import { Branch } from './branch';
import { Language } from './language';
import { Learn } from './learn';
import { NotificationButton } from './notification';
import { Telegram } from './telegram';
import UserButton from './user';

export const Header = () => {
  return (
    <Flex align="center" justify="space-between">
      <Branch
        branches={[
          { id: '3', name: 'UNI ACADEMY BRANCH 2' },
          { id: '4', name: 'UNI ACADEMY BRANCH 3' },
          { id: '5', name: 'UNI ACADEMY BRANCH 4' },
          { id: '6', name: 'UNI ACADEMY BRANCH 5' },
        ]}
      />
      <Box w={600}>
        <TextInput
          placeholder="Search"
          rightSection={<HiOutlineSearch size="24px" color="var(--mantine-color-grayscales-5)" />}
        />
      </Box>
      <Flex
        gap={12}
        align="center"
        style={{ height: '100%', padding: 'var(--mantine-spacing-sm)' }}
      >
        <Flex gap={3} direction="column" align="center">
          <Text
            size="xl"
            fw={500}
            style={{ lineHeight: '12px', color: 'var(--mantine-color-grayscales-7)' }}
          >
            +998 99 958-71-58
          </Text>
          <Text
            size="sm"
            fw={400}
            style={{ lineHeight: '16px', color: 'var(--mantine-color-grayscales-6)' }}
          >
            Qo'llab-quvvatlash xizmati
          </Text>
        </Flex>

        <NotificationButton count={100} />
        <Telegram />
        <Learn />

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
          name="Aizbek Berdimuratov"
          userRole="Super Admin"
        />
      </Flex>
    </Flex>
  );
};

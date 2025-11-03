import { forwardRef } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Avatar, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  userRole: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, userRole, icon, ...others }: UserButtonProps, ref) => {
    const navigate = useNavigate();
    return (
      <Menu withArrow>
        <Menu.Target>
          <UnstyledButton
            ref={ref}
            style={{
              borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
          >
            <Group gap={8}>
              <Avatar src={image} radius="xl" size="md" />
              <Stack gap={1} style={{ flex: 1 }} align="flex-start">
                <Text
                  size="sm"
                  fw={500}
                  style={{
                    lineHeight: '12px',
                    color: 'var(--mantine-color-grayscales-7)',
                  }}
                >
                  {name}
                </Text>
                <Text
                  size="xs"
                  style={{
                    lineHeight: '16px',
                    color: 'var(--mantine-color-grayscales-7)',
                  }}
                >
                  {userRole}
                </Text>
              </Stack>
              {icon || <HiChevronDown size={16} color="var(--mantine-color-grayscales-7)" />}
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown w={200}>
          <Menu.Item>Profile</Menu.Item>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Item color="red" onClick={() => navigate('/')}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }
);

UserButton.displayName = 'UserButton';

export default UserButton;

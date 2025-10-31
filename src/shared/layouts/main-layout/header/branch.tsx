import { HiChevronDown } from 'react-icons/hi';
import { Button, Flex, Menu } from '@mantine/core';

interface BranchProps {
  branches: {
    id: string;
    name: string;
  }[];
}

export const Branch = ({ branches }: BranchProps) => {
  return (
    <Menu withArrow>
      <Menu.Target>
        <Button variant="white" style={{ padding: 0, height: '100%' }}>
          <Flex
            align="center"
            gap={8}
            style={{
              cursor: 'pointer',
              border: '1px solid var(--mantine-color-grayscales-2)',
              padding: '10px 12px',
              borderRadius: 'var(--mantine-radius-sm)',
            }}
          >
            <p
              style={{
                color: 'var(--mantine-color-grayscales-8)',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              UNI ACADEMY MAIN BRANCH
            </p>
            <HiChevronDown size={16} color="var(--mantine-color-grayscales-5)" />
          </Flex>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {branches.map((branch) => (
          <Menu.Item key={branch.id} style={{ color: 'var(--mantine-color-grayscales-8)' }}>
            {branch.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

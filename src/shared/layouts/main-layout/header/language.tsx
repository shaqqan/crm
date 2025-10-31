import { Button, Flex, Image, Menu } from '@mantine/core';

interface LanguageProps {
  languages: {
    id: string;
    name: string;
    icon: any;
  }[];
}
export const Language = ({ languages }: LanguageProps) => {
  return (
    <Menu withArrow>
      <Menu.Target>
        <Button variant="white" style={{ padding: 0, height: '100%' }}>
          <Flex
            style={{
              cursor: 'pointer',
              border: '1px solid var(--mantine-color-grayscales-2)',
              padding: '10px 12px',
              borderRadius: 'var(--mantine-radius-sm)',
            }}
          >
            <Flex align="center" gap={8}>
              <Image w={20} h={20} src={languages.find((language) => language.id === '1')?.icon} />
              <p
                style={{
                  color: 'var(--mantine-color-grayscales-8)',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                {languages.find((language) => language.id === '1')?.name}
              </p>
            </Flex>
          </Flex>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {languages.map((language) => (
          <Menu.Item key={language.id} style={{ color: 'var(--mantine-color-grayscales-8)' }}>
            <Flex align="center" gap={8}>
              <Image w={20} h={20} src={language.icon} alt={language.name} />
              <p style={{ fontSize: '14px', fontWeight: 500 }}>{language.name}</p>
            </Flex>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

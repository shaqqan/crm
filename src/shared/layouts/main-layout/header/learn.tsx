import { FiYoutube } from 'react-icons/fi';
import { Flex } from '@mantine/core';

export const Learn = () => {
  return (
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
      <FiYoutube size={20} color="var(--mantine-color-grayscales-5)" />
      <p style={{ fontSize: '14px', fontWeight: 500 }}>Ta'lim</p>
    </Flex>
  );
};

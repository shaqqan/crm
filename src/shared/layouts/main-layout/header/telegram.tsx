import { PiTelegramLogoLight } from 'react-icons/pi';
import { Flex } from '@mantine/core';

export const Telegram = () => {
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
      <a href="https://t.me/uni_academy" target="_blank" rel="noreferrer">
        <PiTelegramLogoLight size={20} color="var(--mantine-color-grayscales-5)" />
      </a>
    </Flex>
  );
};

import { HiOutlineBell } from 'react-icons/hi2';
import { Badge, Button, Flex, Text } from '@mantine/core';

interface NotificationButtonProps {
  count?: number;
}

export const NotificationButton = ({ count = 0 }: NotificationButtonProps) => {
  return (
    <Button variant="white" size="xs" style={{ position: 'relative' }}>
      <Flex align="center" gap={8}>
        <HiOutlineBell size="24px" color="var(--mantine-color-grayscales-5)" />
        {count > 0 && (
          <Badge
            circle
            color="var(--mantine-color-primary-5)"
            style={{
              position: 'absolute',
              top: 1,
              right: 4,
              minWidth: 16,
              height: 16,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {count > 99 ? (
              <Text size="xs" fw={500} style={{ fontSize: 10 }}>
                99+
              </Text>
            ) : (
              count
            )}
          </Badge>
        )}
      </Flex>
    </Button>
  );
};

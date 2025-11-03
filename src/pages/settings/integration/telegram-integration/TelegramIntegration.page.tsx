import { useState } from 'react';
import {
  Button,
  Card,
  Flex,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

// --- Component ---
export default function TelegramIntegrationPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');

  return (
    <Stack gap="md">
      <Title order={2}>Telegram Bot Integration</Title>
      
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <SimpleGrid cols={1} spacing="md">
          <Switch
            label="Enable Telegram Bot"
            description="Enable or disable Telegram bot notifications"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.currentTarget.checked)}
          />
          
          <TextInput
            label="Bot Token"
            placeholder="Enter Telegram bot token"
            value={botToken}
            onChange={(e) => setBotToken(e.currentTarget.value)}
            disabled={!isEnabled}
            description="Get your bot token from @BotFather on Telegram"
          />
          
          <TextInput
            label="Chat ID"
            placeholder="Enter chat ID or channel username"
            value={chatId}
            onChange={(e) => setChatId(e.currentTarget.value)}
            disabled={!isEnabled}
            description="Chat ID or channel username where notifications will be sent"
          />
          
          <Flex justify="flex-end" gap="sm" mt="md">
            <Button variant="outline" onClick={() => {
              setBotToken('');
              setChatId('');
              setIsEnabled(false);
            }}>
              Reset
            </Button>
            <Button onClick={() => {
              // TODO: Implement save API call
              console.log('Saving Telegram integration:', { isEnabled, botToken, chatId });
            }}>
              Save
            </Button>
          </Flex>
        </SimpleGrid>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="sm">
          <Title order={4}>Instructions</Title>
          <Text size="sm" c="dimmed">
            1. Create a bot using @BotFather on Telegram
          </Text>
          <Text size="sm" c="dimmed">
            2. Copy the bot token and paste it above
          </Text>
          <Text size="sm" c="dimmed">
            3. Get your chat ID or channel username
          </Text>
          <Text size="sm" c="dimmed">
            4. Enable the integration and save
          </Text>
        </Stack>
      </Card>
    </Stack>
  );
}


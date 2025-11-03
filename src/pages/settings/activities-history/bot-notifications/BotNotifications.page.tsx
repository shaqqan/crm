import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Button,
  Flex,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface BotNotification {
  id: number;
  title: string;
  message: string;
  sent_at: string;
  status: string;
  recipient_count: number;
  created_at: string;
}

// --- Sample data ---
const data: BotNotification[] = [
  {
    id: 1,
    title: 'New Course Announcement',
    message: 'We have a new course available!',
    sent_at: '2024-01-15 10:30:00',
    status: 'sent',
    recipient_count: 150,
    created_at: '2024-01-15',
  },
  {
    id: 2,
    title: 'Payment Reminder',
    message: 'Please make your payment before the deadline.',
    sent_at: '2024-01-20 14:00:00',
    status: 'failed',
    recipient_count: 50,
    created_at: '2024-01-20',
  },
];

// --- Component ---
export default function BotNotificationsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedNotification, setSelectedNotification] = useState<BotNotification | null>(null);

  // --- CREATE MODAL ---
  const CreateBotNotificationModal = () => {
    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create Bot Notification"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <SimpleGrid
          cols={1}
          spacing="md"
          mt="md"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--mantine-radius-md)',
            padding: '16px',
          }}
        >
          <TextInput label="Title" placeholder="Enter notification title" required />
          <Textarea
            label="Message"
            placeholder="Enter notification message"
            minRows={4}
            required
          />
        </SimpleGrid>
        <Flex justify="flex-end" gap="sm" mt="md">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button onClick={close}>Send</Button>
        </Flex>
      </Modal>
    );
  };

  // --- DELETE CONFIRM MODAL ---
  const DeleteBotNotificationModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedNotification?.title}</strong>?
        </Text>
        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              // TODO: Implement delete API call
              closeDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );

  const columns = useMemo<MRT_ColumnDef<BotNotification>[]>(
    () => [
      { accessorKey: 'title', header: 'Title', size: 200 },
      {
        accessorKey: 'message',
        header: 'Message',
        size: 300,
        Cell: ({ cell }) => {
          const message = cell.getValue<string>();
          return message.length > 50 ? `${message.substring(0, 50)}...` : message;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const colorMap: Record<string, string> = {
            sent: 'green',
            failed: 'red',
            pending: 'yellow',
          };
          return <Badge color={colorMap[status] || 'gray'}>{status}</Badge>;
        },
      },
      {
        accessorKey: 'recipient_count',
        header: 'Recipients',
        size: 120,
      },
      {
        accessorKey: 'sent_at',
        header: 'Sent At',
        size: 180,
      },
      {
        accessorKey: 'created_at',
        header: 'Created At',
        size: 120,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>();
          return new Date(date).toLocaleDateString();
        },
      },
    ],
    []
  );

  const handleDelete = (id: number) => {
    const notification = data.find((n) => n.id === id);
    setSelectedNotification(notification ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to notification details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load bot notifications"
        enableRowActions
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Send Notification"
      />

      <CreateBotNotificationModal />
      <DeleteBotNotificationModal />
    </>
  );
}


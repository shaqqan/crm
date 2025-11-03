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
interface SentSms {
  id: number;
  phone: string;
  message: string;
  status: string;
  sent_at: string;
  created_at: string;
}

// --- Sample data ---
const data: SentSms[] = [
  {
    id: 1,
    phone: '+998901234567',
    message: 'Welcome to our training center!',
    status: 'delivered',
    sent_at: '2024-01-15 10:30:00',
    created_at: '2024-01-15',
  },
  {
    id: 2,
    phone: '+998902345678',
    message: 'Your payment is due soon.',
    status: 'failed',
    sent_at: '2024-01-20 14:00:00',
    created_at: '2024-01-20',
  },
  {
    id: 3,
    phone: '+998903456789',
    message: 'Class reminder for tomorrow.',
    status: 'delivered',
    sent_at: '2024-01-22 09:15:00',
    created_at: '2024-01-22',
  },
];

// --- Component ---
export default function SentSmsHistoryPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedSms, setSelectedSms] = useState<SentSms | null>(null);

  // --- CREATE MODAL ---
  const CreateSmsModal = () => {
    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Send SMS"
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
          <TextInput label="Phone" placeholder="+998901234567" required />
          <Textarea
            label="Message"
            placeholder="Enter SMS message"
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
  const DeleteSmsModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete SMS to <strong>{selectedSms?.phone}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<SentSms>[]>(
    () => [
      { accessorKey: 'phone', header: 'Phone', size: 150 },
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
            delivered: 'green',
            failed: 'red',
            pending: 'yellow',
          };
          return <Badge color={colorMap[status] || 'gray'}>{status}</Badge>;
        },
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
    const sms = data.find((s) => s.id === id);
    setSelectedSms(sms ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to SMS details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load SMS history"
        enableRowActions
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Send SMS"
      />

      <CreateSmsModal />
      <DeleteSmsModal />
    </>
  );
}


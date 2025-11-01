import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Button,
  Flex,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Room {
  id: number;
  name: string;
  branch: string;
  groups_count: number;
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: Room[] = [
  {
    id: 1,
    name: 'Room A',
    branch: 'Main Branch',
    groups_count: 3,
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    id: 2,
    name: 'Room B',
    branch: 'Yunusabad',
    groups_count: 2,
    created_at: '2024-02-01',
    updated_at: '2024-02-05',
  },
  {
    id: 3,
    name: 'Room C',
    branch: 'Mirzo Ulugbek',
    groups_count: 1,
    created_at: '2024-03-10',
    updated_at: '2024-03-15',
  },
  {
    id: 4,
    name: 'Room D',
    branch: 'Main Branch',
    groups_count: 0,
    created_at: '2024-04-05',
    updated_at: '2024-04-05',
  },
];

// --- Branch options ---
const branchOptions = [
  { value: 'Main Branch', label: 'Main Branch' },
  { value: 'Yunusabad', label: 'Yunusabad' },
  { value: 'Mirzo Ulugbek', label: 'Mirzo Ulugbek' },
];

// --- Component ---
export default function RoomsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // --- CREATE MODAL ---
  const CreateRoomModal = () => {
    const [branch, setBranch] = useState<string | null>(null);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create Room"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 1, md: 1 }}
          spacing="md"
          mt="md"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--mantine-radius-md)',
            padding: '16px',
          }}
        >
          <TextInput label="Room Name" placeholder="Enter room name" required />
          <Select
            label="Branch"
            placeholder="Select branch"
            data={branchOptions}
            value={branch}
            onChange={setBranch}
            searchable
            required
          />
        </SimpleGrid>
        <Flex justify="flex-end" gap="sm" mt="md">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button onClick={close}>Create</Button>
        </Flex>
      </Modal>
    );
  };

  // --- DELETE CONFIRM MODAL ---
  const DeleteRoomModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedRoom?.name}</strong>?
        </Text>
        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              console.log('Deleted room:', selectedRoom?.id);
              closeDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );

  const columns = useMemo<MRT_ColumnDef<Room>[]>(
    () => [
      { accessorKey: 'name', header: 'Room Name', size: 150 },
      {
        accessorKey: 'branch',
        header: 'Branch',
        size: 150,
      },
      {
        accessorKey: 'groups_count',
        header: 'Groups',
        size: 100,
        Cell: ({ cell }) => {
          const count = cell.getValue<number>();
          return (
            <Badge color={count > 0 ? 'blue' : 'gray'}>
              {count} {count === 1 ? 'group' : 'groups'}
            </Badge>
          );
        },
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
      {
        accessorKey: 'updated_at',
        header: 'Updated At',
        size: 120,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>();
          return new Date(date).toLocaleDateString();
        },
      },
    ],
    []
  );

  const handleEdit = (id: number) => {
    console.log('Edit room:', id);
  };

  const handleDelete = (id: number) => {
    const room = data.find((r) => r.id === id);
    setSelectedRoom(room ?? null);
    openDelete();
  };

  const handleRowClick = (id: string) => {
    console.log('Go to room details:', id);
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load rooms"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Room"
      />

      <CreateRoomModal />
      <DeleteRoomModal />
    </>
  );
}

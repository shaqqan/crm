import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Button,
  Flex,
  Modal,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Branch {
  id: number;
  name: string;
  exists: boolean;
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: Branch[] = [
  {
    id: 1,
    name: 'Main Branch',
    exists: true,
    created_at: '2024-01-10',
    updated_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Yunusabad',
    exists: true,
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    id: 3,
    name: 'Mirzo Ulugbek',
    exists: false,
    created_at: '2024-02-01',
    updated_at: '2024-02-05',
  },
];

// --- Component ---
export default function BranchesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  // --- CREATE MODAL ---
  const CreateBranchModal = () => {
    const [exists, setExists] = useState(true);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create Branch"
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
          <TextInput label="Name" placeholder="Enter branch name" required />
          <Switch
            label="Exists"
            checked={exists}
            onChange={(e) => setExists(e.currentTarget.checked)}
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

  // --- EDIT MODAL ---
  const EditBranchModal = () => {
    const [exists, setExists] = useState(selectedBranch?.exists ?? true);

    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="md"
        centered
        title="Edit Branch"
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
          <TextInput
            label="Name"
            placeholder="Enter branch name"
            defaultValue={selectedBranch?.name}
            required
          />
          <Switch
            label="Exists"
            checked={exists}
            onChange={(e) => setExists(e.currentTarget.checked)}
          />
        </SimpleGrid>
        <Flex justify="flex-end" gap="sm" mt="md">
          <Button onClick={closeEdit} variant="outline">
            Cancel
          </Button>
          <Button onClick={closeEdit}>Update</Button>
        </Flex>
      </Modal>
    );
  };

  // --- DELETE CONFIRM MODAL ---
  const DeleteBranchModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedBranch?.name}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<Branch>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 200 },
      {
        accessorKey: 'exists',
        header: 'Exists',
        size: 120,
        Cell: ({ cell }) => (
          <Badge color={cell.getValue<boolean>() ? 'green' : 'red'}>
            {cell.getValue<boolean>() ? 'Yes' : 'No'}
          </Badge>
        ),
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
    const branch = data.find((b) => b.id === id);
    setSelectedBranch(branch ?? null);
    openEdit();
  };

  const handleDelete = (id: number) => {
    const branch = data.find((b) => b.id === id);
    setSelectedBranch(branch ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to branch details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load branches"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Branch"
      />

      <CreateBranchModal />
      <EditBranchModal />
      <DeleteBranchModal />
    </>
  );
}


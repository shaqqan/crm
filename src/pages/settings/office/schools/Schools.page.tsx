import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Button,
  Flex,
  Modal,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface School {
  id: number;
  name: string;
  user_count: number;
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: School[] = [
  {
    id: 1,
    name: 'School #1',
    user_count: 150,
    created_at: '2024-01-10',
    updated_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'School #2',
    user_count: 200,
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    id: 3,
    name: 'School #3',
    user_count: 75,
    created_at: '2024-02-01',
    updated_at: '2024-02-05',
  },
];

// --- Component ---
export default function SchoolsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  // --- CREATE MODAL ---
  const CreateSchoolModal = () => {
    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create School"
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
          <TextInput label="Name" placeholder="Enter school name" required />
          <NumberInput
            label="User Count"
            placeholder="Enter user count"
            min={0}
            defaultValue={0}
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
  const EditSchoolModal = () => {
    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="md"
        centered
        title="Edit School"
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
            placeholder="Enter school name"
            defaultValue={selectedSchool?.name}
            required
          />
          <NumberInput
            label="User Count"
            placeholder="Enter user count"
            min={0}
            defaultValue={selectedSchool?.user_count}
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
  const DeleteSchoolModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedSchool?.name}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<School>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 200 },
      {
        accessorKey: 'user_count',
        header: 'User Count',
        size: 150,
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
    const school = data.find((s) => s.id === id);
    setSelectedSchool(school ?? null);
    openEdit();
  };

  const handleDelete = (id: number) => {
    const school = data.find((s) => s.id === id);
    setSelectedSchool(school ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to school details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load schools"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add School"
      />

      <CreateSchoolModal />
      <EditSchoolModal />
      <DeleteSchoolModal />
    </>
  );
}


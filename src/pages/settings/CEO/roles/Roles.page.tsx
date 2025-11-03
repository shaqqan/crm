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
interface Role {
  id: number;
  name: string;
  exists: boolean;
}

// --- Sample data ---
const data: Role[] = [
  {
    id: 1,
    name: 'Teacher',
    exists: true,
  },
  {
    id: 2,
    name: 'Mentor',
    exists: true,
  },
  {
    id: 3,
    name: 'Admin',
    exists: true,
  },
  {
    id: 4,
    name: 'Manager',
    exists: false,
  },
];

// --- Component ---
export default function RolesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // --- CREATE MODAL ---
  const CreateRoleModal = () => {
    const [exists, setExists] = useState(true);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create Role"
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
          <TextInput label="Name" placeholder="Enter role name" required />
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
  const EditRoleModal = () => {
    const [exists, setExists] = useState(selectedRole?.exists ?? true);

    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="md"
        centered
        title="Edit Role"
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
            placeholder="Enter role name"
            defaultValue={selectedRole?.name}
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
  const DeleteRoleModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedRole?.name}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<Role>[]>(
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
    ],
    []
  );

  const handleEdit = (id: number) => {
    const role = data.find((r) => r.id === id);
    setSelectedRole(role ?? null);
    openEdit();
  };

  const handleDelete = (id: number) => {
    const role = data.find((r) => r.id === id);
    setSelectedRole(role ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to role details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load roles"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Role"
      />

      <CreateRoleModal />
      <EditRoleModal />
      <DeleteRoleModal />
    </>
  );
}


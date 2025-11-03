import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Button,
  Flex,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Department {
  id: number;
  name: string;
  order: number;
  is_active: boolean;
  count: number;
  parent: string | null;
  branch: string;
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: Department[] = [
  {
    id: 1,
    name: 'IT Department',
    order: 1,
    is_active: true,
    count: 25,
    parent: null,
    branch: 'Main Branch',
    created_at: '2024-01-10',
    updated_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Frontend Team',
    order: 1,
    is_active: true,
    count: 10,
    parent: 'IT Department',
    branch: 'Main Branch',
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    id: 3,
    name: 'Backend Team',
    order: 2,
    is_active: true,
    count: 8,
    parent: 'IT Department',
    branch: 'Yunusabad',
    created_at: '2024-02-01',
    updated_at: '2024-02-05',
  },
];

// --- Options ---
const branchOptions = [
  { value: 'Main Branch', label: 'Main Branch' },
  { value: 'Yunusabad', label: 'Yunusabad' },
  { value: 'Mirzo Ulugbek', label: 'Mirzo Ulugbek' },
];

const parentOptions = [
  { value: '1', label: 'IT Department' },
  { value: '2', label: 'Frontend Team' },
  { value: '3', label: 'Backend Team' },
];

// --- Component ---
export default function DepartmentsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  // --- CREATE MODAL ---
  const CreateDepartmentModal = () => {
    const [isActive, setIsActive] = useState(true);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create Department"
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
          <TextInput label="Name" placeholder="Enter department name" required />
          <NumberInput label="Order" placeholder="Enter order" min={1} defaultValue={1} />
          <NumberInput label="Count" placeholder="Enter count" min={0} defaultValue={0} />
          <Select
            label="Branch"
            placeholder="Select branch"
            data={branchOptions}
            searchable
            required
          />
          <Select
            label="Parent Department"
            placeholder="Select parent department (optional)"
            data={parentOptions}
            searchable
            clearable
          />
          <Switch
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.currentTarget.checked)}
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
  const EditDepartmentModal = () => {
    const [isActive, setIsActive] = useState(selectedDepartment?.is_active ?? true);

    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="md"
        centered
        title="Edit Department"
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
            placeholder="Enter department name"
            defaultValue={selectedDepartment?.name}
            required
          />
          <NumberInput
            label="Order"
            placeholder="Enter order"
            min={1}
            defaultValue={selectedDepartment?.order}
          />
          <NumberInput
            label="Count"
            placeholder="Enter count"
            min={0}
            defaultValue={selectedDepartment?.count}
          />
          <Select
            label="Branch"
            placeholder="Select branch"
            data={branchOptions}
            defaultValue={selectedDepartment?.branch}
            searchable
            required
          />
          <Select
            label="Parent Department"
            placeholder="Select parent department (optional)"
            data={parentOptions}
            defaultValue={selectedDepartment?.parent || undefined}
            searchable
            clearable
          />
          <Switch
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.currentTarget.checked)}
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
  const DeleteDepartmentModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedDepartment?.name}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<Department>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 200 },
      { accessorKey: 'order', header: 'Order', size: 100 },
      {
        accessorKey: 'is_active',
        header: 'Is Active',
        size: 120,
        Cell: ({ cell }) => (
          <Badge color={cell.getValue<boolean>() ? 'green' : 'red'}>
            {cell.getValue<boolean>() ? 'Yes' : 'No'}
          </Badge>
        ),
      },
      { accessorKey: 'count', header: 'Count', size: 100 },
      {
        accessorKey: 'parent',
        header: 'Parent',
        size: 180,
        Cell: ({ cell }) => {
          const parent = cell.getValue<string | null>();
          return parent || '-';
        },
      },
      { accessorKey: 'branch', header: 'Branch', size: 150 },
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

  const handleEdit = (id: number) => {
    const department = data.find((d) => d.id === id);
    setSelectedDepartment(department ?? null);
    openEdit();
  };

  const handleDelete = (id: number) => {
    const department = data.find((d) => d.id === id);
    setSelectedDepartment(department ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to department details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load departments"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Department"
      />

      <CreateDepartmentModal />
      <EditDepartmentModal />
      <DeleteDepartmentModal />
    </>
  );
}


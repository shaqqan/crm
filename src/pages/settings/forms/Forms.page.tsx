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
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Form {
  id: number;
  name: string;
  type: string;
  is_active: boolean;
  submission_count: number;
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: Form[] = [
  {
    id: 1,
    name: 'Student Registration Form',
    type: 'student',
    is_active: true,
    submission_count: 150,
    created_at: '2024-01-10',
    updated_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Course Application Form',
    type: 'course',
    is_active: true,
    submission_count: 75,
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    id: 3,
    name: 'Feedback Form',
    type: 'feedback',
    is_active: false,
    submission_count: 30,
    created_at: '2024-02-01',
    updated_at: '2024-02-05',
  },
];

const typeOptions = [
  { value: 'student', label: 'Student' },
  { value: 'course', label: 'Course' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'employee', label: 'Employee' },
];

// --- Component ---
export default function FormsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  // --- CREATE MODAL ---
  const CreateFormModal = () => {
    const [isActive, setIsActive] = useState(true);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create Form"
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
          <TextInput label="Name" placeholder="Enter form name" required />
          <Select label="Type" placeholder="Select form type" data={typeOptions} required />
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
  const EditFormModal = () => {
    const [isActive, setIsActive] = useState(selectedForm?.is_active ?? true);

    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="md"
        centered
        title="Edit Form"
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
            placeholder="Enter form name"
            defaultValue={selectedForm?.name}
            required
          />
          <Select
            label="Type"
            placeholder="Select form type"
            data={typeOptions}
            defaultValue={selectedForm?.type}
            required
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
  const DeleteFormModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedForm?.name}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<Form>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 200 },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 120,
        Cell: ({ cell }) => {
          const type = cell.getValue<string>();
          return <Badge color="blue">{type}</Badge>;
        },
      },
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
      {
        accessorKey: 'submission_count',
        header: 'Submissions',
        size: 120,
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

  const handleEdit = (id: number) => {
    const form = data.find((f) => f.id === id);
    setSelectedForm(form ?? null);
    openEdit();
  };

  const handleDelete = (id: number) => {
    const form = data.find((f) => f.id === id);
    setSelectedForm(form ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to form details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load forms"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Form"
      />

      <CreateFormModal />
      <EditFormModal />
      <DeleteFormModal />
    </>
  );
}


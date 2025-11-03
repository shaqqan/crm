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
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface ApplicationForm {
  id: number;
  obj_id: number;
  title: string;
  source: number;
  uuid: string;
  type: string;
  is_active: boolean;
  success_text: string | null;
  logo: string | null;
  background_image: string | null;
  tenant_logo_url: string | null;
  pixel_script: string | null;
  department: string;
  branch: string;
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: ApplicationForm[] = [
  {
    id: 1,
    obj_id: 1,
    title: 'Student Registration Form',
    source: 1,
    uuid: '550e8400-e29b-41d4-a716-446655440000',
    type: 'student',
    is_active: true,
    success_text: 'Thank you for your registration!',
    logo: null,
    background_image: null,
    tenant_logo_url: null,
    pixel_script: null,
    department: 'IT Department',
    branch: 'Main Branch',
    created_at: '2024-01-10',
    updated_at: '2024-01-15',
  },
  {
    id: 2,
    obj_id: 2,
    title: 'Course Application Form',
    source: 2,
    uuid: '550e8400-e29b-41d4-a716-446655440001',
    type: 'course',
    is_active: true,
    success_text: 'Your application has been received!',
    logo: null,
    background_image: null,
    tenant_logo_url: null,
    pixel_script: null,
    department: 'IT Department',
    branch: 'Yunusabad',
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
];

// --- Options ---
const branchOptions = [
  { value: 'Main Branch', label: 'Main Branch' },
  { value: 'Yunusabad', label: 'Yunusabad' },
  { value: 'Mirzo Ulugbek', label: 'Mirzo Ulugbek' },
];

const departmentOptions = [
  { value: 'IT Department', label: 'IT Department' },
  { value: 'Frontend Team', label: 'Frontend Team' },
  { value: 'Backend Team', label: 'Backend Team' },
];

const typeOptions = [
  { value: 'student', label: 'Student' },
  { value: 'course', label: 'Course' },
  { value: 'employee', label: 'Employee' },
];

const sourceOptions = [
  { value: '1', label: 'Website' },
  { value: '2', label: 'Mobile App' },
  { value: '3', label: 'Social Media' },
];

// --- Component ---
export default function ApplicationFormsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedForm, setSelectedForm] = useState<ApplicationForm | null>(null);

  // --- CREATE MODAL ---
  const CreateApplicationFormModal = () => {
    const [isActive, setIsActive] = useState(true);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="xl"
        centered
        title="Create Application Form"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing="md"
          mt="md"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--mantine-radius-md)',
            padding: '16px',
          }}
        >
          <TextInput label="Title" placeholder="Enter form title" required />
          <NumberInput label="Object ID" placeholder="Enter object ID" min={1} required />
          <Select
            label="Source"
            placeholder="Select source"
            data={sourceOptions}
            required
          />
          <Select label="Type" placeholder="Select type" data={typeOptions} required />
          <Select
            label="Department"
            placeholder="Select department"
            data={departmentOptions}
            searchable
            required
          />
          <Select
            label="Branch"
            placeholder="Select branch"
            data={branchOptions}
            searchable
            required
          />
          <Textarea
            label="Success Text"
            placeholder="Enter success message"
            minRows={3}
            style={{ gridColumn: '1 / -1' }}
          />
          <TextInput label="Logo URL" placeholder="Enter logo URL" />
          <TextInput label="Background Image URL" placeholder="Enter background image URL" />
          <TextInput label="Tenant Logo URL" placeholder="Enter tenant logo URL" />
          <Textarea
            label="Pixel Script"
            placeholder="Enter pixel script"
            minRows={3}
            style={{ gridColumn: '1 / -1' }}
          />
          <Switch
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.currentTarget.checked)}
            style={{ gridColumn: '1 / -1' }}
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
  const EditApplicationFormModal = () => {
    const [isActive, setIsActive] = useState(selectedForm?.is_active ?? true);

    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="xl"
        centered
        title="Edit Application Form"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing="md"
          mt="md"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--mantine-radius-md)',
            padding: '16px',
          }}
        >
          <TextInput
            label="Title"
            placeholder="Enter form title"
            defaultValue={selectedForm?.title}
            required
          />
          <NumberInput
            label="Object ID"
            placeholder="Enter object ID"
            min={1}
            defaultValue={selectedForm?.obj_id}
            required
          />
          <Select
            label="Source"
            placeholder="Select source"
            data={sourceOptions}
            defaultValue={selectedForm?.source.toString()}
            required
          />
          <Select
            label="Type"
            placeholder="Select type"
            data={typeOptions}
            defaultValue={selectedForm?.type}
            required
          />
          <Select
            label="Department"
            placeholder="Select department"
            data={departmentOptions}
            defaultValue={selectedForm?.department}
            searchable
            required
          />
          <Select
            label="Branch"
            placeholder="Select branch"
            data={branchOptions}
            defaultValue={selectedForm?.branch}
            searchable
            required
          />
          <Textarea
            label="Success Text"
            placeholder="Enter success message"
            defaultValue={selectedForm?.success_text || undefined}
            minRows={3}
            style={{ gridColumn: '1 / -1' }}
          />
          <TextInput
            label="Logo URL"
            placeholder="Enter logo URL"
            defaultValue={selectedForm?.logo || undefined}
          />
          <TextInput
            label="Background Image URL"
            placeholder="Enter background image URL"
            defaultValue={selectedForm?.background_image || undefined}
          />
          <TextInput
            label="Tenant Logo URL"
            placeholder="Enter tenant logo URL"
            defaultValue={selectedForm?.tenant_logo_url || undefined}
          />
          <Textarea
            label="Pixel Script"
            placeholder="Enter pixel script"
            defaultValue={selectedForm?.pixel_script || undefined}
            minRows={3}
            style={{ gridColumn: '1 / -1' }}
          />
          <Switch
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.currentTarget.checked)}
            style={{ gridColumn: '1 / -1' }}
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
  const DeleteApplicationFormModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedForm?.title}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<ApplicationForm>[]>(
    () => [
      { accessorKey: 'title', header: 'Title', size: 200 },
      { accessorKey: 'obj_id', header: 'Object ID', size: 100 },
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
      { accessorKey: 'department', header: 'Department', size: 150 },
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
    // TODO: Navigate to application form details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load application forms"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Application Form"
      />

      <CreateApplicationFormModal />
      <EditApplicationFormModal />
      <DeleteApplicationFormModal />
    </>
  );
}


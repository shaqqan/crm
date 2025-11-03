import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Avatar,
  Badge,
  Box,
  Button,
  FileButton,
  Flex,
  Modal,
  MultiSelect,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Employee {
  id: number;
  full_name: string;
  phone: string;
  gender: string;
  birth_date: string | null;
  amount: number;
  percentage: number;
  activated_at: string;
  is_fixed_salary: boolean;
  image: string | null;
  status: string;
  lesson_amount: number;
  per_student: number;
  branches: string[];
  roles: string[];
  specializations: string[];
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: Employee[] = [
  {
    id: 1,
    full_name: 'Azizbek Karimov',
    phone: '+998901234567',
    gender: 'male',
    birth_date: '1990-05-15',
    amount: 5000000.0,
    percentage: 15.5,
    activated_at: '2024-01-15',
    is_fixed_salary: true,
    image: null,
    status: 'active',
    lesson_amount: 10,
    per_student: 50000.0,
    branches: ['Main Branch', 'Yunusabad'],
    roles: ['Teacher', 'Mentor'],
    specializations: ['Frontend Development', 'Full-Stack Development'],
    created_at: '2024-01-10',
    updated_at: '2024-01-15',
  },
  {
    id: 2,
    full_name: 'Malika Tursunova',
    phone: '+998902345678',
    gender: 'female',
    birth_date: '1992-08-22',
    amount: 4500000.0,
    percentage: 12.0,
    activated_at: '2024-02-01',
    is_fixed_salary: false,
    image: null,
    status: 'active',
    lesson_amount: 8,
    per_student: 45000.0,
    branches: ['Main Branch'],
    roles: ['Teacher'],
    specializations: ['Backend Development'],
    created_at: '2024-01-25',
    updated_at: '2024-02-01',
  },
  {
    id: 3,
    full_name: 'Javlonbek Xudoyberdiyev',
    phone: '+998903456789',
    gender: 'male',
    birth_date: '1988-11-08',
    amount: 6000000.0,
    percentage: 20.0,
    activated_at: '2023-12-10',
    is_fixed_salary: true,
    image: null,
    status: 'inactive',
    lesson_amount: 15,
    per_student: 60000.0,
    branches: ['Yunusabad', 'Mirzo Ulugbek'],
    roles: ['Teacher', 'Admin'],
    specializations: ['Mobile Development', 'UI/UX Design'],
    created_at: '2023-12-05',
    updated_at: '2024-01-20',
  },
];

// --- Options ---
const branchOptions = [
  { value: 'Main Branch', label: 'Main Branch' },
  { value: 'Yunusabad', label: 'Yunusabad' },
  { value: 'Mirzo Ulugbek', label: 'Mirzo Ulugbek' },
];

const roleOptions = [
  { value: 'Teacher', label: 'Teacher' },
  { value: 'Mentor', label: 'Mentor' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
];

const genderOptions = [
  { value: 'male', label: 'Erkak' },
  { value: 'female', label: 'Ayol' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const specializationOptions = [
  { value: 'Frontend Development', label: 'Frontend Development' },
  { value: 'Backend Development', label: 'Backend Development' },
  { value: 'Full-Stack Development', label: 'Full-Stack Development' },
  { value: 'Mobile Development', label: 'Mobile Development' },
  { value: 'UI/UX Design', label: 'UI/UX Design' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
];

// --- Component ---
export default function EmployeesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // --- CREATE MODAL ---
  const CreateEmployeeModal = () => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const handleAvatarChange = (file: File | null) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setAvatarPreview(null);
      }
    };

    const handleBirthDateChange = (value: string | null) => {
      const date = value ? new Date(value) : null;
      setBirthDate(date);
    };

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="xl"
        centered
        title="Create Employee"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <Flex
          gap="md"
          pt="md"
          pb="md"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'flex-start' }}
        >
          <Box p="md" bg="white" h="100%" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
            <FileButton onChange={handleAvatarChange} accept="image/png,image/jpeg">
              {(props) => (
                <Avatar
                  src={avatarPreview}
                  h={{ base: 150, md: 200 }}
                  w={{ base: 150, md: 180 }}
                  radius="md"
                  style={{ cursor: 'pointer' }}
                  imageProps={{ style: { objectFit: 'cover' } }}
                  {...props}
                />
              )}
            </FileButton>
          </Box>

          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing="md"
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 'var(--mantine-radius-md)',
              padding: '16px',
            }}
          >
            <TextInput label="Full Name" placeholder="Enter full name" required />
            <TextInput label="Phone" placeholder="+998901234567" required />
            <TextInput
              label="Password"
              type="password"
              placeholder="Enter password"
              required
            />
            <Select
              label="Gender"
              placeholder="Select gender"
              data={genderOptions}
              required
            />
            <DateInput
              label="Birth Date"
              placeholder="Select birth date"
              value={birthDate}
              onChange={handleBirthDateChange}
              clearable
            />
            <Select
              label="Status"
              placeholder="Select status"
              data={statusOptions}
              defaultValue="active"
            />
            <MultiSelect
              label="Branches"
              placeholder="Select branches"
              data={branchOptions}
              value={selectedBranches}
              onChange={setSelectedBranches}
              searchable
            />
            <MultiSelect
              label="Roles"
              placeholder="Select roles"
              data={roleOptions}
              value={selectedRoles}
              onChange={setSelectedRoles}
              searchable
            />
            <MultiSelect
              label="Specializations"
              placeholder="Select specializations"
              data={specializationOptions}
              value={selectedSpecializations}
              onChange={setSelectedSpecializations}
              searchable
              style={{ gridColumn: '1 / -1' }}
            />
          </SimpleGrid>
        </Flex>
        <Flex justify="flex-end" gap="sm">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button onClick={close}>Create</Button>
        </Flex>
      </Modal>
    );
  };

  // --- EDIT MODAL ---
  const EditEmployeeModal = () => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(
      selectedEmployee?.image || null
    );
    const [selectedBranches, setSelectedBranches] = useState<string[]>(
      selectedEmployee?.branches || []
    );
    const [selectedRoles, setSelectedRoles] = useState<string[]>(
      selectedEmployee?.roles || []
    );
    const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(
      selectedEmployee?.specializations || []
    );
    const [birthDate, setBirthDate] = useState<Date | null>(
      selectedEmployee?.birth_date ? new Date(selectedEmployee.birth_date) : null
    );

    const handleAvatarChange = (file: File | null) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setAvatarPreview(selectedEmployee?.image || null);
      }
    };

    const handleBirthDateChange = (value: string | null) => {
      const date = value ? new Date(value) : null;
      setBirthDate(date);
    };

    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="xl"
        centered
        title="Edit Employee"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <Flex
          gap="md"
          pt="md"
          pb="md"
          direction={{ base: 'column', md: 'row' }}
          align={{ base: 'center', md: 'flex-start' }}
        >
          <Box p="md" bg="white" h="100%" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
            <FileButton onChange={handleAvatarChange} accept="image/png,image/jpeg">
              {(props) => (
                <Avatar
                  src={avatarPreview}
                  h={{ base: 150, md: 200 }}
                  w={{ base: 150, md: 180 }}
                  radius="md"
                  style={{ cursor: 'pointer' }}
                  imageProps={{ style: { objectFit: 'cover' } }}
                  {...props}
                />
              )}
            </FileButton>
          </Box>

          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing="md"
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 'var(--mantine-radius-md)',
              padding: '16px',
            }}
          >
            <TextInput
              label="Full Name"
              placeholder="Enter full name"
              defaultValue={selectedEmployee?.full_name}
              required
            />
            <TextInput
              label="Phone"
              placeholder="+998901234567"
              defaultValue={selectedEmployee?.phone}
              required
            />
            <Select
              label="Gender"
              placeholder="Select gender"
              data={genderOptions}
              defaultValue={selectedEmployee?.gender}
              required
            />
            <DateInput
              label="Birth Date"
              placeholder="Select birth date"
              value={birthDate}
              onChange={handleBirthDateChange}
              clearable
            />
            <Select
              label="Status"
              placeholder="Select status"
              data={statusOptions}
              defaultValue={selectedEmployee?.status}
            />
            <MultiSelect
              label="Branches"
              placeholder="Select branches"
              data={branchOptions}
              value={selectedBranches}
              onChange={setSelectedBranches}
              searchable
            />
            <MultiSelect
              label="Roles"
              placeholder="Select roles"
              data={roleOptions}
              value={selectedRoles}
              onChange={setSelectedRoles}
              searchable
            />
            <MultiSelect
              label="Specializations"
              placeholder="Select specializations"
              data={specializationOptions}
              value={selectedSpecializations}
              onChange={setSelectedSpecializations}
              searchable
              style={{ gridColumn: '1 / -1' }}
            />
          </SimpleGrid>
        </Flex>
        <Flex justify="flex-end" gap="sm">
          <Button onClick={closeEdit} variant="outline">
            Cancel
          </Button>
          <Button onClick={closeEdit}>Update</Button>
        </Flex>
      </Modal>
    );
  };

  // --- DELETE CONFIRM MODAL ---
  const DeleteEmployeeModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedEmployee?.full_name}</strong>?
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

  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: 'image',
        header: 'Avatar',
        size: 80,
        Cell: ({ cell }) => (
          <Avatar src={cell.getValue<string | null>()} size="md" radius="md" />
        ),
      },
      { accessorKey: 'full_name', header: 'Full Name', size: 180 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 100,
        Cell: ({ cell }) => {
          const gender = cell.getValue<string>();
          return gender === 'male' ? 'Erkak' : 'Ayol';
        },
      },
      {
        accessorKey: 'birth_date',
        header: 'Birth Date',
        size: 120,
        Cell: ({ cell }) => {
          const date = cell.getValue<string | null>();
          return date ? new Date(date).toLocaleDateString() : '-';
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const colorMap: Record<string, string> = {
            active: 'green',
            inactive: 'red',
            pending: 'yellow',
          };
          return <Badge color={colorMap[status] || 'gray'}>{status}</Badge>;
        },
      },
      {
        accessorKey: 'branches',
        header: 'Branches',
        size: 200,
        Cell: ({ cell }) => {
          const branches = cell.getValue<string[]>();
          return branches.length > 0 ? branches.join(', ') : 'No branches';
        },
      },
      {
        accessorKey: 'roles',
        header: 'Roles',
        size: 200,
        Cell: ({ cell }) => {
          const roles = cell.getValue<string[]>();
          return roles.length > 0 ? roles.join(', ') : 'No roles';
        },
      },
      {
        accessorKey: 'specializations',
        header: 'Specializations',
        size: 250,
        Cell: ({ cell }) => {
          const specializations = cell.getValue<string[]>();
          return specializations.length > 0 ? specializations.join(', ') : 'No specializations';
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
    ],
    []
  );

  const handleEdit = (id: number) => {
    const employee = data.find((e) => e.id === id);
    setSelectedEmployee(employee ?? null);
    openEdit();
  };

  const handleDelete = (id: number) => {
    const employee = data.find((e) => e.id === id);
    setSelectedEmployee(employee ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to employee details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load employees"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Employee"
      />

      <CreateEmployeeModal />
      <EditEmployeeModal />
      <DeleteEmployeeModal />
    </>
  );
}

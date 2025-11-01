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
interface Student {
  id: number;
  avatar: string | null;
  fullName: string;
  phone: string;
  birthDate: string;
  password: string;
  source: 'instagram' | 'telegram' | 'referral' | 'other';
  gender: 'male' | 'female';
  groupId: number | null;
  groupName: string | null;
  groupJoinDate: string | null;
  parentPhone: string | null;
  parentFullName: string | null;
  status: 'active' | 'inactive';
}

// --- Sample data ---
const data: Student[] = [
  {
    id: 1,
    avatar: null,
    fullName: 'Azizbek Karimov',
    phone: '+998901234567',
    birthDate: '2005-03-15',
    password: '********',
    source: 'instagram',
    gender: 'male',
    groupId: 1,
    groupName: 'Frontend Bootcamp',
    groupJoinDate: '2024-09-01',
    parentPhone: '+998901111111',
    parentFullName: 'Karim Karimov',
    status: 'active',
  },
  {
    id: 2,
    avatar: null,
    fullName: 'Malika Tursunova',
    phone: '+998902345678',
    birthDate: '2006-07-22',
    password: '********',
    source: 'telegram',
    gender: 'female',
    groupId: 2,
    groupName: 'Backend Mastery',
    groupJoinDate: '2024-10-10',
    parentPhone: '+998902222222',
    parentFullName: 'Tursun Tursunov',
    status: 'active',
  },
  {
    id: 3,
    avatar: null,
    fullName: 'Javlonbek Xudoyberdiyev',
    phone: '+998903456789',
    birthDate: '2004-11-08',
    password: '********',
    source: 'referral',
    gender: 'male',
    groupId: null,
    groupName: null,
    groupJoinDate: null,
    parentPhone: '+998903333333',
    parentFullName: 'Xudoyberdi Xudoyberdiyev',
    status: 'inactive',
  },
];

// --- Groups options (sample) ---
const groupOptions = [
  { value: '1', label: 'Frontend Bootcamp' },
  { value: '2', label: 'Backend Mastery' },
  { value: '3', label: 'Python for Data Science' },
];

// --- Component ---
export default function StudentsPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // --- CREATE MODAL ---
  const CreateStudentModal = () => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [groupJoinDate, setGroupJoinDate] = useState<Date | null>(null);

    const handleAvatarChange = (file: File | null) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setAvatarPreview(null);
      }
    };

    const handleGroupJoinDateChange = (value: string | null) => {
      const date = value ? new Date(value) : null;
      setGroupJoinDate(date);
    };

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="xl"
        centered
        title="Create Student"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <Flex gap="md" pt="md" pb="md">
          <Box p="md" bg="white" h="100%" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
            <FileButton onChange={handleAvatarChange} accept="image/png,image/jpeg">
              {(props) => (
                <Avatar
                  src={avatarPreview}
                  h={200}
                  w={180}
                  radius="md"
                  style={{ cursor: 'pointer' }}
                  imageProps={{ style: { objectFit: 'cover' } }}
                  {...props}
                />
              )}
            </FileButton>
          </Box>

          <SimpleGrid
            cols={2}
            spacing="md"
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 'var(--mantine-radius-md)',
              padding: '16px',
            }}
          >
            <TextInput label="Full Name" placeholder="Enter full name" />
            <TextInput label="Phone Number" placeholder="+998901234567" />
            <DateInput label="Birth Date" placeholder="YYYY-MM-DD" clearable />
            <TextInput label="Password" type="password" placeholder="Enter password" />
            <Select
              label="Source"
              placeholder="Select source"
              data={[
                { value: 'instagram', label: 'Instagram' },
                { value: 'telegram', label: 'Telegram' },
                { value: 'referral', label: 'Referral' },
                { value: 'other', label: 'Other' },
              ]}
              searchable
            />
            <Select
              label="Gender"
              placeholder="Select gender"
              data={[
                { value: 'male', label: 'Erkak' },
                { value: 'female', label: 'Ayol' },
              ]}
            />
            <Select
              label="Group"
              placeholder="Select group"
              data={groupOptions}
              searchable
              clearable
            />
            <DateInput
              label="Group Join Date"
              placeholder="YYYY-MM-DD"
              value={groupJoinDate}
              onChange={handleGroupJoinDateChange}
              clearable
            />
            <TextInput label="Parent Phone" placeholder="+998901111111" />
            <TextInput label="Parent Full Name" placeholder="Enter parent full name" />
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

  // --- DELETE CONFIRM MODAL ---
  const DeleteStudentModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedStudent?.fullName}</strong>?
        </Text>
        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              console.log('Deleted student:', selectedStudent?.id);
              closeDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );

  const columns = useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: 'avatar',
        header: 'Avatar',
        size: 80,
        Cell: ({ cell }) => <Avatar src={cell.getValue<string | null>()} size="md" radius="md" />,
      },
      { accessorKey: 'fullName', header: 'Full Name', size: 180 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      { accessorKey: 'birthDate', header: 'Birth Date', size: 120 },
      {
        accessorKey: 'source',
        header: 'Source',
        size: 120,
        Cell: ({ cell }) => {
          const source = cell.getValue<string>();
          const labels: Record<string, string> = {
            instagram: 'Instagram',
            telegram: 'Telegram',
            referral: 'Referral',
            other: 'Other',
          };
          return <Badge color="blue">{labels[source] || source}</Badge>;
        },
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 100,
        Cell: ({ cell }) => {
          const gender = cell.getValue<string>();
          return gender === 'male' ? 'Erkak' : 'Ayol';
        },
      },
      { accessorKey: 'groupName', header: 'Group', size: 150 },
      { accessorKey: 'groupJoinDate', header: 'Join Date', size: 120 },
      { accessorKey: 'parentFullName', header: 'Parent Name', size: 150 },
      { accessorKey: 'parentPhone', header: 'Parent Phone', size: 150 },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => (
          <Badge color={cell.getValue() === 'active' ? 'green' : 'red'}>
            {cell.getValue() === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
    ],
    []
  );

  const handleEdit = (id: number) => {
    console.log('Edit student:', id);
  };

  const handleDelete = (id: number) => {
    const student = data.find((s) => s.id === id);
    setSelectedStudent(student ?? null);
    openDelete();
  };

  const handleRowClick = (id: string) => {
    console.log('Go to student details:', id);
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load students"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Student"
      />

      <CreateStudentModal />
      <DeleteStudentModal />
    </>
  );
}

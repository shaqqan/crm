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
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// Type definition
interface Mentor {
  id: number;
  fullName: string;
  specialization: string;
  experience: number; // years of experience
  coursesCount: number;
  status: 'active' | 'inactive';
  joinedAt: string;
}

// Sample data
const data: Mentor[] = [
  {
    id: 1,
    fullName: 'Azizbek Berdimuratov',
    specialization: 'Full-Stack Developer',
    experience: 5,
    coursesCount: 12,
    status: 'active',
    joinedAt: '2023-11-15',
  },
  {
    id: 2,
    fullName: 'Dilshod Karimov',
    specialization: 'UI/UX Designer',
    experience: 3,
    coursesCount: 7,
    status: 'inactive',
    joinedAt: '2024-01-10',
  },
  {
    id: 3,
    fullName: 'Malika Tursunova',
    specialization: 'Data Scientist',
    experience: 4,
    coursesCount: 9,
    status: 'active',
    joinedAt: '2024-03-22',
  },
  {
    id: 4,
    fullName: 'Javlonbek Xudoyberdiyev',
    specialization: 'Mobile Developer',
    experience: 6,
    coursesCount: 15,
    status: 'active',
    joinedAt: '2022-08-05',
  },
  {
    id: 5,
    fullName: 'Zuhra Ganieva',
    specialization: 'Backend Developer',
    experience: 4,
    coursesCount: 8,
    status: 'active',
    joinedAt: '2024-02-11',
  },
  {
    id: 6,
    fullName: 'Sardor Akhmedov',
    specialization: 'Frontend Developer',
    experience: 2,
    coursesCount: 5,
    status: 'inactive',
    joinedAt: '2024-04-14',
  },
  {
    id: 7,
    fullName: 'Madina Ismoilova',
    specialization: 'Machine Learning Engineer',
    experience: 5,
    coursesCount: 11,
    status: 'active',
    joinedAt: '2023-10-02',
  },
  {
    id: 8,
    fullName: 'Abdulaziz Toshpulatov',
    specialization: 'DevOps Engineer',
    experience: 7,
    coursesCount: 6,
    status: 'active',
    joinedAt: '2022-12-25',
  },
  {
    id: 9,
    fullName: 'Nodira Eshmatova',
    specialization: 'Cybersecurity Specialist',
    experience: 6,
    coursesCount: 9,
    status: 'inactive',
    joinedAt: '2023-05-18',
  },
  {
    id: 10,
    fullName: 'Rustam Qodirov',
    specialization: 'Software Architect',
    experience: 9,
    coursesCount: 18,
    status: 'active',
    joinedAt: '2021-07-09',
  },
  {
    id: 11,
    fullName: 'Laylo Sobirova',
    specialization: 'AI Researcher',
    experience: 3,
    coursesCount: 6,
    status: 'active',
    joinedAt: '2024-05-30',
  },
  {
    id: 12,
    fullName: 'Umidjon Mirzayev',
    specialization: 'QA Engineer',
    experience: 4,
    coursesCount: 10,
    status: 'inactive',
    joinedAt: '2023-09-17',
  },
  {
    id: 13,
    fullName: 'Shohruh Raxmatov',
    specialization: 'Cloud Engineer',
    experience: 6,
    coursesCount: 8,
    status: 'active',
    joinedAt: '2022-06-28',
  },
  {
    id: 14,
    fullName: 'Nilufar Usmonova',
    specialization: 'Blockchain Developer',
    experience: 5,
    coursesCount: 7,
    status: 'active',
    joinedAt: '2023-03-13',
  },
  {
    id: 15,
    fullName: 'Bekzod Komilov',
    specialization: 'System Administrator',
    experience: 8,
    coursesCount: 5,
    status: 'inactive',
    joinedAt: '2021-10-06',
  },
  {
    id: 16,
    fullName: 'John Doe',
    specialization: 'Full-Stack Developer',
    experience: 5,
    coursesCount: 12,
    status: 'active',
    joinedAt: '2023-11-15',
  },
];

// Mentors page
export const MentorsPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  // --- CREATE MODAL ---
  const CreateMentorModal = () => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (file: File | null) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setAvatarPreview(null);
      }
    };

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="xl"
        centered
        title="Create Mentor"
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
          <Box p="md" bg="white" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
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
            <TextInput label="Full Name" placeholder="Enter full name" />
            <TextInput label="Specialization" placeholder="Enter specialization" />
            <TextInput label="Experience" placeholder="Enter experience" />
            <TextInput label="Courses Count" placeholder="Enter courses count" />
            <TextInput label="Status" placeholder="Enter status" />
            <TextInput label="Joined At" placeholder="Enter joined at" />
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
  const DeleteMentorModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedMentor?.fullName}</strong>?
        </Text>
        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('Deleted mentor:', selectedMentor?.id);
              closeDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );

  const columns = useMemo<MRT_ColumnDef<Mentor>[]>(
    () => [
      { accessorKey: 'fullName', header: 'Full Name', size: 180 },
      { accessorKey: 'specialization', header: 'Specialization', size: 180 },
      { accessorKey: 'experience', header: 'Experience (yrs)', size: 100 },
      { accessorKey: 'coursesCount', header: 'Courses', size: 100 },
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
      { accessorKey: 'joinedAt', header: 'Joined At', size: 120 },
    ],
    []
  );

  const handleEdit = (id: number) => {
    console.log('Edit mentor:', id);
  };

  const handleDelete = (id: number) => {
    const mentor = data.find((m) => m.id === id);
    setSelectedMentor(mentor ?? null);
    openDelete(); // ochirish modalni ochamiz
  };

  const handleRowClick = (id: string) => {
    console.log('Go to mentor details:', id);
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load mentors"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Mentor"
      />

      <CreateMentorModal />
      <DeleteMentorModal />
    </>
  );
};

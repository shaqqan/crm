import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Group {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive';
  month_duration: number;
  start_at: string;
  end_at: string;
  student_count: number;
  monthly_amount: number;
  day_of_week: string[];
  show_students: boolean;
  teacher: string;
  room: string;
  branch: string;
  course: string;
}

// --- Sample data ---
const data: Group[] = [
  {
    id: 1,
    name: 'Frontend Bootcamp',
    start_date: '2024-09-01',
    end_date: '2025-03-01',
    status: 'active',
    month_duration: 6,
    start_at: '09:00',
    end_at: '11:00',
    student_count: 12,
    monthly_amount: 350.0,
    day_of_week: ['Mon', 'Wed', 'Fri'],
    show_students: true,
    teacher: 'Azizbek Berdimuratov',
    room: 'Room A',
    branch: 'Main Branch',
    course: 'Frontend Development',
  },
  {
    id: 2,
    name: 'Backend Mastery',
    start_date: '2024-10-10',
    end_date: '2025-04-10',
    status: 'active',
    month_duration: 6,
    start_at: '14:00',
    end_at: '16:00',
    student_count: 10,
    monthly_amount: 400.0,
    day_of_week: ['Tue', 'Thu', 'Sat'],
    show_students: false,
    teacher: 'Dilshod Karimov',
    room: 'Room B',
    branch: 'Yunusabad',
    course: 'Backend Development',
  },
  {
    id: 3,
    name: 'Python for Data Science',
    start_date: '2024-11-05',
    end_date: '2025-05-05',
    status: 'inactive',
    month_duration: 6,
    start_at: '10:00',
    end_at: '12:00',
    student_count: 8,
    monthly_amount: 450.0,
    day_of_week: ['Mon', 'Wed', 'Fri'],
    show_students: true,
    teacher: 'Malika Tursunova',
    room: 'Room C',
    branch: 'Mirzo Ulugbek',
    course: 'Data Science',
  },
];

// --- Component ---
export const GroupPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // --- CREATE MODAL ---
  const CreateGroupModal = () => {
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const [teacher, setTeacher] = useState<string | null>(null);
    const [course, setCourse] = useState<string | null>(null);
    const [room, setRoom] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [monthDuration, setMonthDuration] = useState<number>(0);
    const [monthlyAmount, setMonthlyAmount] = useState<string>('');

    // 🔹 Hisoblash start yoki end date o'zgarganda
    const calculateMonthDuration = (start: Date | null, end: Date | null) => {
      if (!start || !end) {
        return 0;
      }
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      return months > 0 ? months : 0;
    };

    const daysOfWeek = [
      { value: 'Mon', label: 'Monday' },
      { value: 'Tue', label: 'Tuesday' },
      { value: 'Wed', label: 'Wednesday' },
      { value: 'Thu', label: 'Thursday' },
      { value: 'Fri', label: 'Friday' },
      { value: 'Sat', label: 'Saturday' },
      { value: 'Sun', label: 'Sunday' },
    ];

    const teacherOptions = [
      { value: 'Azizbek Berdimuratov', label: 'Azizbek Berdimuratov' },
      { value: 'Dilshod Karimov', label: 'Dilshod Karimov' },
      { value: 'Malika Tursunova', label: 'Malika Tursunova' },
    ];

    const courseOptions = [
      { value: 'Frontend Development', label: 'Frontend Development' },
      { value: 'Backend Development', label: 'Backend Development' },
      { value: 'Data Science', label: 'Data Science' },
    ];

    const roomOptions = [
      { value: 'Room A', label: 'Room A' },
      { value: 'Room B', label: 'Room B' },
      { value: 'Room C', label: 'Room C' },
    ];

    const statusOptions = [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ];

    // 🔹 Start Date o'zgarganda
    const handleStartDateChange = (value: string | null) => {
      const date = value ? new Date(value) : null;
      setStartDate(date);
      if (date && endDate) {
        setMonthDuration(calculateMonthDuration(date, endDate));
      } else {
        setMonthDuration(0);
      }
    };

    // 🔹 End Date o'zgarganda
    const handleEndDateChange = (value: string | null) => {
      const date = value ? new Date(value) : null;
      setEndDate(date);
      if (startDate && date) {
        setMonthDuration(calculateMonthDuration(startDate, date));
      } else {
        setMonthDuration(0);
      }
    };

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="xl"
        centered
        title="Create Group"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          header: {
            backgroundColor: 'var(--mantine-color-grayscales-1)',
          },
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <Box p="md" bg="white" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
          <SimpleGrid cols={2} spacing="md">
            <TextInput label="Name" placeholder="Enter group name" />

            <Select
              label="Status"
              placeholder="Select status"
              data={statusOptions}
              value={status}
              onChange={setStatus}
            />

            <DateInput
              label="Start Date"
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChange={handleStartDateChange}
              clearable
            />

            <DateInput
              label="End Date"
              placeholder="YYYY-MM-DD"
              value={endDate}
              minDate={startDate || undefined}
              onChange={handleEndDateChange}
              clearable
              disabled={!startDate}
            />

            <TimeInput label="Start Time" withAsterisk placeholder="HH:MM" />
            <TimeInput label="End Time" withAsterisk placeholder="HH:MM" />

            {/* 🔸 Avtomatik hisoblangan Month Duration */}
            <TextInput
              label="Month Duration (months)"
              value={monthDuration.toString()}
              disabled
              readOnly
              styles={{
                input: {
                  backgroundColor: '#f8f9fa',
                  cursor: 'not-allowed',
                },
              }}
            />

            <MultiSelect
              label="Days of Week"
              placeholder="Select days"
              data={daysOfWeek}
              value={selectedDays}
              onChange={setSelectedDays}
              searchable
              clearable
            />

            {/* 🔸 Formatlangan raqam ko'rsatish (tiyin bilan) */}
            <NumberInput
              label="Monthly Amount"
              placeholder="Enter monthly amount (e.g., 299000)"
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator=","
              value={monthlyAmount}
              onChange={(value) => setMonthlyAmount(value.toString())}
            />

            <Select
              label="Teacher"
              placeholder="Select teacher"
              data={teacherOptions}
              value={teacher}
              onChange={setTeacher}
              searchable
            />

            <Select
              label="Course"
              placeholder="Select course"
              data={courseOptions}
              value={course}
              onChange={setCourse}
              searchable
            />

            <Select
              label="Room"
              placeholder="Select room"
              data={roomOptions}
              value={room}
              onChange={setRoom}
            />
          </SimpleGrid>
        </Box>

        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('New group data:', {
                status,
                teacher,
                course,
                room,
                days: selectedDays,
                startDate,
                endDate,
                monthDuration,
                monthlyAmount: parseFloat(monthlyAmount) || 0,
              });
              close();
            }}
          >
            Create
          </Button>
        </Flex>
      </Modal>
    );
  };
  // --- DELETE CONFIRM MODAL ---
  const DeleteGroupModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedGroup?.name}</strong>?
        </Text>
        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log('Deleted group:', selectedGroup?.id);
              closeDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );

  // --- TABLE COLUMNS ---
  const columns = useMemo<MRT_ColumnDef<Group>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 180 },
      { accessorKey: 'teacher', header: 'Teacher', size: 160 },
      { accessorKey: 'course', header: 'Course', size: 160 },
      // { accessorKey: 'branch', header: 'Branch', size: 140 },
      { accessorKey: 'room', header: 'Room', size: 120 },
      { accessorKey: 'start_date', header: 'Start Date', size: 120 },
      { accessorKey: 'end_date', header: 'End Date', size: 120 },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({ cell }) => (
          <Badge color={cell.getValue() === 'active' ? 'green' : 'red'}>
            {cell.getValue() === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      { accessorKey: 'student_count', header: 'Students', size: 90 },
      { accessorKey: 'monthly_amount', header: 'Fee ($)', size: 100 },
      {
        accessorKey: 'day_of_week',
        header: 'Days',
        size: 160,
        Cell: ({ cell }) => cell.getValue<string[]>().join(', '),
      },
    ],
    []
  );

  // --- Actions ---
  const handleEdit = (id: number) => {
    console.log('Edit group:', id);
  };

  const handleDelete = (id: number) => {
    const group = data.find((g) => g.id === id);
    setSelectedGroup(group ?? null);
    openDelete();
  };

  const handleRowClick = (id: string) => {
    console.log('Go to group details:', id);
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load groups"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Group"
      />

      <CreateGroupModal />
      <DeleteGroupModal />
    </>
  );
};

export default GroupPage;

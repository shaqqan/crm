import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Button,
  ColorInput,
  Flex,
  Modal,
  MultiSelect,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Course {
  id: number;
  name: string;
  price: number;
  month_duration: number;
  description: string | null;
  color: string | null;
  lesson_count: number;
  branches: string[];
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: Course[] = [
  {
    id: 1,
    name: 'Frontend Development',
    price: 299000.99,
    month_duration: 6,
    description: 'Complete frontend development course with React, Vue, and Angular',
    color: '#4dabf7',
    lesson_count: 72,
    branches: ['Main Branch', 'Yunusabad'],
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    id: 2,
    name: 'Backend Development',
    price: 350000.0,
    month_duration: 6,
    description: 'Backend development with Node.js, Python, and Java',
    color: '#51cf66',
    lesson_count: 80,
    branches: ['Main Branch'],
    created_at: '2024-02-01',
    updated_at: '2024-02-05',
  },
  {
    id: 3,
    name: 'Full-Stack Development',
    price: 499000.0,
    month_duration: 8,
    description: 'Comprehensive full-stack development course',
    color: '#ff922b',
    lesson_count: 120,
    branches: ['Main Branch', 'Yunusabad', 'Mirzo Ulugbek'],
    created_at: '2024-03-10',
    updated_at: '2024-03-15',
  },
];

// --- Branch options ---
const branchOptions = [
  { value: 'Main Branch', label: 'Main Branch' },
  { value: 'Yunusabad', label: 'Yunusabad' },
  { value: 'Mirzo Ulugbek', label: 'Mirzo Ulugbek' },
];

// --- Component ---
export default function CoursesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // --- CREATE MODAL ---
  const CreateCourseModal = () => {
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="xl"
        centered
        title="Create Course"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <SimpleGrid
          cols={2}
          spacing="md"
          mt="md"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--mantine-radius-md)',
            padding: '16px',
          }}
        >
          <TextInput label="Course Name" placeholder="Enter course name" required />
          <NumberInput
            label="Price"
            placeholder="Enter price (e.g., 299000)"
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator=","
            required
          />
          <NumberInput
            label="Month Duration"
            placeholder="Enter duration in months"
            min={1}
            required
          />
          <NumberInput
            label="Lesson Count"
            placeholder="Enter number of lessons"
            min={0}
            required
          />
          <ColorInput label="Color" placeholder="Pick a color" />
          <MultiSelect
            label="Branches"
            placeholder="Select branches"
            data={branchOptions}
            value={selectedBranches}
            onChange={setSelectedBranches}
            searchable
          />
          <Textarea
            label="Description"
            placeholder="Enter course description"
            minRows={4}
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

  // --- DELETE CONFIRM MODAL ---
  const DeleteCourseModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedCourse?.name}</strong>?
        </Text>
        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              console.log('Deleted course:', selectedCourse?.id);
              closeDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      { accessorKey: 'name', header: 'Course Name', size: 200 },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 120,
        Cell: ({ cell }) => {
          const price = cell.getValue<number>();
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'UZS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
            .format(price)
            .replace('UZS', "so'm");
        },
      },
      {
        accessorKey: 'month_duration',
        header: 'Duration (months)',
        size: 120,
      },
      {
        accessorKey: 'lesson_count',
        header: 'Lessons',
        size: 100,
      },
      {
        accessorKey: 'color',
        header: 'Color',
        size: 100,
        Cell: ({ cell }) => {
          const color = cell.getValue<string | null>();
          if (!color) {
            return <Badge color="gray">No color</Badge>;
          }
          return (
            <Flex align="center" gap="xs">
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: color,
                  borderRadius: 'var(--mantine-radius-sm)',
                  border: '1px solid var(--mantine-color-grayscales-3)',
                }}
              />
              <Text size="xs" c="dimmed">
                {color}
              </Text>
            </Flex>
          );
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
    console.log('Edit course:', id);
  };

  const handleDelete = (id: number) => {
    const course = data.find((c) => c.id === id);
    setSelectedCourse(course ?? null);
    openDelete();
  };

  const handleRowClick = (id: string) => {
    console.log('Go to course details:', id);
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load courses"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Course"
      />

      <CreateCourseModal />
      <DeleteCourseModal />
    </>
  );
}

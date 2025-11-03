import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Stack,
  Title,
} from '@mantine/core';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface StudentRating {
  id: number;
  student_name: string;
  phone: string;
  gpa: number;
  rank: number;
  group_name: string;
  total_lessons: number;
  attended_lessons: number;
}

// --- Sample data ---
const data: StudentRating[] = [
  {
    id: 1,
    student_name: 'Azizbek Karimov',
    phone: '+998901234567',
    gpa: 4.8,
    rank: 1,
    group_name: 'Frontend Bootcamp',
    total_lessons: 72,
    attended_lessons: 70,
  },
  {
    id: 2,
    student_name: 'Malika Tursunova',
    phone: '+998902345678',
    gpa: 4.5,
    rank: 2,
    group_name: 'Backend Mastery',
    total_lessons: 80,
    attended_lessons: 75,
  },
  {
    id: 3,
    student_name: 'Javlonbek Xudoyberdiyev',
    phone: '+998903456789',
    gpa: 4.2,
    rank: 3,
    group_name: 'Full-Stack Development',
    total_lessons: 120,
    attended_lessons: 110,
  },
];

// --- Component ---
export default function StudentsRatingPage() {
  const columns = useMemo<MRT_ColumnDef<StudentRating>[]>(
    () => [
      {
        accessorKey: 'rank',
        header: 'Rank',
        size: 80,
        Cell: ({ cell }) => {
          const rank = cell.getValue<number>();
          const colors = ['gold', 'silver', '#CD7F32'];
          const color = rank <= 3 ? colors[rank - 1] : 'gray';
          return (
            <Badge color={color} size="lg">
              #{rank}
            </Badge>
          );
        },
      },
      { accessorKey: 'student_name', header: 'Student Name', size: 180 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      {
        accessorKey: 'gpa',
        header: 'GPA',
        size: 100,
        Cell: ({ cell }) => {
          const gpa = cell.getValue<number>();
          return <Badge color="blue">{gpa.toFixed(1)}</Badge>;
        },
      },
      { accessorKey: 'group_name', header: 'Group', size: 180 },
      {
        accessorKey: 'attended_lessons',
        header: 'Attendance',
        size: 150,
        Cell: ({ row }) => {
          const attended = row.original.attended_lessons;
          const total = row.original.total_lessons;
          const percentage = ((attended / total) * 100).toFixed(1);
          return `${attended}/${total} (${percentage}%)`;
        },
      },
    ],
    []
  );

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to student rating details page
  };

  return (
    <Stack gap="md">
      <Title order={2}>Talabalar Reytingi</Title>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load student ratings"
        goTo={handleRowClick}
        rowCount={data.length}
      />
    </Stack>
  );
}


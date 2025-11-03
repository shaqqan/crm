import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Avatar,
  Badge,
  Stack,
  Title,
} from '@mantine/core';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface Graduate {
  id: number;
  image: string | null;
  student_name: string;
  phone: string;
  course_name: string;
  graduation_date: string;
  final_gpa: number;
  certificate_issued: boolean;
}

// --- Sample data ---
const data: Graduate[] = [
  {
    id: 1,
    image: null,
    student_name: 'Azizbek Karimov',
    phone: '+998901234567',
    course_name: 'Frontend Bootcamp',
    graduation_date: '2024-06-15',
    final_gpa: 4.8,
    certificate_issued: true,
  },
  {
    id: 2,
    image: null,
    student_name: 'Malika Tursunova',
    phone: '+998902345678',
    course_name: 'Backend Mastery',
    graduation_date: '2024-07-20',
    final_gpa: 4.5,
    certificate_issued: true,
  },
  {
    id: 3,
    image: null,
    student_name: 'Javlonbek Xudoyberdiyev',
    phone: '+998903456789',
    course_name: 'Full-Stack Development',
    graduation_date: '2024-08-10',
    final_gpa: 4.2,
    certificate_issued: false,
  },
];

// --- Component ---
export default function GraduatesReportPage() {
  const columns = useMemo<MRT_ColumnDef<Graduate>[]>(
    () => [
      {
        accessorKey: 'image',
        header: 'Avatar',
        size: 80,
        Cell: ({ cell }) => (
          <Avatar src={cell.getValue<string | null>()} size="md" radius="md" />
        ),
      },
      { accessorKey: 'student_name', header: 'Student Name', size: 180 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      { accessorKey: 'course_name', header: 'Course', size: 200 },
      {
        accessorKey: 'graduation_date',
        header: 'Graduation Date',
        size: 150,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>();
          return new Date(date).toLocaleDateString();
        },
      },
      {
        accessorKey: 'final_gpa',
        header: 'Final GPA',
        size: 120,
        Cell: ({ cell }) => {
          const gpa = cell.getValue<number>();
          return <Badge color="blue">{gpa.toFixed(1)}</Badge>;
        },
      },
      {
        accessorKey: 'certificate_issued',
        header: 'Certificate',
        size: 120,
        Cell: ({ cell }) => (
          <Badge color={cell.getValue<boolean>() ? 'green' : 'red'}>
            {cell.getValue<boolean>() ? 'Issued' : 'Not Issued'}
          </Badge>
        ),
      },
    ],
    []
  );

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to graduate details page
  };

  return (
    <Stack gap="md">
      <Title order={2}>Bitiruvchilar</Title>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load graduates report"
        goTo={handleRowClick}
        rowCount={data.length}
      />
    </Stack>
  );
}


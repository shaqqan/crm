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
interface StudentReport {
  id: number;
  image: string | null;
  student_name: string;
  phone: string;
  group_name: string;
  status: string;
  balance: number;
  gpa: number;
  created_at: string;
}

// --- Sample data ---
const data: StudentReport[] = [
  {
    id: 1,
    image: null,
    student_name: 'Azizbek Karimov',
    phone: '+998901234567',
    group_name: 'Frontend Bootcamp',
    status: 'active',
    balance: 500000,
    gpa: 4.8,
    created_at: '2024-01-10',
  },
  {
    id: 2,
    image: null,
    student_name: 'Malika Tursunova',
    phone: '+998902345678',
    group_name: 'Backend Mastery',
    status: 'active',
    balance: -100000,
    gpa: 4.5,
    created_at: '2024-01-15',
  },
  {
    id: 3,
    image: null,
    student_name: 'Javlonbek Xudoyberdiyev',
    phone: '+998903456789',
    group_name: 'Full-Stack Development',
    status: 'inactive',
    balance: 0,
    gpa: 4.2,
    created_at: '2024-01-20',
  },
];

// --- Component ---
export default function StudentsReportPage() {
  const columns = useMemo<MRT_ColumnDef<StudentReport>[]>(
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
      { accessorKey: 'group_name', header: 'Group', size: 180 },
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
        accessorKey: 'balance',
        header: 'Balance',
        size: 150,
        Cell: ({ cell }) => {
          const balance = cell.getValue<number>();
          const color = balance >= 0 ? 'green' : 'red';
          return (
            <Badge color={color}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'UZS',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
                .format(balance)
                .replace('UZS', "so'm")}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'gpa',
        header: 'GPA',
        size: 100,
        Cell: ({ cell }) => {
          const gpa = cell.getValue<number>();
          return <Badge color="blue">{gpa.toFixed(1)}</Badge>;
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

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to student details page
  };

  return (
    <Stack gap="md">
      <Title order={2}>O'quvchilar Hisoboti</Title>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load students report"
        goTo={handleRowClick}
        rowCount={data.length}
      />
    </Stack>
  );
}


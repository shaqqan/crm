import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Stack,
  Title,
} from '@mantine/core';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface EmployeeAttendance {
  id: number;
  employee_name: string;
  date: string;
  check_in: string;
  check_out: string;
  status: string;
  hours_worked: number;
}

// --- Sample data ---
const data: EmployeeAttendance[] = [
  {
    id: 1,
    employee_name: 'Azizbek Karimov',
    date: '2024-01-15',
    check_in: '09:00',
    check_out: '18:00',
    status: 'present',
    hours_worked: 8,
  },
  {
    id: 2,
    employee_name: 'Malika Tursunova',
    date: '2024-01-15',
    check_in: '09:30',
    check_out: '17:30',
    status: 'present',
    hours_worked: 7.5,
  },
  {
    id: 3,
    employee_name: 'Javlonbek Xudoyberdiyev',
    date: '2024-01-15',
    check_in: '-',
    check_out: '-',
    status: 'absent',
    hours_worked: 0,
  },
];

// --- Component ---
export default function EmployeesAttendancePage() {
  const columns = useMemo<MRT_ColumnDef<EmployeeAttendance>[]>(
    () => [
      { accessorKey: 'employee_name', header: 'Employee Name', size: 180 },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 120,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>();
          return new Date(date).toLocaleDateString();
        },
      },
      { accessorKey: 'check_in', header: 'Check In', size: 120 },
      { accessorKey: 'check_out', header: 'Check Out', size: 120 },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const colorMap: Record<string, string> = {
            present: 'green',
            absent: 'red',
            late: 'yellow',
          };
          return <Badge color={colorMap[status] || 'gray'}>{status}</Badge>;
        },
      },
      {
        accessorKey: 'hours_worked',
        header: 'Hours Worked',
        size: 120,
        Cell: ({ cell }) => {
          const hours = cell.getValue<number>();
          return `${hours} hrs`;
        },
      },
    ],
    []
  );

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to attendance details page
  };

  return (
    <Stack gap="md">
      <Title order={2}>Xodimlar Davomati</Title>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load employee attendance"
        goTo={handleRowClick}
        rowCount={data.length}
      />
    </Stack>
  );
}


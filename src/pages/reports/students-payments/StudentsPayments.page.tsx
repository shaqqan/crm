import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface StudentPayment {
  id: number;
  student_name: string;
  phone: string;
  amount: number;
  payment_date: string;
  status: string;
  payment_type: string;
}

// --- Sample data ---
const data: StudentPayment[] = [
  {
    id: 1,
    student_name: 'Azizbek Karimov',
    phone: '+998901234567',
    amount: 500000,
    payment_date: '2024-01-15',
    status: 'paid',
    payment_type: 'Cash',
  },
  {
    id: 2,
    student_name: 'Malika Tursunova',
    phone: '+998902345678',
    amount: 450000,
    payment_date: '2024-01-20',
    status: 'pending',
    payment_type: 'Card',
  },
  {
    id: 3,
    student_name: 'Javlonbek Xudoyberdiyev',
    phone: '+998903456789',
    amount: 600000,
    payment_date: '2024-01-25',
    status: 'paid',
    payment_type: 'Bank Transfer',
  },
];

// --- Component ---
export default function StudentsPaymentsPage() {
  const columns = useMemo<MRT_ColumnDef<StudentPayment>[]>(
    () => [
      { accessorKey: 'student_name', header: 'Student Name', size: 180 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 150,
        Cell: ({ cell }) => {
          const amount = cell.getValue<number>();
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'UZS',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })
            .format(amount)
            .replace('UZS', "so'm");
        },
      },
      {
        accessorKey: 'payment_date',
        header: 'Payment Date',
        size: 120,
        Cell: ({ cell }) => {
          const date = cell.getValue<string>();
          return new Date(date).toLocaleDateString();
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const colorMap: Record<string, string> = {
            paid: 'green',
            pending: 'yellow',
            failed: 'red',
          };
          return <Badge color={colorMap[status] || 'gray'}>{status}</Badge>;
        },
      },
      {
        accessorKey: 'payment_type',
        header: 'Payment Type',
        size: 150,
      },
    ],
    []
  );

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to payment details page
  };

  return (
    <Stack gap="md">
      <Title order={2}>O'quvchilar To'lovlari</Title>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load student payments"
        goTo={handleRowClick}
        rowCount={data.length}
      />
    </Stack>
  );
}


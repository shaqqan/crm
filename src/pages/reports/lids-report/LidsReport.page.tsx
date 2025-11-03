import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Stack,
  Title,
} from '@mantine/core';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface LidReport {
  id: number;
  name: string;
  phone: string;
  source: string;
  status: string;
  created_at: string;
  converted_at: string | null;
}

// --- Sample data ---
const data: LidReport[] = [
  {
    id: 1,
    name: 'Azizbek Karimov',
    phone: '+998901234567',
    source: 'Instagram',
    status: 'converted',
    created_at: '2024-01-10',
    converted_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Malika Tursunova',
    phone: '+998902345678',
    source: 'Telegram',
    status: 'pending',
    created_at: '2024-01-15',
    converted_at: null,
  },
  {
    id: 3,
    name: 'Javlonbek Xudoyberdiyev',
    phone: '+998903456789',
    source: 'Referral',
    status: 'converted',
    created_at: '2024-01-20',
    converted_at: '2024-01-25',
  },
];

// --- Component ---
export default function LidsReportPage() {
  const columns = useMemo<MRT_ColumnDef<LidReport>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 180 },
      { accessorKey: 'phone', header: 'Phone', size: 150 },
      {
        accessorKey: 'source',
        header: 'Source',
        size: 120,
        Cell: ({ cell }) => {
          const source = cell.getValue<string>();
          return <Badge color="blue">{source}</Badge>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const colorMap: Record<string, string> = {
            converted: 'green',
            pending: 'yellow',
            lost: 'red',
          };
          return <Badge color={colorMap[status] || 'gray'}>{status}</Badge>;
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
      {
        accessorKey: 'converted_at',
        header: 'Converted At',
        size: 120,
        Cell: ({ cell }) => {
          const date = cell.getValue<string | null>();
          return date ? new Date(date).toLocaleDateString() : '-';
        },
      },
    ],
    []
  );

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to lid details page
  };

  return (
    <Stack gap="md">
      <Title order={2}>Lidlar Hisoboti</Title>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load lids report"
        goTo={handleRowClick}
        rowCount={data.length}
      />
    </Stack>
  );
}


import { useMemo, useState } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import {
  Badge,
  Button,
  Flex,
  Modal,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MTable } from '@/shared/components/m-table/m-table';

// --- Type definition ---
interface PaymentType {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// --- Sample data ---
const data: PaymentType[] = [
  {
    id: 1,
    name: 'Cash',
    is_active: true,
    created_at: '2024-01-10',
    updated_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Card',
    is_active: true,
    created_at: '2024-01-15',
    updated_at: '2024-01-20',
  },
  {
    id: 3,
    name: 'Bank Transfer',
    is_active: false,
    created_at: '2024-02-01',
    updated_at: '2024-02-05',
  },
];

// --- Component ---
export default function PaymentTypesPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType | null>(null);

  // --- CREATE MODAL ---
  const CreatePaymentTypeModal = () => {
    const [isActive, setIsActive] = useState(true);

    return (
      <Modal
        opened={opened}
        onClose={close}
        radius="md"
        size="md"
        centered
        title="Create Payment Type"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <SimpleGrid
          cols={1}
          spacing="md"
          mt="md"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--mantine-radius-md)',
            padding: '16px',
          }}
        >
          <TextInput label="Name" placeholder="Enter payment type name" required />
          <Switch
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.currentTarget.checked)}
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

  // --- EDIT MODAL ---
  const EditPaymentTypeModal = () => {
    const [isActive, setIsActive] = useState(selectedPaymentType?.is_active ?? true);

    return (
      <Modal
        opened={editOpened}
        onClose={closeEdit}
        radius="md"
        size="md"
        centered
        title="Edit Payment Type"
        overlayProps={{ backgroundOpacity: 0.6, blur: 1.5 }}
        styles={{
          content: { backgroundColor: 'var(--mantine-color-grayscales-1)' },
        }}
      >
        <SimpleGrid
          cols={1}
          spacing="md"
          mt="md"
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--mantine-radius-md)',
            padding: '16px',
          }}
        >
          <TextInput
            label="Name"
            placeholder="Enter payment type name"
            defaultValue={selectedPaymentType?.name}
            required
          />
          <Switch
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.currentTarget.checked)}
          />
        </SimpleGrid>
        <Flex justify="flex-end" gap="sm" mt="md">
          <Button onClick={closeEdit} variant="outline">
            Cancel
          </Button>
          <Button onClick={closeEdit}>Update</Button>
        </Flex>
      </Modal>
    );
  };

  // --- DELETE CONFIRM MODAL ---
  const DeletePaymentTypeModal = () => (
    <Modal opened={deleteOpened} onClose={closeDelete} title="Confirm Deletion" radius="md">
      <Stack>
        <Text>
          Are you sure you want to delete <strong>{selectedPaymentType?.name}</strong>?
        </Text>
        <Flex justify="flex-end" gap="sm" pt="md">
          <Button variant="outline" onClick={closeDelete}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              // TODO: Implement delete API call
              closeDelete();
            }}
          >
            Delete
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );

  const columns = useMemo<MRT_ColumnDef<PaymentType>[]>(
    () => [
      { accessorKey: 'name', header: 'Name', size: 200 },
      {
        accessorKey: 'is_active',
        header: 'Is Active',
        size: 120,
        Cell: ({ cell }) => (
          <Badge color={cell.getValue<boolean>() ? 'green' : 'red'}>
            {cell.getValue<boolean>() ? 'Yes' : 'No'}
          </Badge>
        ),
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
        accessorKey: 'updated_at',
        header: 'Updated At',
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
    const paymentType = data.find((pt) => pt.id === id);
    setSelectedPaymentType(paymentType ?? null);
    openEdit();
  };

  const handleDelete = (id: number) => {
    const paymentType = data.find((pt) => pt.id === id);
    setSelectedPaymentType(paymentType ?? null);
    openDelete();
  };

  const handleRowClick = (_id: string) => {
    // TODO: Navigate to payment type details page
  };

  const handleCreate = () => open();

  return (
    <>
      <MTable
        columns={columns}
        data={data}
        loading={false}
        isError={false}
        errorText="Failed to load payment types"
        enableRowActions
        editM={handleEdit}
        deleteM={handleDelete}
        goTo={handleRowClick}
        rowCount={data.length}
        createM={handleCreate}
        createButtonText="Add Payment Type"
      />

      <CreatePaymentTypeModal />
      <EditPaymentTypeModal />
      <DeletePaymentTypeModal />
    </>
  );
}


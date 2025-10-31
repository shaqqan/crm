import { MTable } from '@/shared/components/m-table/m-table';

export default function LeadsPage() {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
  ];
  const data = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
    {
      id: 3,
      name: 'Jim Doe',
      email: 'jim.doe@example.com',
    },
  ];
  
  return (
    <>
      <MTable columns={columns} data={data} />
    </>
  );
}

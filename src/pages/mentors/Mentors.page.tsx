import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'mantine-react-table';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mantine/core';
import { MTable } from '@/shared/components/m-table/m-table';

// Type definition
interface Mentor {
  id: number;
  fullName: string;
  specialization: string;
  experience: number; // years of experience
  coursesCount: number;
  status: 'active' | 'inactive';
  joinedAt: string;
}

// Sample data
const data: Mentor[] = [
  {
    id: 1,
    fullName: 'Azizbek Berdimuratov',
    specialization: 'Full-Stack Developer',
    experience: 5,
    coursesCount: 12,
    status: 'active',
    joinedAt: '2023-11-15',
  },
  {
    id: 2,
    fullName: 'Dilshod Karimov',
    specialization: 'UI/UX Designer',
    experience: 3,
    coursesCount: 7,
    status: 'inactive',
    joinedAt: '2024-01-10',
  },
  {
    id: 3,
    fullName: 'Malika Tursunova',
    specialization: 'Data Scientist',
    experience: 4,
    coursesCount: 9,
    status: 'active',
    joinedAt: '2024-03-22',
  },
  {
    id: 4,
    fullName: 'Javlonbek Xudoyberdiyev',
    specialization: 'Mobile Developer',
    experience: 6,
    coursesCount: 15,
    status: 'active',
    joinedAt: '2022-08-05',
  },
  {
    id: 5,
    fullName: 'Zuhra Ganieva',
    specialization: 'Backend Developer',
    experience: 4,
    coursesCount: 8,
    status: 'active',
    joinedAt: '2024-02-11',
  },
  {
    id: 6,
    fullName: 'Sardor Akhmedov',
    specialization: 'Frontend Developer',
    experience: 2,
    coursesCount: 5,
    status: 'inactive',
    joinedAt: '2024-04-14',
  },
  {
    id: 7,
    fullName: 'Madina Ismoilova',
    specialization: 'Machine Learning Engineer',
    experience: 5,
    coursesCount: 11,
    status: 'active',
    joinedAt: '2023-10-02',
  },
  {
    id: 8,
    fullName: 'Abdulaziz Toshpulatov',
    specialization: 'DevOps Engineer',
    experience: 7,
    coursesCount: 6,
    status: 'active',
    joinedAt: '2022-12-25',
  },
  {
    id: 9,
    fullName: 'Nodira Eshmatova',
    specialization: 'Cybersecurity Specialist',
    experience: 6,
    coursesCount: 9,
    status: 'inactive',
    joinedAt: '2023-05-18',
  },
  {
    id: 10,
    fullName: 'Rustam Qodirov',
    specialization: 'Software Architect',
    experience: 9,
    coursesCount: 18,
    status: 'active',
    joinedAt: '2021-07-09',
  },
  {
    id: 11,
    fullName: 'Laylo Sobirova',
    specialization: 'AI Researcher',
    experience: 3,
    coursesCount: 6,
    status: 'active',
    joinedAt: '2024-05-30',
  },
  {
    id: 12,
    fullName: 'Umidjon Mirzayev',
    specialization: 'QA Engineer',
    experience: 4,
    coursesCount: 10,
    status: 'inactive',
    joinedAt: '2023-09-17',
  },
  {
    id: 13,
    fullName: 'Shohruh Raxmatov',
    specialization: 'Cloud Engineer',
    experience: 6,
    coursesCount: 8,
    status: 'active',
    joinedAt: '2022-06-28',
  },
  {
    id: 14,
    fullName: 'Nilufar Usmonova',
    specialization: 'Blockchain Developer',
    experience: 5,
    coursesCount: 7,
    status: 'active',
    joinedAt: '2023-03-13',
  },
  {
    id: 15,
    fullName: 'Bekzod Komilov',
    specialization: 'System Administrator',
    experience: 8,
    coursesCount: 5,
    status: 'inactive',
    joinedAt: '2021-10-06',
  },
  {
    id: 16,
    fullName: 'John Doe',
    specialization: 'Full-Stack Developer',
    experience: 5,
    coursesCount: 12,
    status: 'active',
    joinedAt: '2023-11-15',
  },
];

// Mentors page
export const MentorsPage = () => {
  const columns = useMemo<MRT_ColumnDef<Mentor>[]>(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        size: 180,
      },
      {
        accessorKey: 'specialization',
        header: 'Specialization',
        size: 180,
      },
      {
        accessorKey: 'experience',
        header: 'Experience (yrs)',
        size: 100,
      },
      {
        accessorKey: 'coursesCount',
        header: 'Courses',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 120,
        Cell: ({ cell }) => (
          <Badge color={cell.getValue() === 'active' ? 'green' : 'red'}>
            {cell.getValue() === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      {
        accessorKey: 'joinedAt',
        header: 'Joined At',
        size: 120,
      },
    ],
    []
  );

  const handleEdit = (id: number) => {
    console.log('Edit mentor:', id);
    // navigate(`/mentors/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log('Delete mentor:', id);
    // confirm and delete logic
  };

  const handleRowClick = (id: string) => {
    console.log('Go to mentor details:', id);
    // navigate(`/mentors/${id}`);
  };

  const handleCreate = () => {
    console.log('Create new mentor');
    // navigate(`/mentors/create`);
  };

  return (
    <MTable
      columns={columns}
      data={data}
      loading={false}
      isError={false}
      errorText="Failed to load mentors"
      enableRowActions
      editM={handleEdit}
      deleteM={handleDelete}
      goTo={handleRowClick}
      rowCount={data.length}
      createM={handleCreate}
      createButtonText="Add Mentor"
    />
  );
};

import {
  IconCash,
  IconCircleCheck,
  IconCreditCard,
  IconSchool,
  IconUserCancel,
  IconUserCheck,
  IconUserOff,
  IconUsers,
  IconUsersGroup,
  IconUserStar,
} from '@tabler/icons-react';
import { AreaChart, LineChart } from '@mantine/charts';
import { Card, Group, Stack, Text, Title } from '@mantine/core';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color?: string;
}

const StatCard = ({ icon, label, value, color = 'primary' }: StatCardProps) => {
  return (
    <Card
      padding="lg"
      radius="md"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Stack gap="md" style={{ flex: 1, justifyContent: 'space-between' }}>
        <Group justify="space-between" align="flex-start">
          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: `var(--mantine-color-${color}-1)`,
              color: `var(--mantine-color-${color}-6)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        </Group>
        <Stack gap={4} style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text size="sm" c="dimmed" fw={500}>
            {label}
          </Text>
          <Text
            size="2xl"
            fw={700}
            c={`var(--mantine-color-${color}-6)`}
            style={{
              fontSize: '2.5rem',
              lineHeight: '1.2',
              minHeight: '3rem',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            {value.toLocaleString()}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export default function DashboardPage() {
  const stats = {
    activeLeads: 9,
    activeStudents: 177,
    groups: 128,
    debtors: 100,
    inTheTrialLesson: 241,
    payers: 150,
    stoped: 9,
    stopsTesting: 0,
    finished: 8345,
    mentors: 11,
  };

  const finansMonths = [
    { month: 'Yanvar', income: 0, expenses: 95_000_000 }, // zarar
    { month: 'Fevral', income: 120_000_000, expenses: 110_000_000 }, // ozgina foyda
    { month: 'Mart', income: 150_000_000, expenses: 140_000_000 }, // foyda
    { month: 'Aprel', income: 130_000_000, expenses: 160_000_000 }, // zarar
    { month: 'May', income: 190_000_000, expenses: 20_000_000 }, // foyda
    { month: 'Iyun', income: 220_000_000, expenses: 210_000_00 }, // ozgina foyda
    { month: 'Iyul', income: 260_000_000, expenses: 280_000_00 }, // zarar
    { month: 'Avgust', income: 300_000_000, expenses: 260_00_000 }, // foyda
    { month: 'Sentabr', income: 290_000_000, expenses: 310_000_000 }, // zarar
    { month: 'Oktabr', income: 340_000_000, expenses: 280_000_000 }, // foyda
    { month: 'Noyabr', income: 370_000_000, expenses: 360_000_000 }, // ozgina foyda
    { month: 'Dekabr', income: 520_000_000, expenses: 330_000_000 }, // katta foyda
  ];

  const statCards = [
    {
      key: 'activeLeads',
      icon: <IconUsers size={24} />,
      label: 'Faol Leadlar',
      value: stats.activeLeads,
      color: 'blue',
    },
    {
      key: 'activeStudents',
      icon: <IconUserCheck size={24} />,
      label: "Faol O'quvchilar",
      value: stats.activeStudents,
      color: 'green',
    },
    {
      key: 'mentors',
      icon: <IconUserStar size={24} />,
      label: "O'qituvchilar",
      value: stats.mentors,
      color: 'indigo',
    },
    {
      key: 'groups',
      icon: <IconUsersGroup size={24} />,
      label: 'Guruhlar',
      value: stats.groups,
      color: 'violet',
    },
    {
      key: 'debtors',
      icon: <IconCreditCard size={24} />,
      label: 'Qarzdorlar',
      value: stats.debtors,
      color: 'red',
    },
    {
      key: 'inTheTrialLesson',
      icon: <IconSchool size={24} />,
      label: 'Sinov Darsida',
      value: stats.inTheTrialLesson,
      color: 'orange',
    },
    {
      key: 'payers',
      icon: <IconCash size={24} />,
      label: "To'lovchilar",
      value: stats.payers,
      color: 'teal',
    },
    {
      key: 'stoped',
      icon: <IconUserOff size={24} />,
      label: "To'xtatilgan",
      value: stats.stoped,
      color: 'gray',
    },
    {
      key: 'stopsTesting',
      icon: <IconUserCancel size={24} />,
      label: "Sinovni To'xtatgan",
      value: stats.stopsTesting,
      color: 'yellow',
    },
    {
      key: 'finished',
      icon: <IconCircleCheck size={24} />,
      label: 'Tugatgan',
      value: stats.finished,
      color: 'cyan',
    },
  ];

  return (
    <Stack gap="lg" p={{ base: 12, sm: 16, md: 20 }}>
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(10, 1fr)',
          alignItems: 'stretch',
        }}
      >
        {statCards.map((stat) => (
          <StatCard
            key={stat.key}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
          />
        ))}
      </div>

      <Card padding="lg" radius="md">
        <Title order={3} mb="md">
          Moliya Statistika
        </Title>
        <AreaChart
          h={400}
          data={finansMonths}
          dataKey="month"
          series={[
            { name: 'income', label: 'Daromad', color: 'green.6' },
            { name: 'expenses', label: 'Xarajat', color: 'red.6' },
          ]}
          curveType="natural"
          tickLine="xy"
          gridAxis="xy"
          withDots
          withTooltip
          withLegend
          dotProps={{ r: 4 }}
        />
      </Card>
    </Stack>
  );
}

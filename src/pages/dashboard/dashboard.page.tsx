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
import { AreaChart } from '@mantine/charts';
import { Badge, Card, Group, Stack, Tabs, Text, Title, Tooltip } from '@mantine/core';

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

// Schedule helpers and types
interface LessonItem {
  room: string;
  start: string; // HH:MM
  end: string; // HH:MM
  course: string;
  mentor: string;
  color?: string;
}

const START_MINUTES = 8 * 60; // 08:00
const END_MINUTES = 20 * 60; // 20:00
const SLOT_MINUTES = 15; // 15-minute slots for precise placement
const TOTAL_SLOTS = Math.floor((END_MINUTES - START_MINUTES) / SLOT_MINUTES);

function minutesFromMidnight(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getSlotIndex(time: string): number {
  const minutes = minutesFromMidnight(time);
  const diff = Math.max(0, Math.min(END_MINUTES, minutes) - START_MINUTES);
  return Math.floor(diff / SLOT_MINUTES);
}

function getDurationSlots(start: string, end: string): number {
  const s = minutesFromMidnight(start);
  const e = minutesFromMidnight(end);
  const clampedStart = Math.max(START_MINUTES, Math.min(END_MINUTES, s));
  const clampedEnd = Math.max(START_MINUTES, Math.min(END_MINUTES, e));
  const diff = Math.max(0, clampedEnd - clampedStart);
  return Math.max(1, Math.ceil(diff / SLOT_MINUTES));
}

function slotLabel(slotIndex: number): string {
  const minutes = START_MINUTES + slotIndex * SLOT_MINUTES;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const mm = String(m).padStart(2, '0');
  const hh = String(h).padStart(2, '0');
  return `${hh}:${mm}`;
}

function ScheduleGrid({ rooms, lessons, slotHeight = 56 }: { rooms: string[]; lessons: LessonItem[]; slotHeight?: number }) {
  const labelsEvery = 60 / SLOT_MINUTES;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const showNow = nowMinutes >= START_MINUTES && nowMinutes <= END_MINUTES;
  const nowIdx = getSlotIndex(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `160px repeat(${TOTAL_SLOTS}, 1fr)`,
          alignItems: 'center',
          gap: 8,
          position: 'sticky',
          top: 0,
          zIndex: 2,
          background: 'var(--mantine-color-body)',
          borderBottom: '1px solid var(--mantine-color-grayscales-3)'
        }}
      >
        <div />
        {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
          <Text key={i} size="sm" c="dimmed" ta="center">
            {i % labelsEvery === 0 ? slotLabel(i) : ''}
          </Text>
        ))}
      </div>

      {rooms.map((room) => (
        <div
          key={room}
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: `160px repeat(${TOTAL_SLOTS}, 1fr)`,
            alignItems: 'stretch',
            gap: 8,
            background: `repeating-linear-gradient(to right, transparent 0, transparent calc(100% / ${TOTAL_SLOTS} - 1px), rgba(0,0,0,0.04) calc(100% / ${TOTAL_SLOTS} - 1px), rgba(0,0,0,0.04) calc(100% / ${TOTAL_SLOTS}))`,
            borderRadius: 8,
          }}
        >
          <Text
            fw={600}
            style={{
              position: 'sticky',
              left: 0,
              zIndex: 1,
              background: 'var(--mantine-color-body)',
              padding: '12px 8px',
              borderRight: '1px solid var(--mantine-color-grayscales-3)'
            }}
          >
            {room}
          </Text>

          {showNow && (
            <div
              style={{
                gridColumn: `${2 + nowIdx} / span 1`,
                pointerEvents: 'none',
                height: slotHeight,
                alignSelf: 'center',
                borderRight: '2px solid var(--mantine-color-primary-6)'
              }}
            />
          )}

          {lessons
            .filter((l) => l.room === room)
            .map((l, idx) => {
              const startCol = 2 + getSlotIndex(l.start);
              const span = getDurationSlots(l.start, l.end);
              return (
                <Tooltip
                  key={`${room}-${idx}-${l.start}`}
                  label={`${l.course} • ${l.mentor} • ${l.start}–${l.end}`}
                  withArrow
                >
                  <div
                    style={{
                      gridColumn: `${startCol} / span ${span}`,
                      height: slotHeight,
                      marginTop: 4,
                      borderRadius: 10,
                      background:
                        l.color || 'linear-gradient(135deg, var(--mantine-color-primary-4), var(--mantine-color-primary-6))',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      cursor: 'default'
                    }}
                  >
                    <Badge color="dark" variant="white" style={{ pointerEvents: 'none' }}>
                      {l.start}
                    </Badge>
                    <Text fw={600} size="sm" style={{ pointerEvents: 'none', color: 'white' }}>
                      {l.course}
                    </Text>
                    <Text
                      size="sm"
                      style={{
                        marginLeft: 'auto',
                        pointerEvents: 'none',
                        color: 'rgba(255, 255, 255, 0.95)'
                      }}
                    >
                      {l.mentor}
                    </Text>
                  </div>
                </Tooltip>
              );
            })}
        </div>
      ))}
    </div>
  );
}

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
    { month: 'Yanvar', income: 0, expenses: 95_000_000 },
    { month: 'Fevral', income: 120_000_000, expenses: 110_000_000 },
    { month: 'Mart', income: 150_000_000, expenses: 140_000_000 },
    { month: 'Aprel', income: 130_000_000, expenses: 160_000_000 },
    { month: 'May', income: 190_000_000, expenses: 20_000_000 },
    { month: 'Iyun', income: 220_000_000, expenses: 210_000_00 },
    { month: 'Iyul', income: 260_000_000, expenses: 280_000_00 },
    { month: 'Avgust', income: 300_000_000, expenses: 260_00_000 },
    { month: 'Sentabr', income: 290_000_000, expenses: 310_000_000 },
    { month: 'Oktabr', income: 340_000_000, expenses: 280_000_000 },
    { month: 'Noyabr', income: 370_000_000, expenses: 360_000_000 },
    { month: 'Dekabr', income: 520_000_000, expenses: 330_000_000 },
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

  const rooms = ['A Xona', 'B Xona', 'C Xona', 'D Xona'];

  const oddDayLessons: LessonItem[] = [
    {
      room: 'A Xona',
      start: '09:15',
      end: '11:30',
      course: 'IELTS Writing',
      mentor: 'Abdulloh Karimov',
    },
    {
      room: 'B Xona',
      start: '10:00',
      end: '12:00',
      course: 'Math Algebra',
      mentor: 'Malika Sodiqova',
      color: 'linear-gradient(135deg,#22c55e,#16a34a)',
    },
    {
      room: 'C Xona',
      start: '13:00',
      end: '15:00',
      course: 'English A2',
      mentor: 'Otabek Nuriddinov',
      color: 'linear-gradient(135deg,#6366f1,#4f46e5)',
    },
    {
      room: 'A Xona',
      start: '16:00',
      end: '18:00',
      course: 'Frontend React',
      mentor: 'Jasur Ismoilov',
      color: 'linear-gradient(135deg,#06b6d4,#0891b2)',
    },
  ];

  const evenDayLessons: LessonItem[] = [
    {
      room: 'A Xona',
      start: '08:00',
      end: '09:30',
      course: 'Spoken Club',
      mentor: 'Aziza Rasulova',
      color: 'linear-gradient(135deg,#f59e0b,#d97706)',
    },
    {
      room: 'D Xona',
      start: '11:00',
      end: '13:00',
      course: 'Backend Node.js',
      mentor: 'Shahboz Qodirov',
    },
    { room: 'C Xona', start: '14:00', end: '16:00', course: 'SAT Prep', mentor: 'Temur Xoliqov' },
    {
      room: 'B Xona',
      start: '17:00',
      end: '19:00',
      course: 'Design UI/UX',
      mentor: 'Nilufar Tursunova',
      color: 'linear-gradient(135deg,#ef4444,#dc2626)',
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

      <Card padding="lg" radius="md">
        <Group justify="space-between" align="center" mb="md">
          <Title order={3}>Dars Jadvali</Title>
          <Badge color="primary" variant="light">
            Kun bo'yi
          </Badge>
        </Group>
        <Tabs defaultValue="odd">
          <Tabs.List>
            <Tabs.Tab value="odd">Toq kunlar</Tabs.Tab>
            <Tabs.Tab value="even">Juft kunlar</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="odd" pt="md">
            <ScheduleGrid rooms={rooms} lessons={oddDayLessons} />
          </Tabs.Panel>
          <Tabs.Panel value="even" pt="md">
            <ScheduleGrid rooms={rooms} lessons={evenDayLessons} />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Stack>
  );
}

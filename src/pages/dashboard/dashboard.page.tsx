import {
  AreaChart,
  BarChart,
  DonutChart,
  FunnelChart,
  Heatmap,
  PieChart,
  RadarChart,
} from '@mantine/charts';
import { Title } from '@mantine/core';

export default function DashboardPage() {
  const data = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ];

  const data2 = [
    {
      date: 'Mar 22',
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: 'Mar 23',
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: 'Mar 24',
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: 'Mar 25',
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: 'Mar 26',
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ];
  const data3 = [
    { name: 'USA', value: 400, color: 'red' },
    { name: 'India', value: 300, color: 'yellow.6' },
    { name: 'Japan', value: 100, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
  ];
  const data4 = [
    { name: 'USA', value: 400, color: 'indigo.6' },
    { name: 'India', value: 300, color: 'yellow.6' },
    { name: 'Japan', value: 300, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
  ];
  const data5 = [
    { name: 'USA', value: 400, color: 'indigo.6' },
    { name: 'India', value: 300, color: 'yellow.6' },
    { name: 'Japan', value: 100, color: 'teal.6' },
    { name: 'Other', value: 200, color: 'gray.6' },
  ];
  const data6 = [
    {
      product: 'Apples',
      'Sales January': 120,
      'Sales February': 100,
    },
    {
      product: 'Oranges',
      'Sales January': 98,
      'Sales February': 90,
    },
    {
      product: 'Tomatoes',
      'Sales January': 86,
      'Sales February': 70,
    },
    {
      product: 'Grapes',
      'Sales January': 99,
      'Sales February': 80,
    },
    {
      product: 'Bananas',
      'Sales January': 85,
      'Sales February': 120,
    },
    {
      product: 'Lemons',
      'Sales January': 65,
      'Sales February': 150,
    },
  ];
  const data7 = {
    '2025-02-14': 2,
    '2025-02-11': 3,
    '2025-02-06': 4,
    '2025-02-05': 1,
    '2025-02-03': 2,
    '2025-02-01': 2,
    '2025-01-31': 4,
    '2025-01-30': 2,
    '2025-01-29': 3,
    '2025-01-26': 2,
    '2025-01-25': 2,
    '2025-01-24': 2,
    '2025-01-23': 2,
    '2025-01-20': 3,
    '2025-01-19': 2,
    '2025-01-17': 3,
    '2025-01-16': 2,
    '2025-01-14': 3,
    '2025-01-08': 2,
    '2025-01-07': 1,
    '2025-01-05': 3,
    '2025-01-04': 1,
    '2025-01-03': 1,
    '2025-01-01': 2,
    '2024-12-30': 4,
    '2024-12-27': 3,
    '2024-12-26': 1,
    '2024-12-22': 3,
    '2024-12-20': 2,
    '2024-12-19': 3,
    '2024-12-16': 4,
    '2024-12-15': 1,
    '2024-12-14': 4,
    '2024-12-11': 2,
    '2024-12-09': 4,
    '2024-12-05': 4,
    '2024-12-04': 3,
    '2024-12-03': 2,
    '2024-12-01': 1,
    '2024-11-30': 3,
    '2024-11-29': 1,
    '2024-11-28': 1,
    '2024-11-26': 4,
    '2024-11-25': 3,
    '2024-11-24': 3,
    '2024-11-22': 4,
    '2024-11-20': 2,
    '2024-11-19': 3,
    '2024-11-16': 3,
    '2024-11-15': 1,
    '2024-11-14': 4,
    '2024-11-12': 1,
    '2024-11-11': 2,
    '2024-11-10': 1,
    '2024-11-09': 3,
    '2024-11-07': 1,
    '2024-11-06': 4,
    '2024-11-04': 1,
    '2024-11-03': 4,
    '2024-11-02': 4,
    '2024-10-31': 1,
    '2024-10-30': 1,
    '2024-10-28': 4,
    '2024-10-27': 2,
    '2024-10-26': 3,
    '2024-10-25': 4,
    '2024-10-23': 1,
    '2024-10-22': 1,
    '2024-10-21': 4,
    '2024-10-20': 3,
    '2024-10-15': 3,
    '2024-10-13': 4,
    '2024-10-10': 1,
    '2024-10-08': 1,
    '2024-10-07': 4,
    '2024-10-05': 1,
    '2024-10-04': 4,
    '2024-10-02': 2,
    '2024-10-01': 3,
    '2024-09-29': 4,
    '2024-09-27': 3,
    '2024-09-26': 4,
    '2024-09-25': 3,
    '2024-09-20': 4,
    '2024-09-18': 3,
    '2024-09-17': 1,
    '2024-09-14': 2,
    '2024-09-12': 3,
    '2024-09-10': 1,
    '2024-09-08': 1,
    '2024-09-06': 2,
    '2024-09-04': 4,
    '2024-08-31': 4,
    '2024-08-29': 3,
    '2024-08-26': 4,
    '2024-08-25': 1,
    '2024-08-23': 2,
    '2024-08-21': 4,
    '2024-08-19': 1,
    '2024-08-14': 4,
    '2024-08-13': 2,
    '2024-08-11': 4,
    '2024-08-09': 4,
    '2024-08-06': 4,
    '2024-08-05': 4,
    '2024-08-04': 1,
    '2024-08-02': 4,
    '2024-08-01': 4,
    '2024-07-31': 3,
    '2024-07-30': 2,
    '2024-07-29': 2,
    '2024-07-28': 1,
    '2024-07-27': 4,
    '2024-07-25': 2,
    '2024-07-22': 4,
    '2024-07-21': 1,
    '2024-07-19': 2,
    '2024-07-17': 2,
    '2024-07-16': 1,
    '2024-07-15': 4,
    '2024-07-14': 4,
    '2024-07-13': 2,
    '2024-07-12': 1,
    '2024-07-11': 3,
    '2024-07-10': 3,
    '2024-07-09': 4,
    '2024-07-08': 2,
    '2024-07-07': 2,
    '2024-07-06': 4,
    '2024-07-05': 3,
    '2024-07-03': 4,
    '2024-06-30': 4,
    '2024-06-26': 2,
    '2024-06-25': 1,
    '2024-06-24': 2,
    '2024-06-22': 3,
    '2024-06-19': 4,
    '2024-06-18': 2,
    '2024-06-17': 1,
    '2024-06-14': 4,
    '2024-06-13': 4,
    '2024-06-12': 1,
    '2024-06-11': 2,
    '2024-06-10': 1,
    '2024-06-08': 4,
    '2024-06-06': 2,
    '2024-06-04': 2,
    '2024-06-03': 1,
    '2024-06-01': 2,
    '2024-05-31': 1,
    '2024-05-30': 3,
    '2024-05-26': 4,
    '2024-05-23': 3,
    '2024-05-22': 1,
    '2024-05-21': 4,
    '2024-05-18': 4,
    '2024-05-16': 4,
    '2024-05-14': 2,
    '2024-05-10': 1,
    '2024-05-08': 3,
    '2024-05-07': 2,
    '2024-05-03': 2,
    '2024-05-02': 4,
    '2024-04-30': 3,
    '2024-04-29': 1,
    '2024-04-28': 4,
    '2024-04-26': 1,
    '2024-04-22': 1,
    '2024-04-21': 4,
    '2024-04-20': 2,
    '2024-04-19': 2,
    '2024-04-17': 1,
    '2024-04-16': 3,
    '2024-04-15': 4,
    '2024-04-14': 3,
    '2024-04-13': 4,
    '2024-04-12': 3,
    '2024-04-11': 2,
    '2024-04-10': 3,
    '2024-04-08': 4,
    '2024-04-05': 1,
    '2024-04-03': 4,
    '2024-03-31': 1,
    '2024-03-30': 2,
    '2024-03-29': 1,
    '2024-03-28': 1,
    '2024-03-27': 3,
    '2024-03-26': 1,
    '2024-03-24': 4,
    '2024-03-20': 1,
    '2024-03-19': 1,
    '2024-03-17': 1,
    '2024-03-14': 2,
    '2024-03-13': 3,
    '2024-03-12': 2,
    '2024-03-11': 1,
    '2024-03-09': 3,
    '2024-03-06': 1,
    '2024-03-03': 1,
    '2024-03-02': 2,
    '2024-03-01': 1,
    '2024-02-29': 2,
    '2024-02-28': 2,
    '2024-02-23': 3,
    '2024-02-22': 4,
    '2024-02-20': 4,
    '2024-02-19': 4,
    '2024-02-17': 3,
    '2024-02-16': 3,
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 18,
      }}
    >
      <Title order={3} mb="md">
        Dashboard
      </Title>
      <BarChart
        h={300}
        data={data}
        dataKey="month"
        getBarColor={(value) => (value > 700 ? 'teal.8' : 'red.8')}
        series={[{ name: 'Laptops', color: 'gray.6' }]}
      />
      <AreaChart
        h={300}
        data={data2}
        dataKey="date"
        series={[
          { name: 'Apples', color: 'indigo.6' },
          { name: 'Oranges', color: 'blue.6' },
          { name: 'Tomatoes', color: 'teal.6' },
        ]}
        curveType="linear"
      />
      <DonutChart
        withLabelsLine
        labelsType="percent"
        withLabels
        size={183}
        thickness={30}
        data={data3}
      />
      <PieChart
        withLabelsLine
        labelsPosition="outside"
        labelsType="percent"
        withLabels
        data={data4}
      />
      <FunnelChart labelsPosition="right" withLabels data={data5} />
      <RadarChart
        h={300}
        data={data6}
        dataKey="product"
        withPolarRadiusAxis
        withLegend
        series={[
          { name: 'Sales January', color: 'blue.6', opacity: 0.2 },
          { name: 'Sales February', color: 'orange.6', opacity: 0.2 },
        ]}
      />
      <Heatmap
        data={data7}
        startDate="2024-02-16"
        endDate="2025-02-16"
        withMonthLabels
        splitMonths
        withWeekdayLabels
        withTooltip
        firstDayOfWeek={0}
        weekdayLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
        getTooltipLabel={({ date, value }) => `${date} – ${value ?? 0} contributions`}
      />
    </div>
  );
}

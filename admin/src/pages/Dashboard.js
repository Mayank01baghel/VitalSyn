import React from 'react';
import EngagementChart from '../components/EngagementChart';

export default function Dashboard() {
  const mockData = [
    { date: '2026-07-01', users: 1200 },
    { date: '2026-07-02', users: 1500 },
    { date: '2026-07-03', users: 2100 },
    { date: '2026-07-04', users: 2400 },
    { date: '2026-07-05', users: 2800 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>VitalSync Admin Dashboard</h1>
      <div style={{ marginTop: '30px' }}>
        <h2>Daily Active Users</h2>
        <EngagementChart data={mockData} />
      </div>
    </div>
  );
}

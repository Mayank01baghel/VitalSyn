import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Target, Settings, LogOut, Shield, LineChart, Lightbulb, User } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem', padding: '0 1rem' }}>
          <img src="/logo.png" alt="VitalSync Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          <h2 style={{ fontSize: '1.5rem', background: 'linear-gradient(135deg, #22d3ee, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            VitalSync
          </h2>
        </div>
        
        <NavLink to="/dashboard" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/goals" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <Target size={20} />
          <span>Activity & Goals</span>
        </NavLink>
        
        <NavLink to="/trends" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <LineChart size={20} />
          <span>Health Trends</span>
        </NavLink>
        
        <NavLink to="/insights" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <Lightbulb size={20} />
          <span>Insights & Alerts</span>
        </NavLink>

        <NavLink to="/profile" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
          <User size={20} />
          <span>Profile</span>
        </NavLink>
        
        <div style={{ flex: 1 }} />
        
        <button onClick={handleLogout} className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit', fontSize: '1rem', marginTop: 'auto' }}>
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

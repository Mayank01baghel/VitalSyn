import React, { useState } from 'react';
import KPICard from '../../components/admin/KPICard';
import AlertRow from '../../components/admin/AlertRow';

export default function AdminOverview() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <>
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Admin Overview</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">System status and user activity dashboard.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container active:scale-95"
            title="Refresh Data"
          >
            <span className={`material-symbols-outlined ${isRefreshing ? 'animate-spin' : ''}`}>refresh</span>
          </button>
          <div className="flex items-center bg-surface-container border border-outline-variant rounded-lg p-1">
            <button className="px-3 py-1.5 rounded-md font-body-sm text-body-sm text-on-surface bg-surface-variant shadow-sm transition-colors">30 Days</button>
            <button className="px-3 py-1.5 rounded-md font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">90 Days</button>
            <button className="px-3 py-1.5 rounded-md font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">YTD</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg font-body-sm text-body-sm font-semibold hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            Custom Date
          </button>
        </div>
      </div>

      {/* 2. Top Row: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {/* KPI 1: Total Active Users */}
        <KPICard 
          title="Total Active Users" 
          value="1.24M" 
          icon="groups" 
          colorClass="text-primary" 
          bgClass="bg-primary/10"
          trend="up"
          trendValue="+5.2%"
          trendColor="text-teal"
          trendBg="bg-teal/10"
        >
          <div className="w-full h-1 bg-surface-variant rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-primary w-[75%] rounded-full"></div>
          </div>
        </KPICard>

        {/* KPI 2: Total Wearable Syncs */}
        <KPICard 
          title="Daily Wearable Syncs" 
          value="8.4M" 
          icon="watch" 
          colorClass="text-tertiary" 
          bgClass="bg-tertiary/10"
        >
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div><span>Apple (45%)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-tertiary"></div><span>Fitbit (35%)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-outline-variant"></div><span>Other (20%)</span></div>
          </div>
          <div className="w-full flex h-1.5 rounded-full mt-2 overflow-hidden gap-0.5">
            <div className="h-full bg-primary w-[45%]"></div>
            <div className="h-full bg-tertiary w-[35%]"></div>
            <div className="h-full bg-outline-variant w-[20%]"></div>
          </div>
        </KPICard>

        {/* KPI 3: System Health */}
        <KPICard 
          title="System Uptime" 
          value="99.9%" 
          icon="monitor_heart" 
          colorClass="text-teal" 
          bgClass="bg-teal/10"
          subtitle="Optimal"
        >
          <div className="h-8 mt-2 flex items-end gap-1 opacity-70">
            <div className="w-full bg-teal/40 h-full rounded-sm"></div>
            <div className="w-full bg-teal/50 h-5/6 rounded-sm"></div>
            <div className="w-full bg-teal/80 h-full rounded-sm"></div>
            <div className="w-full bg-teal h-full rounded-sm"></div>
            <div className="w-full bg-teal/60 h-4/5 rounded-sm"></div>
            <div className="w-full bg-teal h-full rounded-sm"></div>
          </div>
        </KPICard>

        {/* KPI 4: App Performance */}
        <KPICard 
          title="Avg API Latency" 
          value="124ms" 
          icon="speed" 
          colorClass="text-secondary" 
          bgClass="bg-secondary/10"
          trend="up"
          trendValue="+12ms"
          trendColor="text-coral"
          trendBg="bg-coral/10"
          subtitle="Trailing 24 hours performance."
        />
      </div>

      {/* 3. Middle Row: Main Chart area */}
      <div className="admin-glass-panel p-6 mb-4 min-h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-title-sm text-title-sm text-on-surface">User Engagement & Data Sync Volume</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">30-day trailing volume aggregation</p>
          </div>
          <div className="flex items-center gap-4 font-body-sm text-body-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary"></div><span className="text-on-surface-variant">Sync Volume</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-tertiary"></div><span className="text-on-surface-variant">Active Sessions</span></div>
            <button className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-md transition-colors"><span className="material-symbols-outlined text-sm">more_vert</span></button>
          </div>
        </div>
        
        {/* Abstract Representation of Chart Area */}
        <div className="flex-1 relative w-full rounded-lg bg-surface-container-low border border-outline-variant overflow-hidden flex items-end px-4 pt-8 pb-4">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-20">
            <div className="w-full border-t border-outline"></div>
            <div className="w-full border-t border-outline"></div>
            <div className="w-full border-t border-outline"></div>
            <div className="w-full border-t border-outline"></div>
            <div className="w-full border-t border-outline"></div>
          </div>
          {/* Decorative Chart Elements */}
          <div className="w-full h-full relative z-10 flex items-end justify-between gap-1 sm:gap-2">
            <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm h-[30%] relative group"><div className="absolute bottom-full mb-2 hidden group-hover:block bg-surface-highest text-xs p-1 rounded">Vol: 2.1M</div></div>
            <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm h-[45%]"></div>
            <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm h-[35%]"></div>
            <div className="w-full bg-primary/30 hover:bg-primary/50 transition-colors rounded-t-sm h-[50%]"></div>
            <div className="w-full bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-sm h-[70%]"></div>
            <div className="w-full bg-primary/30 hover:bg-primary/50 transition-colors rounded-t-sm h-[60%]"></div>
            <div className="w-full bg-primary/50 hover:bg-primary/70 transition-colors rounded-t-sm h-[85%] border-t-2 border-primary"></div>
            <div className="w-full bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-sm h-[75%]"></div>
            <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm h-[40%]"></div>
            <div className="w-full bg-primary/30 hover:bg-primary/50 transition-colors rounded-t-sm h-[55%]"></div>
            <div className="w-full bg-primary/40 hover:bg-primary/60 transition-colors rounded-t-sm h-[65%]"></div>
            <div className="w-full bg-primary/60 hover:bg-primary/80 transition-colors rounded-t-sm h-[95%] border-t-2 border-primary"></div>
            
            <svg className="absolute inset-0 w-full h-full preserve-3d pointer-events-none" preserveAspectRatio="none">
              <path className="vector-effect-non-scaling-stroke" d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,30 T100,40 T120,20" fill="none" stroke="#44dfab" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent System Alerts */}
        <div className="lg:col-span-2 admin-glass-panel flex flex-col overflow-hidden">
          <div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="font-title-sm text-title-sm text-on-surface">Recent System Alerts</h3>
            <a className="font-body-sm text-body-sm text-primary hover:underline" href="#alerts">View All</a>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <AlertRow 
              type="warning" 
              title="Fitbit API Latency Increase" 
              time="10:42 AM" 
              description="Response times from Fitbit OAuth endpoints have exceeded 500ms threshold for 5 consecutive minutes." 
            />
            <AlertRow 
              type="info" 
              title="New Core Version Deployed" 
              time="08:00 AM" 
              description="v2.4.1 successfully deployed to US-East production cluster. Zero downtime reported." 
            />
            <AlertRow 
              type="success" 
              title="Database Indexing Completed" 
              time="Yesterday" 
              description="Routine optimization on primary User Data table finished. Query performance improved by ~12%." 
            />
          </div>
        </div>

        {/* Security Tracking */}
        <div className="admin-glass-panel flex flex-col overflow-hidden">
          <div className="p-5 border-b border-outline-variant bg-surface-container-low">
            <h3 className="font-title-sm text-title-sm text-on-surface">Security Tracking</h3>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="space-y-4 mt-2">
              <SecurityRow label="Active Admin Sessions" value="2" icon="admin_panel_settings" colorClass="text-teal" />
              <SecurityRow label="Failed Login Attempts" value="14" icon="gpp_bad" colorClass="text-coral" />
              <SecurityRow label="Blocked IP Addresses" value="8" icon="block" colorClass="text-error" />
              <SecurityRow label="Security Alerts (24h)" value="0" icon="security" colorClass="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SecurityRow({ label, value, icon, colorClass }) {
  return (
    <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant">
      <div className="flex items-center gap-3">
        <span className={`material-symbols-outlined ${colorClass}`}>{icon}</span>
        <span className="font-body-md text-on-surface">{label}</span>
      </div>
      <span className="font-mono-data text-on-surface font-bold text-lg">{value}</span>
    </div>
  );
}

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ADMIN_AUDIT_LOGS = gql`
  query GetAdminAuditLogs {
    adminAuditLogs {
      id
      admin
      action
      ip
      time
      severity
    }
  }
`;

export default function AdminAuditLogs() {
  const { data, loading, error } = useQuery(GET_ADMIN_AUDIT_LOGS);

  if (loading) return <div className="p-8 text-on-surface">Loading logs...</div>;
  if (error) return <div className="p-8 text-error">Error loading logs.</div>;

  const logs = data?.adminAuditLogs || [];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Audit Logs</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Security tracking for administrator actions and system events.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="bg-surface-container border border-outline-variant rounded-full py-2 pl-10 pr-4 text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all" 
              placeholder="Search logs..." 
              type="text" 
            />
          </div>
        </div>
      </div>

      <div className="admin-glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container/50">
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Log ID</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Admin / IP</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Action Performed</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Timestamp</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors font-mono-data">
                  <td className="p-4 text-on-surface-variant">{log.id}</td>
                  <td className="p-4">
                    <div className="text-on-surface font-body-sm">{log.admin}</div>
                    <div className="text-on-surface-variant text-xs">{log.ip}</div>
                  </td>
                  <td className="p-4 text-on-surface font-body-sm">{log.action}</td>
                  <td className="p-4 text-on-surface-variant text-sm">{log.time}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      log.severity === 'High' ? 'bg-coral/20 text-coral border border-coral/30' :
                      log.severity === 'Medium' ? 'bg-secondary/20 text-secondary border border-secondary/30' :
                      'bg-surface-variant text-on-surface-variant border border-outline-variant'
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_ADMIN_NOTIFICATIONS = gql`
  query GetAdminNotifications {
    adminNotifications {
      id
      type
      message
      time
      status
    }
  }
`;

const SEND_NOTIFICATION = gql`
  mutation SendNotification($audience: String!, $title: String!, $message: String!) {
    sendNotification(audience: $audience, title: $title, message: $message) {
      id
      status
    }
  }
`;

export default function AdminNotifications() {
  const { data, loading, error, refetch } = useQuery(GET_ADMIN_NOTIFICATIONS);
  const [sendNotification] = useMutation(SEND_NOTIFICATION);
  const [audience, setAudience] = useState('All Users');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  if (loading) return <div className="p-8 text-on-surface">Loading notifications...</div>;
  if (error) return <div className="p-8 text-error">Error loading notifications.</div>;

  const alerts = data?.adminNotifications || [];

  const handleSend = async (e) => {
    e.preventDefault();
    if (!title || !message) return;
    try {
      await sendNotification({ variables: { audience, title, message } });
      setTitle('');
      setMessage('');
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Notifications & Alerts</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Send push notifications and monitor system alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Send Push Notification Panel */}
        <div className="admin-glass-panel p-6 flex flex-col h-full">
          <h3 className="font-title-lg text-on-surface mb-6 border-b border-outline-variant pb-2">Send Push Notification</h3>
          <form onSubmit={handleSend} className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface-variant">Target Audience</label>
              <select 
                value={audience} 
                onChange={(e) => setAudience(e.target.value)}
                className="bg-surface-container border border-outline-variant rounded-lg p-2 text-on-surface outline-none focus:border-primary"
              >
                <option>All Users</option>
                <option>Active Subscribers</option>
                <option>Specific User (by Email)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-on-surface-variant">Notification Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..." 
                className="bg-surface-container border border-outline-variant rounded-lg p-2 text-on-surface outline-none focus:border-primary" 
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="font-label-md text-on-surface-variant">Message Body</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..." 
                className="bg-surface-container border border-outline-variant rounded-lg p-2 text-on-surface outline-none focus:border-primary flex-1 resize-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full py-3 mt-2 bg-primary text-on-primary font-title-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-sm">send</span>
              Send Notification
            </button>
          </form>
        </div>

        {/* Automated Alerts Panel */}
        <div className="admin-glass-panel flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-outline-variant">
            <h3 className="font-title-lg text-on-surface">Automated Alerts</h3>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="p-4 border border-outline-variant bg-surface-container rounded-lg flex items-start gap-4">
                <div className={`p-2 rounded-full flex-shrink-0 ${alert.type === 'System Alert' ? 'bg-coral/20 text-coral' : 'bg-secondary/20 text-secondary'}`}>
                  <span className="material-symbols-outlined text-sm">
                    {alert.type === 'System Alert' ? 'warning' : 'support_agent'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-title-sm text-on-surface">{alert.type}</span>
                    <span className="font-body-sm text-on-surface-variant text-xs">{alert.time}</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-2">{alert.message}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${alert.status === 'Active' ? 'bg-coral/10 text-coral' : 'bg-teal/10 text-teal'}`}>
                    {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_ADMIN_CONTENT = gql`
  query GetAdminContent {
    adminContentList {
      id
      user
      type
      content
      status
      date
    }
  }
`;

const MODERATE_CONTENT = gql`
  mutation ModerateContent($id: ID!, $status: String!) {
    moderateContent(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default function AdminContent() {
  const { data, loading, error } = useQuery(GET_ADMIN_CONTENT);
  const [moderateContent] = useMutation(MODERATE_CONTENT);

  if (loading) return <div className="p-8 text-on-surface">Loading content...</div>;
  if (error) return <div className="p-8 text-error">Error loading content.</div>;

  const contentList = data?.adminContentList || [];

  const handleModerate = async (item, newStatus) => {
    try {
      await moderateContent({ variables: { id: item.id, status: newStatus } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">Content Moderation</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Approve, edit, or delete user-generated content.</p>
        </div>
      </div>

      <div className="admin-glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex gap-2 bg-surface-container-low">
          <button className="px-4 py-1.5 rounded-md font-body-sm bg-primary/20 text-primary font-semibold">Pending (1)</button>
          <button className="px-4 py-1.5 rounded-md font-body-sm text-on-surface-variant hover:bg-surface-container transition-colors">Flagged (1)</button>
          <button className="px-4 py-1.5 rounded-md font-body-sm text-on-surface-variant hover:bg-surface-container transition-colors">All Content</button>
        </div>
        
        <div className="flex-1 overflow-x-auto p-4 space-y-4">
          {contentList.map(item => (
            <div key={item.id} className="p-4 rounded-xl border border-outline-variant bg-surface-container flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="font-label-lg font-bold text-on-surface">{item.user}</span>
                  <span className="text-on-surface-variant font-body-sm">• {item.type}</span>
                  <span className="text-on-surface-variant font-body-sm">• {item.date}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  item.status === 'Pending Approval' ? 'bg-secondary/20 text-secondary' :
                  item.status === 'Approved' ? 'bg-teal/20 text-teal' : 'bg-coral/20 text-coral'
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant">"{item.content}"</p>
              <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-outline-variant/50">
                {item.status !== 'Approved' && (
                  <button 
                    onClick={() => handleModerate(item, 'Approved')}
                    className="px-3 py-1.5 rounded-md bg-teal/10 text-teal hover:bg-teal/20 font-label-md transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">check</span> Approve
                  </button>
                )}
                <button 
                  onClick={() => handleModerate(item, 'Flagged')}
                  className="px-3 py-1.5 rounded-md text-error hover:bg-error/10 font-label-md transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">flag</span> Flag
                </button>
                <button 
                  onClick={() => handleModerate(item, 'Deleted')}
                  className="px-3 py-1.5 rounded-md text-error hover:bg-error/10 font-label-md transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">delete</span> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

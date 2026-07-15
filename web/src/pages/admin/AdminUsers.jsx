import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_ADMIN_USERS = gql`
  query GetAdminUsers {
    adminUsers {
      id
      name
      email
      role
      status
      joined
    }
  }
`;

const UPDATE_USER_STATUS = gql`
  mutation UpdateAdminUserStatus($id: ID!, $status: String!) {
    updateAdminUserStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export default function AdminUsers() {
  const { data, loading, error } = useQuery(GET_ADMIN_USERS);
  const [updateStatus] = useMutation(UPDATE_USER_STATUS);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) return <div className="p-8 text-on-surface">Loading users...</div>;
  if (error) return <div className="p-8 text-error">Error loading users.</div>;

  const users = data?.adminUsers || [];
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleBan = async (user) => {
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    try {
      await updateStatus({ variables: { id: user.id, status: newStatus } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">User Management</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage user accounts and roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-body-sm font-semibold hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined text-sm">person_add</span>
            Add User
          </button>
        </div>
      </div>

      <div className="admin-glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
          <div className="relative group w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="bg-surface-container border border-outline-variant rounded-full py-2 pl-10 pr-4 text-body-sm font-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
              placeholder="Search users by name, email, or role..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container/50">
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">User</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Role</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Status</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold">Joined Date</th>
                <th className="p-4 font-label-lg text-on-surface-variant font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-on-surface-variant font-body-md">
                    No users found matching "{searchQuery}"
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-body-md text-on-surface font-semibold">{user.name}</div>
                        <div className="font-body-sm text-on-surface-variant">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-variant text-on-surface">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-teal/20 text-teal' : 'bg-error/20 text-error'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 font-body-sm text-on-surface-variant">{user.joined}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors rounded-md hover:bg-surface-container" title="Edit Role">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button 
                        onClick={() => handleToggleBan(user)}
                        className="p-1.5 text-on-surface-variant hover:text-error transition-colors rounded-md hover:bg-surface-container" 
                        title={user.status === 'Active' ? 'Suspend User' : 'Unsuspend User'}
                      >
                        <span className="material-symbols-outlined text-sm">{user.status === 'Active' ? 'block' : 'check_circle'}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

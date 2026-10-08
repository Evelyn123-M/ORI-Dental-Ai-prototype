import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Shield,
  Key,
  Smartphone,
  Lock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Sliders,
  X,
  Edit2
} from 'lucide-react';
import { UserProfile, Role } from '../../types';
import { DOCTORS_AND_STAFF, SYSTEM_MODULES } from '../../data/mockData';

interface UserAccessModuleProps {
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
}

export const UserAccessModule: React.FC<UserAccessModuleProps> = ({
  currentUser,
  onSwitchUser,
  showToast,
}) => {
  const [users, setUsers] = useState<UserProfile[]>(DOCTORS_AND_STAFF);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<UserProfile | null>(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<Role>('dentist');
  const [newUserTitle, setNewUserTitle] = useState('Dental Specialist');

  // RBAC Permission Matrix State (role -> array of permitted module IDs)
  const [permissions, setPermissions] = useState<Record<Role, string[]>>({
    dentist: SYSTEM_MODULES.map(m => m.id), // dentists can access all clinical modules
    staff: ['dashboard', 'patients', 'assessments', 'symptoms', 'xrays', 'clinical-history'],
    admin: SYSTEM_MODULES.map(m => m.id), // admin can access all
  });

  const togglePermission = (role: Role, moduleId: string) => {
    setPermissions(prev => {
      const currentList = prev[role] || [];
      const hasPerm = currentList.includes(moduleId);
      const updated = hasPerm
        ? currentList.filter(id => id !== moduleId)
        : [...currentList, moduleId];
      return { ...prev, [role]: updated };
    });
    showToast('Permissions Updated', `Access rule modified for role: ${role}.`, 'info');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      roleTitle: newUserTitle,
      avatar: '/src/assets/images/dentist_doctor_portrait_1791468886254.jpg',
      lastActive: 'Just invited',
      status: 'active',
    };

    setUsers([...users, newUser]);
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    showToast('Clinician Provisioned', `${newUser.name} added to practice directory.`, 'success');
  };

  const handleDeactivate = (userId: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    );
    showToast('Status Toggled', 'Account status modified in directory.', 'warning');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-[24px] border border-[#E6EAEC] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#0F1A1F]">User &amp; Access Governance</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0]">
              RBAC Matrix
            </span>
          </div>
          <p className="text-xs text-[#8F9AA0] mt-0.5">
            Manage practice staff, medical licenses, active device sessions, and role boundaries
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-xs font-semibold text-[#0F1A1F] border border-[#E6EAEC] transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-[#8F9AA0]" />
            <span>Reset Password</span>
          </button>

          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#22A6C0] hover:bg-[#1B899F] text-xs font-semibold text-white shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Clinical User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
          <h3 className="font-bold text-base text-[#0F1A1F]">Registered Staff Accounts ({users.length})</h3>
          <span className="text-xs text-[#8F9AA0]">Practice: ORI Dental Clinic</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EAEC] text-[#8F9AA0] uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Email Address</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Last Active</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F3F5]">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-[#F5F7F8]">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div>
                        <p className="font-bold text-[#0F1A1F]">{u.name}</p>
                        <p className="text-[10px] text-[#8F9AA0]">{u.roleTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-[#E3F4F8] text-[#22A6C0] uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#8F9AA0]">{u.email}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'active'
                          ? 'bg-emerald-100 text-[#1F9D74]'
                          : 'bg-red-100 text-[#D9534F]'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#8F9AA0] font-mono">{u.lastActive}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSwitchUser(u)}
                        className="text-xs font-semibold text-[#22A6C0] hover:underline"
                      >
                        Switch Role
                      </button>
                      <button
                        onClick={() => handleDeactivate(u.id)}
                        className="text-xs text-[#8F9AA0] hover:text-[#D9534F]"
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Matrix (Roles × Modules Checkboxes) */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5]">
          <div>
            <h3 className="font-bold text-base text-[#0F1A1F]">Role-Based Access Control (RBAC) Matrix</h3>
            <p className="text-xs text-[#8F9AA0] mt-0.5">Toggle authorized modules per clinical credential level</p>
          </div>
          <span className="text-xs font-bold text-[#22A6C0] bg-[#E3F4F8] px-3 py-1 rounded-full">
            Enforced at API Gateway
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6EAEC] text-[#8F9AA0] uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Clinical Module</th>
                <th className="py-2.5 px-3 text-center">Dentist (Licensed)</th>
                <th className="py-2.5 px-3 text-center">Clinic Staff (Triage)</th>
                <th className="py-2.5 px-3 text-center">Administrator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F3F5]">
              {SYSTEM_MODULES.map(mod => (
                <tr key={mod.id} className="hover:bg-[#F5F7F8]">
                  <td className="py-2.5 px-3 font-semibold text-[#0F1A1F]">
                    {mod.name}
                    <span className="block text-[10px] text-[#8F9AA0] font-normal">{mod.desc}</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions.dentist.includes(mod.id)}
                      onChange={() => togglePermission('dentist', mod.id)}
                      className="rounded text-[#22A6C0] focus:ring-[#22A6C0] cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions.staff.includes(mod.id)}
                      onChange={() => togglePermission('staff', mod.id)}
                      className="rounded text-[#22A6C0] focus:ring-[#22A6C0] cursor-pointer"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={permissions.admin.includes(mod.id)}
                      onChange={() => togglePermission('admin', mod.id)}
                      className="rounded text-[#22A6C0] focus:ring-[#22A6C0] cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Device Session Panel */}
      <div className="bg-white rounded-[24px] p-6 border border-[#E6EAEC] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#0F1A1F]">Active Device Sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] text-[#22A6C0] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-[#0F1A1F]">Chairside Dental iPad Pro · Clinic Room 1</p>
                <p className="text-[11px] text-[#8F9AA0]">IP: 197.243.22.84 · Kigali, Masaka</p>
                <span className="text-[10px] text-[#1F9D74] font-medium">● Current active session</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#8F9AA0]">Live</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F7F8] border border-[#E6EAEC] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1] text-[#8F9AA0] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-[#0F1A1F]">Radiology Workstation PC · Windows 11</p>
                <p className="text-[11px] text-[#8F9AA0]">Claire Uwera · Active 15 mins ago</p>
              </div>
            </div>
            <button
              onClick={() => showToast('Session Terminated', 'Remote workstation logged out.', 'info')}
              className="text-xs text-[#D9534F] hover:underline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F3F5] mb-4">
              <h3 className="font-bold text-base text-[#0F1A1F]">Add Clinical Staff Member</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-[#8F9AA0] hover:text-[#0F1A1F]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="e.g. Dr. Eric Habimana"
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">Practice Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  placeholder="name@oridental.rw"
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={e => setNewUserRole(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  >
                    <option value="dentist">Dentist</option>
                    <option value="staff">Clinic Staff</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#0F1A1F] mb-1">Title</label>
                  <input
                    type="text"
                    value={newUserTitle}
                    onChange={e => setNewUserTitle(e.target.value)}
                    placeholder="e.g. Associate Dentist"
                    className="w-full px-3 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#22A6C0] text-white rounded-full font-semibold"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] max-w-md w-full p-6 shadow-2xl border border-[#E6EAEC]">
            <h3 className="font-bold text-base text-[#0F1A1F] mb-2">Change Password for {currentUser.name}</h3>
            <p className="text-xs text-[#8F9AA0] mb-4">
              Enter a strong password with at least 8 characters, numbers, and symbols.
            </p>
            <form
              onSubmit={e => {
                e.preventDefault();
                setIsPasswordModalOpen(false);
                showToast('Password Changed', 'Credentials updated successfully.', 'success');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-[#0F1A1F] mb-1">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 bg-[#F5F7F8] rounded-full border border-[#E6EAEC] outline-none"
                />
              </div>
              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-[#8F9AA0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#22A6C0] text-white rounded-full font-semibold"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

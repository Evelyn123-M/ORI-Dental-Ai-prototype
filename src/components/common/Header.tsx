import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, ExternalLink, Shield, LogOut, Key, User, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { UserProfile } from '../../types';

interface HeaderProps {
  currentUser: UserProfile;
  onOpenSearch: () => void;
  onToggleSidebar: () => void;
  onLogout: () => void;
  onSwitchUser: (user: UserProfile) => void;
  availableUsers: UserProfile[];
  onNavigateToLanding: () => void;
  onOpenPasswordModal: () => void;
  onOpenProfileModal: () => void;
  pendingReviewsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenSearch,
  onToggleSidebar,
  onLogout,
  onSwitchUser,
  availableUsers,
  onNavigateToLanding,
  onOpenPasswordModal,
  onOpenProfileModal,
  pendingReviewsCount,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'New Clinical Case Queued for Review',
      desc: 'Aline Niyonsaba (Tooth #19 Pulpitis & Caries) requires Dr. Diane signature',
      time: '12 min ago',
      unread: true,
      icon: Clock,
      color: 'text-[#22A6C0]'
    },
    {
      id: 2,
      title: 'AI X-Ray Inference Completed',
      desc: 'Panoramic OPG for Kevin Mugisha analyzed with 89.1% mean confidence',
      time: '45 min ago',
      unread: true,
      icon: CheckCircle2,
      color: 'text-[#1F9D74]'
    },
    {
      id: 3,
      title: 'System Security Health Check',
      desc: 'Automated HIPAA/GDPR clinical audit backup completed successfully',
      time: '2 hours ago',
      unread: false,
      icon: AlertCircle,
      color: 'text-[#8F9AA0]'
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E6EAEC] px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Titles */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-[#0F1A1F] hover:bg-[#F5F7F8] transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-[#0F1A1F] tracking-tight truncate">
              AI-Powered Dental Diagnosis &amp; Treatment Planning Platform
            </h1>
            <p className="text-xs text-[#8F9AA0] hidden sm:block truncate">
              Intelligent Dental Assessment, X-Ray Analysis &amp; Treatment Planning Support Platform · ORI Dental Clinic, Kigali
            </p>
          </div>
        </div>

        {/* Right: Search, Notifications, Quick Switcher, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Global Search Button (⌘K) */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F7F8] hover:bg-[#EAEFF2] text-[#8F9AA0] hover:text-[#0F1A1F] text-xs font-medium border border-[#E6EAEC] transition-all group"
            title="Search patients, X-rays, findings (⌘K)"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-[#22A6C0] transition-colors" />
            <span className="hidden md:inline">Search records...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white rounded border border-[#CBD5E1] text-[#8F9AA0] shadow-2xs font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Public Landing Link */}
          <button
            onClick={onNavigateToLanding}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#22A6C0] hover:bg-[#E3F4F8] transition-colors"
          >
            <span>Landing Page</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-[#0F1A1F] hover:bg-[#F5F7F8] border border-transparent hover:border-[#E6EAEC] transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {pendingReviewsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#22A6C0] ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-[20px] shadow-xl border border-[#E6EAEC] p-3 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#F0F3F5] px-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#0F1A1F]">Notifications</span>
                    <span className="bg-[#E3F4F8] text-[#22A6C0] font-mono px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {pendingReviewsCount} action items
                    </span>
                  </div>
                  <span className="text-[11px] text-[#8F9AA0]">Live Clinical Alerts</span>
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl transition-colors cursor-pointer flex gap-3 ${
                        n.unread ? 'bg-[#F5F7F8] hover:bg-[#EAEFF2]' : 'hover:bg-[#F5F7F8]'
                      }`}
                    >
                      <n.icon className={`w-4 h-4 shrink-0 mt-0.5 ${n.color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[#0F1A1F] leading-tight">{n.title}</p>
                        <p className="text-[#8F9AA0] text-[11px] mt-0.5 line-clamp-2">{n.desc}</p>
                        <span className="text-[10px] text-[#8F9AA0] font-mono mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pl-2 sm:pr-3 rounded-full hover:bg-[#F5F7F8] border border-[#E6EAEC] transition-all"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-[#0F1A1F] leading-none">{currentUser.name}</p>
                <p className="text-[10px] text-[#8F9AA0] mt-0.5 font-medium">{currentUser.roleTitle}</p>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#22A6C0]/30"
                onError={(e) => {
                  // Fallback avatar
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80';
                }}
              />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-[22px] shadow-2xl border border-[#E6EAEC] p-3 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-2 border-b border-[#F0F3F5] mb-2">
                  <p className="font-bold text-sm text-[#0F1A1F]">{currentUser.name}</p>
                  <p className="text-xs text-[#8F9AA0]">{currentUser.email}</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#E3F4F8] text-[#22A6C0]">
                      {currentUser.role}
                    </span>
                    <span className="text-[11px] text-[#8F9AA0]">{currentUser.specialty}</span>
                  </div>
                </div>

                {/* Quick Role Switcher for Demo */}
                <div className="px-2 py-1.5 mb-2 bg-[#F5F7F8] rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-[#8F9AA0] tracking-wider block mb-1.5">
                    Switch Active User Role:
                  </span>
                  <div className="space-y-1">
                    {availableUsers.map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          onSwitchUser(u);
                          setShowUserMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-1.5 rounded-lg text-left transition-colors ${
                          u.id === currentUser.id
                            ? 'bg-white shadow-2xs font-semibold text-[#0F1A1F]'
                            : 'text-[#8F9AA0] hover:text-[#0F1A1F] hover:bg-white/60'
                        }`}
                      >
                        <span className="truncate">{u.name} ({u.role})</span>
                        {u.id === currentUser.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22A6C0]"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenProfileModal();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-[#0F1A1F] hover:bg-[#F5F7F8] transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#8F9AA0]" />
                    <span>My Clinical Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenPasswordModal();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-[#0F1A1F] hover:bg-[#F5F7F8] transition-colors"
                  >
                    <Key className="w-3.5 h-3.5 text-[#8F9AA0]" />
                    <span>Change Password</span>
                  </button>

                  <div className="border-t border-[#F0F3F5] my-1" />

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-[#D9534F] hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Session</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

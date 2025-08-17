/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from '@nextui-org/react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { startTransition, useRef } from 'react';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef<HTMLElement>(null);

  useOnClickOutside(sidebarRef, () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    startTransition(() => {
      navigate('/');
    });
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: 'mdi:view-dashboard',
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Contacts',
      href: '/dashboard/contacts',
      icon: 'mdi:account-group',
      current: location.pathname === '/dashboard/contacts',
    },
    {
      name: 'Campaigns',
      href: '/dashboard/campaigns',
      icon: 'mdi:bullhorn',
      current: location.pathname === '/dashboard/campaigns',
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'mdi:chart-line',
      current: location.pathname === '/dashboard/analytics',
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: 'mdi:cog',
      current: location.pathname === '/dashboard/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          isIconOnly
          variant="light"
          onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg border border-slate-200"
        >
          <Icon
            icon={isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'}
            className="w-6 h-6"
          />
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            ref={sidebarRef}
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`fixed left-0 top-0 z-40 h-full w-64 bg-white shadow-xl border-r border-slate-200 lg:translate-x-0 ${
              isMobileMenuOpen ? 'translate-x-0' : 'lg:translate-x-0'
            }`}
          >
            {/* Logo */}
            <div className="p-6 border-b border-slate-200">
              <Link
                to="/"
                className="flex items-center gap-3 text-slate-900 no-underline"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Icon icon="mdi:broadcast" className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  Project Broadcast
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon icon={item.icon} className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Profile */}
            <div className="absolute bottom-6 left-4 right-4">
              <Dropdown
                isOpen={isProfileDropdownOpen}
                onOpenChange={setIsProfileDropdownOpen}
              >
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className="w-full justify-start p-3 h-auto bg-slate-50 hover:bg-slate-100"
                  >
                    <Avatar name="John Doe" size="sm" className="mr-3" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-slate-900">
                        John Doe
                      </div>
                      <div className="text-xs text-slate-500">
                        john@example.com
                      </div>
                    </div>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile actions">
                  <DropdownItem key="profile">Profile</DropdownItem>
                  <DropdownItem key="settings">Settings</DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isMobileMenuOpen ? 'lg:ml-64' : ''
        }`}
      >
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">
                {navigationItems.find((item) => item.current)?.name ||
                  'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button
                variant="light"
                size="sm"
                isIconOnly
                className="text-slate-600"
              >
                <Icon icon="mdi:bell" className="w-5 h-5" />
              </Button>

              {/* Help */}
              <Button
                variant="bordered"
                size="sm"
                startContent={
                  <Icon icon="mdi:help-circle" className="w-4 h-4" />
                }
                className="border-slate-300 text-slate-700"
                onClick={() => startTransition(() => navigate('/docs'))}
              >
                Help
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

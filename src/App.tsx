import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/shared/scroll_to_top';
import { motion, useScroll } from 'framer-motion';
import MainLayout from './layout/main_layout';
import DashboardLayout from './layout/dashboard_layout';
import NotFound from './components/shared/not_found';

const Home = lazy(() => import('./pages/home'));
const Signup = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));
const Docs = lazy(() => import('./pages/docs'));
const Pricing = lazy(() => import('./pages/pricing'));
const Support = lazy(() => import('./pages/support'));

// Dashboard pages
const Dashboard = lazy(() => import('./pages/dashboard'));
const Contacts = lazy(() => import('./pages/dashboard/contacts'));
const Campaigns = lazy(() => import('./pages/dashboard/campaigns'));
const Analytics = lazy(() => import('./pages/dashboard/analytics'));
const Settings = lazy(() => import('./pages/dashboard/settings'));

// Loading component for dashboard
const DashboardLoading = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-slate-600">Loading dashboard...</p>
    </div>
  </div>
);

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="bg-white h-full w-full text-base font-roboto">
      <div>
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
        />

        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="docs" element={<Docs />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<DashboardLoading />}>
                <DashboardLayout />
              </Suspense>
            }
          >
            <Route
              path=""
              element={
                <Suspense fallback={<DashboardLoading />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="contacts"
              element={
                <Suspense fallback={<DashboardLoading />}>
                  <Contacts />
                </Suspense>
              }
            />
            <Route
              path="campaigns"
              element={
                <Suspense fallback={<DashboardLoading />}>
                  <Campaigns />
                </Suspense>
              }
            />
            <Route
              path="analytics"
              element={
                <Suspense fallback={<DashboardLoading />}>
                  <Analytics />
                </Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <Suspense fallback={<DashboardLoading />}>
                  <Settings />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}

export default App;

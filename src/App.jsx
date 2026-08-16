import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import QuickConnectWidget from './components/QuickConnectWidget';
import OnboardingTour from './components/OnboardingTour';
import Home from './pages/Home';
import Vision from './pages/Vision';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobsPage from './pages/JobsPage';
import NewJobPage from './pages/NewJobPage';
import AuditLogPage from './pages/AuditLogPage';
import SettingsPage from './pages/SettingsPage';
import LiveOrchestrationPage from './pages/LiveOrchestrationPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PlatformWidgets() {
  const { pathname } = useLocation();
  const isPlatform = ['/dashboard', '/jobs', '/new-job', '/audit-log', '/settings', '/orchestrate'].includes(pathname);
  if (!isPlatform) return null;
  return (
    <>
      <QuickConnectWidget />
      <OnboardingTour />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="min-h-[calc(100vh-220px)]">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/vision"    element={<Vision />} />
            <Route path="/about"     element={<About />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/login"     element={<Login />} />

            {/* Platform Space Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs"      element={<JobsPage />} />
            <Route path="/new-job"   element={<NewJobPage />} />
            <Route path="/audit-log" element={<AuditLogPage />} />
            <Route path="/settings"  element={<SettingsPage />} />
            <Route path="/orchestrate" element={<LiveOrchestrationPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Global floating widgets */}
        <ThemeToggle />
        <PlatformWidgets />
      </BrowserRouter>
    </ThemeProvider>
  );
}

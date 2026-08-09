import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="min-h-[calc(100vh-220px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          
          {/* Platform Space Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/new-job" element={<NewJobPage />} />
          <Route path="/audit-log" element={<AuditLogPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ConnectionWizardPage from './pages/ConnectionWizardPage.jsx'
import MigrationProgressPage from './pages/MigrationProgressPage.jsx'
import DiffReviewPage from './pages/DiffReviewPage.jsx'
import JobHistoryPage from './pages/JobHistoryPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/connect" element={<ConnectionWizardPage />} />
            <Route path="/migrations/:id" element={<MigrationProgressPage />} />
            <Route path="/migrations/:id/review" element={<DiffReviewPage />} />
            <Route path="/history" element={<JobHistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

import { Outlet } from 'react-router-dom'
import TopNavBar from './TopNavBar.jsx'
import Sidebar from './Sidebar.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-mono">
      <TopNavBar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

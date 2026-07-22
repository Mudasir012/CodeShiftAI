import { Outlet } from 'react-router-dom'
import TopNavBar from './TopNavBar.jsx'
import Sidebar from './Sidebar.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-[#f1f1f7]">
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

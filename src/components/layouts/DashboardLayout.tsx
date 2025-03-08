import { ReactNode, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  BarChart3, 
  ChevronDown, 
  CreditCard, 
  History, 
  Home, 
  LineChart, 
  LogOut, 
  Menu, 
  Settings, 
  User, 
  X 
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useSubscription } from '../../contexts/SubscriptionContext'
import Logo from '../ui/Logo'

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { tier, remainingAnalysis } = useSubscription()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analysis', href: '/analysis', icon: LineChart },
    { name: 'History', href: '/history', icon: History },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/80 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white lg:hidden transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200">
          <Logo />
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="rounded-md p-1 hover:bg-slate-100"
          >
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-200">
            <div className="bg-primary-50 rounded-md p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-700">
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan
                </span>
                <Link to="/settings" className="text-xs text-primary-600 hover:text-primary-700">
                  Upgrade
                </Link>
              </div>
              <div className="mt-3">
                <div className="text-xs text-slate-500 mb-1">
                  Remaining analyses: {remainingAnalysis}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${(remainingAnalysis / useSubscription().features.analysisPerMonth) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
        <div className="flex h-16 items-center justify-center px-6 border-b border-slate-200">
          <Logo />
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-slate-200">
            <div className="bg-primary-50 rounded-md p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-700">
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan
                </span>
                <Link to="/settings" className="text-xs text-primary-600 hover:text-primary-700">
                  Upgrade
                </Link>
              </div>
              <div className="mt-3">
                <div className="text-xs text-slate-500 mb-1">
                  Remaining analyses: {remainingAnalysis}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${(remainingAnalysis / useSubscription().features.analysisPerMonth) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <header className="sticky top-0 z-40 flex h-16 items-center bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="lg:hidden -ml-2 mr-2 p-2 rounded-md text-slate-500 hover:bg-slate-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex flex-1 justify-end">
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    alt=""
                  />
                  <span className="ml-2 text-sm font-medium text-slate-700">{user?.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-slate-400" />
                </button>
              </div>
              {userMenuOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="mr-3 h-4 w-4 text-slate-500" />
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <CreditCard className="mr-3 h-4 w-4 text-slate-500" />
                    Billing
                  </Link>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    onClick={() => {
                      setUserMenuOpen(false)
                      handleLogout()
                    }}
                  >
                    <LogOut className="mr-3 h-4 w-4 text-slate-500" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

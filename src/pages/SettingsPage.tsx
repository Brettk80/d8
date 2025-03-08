import { useState } from 'react'
import { User, CreditCard, Bell, Shield, LogOut, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSubscription } from '../contexts/SubscriptionContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const SettingsPage = () => {
  const { user, logout } = useAuth()
  const { tier, updateSubscription } = useSubscription()
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <Card className="p-0">
            <nav className="flex flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-l-2 border-primary-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-sm font-medium text-danger-700 hover:bg-danger-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign out
              </button>
            </nav>
          </Card>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <h2 className="text-lg font-medium text-slate-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      alt=""
                      className="h-20 w-20 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-900">{user?.name}</h3>
                    <p className="text-sm text-slate-500">{user?.email}</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        Change avatar
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                          First name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          defaultValue={user?.name.split(' ')[0]}
                          className="mt-1 input"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          defaultValue={user?.name.split(' ')[1] || ''}
                          className="mt-1 input"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={user?.email}
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-slate-700">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={3}
                        placeholder="Write a few sentences about yourself"
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        Save changes
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <Card>
                <h2 className="text-lg font-medium text-slate-900 mb-6">Current Plan</h2>
                
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 capitalize">
                      {tier} Plan
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {tier === 'free' && 'Basic access with limited features'}
                      {tier === 'basic' && 'Enhanced analysis with more monthly credits'}
                      {tier === 'pro' && 'Advanced features for serious investors'}
                      {tier === 'enterprise' && 'Full access with custom features'}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tier === 'free' 
                      ? 'bg-slate-100 text-slate-800' 
                      : tier === 'basic'
                      ? 'bg-primary-100 text-primary-800'
                      : tier === 'pro'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-success-100 text-success-800'
                  }`}>
                    Active
                  </span>
                </div>
                
                <div className="py-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-slate-700">Billing cycle</h4>
                    <span className="text-sm text-slate-500">Monthly</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-slate-700">Next payment</h4>
                    <span className="text-sm text-slate-500">November 1, 2023</span>
                  </div>
                  
                  {tier !== 'free' && (
                    <div className="flex justify-end gap-3">
                      <Button variant="outline">
                        Cancel subscription
                      </Button>
                      <Button>
                        Manage billing
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
              
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-4">Available Plans</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PlanCard
                    name="Basic"
                    price={9.99}
                    features={[
                      '20 analyses per month',
                      'Advanced technical analysis',
                      'Email support',
                      'Market overview'
                    ]}
                    current={tier === 'basic'}
                    onSelect={() => updateSubscription('basic')}
                  />
                  
                  <PlanCard
                    name="Pro"
                    price={19.99}
                    features={[
                      '100 analyses per month',
                      'Advanced technical analysis',
                      'Priority support',
                      'Batch analysis',
                      'Market overview',
                      'Export reports'
                    ]}
                    recommended
                    current={tier === 'pro'}
                    onSelect={() => updateSubscription('pro')}
                  />
                  
                  <PlanCard
                    name="Enterprise"
                    price={49.99}
                    features={[
                      '500 analyses per month',
                      'Advanced technical analysis',
                      'Priority support',
                      'Batch analysis',
                      'Market overview',
                      'Export reports',
                      'API access',
                      'Custom models'
                    ]}
                    current={tier === 'enterprise'}
                    onSelect={() => updateSubscription('enterprise')}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <h2 className="text-lg font-medium text-slate-900 mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="analysis_complete"
                          name="analysis_complete"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="analysis_complete" className="font-medium text-slate-700">
                          Analysis complete
                        </label>
                        <p className="text-slate-500">Receive an email when your analysis is complete</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="price_alerts"
                          name="price_alerts"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="price_alerts" className="font-medium text-slate-700">
                          Price alerts
                        </label>
                        <p className="text-slate-500">Receive alerts when prices hit your targets</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newsletter"
                          name="newsletter"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newsletter" className="font-medium text-slate-700">
                          Newsletter
                        </label>
                        <p className="text-slate-500">Receive our weekly newsletter with market insights</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="product_updates"
                          name="product_updates"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="product_updates" className="font-medium text-slate-700">
                          Product updates
                        </label>
                        <p className="text-slate-500">Receive updates about new features and improvements</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="push_analysis"
                          name="push_analysis"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="push_analysis" className="font-medium text-slate-700">
                          Analysis notifications
                        </label>
                        <p className="text-slate-500">Receive push notifications for completed analyses</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="push_alerts"
                          name="push_alerts"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="push_alerts" className="font-medium text-slate-700">
                          Market alerts
                        </label>
                        <p className="text-slate-500">Receive push notifications for important market events</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    Save preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <h2 className="text-lg font-medium text-slate-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Change Password</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="current_password" className="block text-sm font-medium text-slate-700">
                        Current password
                      </label>
                      <input
                        type="password"
                        id="current_password"
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new_password" className="block text-sm font-medium text-slate-700">
                        New password
                      </label>
                      <input
                        type="password"
                        id="new_password"
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-700">
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        id="confirm_password"
                        className="mt-1 input"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit">
                        Update password
                      </Button>
                    </div>
                  </form>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">
                    Enable two-factor authentication
                  </Button>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-medium text-slate-900 mb-3">Sessions</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    These are the devices that are currently logged into your account.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Current session</p>
                        <p className="text-xs text-slate-500">Chrome on macOS • New York, USA • IP: 192.168.1.1</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                        Active
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-slate-700">Mobile app</p>
                        <p className="text-xs text-slate-500">iOS 16 • New York, USA • Last active: 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-sm font-medium text-danger-700 mb-3">Danger Zone</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="danger">
                    Delete account
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

interface PlanCardProps {
  name: string
  price: number
  features: string[]
  recommended?: boolean
  current?: boolean
  onSelect: () => void
}

const PlanCard = ({ name, price, features, recommended, current, onSelect }: PlanCardProps) => (
  <Card className={`relative ${recommended ? 'border-primary-500 ring-1 ring-primary-500' : ''}`}>
    {recommended && (
      <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        Recommended
      </div>
    )}
    
    <div className="p-6">
      <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold tracking-tight text-slate-900">${price}</span>
        <span className="ml-1 text-sm font-medium text-slate-500">/month</span>
      </div>
      
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-success-500 flex-shrink-0 mr-2" />
            <span className="text-sm text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8">
        {current ? (
          <Button variant="outline" fullWidth disabled>
            Current Plan
          </Button>
        ) : (
          <Button 
            variant={recommended ? 'primary' : 'outline'} 
            fullWidth
            onClick={onSelect}
          >
            {name === 'Free' ? 'Downgrade' : 'Upgrade'}
          </Button>
        )}
      </div>
    </div>
  </Card>
)

export default SettingsPage

import { useState } from 'react'
import DashboardLayout from '../components/layouts/DashboardLayout'
import StatsCard from '../components/dashboard/StatsCard'
import RecentAnalyses from '../components/dashboard/RecentAnalyses'
import MarketOverview from '../components/dashboard/MarketOverview'
import MarketIndices from '../components/dashboard/MarketIndices'
import EnhancedStockChart from '../components/dashboard/EnhancedStockChart'
import StockDetails from '../components/dashboard/StockDetails'
import MarketNews from '../components/dashboard/MarketNews'
import { Briefcase, TrendingUp, Search, Clock } from 'lucide-react'

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL')
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard 
            title="Total Analyses" 
            value="24" 
            change={8}
            changeText="from last month"
            icon={<Search className="h-6 w-6 text-primary-600" />}
          />
          <StatsCard 
            title="Portfolio Value" 
            value="$28,219.32" 
            change={3.2}
            changeText="from last week"
            icon={<Briefcase className="h-6 w-6 text-success-600" />}
          />
          <StatsCard 
            title="Top Performer" 
            value="NVDA +5.2%" 
            change={2.1}
            changeText="since yesterday"
            icon={<TrendingUp className="h-6 w-6 text-success-600" />}
          />
          <StatsCard 
            title="Market Hours" 
            value="5h 12m" 
            changeText="until market close"
            icon={<Clock className="h-6 w-6 text-warning-600" />}
            changeType="neutral"
          />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <EnhancedStockChart 
              symbol={selectedStock} 
              title={`${selectedStock} Chart`} 
              height={400}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MarketIndices />
              <RecentAnalyses />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <StockDetails symbol={selectedStock} />
            
            <div className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Quick View</h3>
              <div className="grid grid-cols-2 gap-2">
                {['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'BTC-USD'].map((symbol) => (
                  <button
                    key={symbol}
                    className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      selectedStock === symbol 
                        ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                    onClick={() => setSelectedStock(symbol)}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            
            <MarketNews symbol={selectedStock} />
          </div>
        </div>
        
        {/* Market Overview */}
        <MarketOverview />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

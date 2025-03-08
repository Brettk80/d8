import { useState } from 'react'
import { Search, TrendingUp, Briefcase, BarChart3, ChevronDown } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { useSubscription } from '../../contexts/SubscriptionContext'

export interface AnalysisRequest {
  type: 'ticker' | 'portfolio' | 'market' | 'sector'
  ticker?: string
  sector?: string
  timeframe: '1d' | '1w' | '1m' | '3m' | '1y'
  analysisType: 'technical' | 'fundamental' | 'sentiment' | 'comprehensive'
}

interface AnalysisFormProps {
  onSubmit: (request: AnalysisRequest) => void
}

const AnalysisForm = ({ onSubmit }: AnalysisFormProps) => {
  const { remainingAnalysis } = useSubscription()
  
  const [analysisType, setAnalysisType] = useState<'technical' | 'fundamental' | 'sentiment' | 'comprehensive'>('comprehensive')
  const [type, setType] = useState<'ticker' | 'portfolio' | 'market' | 'sector'>('ticker')
  const [ticker, setTicker] = useState('')
  const [sector, setSector] = useState('')
  const [timeframe, setTimeframe] = useState<'1d' | '1w' | '1m' | '3m' | '1y'>('1m')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (type === 'ticker' && !ticker) {
      alert('Please enter a ticker symbol')
      return
    }
    
    if (type === 'sector' && !sector) {
      alert('Please select a sector')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit({
      type,
      ticker: type === 'ticker' ? ticker.toUpperCase() : undefined,
      sector: type === 'sector' ? sector : undefined,
      timeframe,
      analysisType
    })
    
    setIsSubmitting(false)
  }
  
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-900 mb-6">New Analysis</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Analysis Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What would you like to analyze?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                className={`flex items-center p-3 rounded-lg border ${
                  type === 'ticker' 
                    ? 'bg-primary-50 border-primary-200 text-primary-700' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setType('ticker')}
              >
                <Search className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">Stock/Crypto</div>
                  <div className="text-xs text-slate-500">Analyze a specific ticker</div>
                </div>
              </button>
              
              <button
                type="button"
                className={`flex items-center p-3 rounded-lg border ${
                  type === 'portfolio' 
                    ? 'bg-primary-50 border-primary-200 text-primary-700' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setType('portfolio')}
              >
                <Briefcase className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">Portfolio</div>
                  <div className="text-xs text-slate-500">Analyze your portfolio</div>
                </div>
              </button>
              
              <button
                type="button"
                className={`flex items-center p-3 rounded-lg border ${
                  type === 'market' 
                    ? 'bg-primary-50 border-primary-200 text-primary-700' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setType('market')}
              >
                <TrendingUp className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">Market</div>
                  <div className="text-xs text-slate-500">Overall market analysis</div>
                </div>
              </button>
              
              <button
                type="button"
                className={`flex items-center p-3 rounded-lg border ${
                  type === 'sector' 
                    ? 'bg-primary-50 border-primary-200 text-primary-700' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => setType('sector')}
              >
                <BarChart3 className="h-5 w-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">Sector</div>
                  <div className="text-xs text-slate-500">Analyze a market sector</div>
                </div>
              </button>
            </div>
          </div>
          
          {/* Ticker Input */}
          {type === 'ticker' && (
            <div>
              <label htmlFor="ticker" className="block text-sm font-medium text-slate-700 mb-1">
                Ticker Symbol
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="ticker"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  placeholder="e.g. AAPL, MSFT, BTC-USD"
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                />
                {ticker && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Enter a stock ticker (e.g., AAPL) or crypto (e.g., BTC-USD)
              </p>
            </div>
          )}
          
          {/* Sector Selector */}
          {type === 'sector' && (
            <div>
              <label htmlFor="sector" className="block text-sm font-medium text-slate-700 mb-1">
                Market Sector
              </label>
              <div className="relative">
                <select
                  id="sector"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm appearance-none"
                >
                  <option value="">Select a sector</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="financials">Financials</option>
                  <option value="consumer-discretionary">Consumer Discretionary</option>
                  <option value="communication-services">Communication Services</option>
                  <option value="industrials">Industrials</option>
                  <option value="consumer-staples">Consumer Staples</option>
                  <option value="energy">Energy</option>
                  <option value="utilities">Utilities</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="materials">Materials</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          )}
          
          {/* Timeframe */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Timeframe
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === '1d' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setTimeframe('1d')}
              >
                1 Day
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === '1w' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setTimeframe('1w')}
              >
                1 Week
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === '1m' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setTimeframe('1m')}
              >
                1 Month
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === '3m' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setTimeframe('3m')}
              >
                3 Months
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  timeframe === '1y' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setTimeframe('1y')}
              >
                1 Year
              </button>
            </div>
          </div>
          
          {/* Analysis Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Analysis Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  analysisType === 'technical' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setAnalysisType('technical')}
              >
                Technical
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  analysisType === 'fundamental' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setAnalysisType('fundamental')}
              >
                Fundamental
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  analysisType === 'sentiment' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setAnalysisType('sentiment')}
              >
                Sentiment
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  analysisType === 'comprehensive' 
                    ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setAnalysisType('comprehensive')}
              >
                Comprehensive
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-sm text-slate-500">
              Remaining analyses: <span className="font-medium">{remainingAnalysis}</span>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting || remainingAnalysis <= 0}
              isLoading={isSubmitting}
            >
              Generate Analysis
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}

export default AnalysisForm

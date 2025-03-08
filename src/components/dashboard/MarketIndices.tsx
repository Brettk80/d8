import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import Card from '../ui/Card'

interface MarketIndex {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

const MarketIndices = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  const fetchIndices = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // In a real app, we would fetch this data from an API
      // For demo purposes, we'll use realistic mock data
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      
      const mockIndices: MarketIndex[] = [
        {
          symbol: 'SPY',
          name: 'S&P 500',
          price: 451.34,
          change: 3.78,
          changePercent: 0.84
        },
        {
          symbol: 'QQQ',
          name: 'Nasdaq 100',
          price: 378.21,
          change: 5.62,
          changePercent: 1.51
        },
        {
          symbol: 'DIA',
          name: 'Dow Jones',
          price: 347.89,
          change: 1.23,
          changePercent: 0.35
        },
        {
          symbol: 'IWM',
          name: 'Russell 2000',
          price: 196.42,
          change: -0.87,
          changePercent: -0.44
        },
        {
          symbol: 'VIX',
          name: 'Volatility',
          price: 17.32,
          change: -0.54,
          changePercent: -3.02
        }
      ]
      
      setIndices(mockIndices)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching market indices:', err)
      setError('Failed to load market indices')
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchIndices()
    
    // Set up polling every 60 seconds for real-time updates
    const intervalId = setInterval(fetchIndices, 60000)
    
    return () => clearInterval(intervalId)
  }, [])
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Market Indices</h3>
        {lastUpdated && (
          <div className="flex items-center text-xs text-slate-500">
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
            <button 
              onClick={fetchIndices} 
              className="ml-2 p-1 rounded-full hover:bg-slate-100"
              disabled={isLoading}
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>
      
      {isLoading && !indices.length ? (
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="h-4 bg-slate-200 rounded w-20 mb-1"></div>
                <div className="h-3 bg-slate-200 rounded w-16"></div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-slate-200 rounded w-16 mb-1"></div>
                <div className="h-3 bg-slate-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-6">
          <p className="text-danger-600 mb-2">Failed to load market indices</p>
          <button 
            onClick={fetchIndices}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {indices.map((index) => (
            <div key={index.symbol} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-900">{index.name}</div>
                <div className="text-xs text-slate-500">{index.symbol}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">{index.price.toFixed(2)}</div>
                <div className={`text-xs flex items-center justify-end ${
                  index.changePercent >= 0 ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {index.changePercent >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>
                    {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({Math.abs(index.changePercent).toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default MarketIndices

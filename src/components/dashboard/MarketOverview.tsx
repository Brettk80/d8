import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Briefcase } from 'lucide-react'
import Card from '../ui/Card'

interface MarketSector {
  name: string
  change: number
  volume: number
}

const MarketOverview = () => {
  const [sectors, setSectors] = useState<MarketSector[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchSectors = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // In a real app, we would fetch this data from an API
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1200)) // Simulate network delay
        
        const mockSectors: MarketSector[] = [
          { name: 'Technology', change: 1.24, volume: 12500000000 },
          { name: 'Healthcare', change: 0.87, volume: 8700000000 },
          { name: 'Financials', change: 0.32, volume: 9800000000 },
          { name: 'Consumer Discretionary', change: -0.45, volume: 7600000000 },
          { name: 'Communication Services', change: 1.56, volume: 6900000000 },
          { name: 'Industrials', change: 0.21, volume: 5400000000 },
          { name: 'Consumer Staples', change: -0.18, volume: 4800000000 },
          { name: 'Energy', change: -1.32, volume: 6200000000 },
          { name: 'Utilities', change: 0.05, volume: 3100000000 },
          { name: 'Real Estate', change: -0.67, volume: 3800000000 },
          { name: 'Materials', change: 0.43, volume: 4200000000 }
        ]
        
        setSectors(mockSectors)
      } catch (err) {
        console.error('Error fetching sector data:', err)
        setError('Failed to load sector data')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSectors()
  }, [])
  
  // Format volume
  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(1)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`
    return `$${volume.toLocaleString()}`
  }
  
  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Market Sectors</h3>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
      ) : error ? (
        <div className="text-center py-6">
          <p className="text-danger-600 mb-2">Failed to load sector data</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {sectors.map((sector, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                    {sector.name}
                  </td>
                  <td className={`px-3 py-2 whitespace-nowrap text-sm text-right ${
                    sector.change >= 0 ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    <div className="flex items-center justify-end">
                      {sector.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-slate-500">
                    {formatVolume(sector.volume)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          sector.change >= 1 ? 'bg-success-500' : 
                          sector.change >= 0 ? 'bg-success-400' : 
                          sector.change >= -1 ? 'bg-danger-400' : 'bg-danger-500'
                        }`}
                        style={{ width: `${Math.min(Math.abs(sector.change) * 20, 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

export default MarketOverview

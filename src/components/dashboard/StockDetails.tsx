import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, DollarSign, BarChart3, Activity, Briefcase } from 'lucide-react'
import Card from '../ui/Card'
import { useStockQuote, useCryptoQuote } from '../../services/financialDataService'

interface StockDetailsProps {
  symbol: string
  className?: string
}

const StockDetails = ({ symbol, className = '' }: StockDetailsProps) => {
  // Determine if this is a crypto or stock symbol
  const isCrypto = symbol.includes('-')
  
  // Use the appropriate hook based on the symbol type
  const stockResult = useStockQuote(isCrypto ? '' : symbol)
  const cryptoResult = useCryptoQuote(isCrypto ? symbol : '')
  
  // Get the appropriate data
  const { quote, isLoading, error, lastUpdated, refetch } = isCrypto ? cryptoResult : stockResult
  
  // Format large numbers
  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }
  
  // Format volume
  const formatVolume = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toString()
  }
  
  // Format price based on value (for crypto)
  const formatPrice = (price: number) => {
    if (price < 0.01) return price.toFixed(6)
    if (price < 1) return price.toFixed(4)
    if (price < 10) return price.toFixed(3)
    if (price < 1000) return price.toFixed(2)
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }
  
  if (isLoading) {
    return (
      <Card className={`animate-pulse ${className}`}>
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-slate-200 rounded w-1/2 mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array(6).fill(0).map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-slate-200 rounded w-16 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }
  
  if (error || !quote) {
    return (
      <Card className={className}>
        <div className="text-center py-6">
          <p className="text-danger-600 mb-2">Failed to load {symbol} data</p>
          <button 
            onClick={() => refetch()}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </Card>
    )
  }
  
  return (
    <Card className={className}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{quote.name}</h3>
          <p className="text-sm text-slate-500">{symbol}</p>
        </div>
        {lastUpdated && (
          <div className="flex items-center text-xs text-slate-400">
            <Clock className="h-3 w-3 mr-1" />
            <span>Updated {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline mb-6">
        <span className="text-3xl font-bold text-slate-900">
          ${formatPrice(quote.price)}
        </span>
        <div className={`ml-3 flex items-center text-sm ${
          quote.changePercent >= 0 ? 'text-success-600' : 'text-danger-600'
        }`}>
          {quote.changePercent >= 0 ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span>
            {quote.change >= 0 ? '+' : ''}{quote.change.toFixed(2)} ({Math.abs(quote.changePercent).toFixed(2)}%)
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-slate-500 flex items-center mb-1">
            <Activity className="h-3 w-3 mr-1" />
            Volume
          </p>
          <p className="text-sm font-medium text-slate-900">{formatVolume(quote.volume)}</p>
        </div>
        
        <div>
          <p className="text-xs text-slate-500 flex items-center mb-1">
            <Briefcase className="h-3 w-3 mr-1" />
            Market Cap
          </p>
          <p className="text-sm font-medium text-slate-900">{formatLargeNumber(quote.marketCap)}</p>
        </div>
        
        {isCrypto ? (
          // Crypto-specific metrics
          <div>
            <p className="text-xs text-slate-500 flex items-center mb-1">
              <BarChart3 className="h-3 w-3 mr-1" />
              Supply
            </p>
            <p className="text-sm font-medium text-slate-900">
              {(quote as any).supply.toLocaleString()}
            </p>
          </div>
        ) : (
          // Stock-specific metrics
          <div>
            <p className="text-xs text-slate-500 flex items-center mb-1">
              <DollarSign className="h-3 w-3 mr-1" />
              P/E Ratio
            </p>
            <p className="text-sm font-medium text-slate-900">
              {(quote as any).peRatio?.toFixed(2) || 'N/A'}
            </p>
          </div>
        )}
        
        <div>
          <p className="text-xs text-slate-500 mb-1">Open</p>
          <p className="text-sm font-medium text-slate-900">${quote.open.toFixed(2)}</p>
        </div>
        
        <div>
          <p className="text-xs text-slate-500 mb-1">Previous Close</p>
          <p className="text-sm font-medium text-slate-900">${quote.previousClose.toFixed(2)}</p>
        </div>
        
        {isCrypto ? (
          // More crypto-specific metrics
          <div>
            <p className="text-xs text-slate-500 mb-1">24h Range</p>
            <p className="text-sm font-medium text-slate-900">
              ${(quote as any).low24h.toFixed(2)} - ${(quote as any).high24h.toFixed(2)}
            </p>
          </div>
        ) : (
          // More stock-specific metrics
          <div>
            <p className="text-xs text-slate-500 mb-1">52w Range</p>
            <p className="text-sm font-medium text-slate-900">
              ${(quote as any).low52Week?.toFixed(2) || 'N/A'} - ${(quote as any).high52Week?.toFixed(2) || 'N/A'}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}

export default StockDetails

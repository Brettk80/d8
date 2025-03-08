import { useState, useEffect } from 'react'
import { Clock, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Card from '../ui/Card'
import { useFinancialNews, NewsItem } from '../../services/financialDataService'

interface MarketNewsProps {
  symbol?: string
  limit?: number
  title?: string
  className?: string
}

const MarketNews = ({ 
  symbol, 
  limit = 5, 
  title = symbol ? `${symbol} News` : 'Market News',
  className = ''
}: MarketNewsProps) => {
  const { news, isLoading, error } = useFinancialNews(symbol, limit)
  
  // Format relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)
    
    if (diffSec < 60) return `${diffSec}s ago`
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHour < 24) return `${diffHour}h ago`
    if (diffDay < 7) return `${diffDay}d ago`
    
    return date.toLocaleDateString()
  }
  
  // Get sentiment icon
  const getSentimentIcon = (sentiment?: 'positive' | 'negative' | 'neutral') => {
    if (sentiment === 'positive') {
      return <TrendingUp className="h-3 w-3 text-success-500" />
    }
    if (sentiment === 'negative') {
      return <TrendingDown className="h-3 w-3 text-danger-500" />
    }
    return <Minus className="h-3 w-3 text-slate-400" />
  }
  
  return (
    <Card className={className}>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      
      {isLoading ? (
        <div className="space-y-4">
          {Array(limit).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/4 mb-3"></div>
              <div className="h-3 bg-slate-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-slate-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-6">
          <p className="text-danger-600 mb-2">Failed to load news</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-medium text-slate-900 hover:text-primary-600 flex-1">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start">
                    {item.title}
                    <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0 mt-0.5" />
                  </a>
                </h4>
                <div className="ml-2 flex-shrink-0">
                  {getSentimentIcon(item.sentiment)}
                </div>
              </div>
              
              <div className="flex items-center text-xs text-slate-500 mb-2">
                <span className="font-medium">{item.source}</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{getRelativeTime(item.publishedAt)}</span>
              </div>
              
              <p className="text-xs text-slate-600 line-clamp-2">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export default MarketNews

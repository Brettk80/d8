import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import Card from '../ui/Card'

interface Analysis {
  id: string
  title: string
  date: Date
  type: 'ticker' | 'portfolio' | 'market' | 'sector'
  symbol?: string
}

const RecentAnalyses = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchAnalyses = async () => {
      setIsLoading(true)
      
      try {
        // In a real app, we would fetch this data from an API
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 800)) // Simulate network delay
        
        const mockAnalyses: Analysis[] = [
          {
            id: '1',
            title: 'AAPL Earnings Analysis',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            type: 'ticker',
            symbol: 'AAPL'
          },
          {
            id: '2',
            title: 'Tech Sector Outlook',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            type: 'sector'
          },
          {
            id: '3',
            title: 'My Growth Portfolio',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            type: 'portfolio'
          },
          {
            id: '4',
            title: 'TSLA Technical Analysis',
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            type: 'ticker',
            symbol: 'TSLA'
          },
          {
            id: '5',
            title: 'Market Sentiment Analysis',
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
            type: 'market'
          }
        ]
        
        setAnalyses(mockAnalyses)
      } catch (err) {
        console.error('Error fetching recent analyses:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAnalyses()
  }, [])
  
  // Format relative date
  const getRelativeDate = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    
    return date.toLocaleDateString()
  }
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Analyses</h3>
        <Link 
          to="/history" 
          className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center"
        >
          View all
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="h-8 w-8 bg-slate-200 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-slate-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <Link 
              key={analysis.id} 
              to={`/history/${analysis.id}`} 
              className="flex items-start group"
            >
              <div className="h-8 w-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-900 group-hover:text-primary-600">
                  {analysis.title}
                </div>
                <div className="text-xs text-slate-500">
                  {getRelativeDate(analysis.date)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}

export default RecentAnalyses

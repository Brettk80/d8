import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Share2, Bookmark, BookmarkCheck } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { AnalysisRequest } from './AnalysisForm'

interface AnalysisResultProps {
  request: AnalysisRequest
  onNewAnalysis: () => void
}

interface AnalysisData {
  summary: string
  keyPoints: string[]
  recommendation: 'buy' | 'sell' | 'hold' | 'watch'
  confidenceScore: number
  riskLevel: 'low' | 'medium' | 'high'
  priceTarget?: number
  supportLevels?: number[]
  resistanceLevels?: number[]
  technicalIndicators?: {
    name: string
    value: string
    signal: 'bullish' | 'bearish' | 'neutral'
  }[]
  fundamentalMetrics?: {
    name: string
    value: string
    comparison: 'above' | 'below' | 'in-line'
  }[]
  sentimentAnalysis?: {
    overall: 'positive' | 'negative' | 'neutral'
    newsScore: number
    socialScore: number
    insiderActivity: string
  }
}

const AnalysisResult = ({ request, onNewAnalysis }: AnalysisResultProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  
  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // In a real app, we would call an AI service here
        // For demo purposes, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 2500))
        
        // Generate mock analysis based on request type
        let mockAnalysis: AnalysisData
        
        if (request.type === 'ticker') {
          mockAnalysis = generateTickerAnalysis(request.ticker || 'AAPL', request.analysisType)
        } else if (request.type === 'sector') {
          mockAnalysis = generateSectorAnalysis(request.sector || 'technology', request.analysisType)
        } else if (request.type === 'portfolio') {
          mockAnalysis = generatePortfolioAnalysis(request.analysisType)
        } else {
          mockAnalysis = generateMarketAnalysis(request.analysisType)
        }
        
        setAnalysis(mockAnalysis)
      } catch (err) {
        console.error('Error generating analysis:', err)
        setError('Failed to generate analysis. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAnalysis()
  }, [request])
  
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'buy':
        return 'bg-success-50 text-success-700 border-success-200'
      case 'sell':
        return 'bg-danger-50 text-danger-700 border-danger-200'
      case 'hold':
        return 'bg-warning-50 text-warning-700 border-warning-200'
      case 'watch':
        return 'bg-info-50 text-info-700 border-info-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-success-600'
      case 'medium':
        return 'text-warning-600'
      case 'high':
        return 'text-danger-600'
      default:
        return 'text-slate-600'
    }
  }
  
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'text-success-600'
      case 'bearish':
        return 'text-danger-600'
      case 'neutral':
        return 'text-slate-600'
      default:
        return 'text-slate-600'
    }
  }
  
  const getComparisonColor = (comparison: string) => {
    switch (comparison) {
      case 'above':
        return 'text-success-600'
      case 'below':
        return 'text-danger-600'
      case 'in-line':
        return 'text-slate-600'
      default:
        return 'text-slate-600'
    }
  }
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-success-600'
      case 'negative':
        return 'text-danger-600'
      case 'neutral':
        return 'text-slate-600'
      default:
        return 'text-slate-600'
    }
  }
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onNewAnalysis}
          className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          New Analysis
        </button>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 mr-1 text-primary-600" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-1"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-slate-200 rounded"></div>
            <div className="h-24 bg-slate-200 rounded"></div>
            <div className="h-24 bg-slate-200 rounded"></div>
          </div>
          
          <div className="h-5 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-danger-600 mb-4">{error}</p>
          <Button onClick={onNewAnalysis}>Try Again</Button>
        </div>
      ) : analysis ? (
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {request.type === 'ticker' ? `${request.ticker} Analysis` :
             request.type === 'sector' ? `${request.sector?.charAt(0).toUpperCase()}${request.sector?.slice(1)} Sector Analysis` :
             request.type === 'portfolio' ? 'Portfolio Analysis' : 'Market Analysis'}
          </h2>
          
          <p className="text-slate-600 mb-6">{analysis.summary}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">Recommendation</div>
              <div className={`inline-block px-2 py-1 rounded text-sm font-medium capitalize ${getRecommendationColor(analysis.recommendation)}`}>
                {analysis.recommendation}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Confidence Score: {analysis.confidenceScore}%
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">Risk Level</div>
              <div className={`text-lg font-medium capitalize ${getRiskColor(analysis.riskLevel)}`}>
                {analysis.riskLevel}
              </div>
              {analysis.priceTarget && (
                <div className="mt-2 text-xs text-slate-500">
                  Price Target: ${analysis.priceTarget.toFixed(2)}
                </div>
              )}
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="text-sm text-slate-500 mb-1">Time Frame</div>
              <div className="text-lg font-medium capitalize">
                {request.timeframe === '1d' ? '1 Day' :
                 request.timeframe === '1w' ? '1 Week' :
                 request.timeframe === '1m' ? '1 Month' :
                 request.timeframe === '3m' ? '3 Months' : '1 Year'}
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Analysis Type: {request.analysisType.charAt(0).toUpperCase() + request.analysisType.slice(1)}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-slate-900 mb-3">Key Points</h3>
            <ul className="space-y-2 text-slate-600">
              {analysis.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block h-5 w-5 rounded-full bg-primary-50 text-primary-600 text-xs flex items-center justify-center mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          {analysis.technicalIndicators && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Technical Indicators</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Indicator
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Signal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {analysis.technicalIndicators.map((indicator, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                          {indicator.name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-600">
                          {indicator.value}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium capitalize">
                          <span className={getSignalColor(indicator.signal)}>
                            {indicator.signal}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {analysis.fundamentalMetrics && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Fundamental Metrics</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        vs. Sector
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {analysis.fundamentalMetrics.map((metric, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                          {metric.name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-600">
                          {metric.value}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium capitalize">
                          <span className={getComparisonColor(metric.comparison)}>
                            {metric.comparison.replace('-', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {analysis.sentimentAnalysis && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Sentiment Analysis</h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Overall Sentiment</div>
                    <div className={`text-lg font-medium capitalize ${getSentimentColor(analysis.sentimentAnalysis.overall)}`}>
                      {analysis.sentimentAnalysis.overall}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-500 mb-1">News Sentiment</div>
                    <div className="text-lg font-medium">
                      {analysis.sentimentAnalysis.newsScore.toFixed(1)}/10
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Social Media Sentiment</div>
                    <div className="text-lg font-medium">
                      {analysis.sentimentAnalysis.socialScore.toFixed(1)}/10
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-slate-500 mb-1">Insider Activity</div>
                  <div className="text-sm text-slate-700">
                    {analysis.sentimentAnalysis.insiderActivity}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {(analysis.supportLevels || analysis.resistanceLevels) && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-900 mb-3">Price Levels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.resistanceLevels && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-sm text-slate-500 mb-2">Resistance Levels</div>
                    <div className="space-y-2">
                      {analysis.resistanceLevels.map((level, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">R{index + 1}</span>
                          <span className="text-sm text-danger-600">${level.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {analysis.supportLevels && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-sm text-slate-500 mb-2">Support Levels</div>
                    <div className="space-y-2">
                      {analysis.supportLevels.map((level, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">S{index + 1}</span>
                          <span className="text-sm text-success-600">${level.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="text-xs text-slate-400 mt-8">
            Generated on {new Date().toLocaleString()} • This analysis is for informational purposes only and should not be considered financial advice.
          </div>
        </div>
      ) : null}
    </Card>
  )
}

// Helper functions to generate mock analysis data

function generateTickerAnalysis(ticker: string, analysisType: string): AnalysisData {
  // Generate realistic mock data based on ticker and analysis type
  const isBullish = Math.random() > 0.4 // 60% chance of bullish recommendation
  const recommendation = isBullish ? 'buy' : (Math.random() > 0.5 ? 'hold' : 'sell')
  const confidenceScore = Math.floor(65 + Math.random() * 30)
  const riskLevel = isBullish ? (Math.random() > 0.7 ? 'medium' : 'low') : (Math.random() > 0.3 ? 'high' : 'medium')
  
  // Base price for the ticker (would be fetched from API in real app)
  let basePrice = 0
  switch (ticker) {
    case 'AAPL': basePrice = 178.72; break
    case 'MSFT': basePrice = 332.42; break
    case 'GOOGL': basePrice = 137.14; break
    case 'AMZN': basePrice = 131.69; break
    case 'TSLA': basePrice = 242.68; break
    case 'META': basePrice = 312.81; break
    case 'NVDA': basePrice = 425.03; break
    case 'BTC-USD': basePrice = 28456.32; break
    default: basePrice = 100 + Math.random() * 200
  }
  
  // Price target based on recommendation
  const priceTarget = recommendation === 'buy' 
    ? basePrice * (1 + (0.1 + Math.random() * 0.2)) 
    : recommendation === 'sell' 
      ? basePrice * (1 - (0.1 + Math.random() * 0.15))
      : basePrice * (1 + (Math.random() * 0.1 - 0.05))
  
  // Support and resistance levels
  const supportLevels = [
    basePrice * (1 - (0.03 + Math.random() * 0.02)),
    basePrice * (1 - (0.06 + Math.random() * 0.03)),
    basePrice * (1 - (0.1 + Math.random() * 0.05))
  ]
  
  const resistanceLevels = [
    basePrice * (1 + (0.03 + Math.random() * 0.02)),
    basePrice * (1 + (0.06 + Math.random() * 0.03)),
    basePrice * (1 + (0.1 + Math.random() * 0.05))
  ]
  
  // Technical indicators
  const technicalIndicators = [
    {
      name: 'RSI (14)',
      value: `${Math.floor(isBullish ? 40 + Math.random() * 30 : 30 + Math.random() * 40)}`,
      signal: isBullish ? 'bullish' : (Math.random() > 0.3 ? 'bearish' : 'neutral')
    },
    {
      name: 'MACD',
      value: `${(isBullish ? 1 : -1) * (Math.random() * 2).toFixed(2)}`,
      signal: isBullish ? (Math.random() > 0.2 ? 'bullish' : 'neutral') : (Math.random() > 0.2 ? 'bearish' : 'neutral')
    },
    {
      name: 'Moving Avg (50)',
      value: `$${(basePrice * (1 + (isBullish ? 1 : -1) * Math.random() * 0.05)).toFixed(2)}`,
      signal: isBullish ? 'bullish' : 'bearish'
    },
    {
      name: 'Moving Avg (200)',
      value: `$${(basePrice * (1 + (isBullish ? -1 : 1) * Math.random() * 0.1)).toFixed(2)}`,
      signal: isBullish ? 'bullish' : 'bearish'
    },
    {
      name: 'Bollinger Bands',
      value: isBullish ? 'Near upper band' : 'Near lower band',
      signal: isBullish ? 'bullish' : 'bearish'
    }
  ]
  
  // Fundamental metrics
  const fundamentalMetrics = [
    {
      name: 'P/E Ratio',
      value: `${(15 + Math.random() * 30).toFixed(2)}`,
      comparison: Math.random() > 0.5 ? 'above' : (Math.random() > 0.5 ? 'below' : 'in-line')
    },
    {
      name: 'EPS Growth',
      value: `${((Math.random() * 30) - 5).toFixed(2)}%`,
      comparison: Math.random() > 0.6 ? 'above' : (Math.random() > 0.5 ? 'below' : 'in-line')
    },
    {
      name: 'Revenue Growth',
      value: `${((Math.random() * 25) - 2).toFixed(2)}%`,
      comparison: Math.random() > 0.6 ? 'above' : (Math.random() > 0.5 ? 'below' : 'in-line')
    },
    {
      name: 'Profit Margin',
      value: `${(5 + Math.random() * 25).toFixed(2)}%`,
      comparison: Math.random() > 0.5 ? 'above' : (Math.random() > 0.5 ? 'below' : 'in-line')
    },
    {
      name: 'Debt to Equity',
      value: `${(0.2 + Math.random() * 1.5).toFixed(2)}`,
      comparison: Math.random() > 0.5 ? 'below' : (Math.random() > 0.5 ? 'above' : 'in-line')
    }
  ]
  
  // Sentiment analysis
  const newsScore = 3 + Math.random() * 7
  const socialScore = 3 + Math.random() * 7
  const overallSentiment = ((newsScore + socialScore) / 2) > 6.5 ? 'positive' : ((newsScore + socialScore) / 2) < 4.5 ? 'negative' : 'neutral'
  
  const sentimentAnalysis = {
    overall: overallSentiment,
    newsScore,
    socialScore,
    insiderActivity: Math.random() > 0.7 
      ? 'Recent insider buying detected' 
      : Math.random() > 0.5 
        ? 'Recent insider selling detected'
        : 'No significant insider activity'
  }
  
  // Key points based on analysis type and recommendation
  let keyPoints: string[] = []
  
  if (analysisType === 'technical' || analysisType === 'comprehensive') {
    keyPoints = keyPoints.concat([
      isBullish 
        ? `${ticker} is showing a strong uptrend with positive momentum indicators.`
        : `${ticker} is in a downtrend with weakening momentum indicators.`,
      isBullish
        ? `The stock is trading above its 50-day moving average, indicating bullish sentiment.`
        : `The stock is trading below its 50-day moving average, indicating bearish sentiment.`,
      `Volume patterns suggest ${isBullish ? 'increasing' : 'decreasing'} institutional interest.`
    ])
  }
  
  if (analysisType === 'fundamental' || analysisType === 'comprehensive') {
    keyPoints = keyPoints.concat([
      `${ticker}'s financial health appears ${isBullish ? 'strong' : 'concerning'} with ${isBullish ? 'improving' : 'deteriorating'} margins.`,
      `The company's growth rate is ${isBullish ? 'above' : 'below'} the sector average.`,
      `Valuation metrics suggest the stock is currently ${isBullish ? 'undervalued' : 'overvalued'} relative to peers.`
    ])
  }
  
  if (analysisType === 'sentiment' || analysisType === 'comprehensive') {
    keyPoints = keyPoints.concat([
      `Market sentiment for ${ticker} is generally ${overallSentiment} based on news and social media analysis.`,
      `Analyst coverage has been ${isBullish ? 'increasingly positive' : 'increasingly cautious'} in recent reports.`,
      `${sentimentAnalysis.insiderActivity} in the past month.`
    ])
  }
  
  // Add some ticker-specific insights
  if (ticker === 'AAPL') {
    keyPoints.push('Recent product launches have been well-received by consumers and critics.')
  } else if (ticker === 'TSLA') {
    keyPoints.push('Production capacity expansion and demand in key markets remain critical factors.')
  } else if (ticker === 'BTC-USD') {
    keyPoints.push('Regulatory developments and institutional adoption continue to drive price action.')
  }
  
  // Summary based on all the above
  const summary = `Our ${analysisType} analysis of ${ticker} indicates a ${recommendation.toUpperCase()} recommendation with a ${confidenceScore}% confidence score. ${
    isBullish 
      ? `The stock shows promising ${analysisType === 'technical' ? 'technical patterns' : analysisType === 'fundamental' ? 'fundamentals' : 'overall metrics'} with a price target of $${priceTarget.toFixed(2)}.` 
      : `The stock faces challenges in its ${analysisType === 'technical' ? 'price action' : analysisType === 'fundamental' ? 'financial metrics' : 'overall performance'} with a price target of $${priceTarget.toFixed(2)}.`
  } Risk is assessed as ${riskLevel.toUpperCase()} based on ${
    analysisType === 'technical' ? 'volatility and momentum factors' : 
    analysisType === 'fundamental' ? 'financial stability and growth metrics' : 
    'a combination of technical, fundamental, and sentiment indicators'
  }.`
  
  return {
    summary,
    keyPoints,
    recommendation,
    confidenceScore,
    riskLevel,
    priceTarget,
    supportLevels,
    resistanceLevels,
    technicalIndicators: analysisType === 'fundamental' ? undefined : technicalIndicators,
    fundamentalMetrics: analysisType === 'technical' ? undefined : fundamentalMetrics,
    sentimentAnalysis: analysisType === 'technical' || analysisType === 'fundamental' ? undefined : sentimentAnalysis
  }
}

function generateSectorAnalysis(sector: string, analysisType: string): AnalysisData {
  const isBullish = Math.random() > 0.4
  const recommendation = isBullish ? (Math.random() > 0.3 ? 'buy' : 'watch') : (Math.random() > 0.5 ? 'hold' : 'sell')
  const confidenceScore = Math.floor(60 + Math.random() * 30)
  const riskLevel = isBullish ? (Math.random() > 0.6 ? 'medium' : 'low') : (Math.random() > 0.4 ? 'high' : 'medium')
  
  // Format sector name for display
  const formattedSector = sector.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  // Key points
  const keyPoints = [
    `The ${formattedSector} sector is ${isBullish ? 'outperforming' : 'underperforming'} the broader market by ${(Math.random() * 5 + 1).toFixed(1)}%.`,
    `${isBullish ? 'Increasing' : 'Decreasing'} capital inflows suggest ${isBullish ? 'growing' : 'waning'} investor interest.`,
    `Regulatory environment appears ${Math.random() > 0.5 ? 'favorable' : 'challenging'} for companies in this sector.`,
    `Valuations are ${isBullish ? 'attractive' : 'stretched'} compared to historical averages.`,
    `Leading companies in the sector are reporting ${isBullish ? 'strong' : 'mixed'} earnings results.`
  ]
  
  // Add sector-specific insights
  if (sector === 'technology') {
    keyPoints.push('AI and cloud computing remain key growth drivers for the sector.')
  } else if (sector === 'healthcare') {
    keyPoints.push('Innovation in treatments and aging demographics support long-term growth.')
  } else if (sector === 'energy') {
    keyPoints.push('Transition to renewable energy is reshaping competitive dynamics.')
  }
  
  // Technical indicators for the sector ETF
  const technicalIndicators = [
    {
      name: 'Relative Strength',
      value: `${(isBullish ? 1 : -1) * (Math.random() * 2 + 0.5).toFixed(2)}`,
      signal: isBullish ? 'bullish' : 'bearish'
    },
    {
      name: 'Money Flow Index',
      value: `${Math.floor(isBullish ? 50 + Math.random() * 40 : 10 + Math.random() * 40)}`,
      signal: isBullish ? 'bullish' : 'bearish'
    },
    {
      name: 'Sector Momentum',
      value: `${(isBullish ? 1 : -1) * (Math.random() * 3 + 0.2).toFixed(2)}`,
      signal: isBullish ? 'bullish' : 'neutral'
    }
  ]
  
  // Fundamental metrics for the sector
  const fundamentalMetrics = [
    {
      name: 'Avg P/E Ratio',
      value: `${(15 + Math.random() * 25).toFixed(2)}`,
      comparison: isBullish ? 'below' : 'above'
    },
    {
      name: 'Revenue Growth',
      value: `${((Math.random() * 15) - (isBullish ? 0 : 5)).toFixed(2)}%`,
      comparison: isBullish ? 'above' : 'below'
    },
    {
      name: 'Profit Margin',
      value: `${(5 + Math.random() * 20).toFixed(2)}%`,
      comparison: isBullish ? 'above' : 'below'
    },
    {
      name: 'Dividend Yield',
      value: `${(1 + Math.random() * 3).toFixed(2)}%`,
      comparison: Math.random() > 0.5 ? 'above' : 'below'
    }
  ]
  
  // Sentiment analysis
  const newsScore = 3 + Math.random() * 7
  const socialScore = 3 + Math.random() * 7
  const overallSentiment = ((newsScore + socialScore) / 2) > 6 ? 'positive' : ((newsScore + socialScore) / 2) < 4.5 ? 'negative' : 'neutral'
  
  const sentimentAnalysis = {
    overall: overallSentiment,
    newsScore,
    socialScore,
    insiderActivity: `Insider transactions in the sector show a ${Math.random() > 0.5 ? 'net buying' : 'net selling'} trend`
  }
  
  // Summary
  const summary = `Our analysis of the ${formattedSector} sector indicates a ${recommendation.toUpperCase()} recommendation with ${confidenceScore}% confidence. The sector is ${
    isBullish ? 'well-positioned for growth' : 'facing significant headwinds'
  } in the current market environment. ${
    analysisType === 'comprehensive' 
      ? 'Technical indicators, fundamentals, and sentiment analysis all' 
      : `${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} indicators`
  } suggest a ${riskLevel} risk profile for investments in this sector.`
  
  return {
    summary,
    keyPoints,
    recommendation,
    confidenceScore,
    riskLevel,
    technicalIndicators: analysisType === 'fundamental' ? undefined : technicalIndicators,
    fundamentalMetrics: analysisType === 'technical' ? undefined : fundamentalMetrics,
    sentimentAnalysis: analysisType === 'technical' || analysisType === 'fundamental' ? undefined : sentimentAnalysis
  }
}

function generatePortfolioAnalysis(analysisType: string): AnalysisData {
  const isBullish = Math.random() > 0.3
  const recommendation = isBullish ? 'hold' : (Math.random() > 0.5 ? 'watch' : 'sell')
  const confidenceScore = Math.floor(65 + Math.random() * 25)
  const riskLevel = Math.random() > 0.6 ? 'medium' : (Math.random() > 0.5 ? 'low' : 'high')
  
  // Key points
  const keyPoints = [
    `Your portfolio ${isBullish ? 'is outperforming' : 'is underperforming'} the S&P 500 by ${(Math.random() * 4 - (isBullish ? 0 : 2)).toFixed(1)}% year-to-date.`,
    `Sector allocation appears ${Math.random() > 0.5 ? 'well-diversified' : 'concentrated in a few sectors'}, which ${Math.random() > 0.5 ? 'reduces' : 'increases'} overall risk.`,
    `${Math.random() > 0.5 ? 'Increasing' : 'Reducing'} exposure to ${Math.random() > 0.5 ? 'technology' : 'healthcare'} stocks could improve risk-adjusted returns.`,
    `Dividend-paying stocks comprise ${Math.floor(Math.random() * 60)}% of your portfolio, providing income stability.`,
    `Portfolio volatility is ${riskLevel === 'low' ? 'below' : riskLevel === 'medium' ? 'in line with' : 'above'} market averages.`
  ]
  
  // Technical indicators
  const technicalIndicators = [
    {
      name: 'Portfolio Beta',
      value: `${(0.7 + Math.random() * 0.6).toFixed(2)}`,
      signal: riskLevel === 'low' ? 'neutral' : (riskLevel === 'medium' ? 'neutral' : 'bearish')
    },
    {
      name: 'Sharpe Ratio',
      value: `${(0.8 + Math.random() * 1.2).toFixed(2)}`,
      signal: isBullish ? 'bullish' : 'neutral'
    },
    {
      name: 'Drawdown',
      value: `${(5 + Math.random() * 15).toFixed(2)}%`,
      signal: riskLevel === 'low' ? 'bullish' : (riskLevel === 'medium' ? 'neutral' : 'bearish')
    }
  ]
  
  // Fundamental metrics
  const fundamentalMetrics = [
    {
      name: 'Avg P/E Ratio',
      value: `${(16 + Math.random() * 20).toFixed(2)}`,
      comparison: Math.random() > 0.5 ? 'above' : 'below'
    },
    {
      name: 'Dividend Yield',
      value: `${(1.5 + Math.random() * 2.5).toFixed(2)}%`,
      comparison: Math.random() > 0.5 ? 'above' : 'below'
    },
    {
      name: 'Earnings Growth',
      value: `${(5 + Math.random() * 15).toFixed(2)}%`,
      comparison: isBullish ? 'above' : 'below'
    },
    {
      name: 'Debt to Equity',
      value: `${(0.4 + Math.random() * 1.2).toFixed(2)}`,
      comparison: Math.random() > 0.5 ? 'below' : 'above'
    }
  ]
  
  // Sentiment analysis
  const newsScore = 4 + Math.random() * 6
  const socialScore = 4 + Math.random() * 6
  const overallSentiment = ((newsScore + socialScore) / 2) > 6.5 ? 'positive' : ((newsScore + socialScore) / 2) < 4.5 ? 'negative' : 'neutral'
  
  const sentimentAnalysis = {
    overall: overallSentiment,
    newsScore,
    socialScore,
    insiderActivity: `Mixed insider activity across portfolio holdings`
  }
  
  // Summary
  const summary = `Our ${analysisType} analysis of your portfolio indicates a ${recommendation.toUpperCase()} recommendation with ${confidenceScore}% confidence. Your investments are ${
    isBullish ? 'generally well-positioned' : 'facing some challenges'
  } in the current market environment. We've identified several opportunities to optimize your holdings for better ${
    riskLevel === 'low' ? 'growth potential' : (riskLevel === 'medium' ? 'risk-adjusted returns' : 'downside protection')
  }.`
  
  return {
    summary,
    keyPoints,
    recommendation,
    confidenceScore,
    riskLevel,
    technicalIndicators: analysisType === 'fundamental' ? undefined : technicalIndicators,
    fundamentalMetrics: analysisType === 'technical' ? undefined : fundamentalMetrics,
    sentimentAnalysis: analysisType === 'technical' || analysisType === 'fundamental' ? undefined : sentimentAnalysis
  }
}

function generateMarketAnalysis(analysisType: string): AnalysisData {
  const isBullish = Math.random() > 0.4
  const recommendation = isBullish ? (Math.random() > 0.3 ? 'buy' : 'watch') : (Math.random() > 0.5 ? 'hold' : 'sell')
  const confidenceScore = Math.floor(60 + Math.random() * 30)
  const riskLevel = isBullish ? (Math.random() > 0.6 ? 'medium' : 'low') : (Math.random() > 0.4 ? 'high' : 'medium')
  
  // Key points
  const keyPoints = [
    `Market breadth indicators are ${isBullish ? 'improving' : 'deteriorating'}, with ${isBullish ? 'more' : 'fewer'} stocks participating in recent ${isBullish ? 'rallies' : 'declines'}.`,
    `Volatility indices suggest ${isBullish ? 'decreasing' : 'increasing'} market uncertainty in the near term.`,
    `Sector rotation patterns indicate money flows ${isBullish ? 'toward' : 'away from'} cyclical sectors, suggesting ${isBullish ? 'economic optimism' : 'economic concerns'}.`,
    `Interest rate expectations are ${Math.random() > 0.5 ? 'supportive of' : 'creating headwinds for'} equity valuations.`,
    `Institutional positioning shows ${isBullish ? 'increasing' : 'decreasing'} allocation to equities versus fixed income and cash.`
  ]
  
  // Technical indicators
  const technicalIndicators = [
    {
      name: 'Advance/Decline Line',
      value: `${isBullish ? 'Uptrend' : 'Downtrend'}`,
      signal: isBullish ? 'bullish' : 'bearish'
    },
    {
      name: 'VIX Index',
      value: `${(15 + Math.random() * 20).toFixed(2)}`,
      signal: isBullish ? 'bullish' : 'bearish'
    },
    {
      name: 'Put/Call Ratio',
      value: `${(0.7 + Math.random() * 0.6).toFixed(2)}`,
      signal: isBullish ? 'bullish' : 'bearish'
    },
    {
      name: '200-Day Moving Avg',
      value: `S&P 500 ${isBullish ? 'above' : 'below'}`,
      signal: isBullish ? 'bullish' : 'bearish'
    }
  ]
  
  // Fundamental metrics
  const fundamentalMetrics = [
    {
      name: 'S&P 500 P/E Ratio',
      value: `${(16 + Math.random() * 8).toFixed(2)}`,
      comparison: isBullish ? 'in-line' : 'above'
    },
    {
      name: 'Earnings Growth',
      value: `${(3 + Math.random() * 12).toFixed(2)}%`,
      comparison: isBullish ? 'above' : 'below'
    },
    {
      name: 'Dividend Yield',
      value: `${(1.5 + Math.random() * 1).toFixed(2)}%`,
      comparison: Math.random() > 0.5 ? 'above' : 'below'
    },
    {
      name: 'GDP Growth',
      value: `${(1 + Math.random() * 3).toFixed(2)}%`,
      comparison: isBullish ? 'above' : 'below'
    }
  ]
  
  // Sentiment analysis
  const newsScore = 3 + Math.random() * 7
  const socialScore = 3 + Math.random() * 7
  const overallSentiment = ((newsScore + socialScore) / 2) > 6 ? 'positive' : ((newsScore + socialScore) / 2) < 4.5 ? 'negative' : 'neutral'
  
  const sentimentAnalysis = {
    overall: overallSentiment,
    newsScore,
    socialScore,
    insiderActivity: `Corporate insiders showing ${Math.random() > 0.5 ? 'net buying' : 'net selling'} activity`
  }
  
  // Summary
  const summary = `Our ${analysisType} analysis of current market conditions indicates a ${recommendation.toUpperCase()} recommendation with ${confidenceScore}% confidence. The broader market appears ${
    isBullish ? 'poised for continued strength' : 'vulnerable to correction'
  } based on ${
    analysisType === 'comprehensive' 
      ? 'a combination of technical, fundamental, and sentiment indicators' 
      : `${analysisType} factors`
  }. Risk is assessed as ${riskLevel.toUpperCase()} over the near term.`
  
  return {
    summary,
    keyPoints,
    recommendation,
    confidenceScore,
    riskLevel,
    technicalIndicators: analysisType === 'fundamental' ? undefined : technicalIndicators,
    fundamentalMetrics: analysisType === 'technical' ? undefined : fundamentalMetrics,
    sentimentAnalysis: analysisType === 'technical' || analysisType === 'fundamental' ? undefined : sentimentAnalysis
  }
}

export default AnalysisResult

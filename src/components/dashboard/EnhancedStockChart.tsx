import { useState, useEffect, useRef } from 'react'
import { useHistoricalData } from '../../services/financialDataService'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { LineChart, BarChart, RefreshCw, Loader } from 'lucide-react'

interface EnhancedStockChartProps {
  symbol: string
  title: string
  height?: number
  showControls?: boolean
  className?: string
}

type TimeframeOption = '1d' | '5d' | '1m' | '3m' | '1y'

const EnhancedStockChart = ({ 
  symbol, 
  title, 
  height = 300, 
  showControls = true,
  className = ''
}: EnhancedStockChartProps) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('1m')
  const [chartType, setChartType] = useState<'line' | 'candle'>('line')
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<any>(null)
  
  // Fetch historical data using our custom hook
  const { data: historicalData, isLoading, error } = useHistoricalData(symbol, timeframe)
  
  // Initialize and update chart when data changes
  useEffect(() => {
    if (!chartRef.current) return
    
    const loadChart = async () => {
      try {
        // Check if TradingView is already loaded
        if (typeof TradingView === 'undefined') {
          // Load TradingView library
          const script = document.createElement('script')
          script.src = 'https://s3.tradingview.com/tv.js'
          script.async = true
          
          // Wait for script to load
          await new Promise((resolve, reject) => {
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }
        
        // Clean up previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.remove()
          chartInstanceRef.current = null
        }
        
        // Map timeframe to TradingView interval
        const intervalMap: Record<TimeframeOption, string> = {
          '1d': '5',
          '5d': '15',
          '1m': '60',
          '3m': 'D',
          '1y': 'W'
        }
        
        // Create new chart
        chartInstanceRef.current = new TradingView.widget({
          autosize: true,
          symbol: symbol.includes('-') 
            ? `COINBASE:${symbol.split('-')[0]}USD` // For crypto
            : `NASDAQ:${symbol}`, // For stocks
          interval: intervalMap[timeframe],
          timezone: 'Etc/UTC',
          theme: 'light',
          style: chartType === 'candle' ? '1' : '2', // 1 for candles, 2 for line
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: !showControls,
          hide_legend: false,
          save_image: false,
          container_id: chartRef.current.id,
          studies: chartType === 'candle' ? ['RSI@tv-basicstudies', 'MAExp@tv-basicstudies'] : [],
          disabled_features: [
            'use_localstorage_for_settings',
            'header_symbol_search',
            'header_screenshot',
            'header_compare',
            showControls ? '' : 'left_toolbar',
            showControls ? '' : 'header_indicators',
            showControls ? '' : 'header_settings',
            showControls ? '' : 'header_chart_type'
          ],
          enabled_features: [
            'save_chart_properties_to_local_storage'
          ]
        })
      } catch (error) {
        console.error('Error loading TradingView chart:', error)
        
        // If TradingView fails, we could implement a fallback chart using a library like Chart.js
        // This would be implemented in a real application
      }
    }
    
    loadChart()
    
    return () => {
      // Clean up chart instance on unmount
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove()
        chartInstanceRef.current = null
      }
    }
  }, [symbol, timeframe, chartType, showControls])
  
  return (
    <Card className={className}>
      {showControls && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          
          <div className="flex items-center space-x-4">
            {/* Chart type toggle */}
            <div className="flex items-center space-x-1 bg-slate-100 rounded-md p-1">
              <button 
                className={`p-1 rounded ${chartType === 'line' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
                onClick={() => setChartType('line')}
                title="Line chart"
              >
                <LineChart className="h-4 w-4" />
              </button>
              <button 
                className={`p-1 rounded ${chartType === 'candle' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
                onClick={() => setChartType('candle')}
                title="Candlestick chart"
              >
                <BarChart className="h-4 w-4" />
              </button>
            </div>
            
            {/* Timeframe selector */}
            <div className="flex space-x-1">
              <button 
                className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '1d' ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100'}`}
                onClick={() => setTimeframe('1d')}
              >
                1D
              </button>
              <button 
                className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '5d' ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100'}`}
                onClick={() => setTimeframe('5d')}
              >
                5D
              </button>
              <button 
                className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '1m' ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100'}`}
                onClick={() => setTimeframe('1m')}
              >
                1M
              </button>
              <button 
                className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '3m' ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100'}`}
                onClick={() => setTimeframe('3m')}
              >
                3M
              </button>
              <button 
                className={`px-2 py-1 text-xs font-medium rounded ${timeframe === '1y' ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100'}`}
                onClick={() => setTimeframe('1y')}
              >
                1Y
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Chart container */}
      {isLoading ? (
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <Loader className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center text-center p-4" style={{ height: `${height}px` }}>
          <p className="text-danger-600 mb-2">Failed to load chart data</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      ) : (
        <div 
          id={`tv-chart-${symbol.replace(/[^a-zA-Z0-9]/g, '-')}`} 
          ref={chartRef} 
          style={{ height: `${height}px` }}
        />
      )}
    </Card>
  )
}

export default EnhancedStockChart

import { useEffect, useRef } from 'react'
import Card from '../ui/Card'

interface StockChartProps {
  symbol: string
  title: string
  period?: '1d' | '5d' | '1m' | '3m' | '1y'
  height?: number
}

const StockChart = ({ symbol, title, period = '1m', height = 300 }: StockChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!chartRef.current) return
    
    // In a real app, we would use a charting library like Chart.js, ApexCharts, or TradingView
    // For this demo, we'll use TradingView's lightweight charts widget
    
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      if (typeof TradingView !== 'undefined') {
        new TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: period === '1d' ? '5' : period === '5d' ? '15' : period === '1m' ? '60' : period === '3m' ? 'D' : 'W',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: chartRef.current?.id,
        })
      }
    }
    
    document.head.appendChild(script)
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [symbol, period])
  
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className="flex space-x-1">
          <button className="px-2 py-1 text-xs font-medium rounded hover:bg-slate-100">1D</button>
          <button className="px-2 py-1 text-xs font-medium rounded hover:bg-slate-100">5D</button>
          <button className="px-2 py-1 text-xs font-medium rounded bg-primary-50 text-primary-700">1M</button>
          <button className="px-2 py-1 text-xs font-medium rounded hover:bg-slate-100">3M</button>
          <button className="px-2 py-1 text-xs font-medium rounded hover:bg-slate-100">1Y</button>
        </div>
      </div>
      <div 
        id={`tv-chart-${symbol.replace(/[^a-zA-Z0-9]/g, '-')}`} 
        ref={chartRef} 
        style={{ height: `${height}px` }}
      />
    </Card>
  )
}

export default StockChart

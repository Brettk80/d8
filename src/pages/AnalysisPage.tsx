import { useState } from 'react'
import DashboardLayout from '../components/layouts/DashboardLayout'
import AnalysisForm, { AnalysisRequest } from '../components/analysis/AnalysisForm'
import AnalysisResult from '../components/analysis/AnalysisResult'
import EnhancedStockChart from '../components/dashboard/EnhancedStockChart'
import StockDetails from '../components/dashboard/StockDetails'
import MarketNews from '../components/dashboard/MarketNews'

const AnalysisPage = () => {
  const [analysisRequest, setAnalysisRequest] = useState<AnalysisRequest | null>(null)
  
  const handleAnalysisSubmit = (request: AnalysisRequest) => {
    setAnalysisRequest(request)
  }
  
  const handleNewAnalysis = () => {
    setAnalysisRequest(null)
  }
  
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">AI Market Analysis</h1>
        
        {analysisRequest ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnalysisResult 
                request={analysisRequest} 
                onNewAnalysis={handleNewAnalysis} 
              />
            </div>
            
            <div className="space-y-6">
              {analysisRequest.type === 'ticker' && analysisRequest.ticker && (
                <>
                  <StockDetails symbol={analysisRequest.ticker} />
                  <MarketNews symbol={analysisRequest.ticker} title={`${analysisRequest.ticker} News`} />
                </>
              )}
              
              {analysisRequest.type !== 'ticker' && (
                <MarketNews title="Latest Market News" limit={8} />
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnalysisForm onSubmit={handleAnalysisSubmit} />
            </div>
            
            <div className="space-y-6">
              <EnhancedStockChart 
                symbol="SPY" 
                title="S&P 500 ETF" 
                height={250}
              />
              <MarketNews title="Latest Market News" limit={5} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AnalysisPage

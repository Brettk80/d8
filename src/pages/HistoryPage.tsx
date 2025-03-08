import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, LineChart, Search, Calendar, Filter, Download, Trash2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

interface HistoryItem {
  id: string
  type: 'ticker' | 'chart' | 'question'
  title: string
  date: string
  result: {
    recommendation: 'buy' | 'sell' | 'hold'
    confidence: number
  }
}

const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'ticker' | 'chart' | 'question'>('all')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  
  // Mock data - in a real app, this would come from an API
  const historyData: HistoryItem[] = [
    {
      id: '1',
      type: 'ticker',
      title: 'AAPL Analysis',
      date: '2023-10-15',
      result: {
        recommendation: 'buy',
        confidence: 0.82
      }
    },
    {
      id: '2',
      type: 'chart',
      title: 'BTC-USD Chart Analysis',
      date: '2023-10-14',
      result: {
        recommendation: 'hold',
        confidence: 0.65
      }
    },
    {
      id: '3',
      type: 'question',
      title: 'Is Tesla stock a buy right now?',
      date: '2023-10-12',
      result: {
        recommendation: 'sell',
        confidence: 0.71
      }
    },
    {
      id: '4',
      type: 'ticker',
      title: 'MSFT Analysis',
      date: '2023-10-10',
      result: {
        recommendation: 'buy',
        confidence: 0.78
      }
    },
    {
      id: '5',
      type: 'chart',
      title: 'ETH-USD Chart Analysis',
      date: '2023-10-08',
      result: {
        recommendation: 'buy',
        confidence: 0.69
      }
    },
    {
      id: '6',
      type: 'ticker',
      title: 'GOOGL Analysis',
      date: '2023-10-05',
      result: {
        recommendation: 'hold',
        confidence: 0.62
      }
    },
    {
      id: '7',
      type: 'question',
      title: 'What is the outlook for gold in Q4?',
      date: '2023-10-03',
      result: {
        recommendation: 'buy',
        confidence: 0.75
      }
    },
    {
      id: '8',
      type: 'ticker',
      title: 'AMZN Analysis',
      date: '2023-10-01',
      result: {
        recommendation: 'buy',
        confidence: 0.81
      }
    },
    {
      id: '9',
      type: 'chart',
      title: 'S&P 500 Chart Analysis',
      date: '2023-09-28',
      result: {
        recommendation: 'hold',
        confidence: 0.58
      }
    },
    {
      id: '10',
      type: 'question',
      title: 'Should I invest in renewable energy stocks?',
      date: '2023-09-25',
      result: {
        recommendation: 'buy',
        confidence: 0.73
      }
    }
  ]

  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || item.type === selectedType
    return matchesSearch && matchesType
  })

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredHistory.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredHistory.map(item => item.id))
    }
  }

  const handleDelete = () => {
    // In a real app, this would call an API to delete the selected items
    alert(`Deleting items: ${selectedItems.join(', ')}`)
    setSelectedItems([])
  }

  const handleExport = () => {
    // In a real app, this would generate and download a CSV or PDF
    alert('Exporting selected analyses')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Analysis History</h1>
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search analyses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="input pr-10 appearance-none"
              >
                <option value="all">All Types</option>
                <option value="ticker">Ticker</option>
                <option value="chart">Chart</option>
                <option value="question">Question</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
            </div>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr>
                <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredHistory.length && filteredHistory.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                </th>
                <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Recommendation</th>
                <th className="px-3 py-3.5 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          {item.type === 'ticker' && <BarChart3 className="h-4 w-4" />}
                          {item.type === 'chart' && <LineChart className="h-4 w-4" />}
                          {item.type === 'question' && <Search className="h-4 w-4" />}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <Link to={`/history/${item.id}`} className="text-sm font-medium text-slate-900 hover:text-primary-600">
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.result.recommendation === 'buy' 
                          ? 'bg-success-50 text-success-700' 
                          : item.result.recommendation === 'sell'
                          ? 'bg-danger-50 text-danger-700'
                          : 'bg-warning-50 text-warning-700'
                      }`}>
                        {item.result.recommendation.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-slate-500">
                      {Math.round(item.result.confidence * 100)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-sm text-slate-500">
                    No analyses found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium">{filteredHistory.length}</span> of <span className="font-medium">{historyData.length}</span> analyses
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default HistoryPage

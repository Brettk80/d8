import { useState, useEffect } from 'react'

// Types for our financial data
export interface StockQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  peRatio?: number
  high52Week?: number
  low52Week?: number
  open: number
  previousClose: number
  timestamp: Date
}

export interface CryptoQuote {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  supply: number
  high24h: number
  low24h: number
  timestamp: Date
}

export interface HistoricalDataPoint {
  date: Date
  open: number
  high: number
  close: number
  low: number
  volume: number
}

export interface NewsItem {
  title: string
  url: string
  source: string
  publishedAt: Date
  summary: string
  sentiment?: 'positive' | 'negative' | 'neutral'
}

// API configuration
// In a production app, these would be environment variables
const ALPHA_VANTAGE_API_KEY = 'demo' // Replace with your API key
const COIN_API_KEY = 'demo' // Replace with your API key
const FINNHUB_API_KEY = 'demo' // Replace with your API key

/**
 * Hook to fetch real-time stock quotes
 */
export const useStockQuote = (symbol: string) => {
  const [quote, setQuote] = useState<StockQuote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchQuote = async () => {
    if (!symbol) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Alpha Vantage API for stock quotes
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${symbol}`)
      }
      
      const data = await response.json()
      
      // Check if we got valid data
      if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
        const quote = data['Global Quote']
        const price = parseFloat(quote['05. price'])
        const previousClose = parseFloat(quote['08. previous close'])
        const change = parseFloat(quote['09. change'])
        const changePercent = parseFloat(quote['10. change percent'].replace('%', ''))
        
        setQuote({
          symbol,
          name: await getCompanyName(symbol),
          price,
          change,
          changePercent,
          volume: parseInt(quote['06. volume']),
          marketCap: 0, // Alpha Vantage doesn't provide this in the quote endpoint
          open: parseFloat(quote['02. open']),
          previousClose,
          timestamp: new Date(),
        })
      } else {
        // Fallback to mock data if API limit is reached
        setQuote(getMockStockQuote(symbol))
      }
      
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching stock quote:', err)
      setError('Failed to fetch stock data. Using fallback data.')
      
      // Fallback to mock data
      setQuote(getMockStockQuote(symbol))
      setLastUpdated(new Date())
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on mount and when symbol changes
  useEffect(() => {
    fetchQuote()
    
    // Set up polling every 60 seconds for real-time updates
    const intervalId = setInterval(fetchQuote, 60000)
    
    return () => clearInterval(intervalId)
  }, [symbol])

  return { quote, isLoading, error, lastUpdated, refetch: fetchQuote }
}

/**
 * Hook to fetch real-time crypto quotes
 */
export const useCryptoQuote = (symbol: string) => {
  const [quote, setQuote] = useState<CryptoQuote | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchQuote = async () => {
    if (!symbol) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      // In a real app, we would use CoinGecko, CoinAPI, or similar
      // For demo purposes, we'll use Alpha Vantage's crypto endpoint
      const response = await fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol.split('-')[0]}&to_currency=USD&apikey=${ALPHA_VANTAGE_API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${symbol}`)
      }
      
      const data = await response.json()
      
      // Check if we got valid data
      if (data['Realtime Currency Exchange Rate']) {
        const exchangeData = data['Realtime Currency Exchange Rate']
        const price = parseFloat(exchangeData['5. Exchange Rate'])
        
        // For crypto, we need additional data that Alpha Vantage doesn't provide in this endpoint
        // In a real app, we would make additional API calls to get this data
        // For demo purposes, we'll use mock data for the missing fields
        const mockCrypto = getMockCryptoQuote(symbol)
        
        setQuote({
          symbol,
          name: getCryptoName(symbol),
          price,
          change: mockCrypto.change, // Mock data
          changePercent: mockCrypto.changePercent, // Mock data
          volume: mockCrypto.volume, // Mock data
          marketCap: mockCrypto.marketCap, // Mock data
          supply: mockCrypto.supply, // Mock data
          high24h: price * 1.05, // Estimated
          low24h: price * 0.95, // Estimated
          timestamp: new Date(),
        })
      } else {
        // Fallback to mock data if API limit is reached
        setQuote(getMockCryptoQuote(symbol))
      }
      
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching crypto quote:', err)
      setError('Failed to fetch crypto data. Using fallback data.')
      
      // Fallback to mock data
      setQuote(getMockCryptoQuote(symbol))
      setLastUpdated(new Date())
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on mount and when symbol changes
  useEffect(() => {
    fetchQuote()
    
    // Set up polling every 30 seconds for real-time updates (crypto markets move faster)
    const intervalId = setInterval(fetchQuote, 30000)
    
    return () => clearInterval(intervalId)
  }, [symbol])

  return { quote, isLoading, error, lastUpdated, refetch: fetchQuote }
}

/**
 * Hook to fetch historical price data for charts
 */
export const useHistoricalData = (symbol: string, timeframe: '1d' | '5d' | '1m' | '3m' | '1y' = '1m') => {
  const [data, setData] = useState<HistoricalDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!symbol) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        // Map timeframe to Alpha Vantage interval and outputsize
        let interval = 'daily'
        let outputsize = 'compact'
        
        if (timeframe === '1d') {
          interval = '5min'
          outputsize = 'full'
        } else if (timeframe === '5d') {
          interval = '60min'
          outputsize = 'full'
        } else if (timeframe === '1m') {
          interval = 'daily'
          outputsize = 'compact'
        } else if (timeframe === '3m') {
          interval = 'daily'
          outputsize = 'compact'
        } else if (timeframe === '1y') {
          interval = 'weekly'
          outputsize = 'full'
        }
        
        // Determine the correct Alpha Vantage function
        let function_name = 'TIME_SERIES_DAILY'
        
        if (interval === '5min' || interval === '60min') {
          function_name = 'TIME_SERIES_INTRADAY'
        } else if (interval === 'weekly') {
          function_name = 'TIME_SERIES_WEEKLY'
        }
        
        // For crypto, use a different endpoint
        if (symbol.includes('-')) {
          function_name = 'DIGITAL_CURRENCY_DAILY'
        }
        
        // Build the API URL
        let url = `https://www.alphavantage.co/query?function=${function_name}&symbol=${symbol.split('-')[0]}`
        
        if (interval === '5min' || interval === '60min') {
          url += `&interval=${interval}`
        }
        
        if (symbol.includes('-')) {
          url += `&market=USD`
        }
        
        url += `&outputsize=${outputsize}&apikey=${ALPHA_VANTAGE_API_KEY}`
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch historical data for ${symbol}`)
        }
        
        const responseData = await response.json()
        
        // Parse the response based on the function used
        let timeSeriesKey = ''
        
        if (function_name === 'TIME_SERIES_INTRADAY') {
          timeSeriesKey = `Time Series (${interval})`
        } else if (function_name === 'TIME_SERIES_DAILY') {
          timeSeriesKey = 'Time Series (Daily)'
        } else if (function_name === 'TIME_SERIES_WEEKLY') {
          timeSeriesKey = 'Weekly Time Series'
        } else if (function_name === 'DIGITAL_CURRENCY_DAILY') {
          timeSeriesKey = 'Time Series (Digital Currency Daily)'
        }
        
        if (responseData[timeSeriesKey]) {
          const timeSeries = responseData[timeSeriesKey]
          const historicalData: HistoricalDataPoint[] = []
          
          // Limit the number of data points based on timeframe
          const limit = timeframe === '1d' ? 78 : // 6.5 hours of trading at 5-min intervals
                       timeframe === '5d' ? 39 : // 5 days at 60-min intervals
                       timeframe === '1m' ? 22 : // ~1 month of trading days
                       timeframe === '3m' ? 66 : // ~3 months of trading days
                       timeframe === '1y' ? 52 : 30 // 1 year at weekly intervals
          
          let count = 0
          
          for (const date in timeSeries) {
            if (count >= limit) break
            
            const dataPoint = timeSeries[date]
            
            // Handle different data formats
            let open, high, low, close, volume
            
            if (function_name === 'DIGITAL_CURRENCY_DAILY') {
              open = parseFloat(dataPoint['1a. open (USD)'])
              high = parseFloat(dataPoint['2a. high (USD)'])
              low = parseFloat(dataPoint['3a. low (USD)'])
              close = parseFloat(dataPoint['4a. close (USD)'])
              volume = parseFloat(dataPoint['5. volume'])
            } else {
              open = parseFloat(dataPoint['1. open'])
              high = parseFloat(dataPoint['2. high'])
              low = parseFloat(dataPoint['3. low'])
              close = parseFloat(dataPoint['4. close'])
              volume = parseFloat(dataPoint['5. volume'])
            }
            
            historicalData.push({
              date: new Date(date),
              open,
              high,
              low,
              close,
              volume
            })
            
            count++
          }
          
          // Sort by date (oldest to newest)
          historicalData.sort((a, b) => a.date.getTime() - b.date.getTime())
          
          setData(historicalData)
        } else {
          // Fallback to mock data if API limit is reached
          setData(getMockHistoricalData(symbol, timeframe))
        }
      } catch (err) {
        console.error('Error fetching historical data:', err)
        setError('Failed to fetch historical data. Using fallback data.')
        
        // Fallback to mock data
        setData(getMockHistoricalData(symbol, timeframe))
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchHistoricalData()
  }, [symbol, timeframe])

  return { data, isLoading, error }
}

/**
 * Hook to fetch financial news for a symbol or general market news
 */
export const useFinancialNews = (symbol?: string, limit: number = 10) => {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // In a real app, we would use a news API like Finnhub, Alpha Vantage News, or similar
        // For demo purposes, we'll use mock data
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
        
        setNews(getMockNews(symbol, limit))
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Failed to fetch news. Using fallback data.')
        
        // Fallback to mock data
        setNews(getMockNews(symbol, limit))
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchNews()
  }, [symbol, limit])

  return { news, isLoading, error }
}

// Helper functions

/**
 * Get company name from symbol
 */
async function getCompanyName(symbol: string): Promise<string> {
  // In a real app, we would fetch this from an API
  // For demo purposes, we'll use a hardcoded mapping
  const companyNames: Record<string, string> = {
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corp.',
    'GOOGL': 'Alphabet Inc.',
    'AMZN': 'Amazon.com Inc.',
    'TSLA': 'Tesla Inc.',
    'META': 'Meta Platforms Inc.',
    'NVDA': 'NVIDIA Corp.',
    'JPM': 'JPMorgan Chase & Co.',
    'V': 'Visa Inc.',
    'WMT': 'Walmart Inc.',
    'JNJ': 'Johnson & Johnson',
    'PG': 'Procter & Gamble Co.',
    'MA': 'Mastercard Inc.',
    'UNH': 'UnitedHealth Group Inc.',
    'HD': 'Home Depot Inc.',
    'BAC': 'Bank of America Corp.',
    'XOM': 'Exxon Mobil Corp.',
    'DIS': 'Walt Disney Co.',
    'NFLX': 'Netflix Inc.',
    'CSCO': 'Cisco Systems Inc.',
  }
  
  // Try to get the company name from our mapping
  if (companyNames[symbol]) {
    return companyNames[symbol]
  }
  
  // If not found, try to fetch it from Alpha Vantage
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    )
    
    if (response.ok) {
      const data = await response.json()
      
      if (data.bestMatches && data.bestMatches.length > 0) {
        return data.bestMatches[0]['2. name']
      }
    }
  } catch (err) {
    console.error('Error fetching company name:', err)
  }
  
  // If all else fails, return a formatted version of the symbol
  return `${symbol} Stock`
}

/**
 * Get crypto name from symbol
 */
function getCryptoName(symbol: string): string {
  const cryptoNames: Record<string, string> = {
    'BTC-USD': 'Bitcoin',
    'ETH-USD': 'Ethereum',
    'SOL-USD': 'Solana',
    'BNB-USD': 'Binance Coin',
    'XRP-USD': 'Ripple',
    'ADA-USD': 'Cardano',
    'DOGE-USD': 'Dogecoin',
    'DOT-USD': 'Polkadot',
    'AVAX-USD': 'Avalanche',
    'MATIC-USD': 'Polygon',
  }
  
  return cryptoNames[symbol] || symbol.split('-')[0]
}

/**
 * Generate mock stock quote data
 */
function getMockStockQuote(symbol: string): StockQuote {
  // Realistic mock data for when API calls fail or are rate limited
  const mockData: Record<string, Partial<StockQuote>> = {
    'AAPL': { price: 178.72, change: 2.57, changePercent: 1.45, volume: 52300000, marketCap: 2800000000000, peRatio: 29.8, high52Week: 182.94, low52Week: 124.17, open: 176.15, previousClose: 176.15 },
    'MSFT': { price: 332.42, change: 2.86, changePercent: 0.87, volume: 23100000, marketCap: 2470000000000, peRatio: 35.2, high52Week: 338.56, low52Week: 213.43, open: 329.56, previousClose: 329.56 },
    'GOOGL': { price: 137.14, change: -0.44, changePercent: -0.32, volume: 18700000, marketCap: 1730000000000, peRatio: 26.4, high52Week: 142.38, low52Week: 83.34, open: 137.58, previousClose: 137.58 },
    'AMZN': { price: 131.69, change: 2.75, changePercent: 2.13, volume: 35200000, marketCap: 1350000000000, peRatio: 102.1, high52Week: 145.86, low52Week: 81.43, open: 129.12, previousClose: 129.12 },
    'TSLA': { price: 242.68, change: -4.40, changePercent: -1.78, volume: 41900000, marketCap: 770000000000, peRatio: 78.3, high52Week: 299.29, low52Week: 101.81, open: 247.08, previousClose: 247.08 },
    'META': { price: 312.81, change: 3.79, changePercent: 1.23, volume: 15800000, marketCap: 803000000000, peRatio: 27.5, high52Week: 326.20, low52Week: 88.09, open: 309.02, previousClose: 309.02 },
    'NVDA': { price: 425.03, change: 11.86, changePercent: 2.87, volume: 32600000, marketCap: 1050000000000, peRatio: 65.8, high52Week: 439.90, low52Week: 108.13, open: 413.17, previousClose: 413.17 },
  }
  
  // Get the mock data for the symbol, or generate random data if not found
  const mockQuote = mockData[symbol] || {
    price: 100 + Math.random() * 50,
    change: (Math.random() * 6) - 3,
    changePercent: (Math.random() * 6) - 3,
    volume: Math.floor(Math.random() * 50000000) + 1000000,
    marketCap: Math.floor(Math.random() * 500000000000) + 10000000000,
    peRatio: Math.floor(Math.random() * 50) + 10,
    high52Week: 120 + Math.random() * 50,
    low52Week: 70 + Math.random() * 30,
    open: 100 + Math.random() * 50,
    previousClose: 100 + Math.random() * 50,
  }
  
  return {
    symbol,
    name: mockQuote.name || `${symbol} Stock`,
    price: mockQuote.price!,
    change: mockQuote.change!,
    changePercent: mockQuote.changePercent!,
    volume: mockQuote.volume!,
    marketCap: mockQuote.marketCap!,
    peRatio: mockQuote.peRatio,
    high52Week: mockQuote.high52Week,
    low52Week: mockQuote.low52Week,
    open: mockQuote.open!,
    previousClose: mockQuote.previousClose!,
    timestamp: new Date(),
  }
}

/**
 * Generate mock crypto quote data
 */
function getMockCryptoQuote(symbol: string): CryptoQuote {
  // Realistic mock data for when API calls fail or are rate limited
  const mockData: Record<string, Partial<CryptoQuote>> = {
    'BTC-USD': { price: 28456.32, change: 892.45, changePercent: 3.21, volume: 24500000000, marketCap: 550000000000, supply: 19318000, high24h: 28750.15, low24h: 27572.15 },
    'ETH-USD': { price: 1642.18, change: 40.67, changePercent: 2.54, volume: 12100000000, marketCap: 197000000000, supply: 120000000, high24h: 1658.92, low24h: 1601.54 },
    'SOL-USD': { price: 32.47, change: 1.58, changePercent: 5.12, volume: 1800000000, marketCap: 13000000000, supply: 400000000, high24h: 32.89, low24h: 30.89 },
    'BNB-USD': { price: 215.63, change: 3.96, changePercent: 1.87, volume: 954200000, marketCap: 33000000000, supply: 153000000, high24h: 217.45, low24h: 211.67 },
    'XRP-USD': { price: 0.5423, change: -0.0042, changePercent: -0.78, volume: 1200000000, marketCap: 28500000000, supply: 52500000000, high24h: 0.5465, low24h: 0.5321 },
  }
  
  // Get the mock data for the symbol, or generate random data if not found
  const mockQuote = mockData[symbol] || {
    price: 100 + Math.random() * 50,
    change: (Math.random() * 6) - 3,
    changePercent: (Math.random() * 6) - 3,
    volume: Math.floor(Math.random() * 5000000000) + 100000000,
    marketCap: Math.floor(Math.random() * 50000000000) + 1000000000,
    supply: Math.floor(Math.random() * 1000000000) + 10000000,
    high24h: 105 + Math.random() * 50,
    low24h: 95 + Math.random() * 50,
  }
  
  return {
    symbol,
    name: getCryptoName(symbol),
    price: mockQuote.price!,
    change: mockQuote.change!,
    changePercent: mockQuote.changePercent!,
    volume: mockQuote.volume!,
    marketCap: mockQuote.marketCap!,
    supply: mockQuote.supply!,
    high24h: mockQuote.high24h!,
    low24h: mockQuote.low24h!,
    timestamp: new Date(),
  }
}

/**
 * Generate mock historical data
 */
function getMockHistoricalData(symbol: string, timeframe: '1d' | '5d' | '1m' | '3m' | '1y'): HistoricalDataPoint[] {
  const data: HistoricalDataPoint[] = []
  const now = new Date()
  
  // Determine the number of data points and interval based on timeframe
  let numPoints = 0
  let intervalMinutes = 0
  
  if (timeframe === '1d') {
    numPoints = 78 // 6.5 hours of trading at 5-min intervals
    intervalMinutes = 5
  } else if (timeframe === '5d') {
    numPoints = 39 // 5 days at 60-min intervals
    intervalMinutes = 60
  } else if (timeframe === '1m') {
    numPoints = 22 // ~1 month of trading days
    intervalMinutes = 24 * 60 // 1 day
  } else if (timeframe === '3m') {
    numPoints = 66 // ~3 months of trading days
    intervalMinutes = 24 * 60 // 1 day
  } else if (timeframe === '1y') {
    numPoints = 52 // 1 year at weekly intervals
    intervalMinutes = 7 * 24 * 60 // 1 week
  }
  
  // Generate a starting price based on the symbol
  let basePrice = 100
  
  if (symbol === 'AAPL') basePrice = 175
  else if (symbol === 'MSFT') basePrice = 330
  else if (symbol === 'GOOGL') basePrice = 135
  else if (symbol === 'AMZN') basePrice = 130
  else if (symbol === 'TSLA') basePrice = 240
  else if (symbol === 'META') basePrice = 310
  else if (symbol === 'NVDA') basePrice = 420
  else if (symbol === 'BTC-USD') basePrice = 28000
  else if (symbol === 'ETH-USD') basePrice = 1600
  else if (symbol === 'SOL-USD') basePrice = 32
  else if (symbol === 'BNB-USD') basePrice = 215
  else if (symbol === 'XRP-USD') basePrice = 0.54
  
  // Generate data points
  let currentPrice = basePrice
  
  for (let i = 0; i < numPoints; i++) {
    // Calculate the date for this data point
    const date = new Date(now.getTime() - (numPoints - i) * intervalMinutes * 60 * 1000)
    
    // Generate a random price movement
    // More volatile for crypto
    const volatility = symbol.includes('-USD') ? 0.02 : 0.01
    const change = currentPrice * (Math.random() * volatility * 2 - volatility)
    
    // Calculate prices
    const close = currentPrice + change
    const open = currentPrice
    const high = Math.max(open, close) + Math.random() * Math.abs(change)
    const low = Math.min(open, close) - Math.random() * Math.abs(change)
    
    // Generate volume
    const baseVolume = symbol.includes('-USD') 
      ? Math.random() * 5000000000 + 1000000000 
      : Math.random() * 50000000 + 5000000
    
    const volume = Math.floor(baseVolume * (0.5 + Math.random()))
    
    // Add the data point
    data.push({
      date,
      open,
      high,
      low,
      close,
      volume
    })
    
    // Update the current price for the next iteration
    currentPrice = close
  }
  
  return data
}

/**
 * Generate mock news data
 */
function getMockNews(symbol?: string, limit: number = 10): NewsItem[] {
  // Base news items that apply to any symbol
  const baseNews: NewsItem[] = [
    {
      title: 'Fed Signals Potential Rate Cuts as Inflation Cools',
      url: '#',
      source: 'Financial Times',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      summary: 'The Federal Reserve has indicated it may begin cutting interest rates in the coming months as inflation shows signs of returning to the 2% target.',
      sentiment: 'positive'
    },
    {
      title: 'Global Markets Rally on Strong Economic Data',
      url: '#',
      source: 'Wall Street Journal',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      summary: 'Stock markets worldwide surged today following better-than-expected economic indicators from the US, Europe, and China.',
      sentiment: 'positive'
    },
    {
      title: 'Treasury Yields Fall as Investors Seek Safety',
      url: '#',
      source: 'Bloomberg',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      summary: 'U.S. Treasury yields declined sharply as investors moved to safe-haven assets amid growing concerns about global economic growth.',
      sentiment: 'negative'
    },
    {
      title: 'Oil Prices Surge on Supply Concerns',
      url: '#',
      source: 'Reuters',
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      summary: 'Crude oil prices jumped more than 3% today after reports of production disruptions in key oil-producing regions.',
      sentiment: 'neutral'
    },
    {
      title: 'Retail Sales Beat Expectations, Consumer Spending Remains Strong',
      url: '#',
      source: 'CNBC',
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      summary: 'U.S. retail sales rose more than expected last month, indicating that consumer spending remains resilient despite economic headwinds.',
      sentiment: 'positive'
    },
    {
      title: 'Tech Sector Leads Market Gains as AI Investments Accelerate',
      url: '#',
      source: 'TechCrunch',
      publishedAt: new Date(Date.now() - 36 * 60 * 60 * 1000), // 1.5 days ago
      summary: 'Technology stocks outperformed the broader market today as companies continue to increase investments in artificial intelligence capabilities.',
      sentiment: 'positive'
    },
    {
      title: 'Housing Market Shows Signs of Cooling as Mortgage Rates Rise',
      url: '#',
      source: 'MarketWatch',
      publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      summary: 'The U.S. housing market is showing signs of slowing down as mortgage rates climb to their highest levels in over a decade.',
      sentiment: 'negative'
    },
    {
      title: 'Cryptocurrency Market Volatility Increases as Regulatory Scrutiny Intensifies',
      url: '#',
      source: 'CoinDesk',
      publishedAt: new Date(Date.now() - 60 * 60 * 60 * 1000), // 2.5 days ago
      summary: 'Digital asset markets experienced heightened volatility this week as regulators worldwide signal tougher oversight of the cryptocurrency industry.',
      sentiment: 'negative'
    },
    {
      title: 'Manufacturing Activity Expands for Third Consecutive Month',
      url: '#',
      source: 'The Economist',
      publishedAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
      summary: 'The manufacturing sector continued its expansion for the third straight month, according to the latest PMI data, suggesting a resilient industrial economy.',
      sentiment: 'positive'
    },
    {
      title: 'Corporate Earnings Season Begins with Mixed Results',
      url: '#',
      source: 'Barron\'s',
      publishedAt: new Date(Date.now() - 96 * 60 * 60 * 1000), // 4 days ago
      summary: 'The quarterly earnings season kicked off with mixed results as companies navigate challenging macroeconomic conditions and persistent inflation.',
      sentiment: 'neutral'
    }
  ]
  
  // Symbol-specific news
  const symbolNews: Record<string, NewsItem[]> = {
    'AAPL': [
      {
        title: 'Apple Unveils Next-Generation iPhone with Advanced AI Features',
        url: '#',
        source: 'TechCrunch',
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        summary: 'Apple has announced its latest iPhone model featuring enhanced AI capabilities and improved battery life, setting new standards for the smartphone industry.',
        sentiment: 'positive'
      },
      {
        title: 'Apple\'s Services Revenue Reaches All-Time High',
        url: '#',
        source: 'CNBC',
        publishedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
        summary: 'Apple reported record-breaking services revenue in its latest quarterly results, highlighting the company\'s successful transition beyond hardware sales.',
        sentiment: 'positive'
      },
      {
        title: 'Apple Faces Antitrust Scrutiny Over App Store Policies',
        url: '#',
        source: 'Wall Street Journal',
        publishedAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
        summary: 'Regulators are intensifying their investigation into Apple\'s App Store practices, potentially threatening a key revenue stream for the tech giant.',
        sentiment: 'negative'
      }
    ],
    'TSLA': [
      {
        title: 'Tesla Delivers Record Number of Vehicles in Latest Quarter',
        url: '#',
        source: 'Reuters',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        summary: 'Tesla has reported record-breaking vehicle deliveries for the quarter, exceeding analyst expectations and demonstrating strong demand for electric vehicles.',
        sentiment: 'positive'
      },
      {
        title: 'Tesla Expands Gigafactory Capacity to Meet Growing Demand',
        url: '#',
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
        summary: 'Tesla announced plans to significantly expand production capacity at its Gigafactories worldwide to address the increasing demand for its electric vehicles.',
        sentiment: 'positive'
      },
      {
        title: 'Tesla Faces Increased Competition in EV Market',
        url: '#',
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - 40 * 60 * 60 * 1000),
        summary: 'Tesla\'s market share in the electric vehicle sector is under pressure as traditional automakers and new entrants ramp up their EV offerings.',
        sentiment: 'negative'
      }
    ],
    'BTC-USD': [
      {
        title: 'Bitcoin Surges Past $30,000 as Institutional Adoption Grows',
        url: '#',
        source: 'CoinDesk',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        summary: 'Bitcoin has broken through the $30,000 barrier as more institutional investors add the cryptocurrency to their portfolios, signaling growing mainstream acceptance.',
        sentiment: 'positive'
      },
      {
        title: 'Major Bank Launches Bitcoin Custody Services for Institutional Clients',
        url: '#',
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - 26 * 60 * 60 * 1000),
        summary: 'A leading global bank has announced the launch of Bitcoin custody services for its institutional clients, marking another milestone in cryptocurrency adoption.',
        sentiment: 'positive'
      },
      {
        title: 'Bitcoin Mining Difficulty Reaches All-Time High',
        url: '#',
        source: 'CryptoNews',
        publishedAt: new Date(Date.now() - 38 * 60 * 60 * 1000),
        summary: 'The difficulty of mining Bitcoin has reached a new record high, potentially impacting profitability for miners as competition intensifies.',
        sentiment: 'neutral'
      }
    ]
  }
  
  // Combine base news with symbol-specific news if available
  let news = [...baseNews]
  
  if (symbol && symbolNews[symbol]) {
    news = [...symbolNews[symbol], ...news]
  }
  
  // Sort by publish date (newest first) and limit the number of results
  return news
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit)
}

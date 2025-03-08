import { Link } from 'react-router-dom'
import { BarChart3, LineChart, TrendingUp, Upload, Search, Zap, Shield, Users, CheckCircle } from 'lucide-react'
import MainLayout from '../components/layouts/MainLayout'
import Button from '../components/ui/Button'

const LandingPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(14,165,233,0.1),rgba(255,255,255,0))]" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              AI-Powered Financial Analysis for <span className="text-primary-600">Everyone</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Get professional-grade financial insights without the high costs. Our AI analyzes stocks and cryptocurrencies to help you make data-driven investment decisions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/register" className="btn btn-primary px-8 py-3 text-base">
                Get started
              </Link>
              <Link to="#features" className="text-base font-semibold leading-7 text-slate-900 hover:text-primary-600">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Powerful Financial Analysis Tools
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our AI-powered platform provides comprehensive analysis for stocks and cryptocurrencies, helping you make informed investment decisions.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  Ticker Analysis
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">
                    Enter any stock or crypto ticker to receive comprehensive technical and sentiment analysis with actionable insights.
                  </p>
                  <p className="mt-6">
                    <Link to="/register" className="text-sm font-semibold leading-6 text-primary-600">
                      Try ticker analysis <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Upload className="h-6 w-6" />
                  </div>
                  Chart Upload
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">
                    Upload your annotated charts and let our AI analyze patterns, validate your technical analysis, and provide feedback.
                  </p>
                  <p className="mt-6">
                    <Link to="/register" className="text-sm font-semibold leading-6 text-primary-600">
                      Try chart upload <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-slate-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Search className="h-6 w-6" />
                  </div>
                  Natural Language Queries
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">
                    Ask questions in plain English like "Is Tesla a buy right now?" and receive data-driven answers with supporting evidence.
                  </p>
                  <p className="mt-6">
                    <Link to="/register" className="text-sm font-semibold leading-6 text-primary-600">
                      Try asking a question <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our platform combines advanced AI with financial expertise to deliver accurate and actionable insights.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="relative pl-16">
                <dt className="text-xl font-semibold leading-7 text-slate-900">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                    1
                  </div>
                  Input Your Request
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">
                  Enter a ticker symbol, upload a chart, or ask a financial question in natural language.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-xl font-semibold leading-7 text-slate-900">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                    2
                  </div>
                  AI Analysis
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">
                  Our AI processes your request, analyzing technical indicators, market sentiment, and historical patterns.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-xl font-semibold leading-7 text-slate-900">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
                    3
                  </div>
                  Receive Insights
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">
                  Get comprehensive reports with actionable insights, annotated charts, and confidence ratings.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Why Choose FinSight AI
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Our platform offers professional-grade financial analysis at a fraction of the cost, powered by cutting-edge AI technology.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 lg:max-w-none">
                  <div className="relative pl-10">
                    <dt className="inline font-semibold text-slate-900">
                      <Zap className="absolute left-0 top-1 h-6 w-6 text-primary-600" />
                      Fast and accurate analysis.
                    </dt>
                    <dd className="inline"> Get comprehensive financial insights in seconds, not hours or days.</dd>
                  </div>
                  <div className="relative pl-10">
                    <dt className="inline font-semibold text-slate-900">
                      <Shield className="absolute left-0 top-1 h-6 w-6 text-primary-600" />
                      Data-driven decisions.
                    </dt>
                    <dd className="inline"> Make investment choices based on objective analysis, not emotions.</dd>
                  </div>
                  <div className="relative pl-10">
                    <dt className="inline font-semibold text-slate-900">
                      <Users className="absolute left-0 top-1 h-6 w-6 text-primary-600" />
                      For everyone.
                    </dt>
                    <dd className="inline"> Whether you're a beginner or experienced trader, our platform adapts to your needs.</dd>
                  </div>
                  <div className="relative pl-10">
                    <dt className="inline font-semibold text-slate-900">
                      <TrendingUp className="absolute left-0 top-1 h-6 w-6 text-primary-600" />
                      Continuous improvement.
                    </dt>
                    <dd className="inline"> Our AI models learn and improve with each analysis, getting better over time.</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-8 ring-1 ring-slate-200 sm:p-10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=900&q=80"
                alt="Financial analysis dashboard"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Join thousands of investors who trust FinSight AI for their financial analysis needs.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div>
                <div className="flex items-center gap-x-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-6 text-lg font-semibold text-slate-900">
                  "Game-changer for my investment strategy"
                </p>
                <p className="mt-4 text-slate-600">
                  FinSight AI has completely transformed how I analyze stocks. The AI insights are incredibly accurate and have helped me make better investment decisions.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-slate-900">Sarah Johnson</p>
                  <p className="text-sm text-slate-500">Day Trader</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div>
                <div className="flex items-center gap-x-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-6 text-lg font-semibold text-slate-900">
                  "Perfect for crypto analysis"
                </p>
                <p className="mt-4 text-slate-600">
                  As a crypto investor, I needed reliable analysis tools. FinSight AI provides detailed insights that have helped me navigate the volatile crypto market.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-slate-900">Michael Chen</p>
                  <p className="text-sm text-slate-500">Crypto Investor</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div>
                <div className="flex items-center gap-x-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-6 text-lg font-semibold text-slate-900">
                  "Worth every penny"
                </p>
                <p className="mt-4 text-slate-600">
                  The subscription is incredibly valuable. I've tried other services that cost 5x more but provide less insight. FinSight AI is my go-to analysis tool now.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-x-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-slate-900">David Rodriguez</p>
                  <p className="text-sm text-slate-500">Financial Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to transform your investment strategy?
            <br />
            Start your free trial today.
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link
              to="/register"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
            <Link to="/pricing" className="text-base font-semibold leading-6 text-white">
              View pricing <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="about" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Have questions about FinSight AI? Find answers to common questions below.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl divide-y divide-slate-200">
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                How accurate are the AI predictions?
              </h3>
              <p className="mt-3 text-slate-600">
                Our AI models have been trained on vast amounts of financial data and achieve high accuracy rates. However, we always provide confidence ratings with our analyses and recommend using our insights as part of a broader investment strategy.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                What financial instruments do you support?
              </h3>
              <p className="mt-3 text-slate-600">
                We support analysis for stocks, ETFs, and cryptocurrencies across major global exchanges. Our platform continuously expands to include more financial instruments.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Can I cancel my subscription anytime?
              </h3>
              <p className="mt-3 text-slate-600">
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                How is FinSight AI different from other financial analysis tools?
              </h3>
              <p className="mt-3 text-slate-600">
                FinSight AI combines advanced AI technology with financial expertise to provide comprehensive analysis at an affordable price. Our platform offers unique features like chart upload analysis and natural language queries that many competitors don't provide.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Is my financial data secure?
              </h3>
              <p className="mt-3 text-slate-600">
                Yes, we take security seriously. All data is encrypted, and we never share your personal information or analysis history with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Start making data-driven investment decisions today
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Join thousands of investors who trust FinSight AI for their financial analysis needs.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/register"
              className="btn btn-primary px-6 py-3 text-base"
            >
              Get started for free
            </Link>
            <Link to="/pricing" className="text-base font-semibold leading-6 text-slate-900 hover:text-primary-600">
              View pricing <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default LandingPage

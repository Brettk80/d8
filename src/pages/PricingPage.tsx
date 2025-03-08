import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import MainLayout from '../components/layouts/MainLayout'
import Button from '../components/ui/Button'

const PricingPage = () => {
  const [annual, setAnnual] = useState(false)
  
  const plans = [
    {
      name: 'Free',
      description: 'Basic access for individuals',
      price: 0,
      features: [
        '5 analyses per month',
        'Basic technical analysis',
        'Email support',
        'Market overview'
      ],
      cta: 'Get started',
      ctaLink: '/register'
    },
    {
      name: 'Basic',
      description: 'For active traders and investors',
      price: annual ? 8.99 : 9.99,
      features: [
        '20 analyses per month',
        'Advanced technical analysis',
        'Email support',
        'Market overview',
        'Export reports'
      ],
      cta: 'Start free trial',
      ctaLink: '/register',
      popular: false
    },
    {
      name: 'Pro',
      description: 'For serious investors',
      price: annual ? 16.99 : 19.99,
      features: [
        '100 analyses per month',
        'Advanced technical analysis',
        'Priority support',
        'Batch analysis',
        'Market overview',
        'Export reports',
        'API access'
      ],
      cta: 'Start free trial',
      ctaLink: '/register',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For professional traders and firms',
      price: annual ? 39.99 : 49.99,
      features: [
        '500 analyses per month',
        'Advanced technical analysis',
        'Priority support',
        'Batch analysis',
        'Market overview',
        'Export reports',
        'API access',
        'Custom models',
        'Dedicated account manager'
      ],
      cta: 'Contact sales',
      ctaLink: '/contact'
    }
  ]

  return (
    <MainLayout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Choose the plan that's right for you. All plans include a 7-day free trial.
            </p>
            
            <div className="mt-10 flex items-center justify-center">
              <div className="flex items-center space-x-3 rounded-lg bg-slate-100 p-1">
                <button
                  onClick={() => setAnnual(false)}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    !annual ? 'bg-white shadow-sm text-slate-900' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    annual ? 'bg-white shadow-sm text-slate-900' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Annual <span className="text-success-600 font-medium">Save 15%</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2 xl:max-w-none xl:grid-cols-4">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border ${
                  plan.popular
                    ? 'border-primary-600 shadow-md z-10 scale-105 bg-white lg:scale-110'
                    : 'border-slate-200 bg-white lg:mx-0'
                } p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary-600 px-3 py-1 text-center text-sm font-medium text-white">
                    Most popular
                  </div>
                )}
                
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                </div>
                
                <div className="mb-5">
                  <span className="text-3xl font-bold tracking-tight text-slate-900">${plan.price}</span>
                  <span className="text-base font-medium text-slate-500">
                    {plan.price > 0 ? (annual ? '/month, billed annually' : '/month') : ''}
                  </span>
                </div>
                
                <ul className="mb-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-success-500 flex-shrink-0 mr-2" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <Link
                    to={plan.ctaLink}
                    className={`btn w-full ${
                      plan.popular ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Find answers to common questions about our pricing and plans.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl divide-y divide-slate-200">
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Can I switch plans later?
              </h3>
              <p className="mt-3 text-slate-600">
                Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                What happens when I reach my monthly analysis limit?
              </h3>
              <p className="mt-3 text-slate-600">
                Once you reach your monthly analysis limit, you'll need to wait until your next billing cycle or upgrade to a higher plan to continue running analyses.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Do you offer refunds?
              </h3>
              <p className="mt-3 text-slate-600">
                We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact us within 7 days of your purchase for a full refund.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Is there a discount for annual billing?
              </h3>
              <p className="mt-3 text-slate-600">
                Yes, you save 15% when you choose annual billing compared to monthly billing.
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Do you offer a free trial?
              </h3>
              <p className="mt-3 text-slate-600">
                Yes, all paid plans include a 7-day free trial. You won't be charged until the trial period ends, and you can cancel anytime during the trial.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
            <br />
            Try FinSight AI for free today.
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link
              to="/register"
              className="rounded-md bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
            <Link to="/contact" className="text-base font-semibold leading-6 text-white">
              Contact sales <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PricingPage

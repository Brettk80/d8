import { createContext, useContext, ReactNode, useState } from 'react'

type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise'

interface SubscriptionContextType {
  tier: SubscriptionTier
  isActive: boolean
  expiresAt: Date | null
  features: {
    analysisPerMonth: number
    advancedAnalysis: boolean
    prioritySupport: boolean
    batchAnalysis: boolean
    apiAccess: boolean
    customModels: boolean
  }
  remainingAnalysis: number
  updateSubscription: (newTier: SubscriptionTier) => void
  cancelSubscription: () => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

const subscriptionFeatures = {
  free: {
    analysisPerMonth: 5,
    advancedAnalysis: false,
    prioritySupport: false,
    batchAnalysis: false,
    apiAccess: false,
    customModels: false
  },
  basic: {
    analysisPerMonth: 20,
    advancedAnalysis: true,
    prioritySupport: false,
    batchAnalysis: false,
    apiAccess: false,
    customModels: false
  },
  pro: {
    analysisPerMonth: 100,
    advancedAnalysis: true,
    prioritySupport: true,
    batchAnalysis: true,
    apiAccess: false,
    customModels: false
  },
  enterprise: {
    analysisPerMonth: 500,
    advancedAnalysis: true,
    prioritySupport: true,
    batchAnalysis: true,
    apiAccess: true,
    customModels: true
  }
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<SubscriptionTier>('free')
  const [isActive, setIsActive] = useState(true)
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)
  const [remainingAnalysis, setRemainingAnalysis] = useState(subscriptionFeatures.free.analysisPerMonth)

  const updateSubscription = (newTier: SubscriptionTier) => {
    setTier(newTier)
    setIsActive(true)
    
    // Set expiration date to 30 days from now
    const expiration = new Date()
    expiration.setDate(expiration.getDate() + 30)
    setExpiresAt(expiration)
    
    // Reset remaining analysis count
    setRemainingAnalysis(subscriptionFeatures[newTier].analysisPerMonth)
  }

  const cancelSubscription = () => {
    setIsActive(false)
    setExpiresAt(null)
  }

  return (
    <SubscriptionContext.Provider value={{
      tier,
      isActive,
      expiresAt,
      features: subscriptionFeatures[tier],
      remainingAnalysis,
      updateSubscription,
      cancelSubscription
    }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

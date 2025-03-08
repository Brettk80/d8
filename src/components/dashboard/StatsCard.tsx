import { ReactNode } from 'react'
import Card from '../ui/Card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow'
}

const StatsCard = ({ title, value, icon, change, color = 'blue' }: StatsCardProps) => {
  const colorClasses = {
    blue: 'bg-primary-50 text-primary-700',
    green: 'bg-success-50 text-success-700',
    red: 'bg-danger-50 text-danger-700',
    purple: 'bg-purple-50 text-purple-700',
    yellow: 'bg-warning-50 text-warning-700',
  }

  return (
    <Card className="flex items-start">
      <div className={`flex items-center justify-center w-12 h-12 rounded-lg mr-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="flex items-baseline mt-1">
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
          {change && (
            <p className={`ml-2 text-sm font-medium ${
              change.type === 'increase' ? 'text-success-700' : 'text-danger-700'
            }`}>
              {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}

export default StatsCard

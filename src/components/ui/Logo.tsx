import { BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

const Logo = ({ size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 28,
  }

  return (
    <Link to="/" className="flex items-center">
      <BarChart3 className="text-primary-600" size={iconSizes[size]} />
      <span className={`ml-2 font-bold ${sizeClasses[size]} text-slate-900`}>
        Fin<span className="text-primary-600">Sight</span>
      </span>
    </Link>
  )
}

export default Logo

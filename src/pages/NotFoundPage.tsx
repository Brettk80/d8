import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import Button from '../components/ui/Button'
import Logo from '../components/ui/Logo'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4">
          <Logo />
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Page not found</h2>
          <p className="mt-3 text-slate-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to home
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} FinSight AI. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default NotFoundPage

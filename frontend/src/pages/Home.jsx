import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            AuthSphere
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Secure authentication, seamless user management, and professional profile handling — 
            all in one place.
          </p>
          
          {user ? (
            <Link
              to="/dashboard"
              className="inline-block bg-white text-indigo-700 font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Go to Dashboard →
            </Link>
          ) : (
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/register"
                className="bg-white text-indigo-700 font-bold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started For Free
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {/* Feature 1: Secure Auth */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Secure Auth</h3>
            <p className="text-blue-100 leading-relaxed text-sm">
              JWT tokens with HTTP-only cookies keep your sessions safe from XSS attacks and cross-site scripting.
            </p>
          </div>
          
          {/* Feature 2: Profile Management */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Profile Management</h3>
            <p className="text-blue-100 leading-relaxed text-sm">
              Update your profile details, descriptions, and manage your account information with ease.
            </p>
          </div>
          
          {/* Feature 3: Role-Based Access */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all group">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Role-Based Access</h3>
            <p className="text-blue-100 leading-relaxed text-sm">
              Admin dashboard with user management controls while regular users access their personal space.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
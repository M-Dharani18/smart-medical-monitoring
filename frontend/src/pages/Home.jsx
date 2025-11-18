

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  LogIn, 
  UserPlus, 
  Activity, 
  Heart, 
  Users, 
  Zap, 
  Shield, 
  Headphones, 
  Smartphone,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { 
      icon: <Activity className="w-12 h-12 text-white" />, 
      title: 'Real-time Updates', 
      description: 'Doctors provide instant updates on patient conditions with live monitoring.',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    { 
      icon: <Heart className="w-12 h-12 text-white" />, 
      title: 'Health Tracking', 
      description: 'Caregivers track vitals and medications with precision and care.',
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100'
    },
    { 
      icon: <Users className="w-12 h-12 text-white" />, 
      title: 'Family Connection', 
      description: 'Families stay connected with real-time notifications and updates.',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    { 
      icon: <Zap className="w-12 h-12 text-white" />, 
      title: 'Emergency Alerts', 
      description: 'Instant alerts ensure rapid response in critical situations.',
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100'
    }
  ];

  const benefits = [
    { 
      icon: <Shield className="w-16 h-16 text-white" />, 
      title: 'HIPAA Compliant', 
      description: 'Your data is protected with enterprise-grade security and encryption.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    { 
      icon: <Headphones className="w-16 h-16 text-white" />, 
      title: '24/7 Support', 
      description: 'Round-the-clock assistance whenever you need help or guidance.',
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      icon: <Smartphone className="w-16 h-16 text-white" />, 
      title: 'Mobile Ready', 
      description: 'Access your dashboard from any device, anywhere, anytime.',
      gradient: 'from-orange-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-32 right-1/3 w-24 h-24 bg-gradient-to-br from-yellow-400/15 to-orange-400/15 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Header */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Medical
              </span>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                About
              </button>
              
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              
              <button 
                onClick={() => navigate('/register')}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

  {/* Hero Section */}
<section className="relative z-10 pt-20 pb-32">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Side - Content */}
      <div className="animate-slideInLeft">
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 mr-2" />
            New: Real-time Health Monitoring
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Medical
            </span>
            <br />
            <span className="text-gray-800">Monitoring</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Stay informed. Stay connected. Ensure timely care with our comprehensive 
            health monitoring platform designed for families and healthcare providers.
          </p>
                   
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => navigate('/register')}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl font-medium"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>

            {/* Right Side - Visual */}
            <div className="animate-slideInRight">
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <Activity className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Real-time Health Monitoring
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Professional healthcare monitoring with personalized attention at your fingertips
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-600">Monitoring</div>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-600">99.9%</div>
                        <div className="text-sm text-gray-600">Uptime</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">1000+</div>
                        <div className="text-sm text-gray-600">Families</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Better Care</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to keep families connected and healthcare providers informed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose 
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Smart Medical?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with security, reliability, and user experience at the forefront
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group text-center animate-slideInUp"
                style={{ animationDelay: `${0.6 + index * 0.2}s` }}
              >
                <div className={`w-24 h-24 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  {/* CTA Section */}
<section className="relative z-10 py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
  <div className="absolute inset-0">
    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
    <div className="absolute bottom-16 right-16 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
    <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
  </div>
         
  <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fadeIn">
    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
      Smart Medical Monitoring
    </h2>
    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
      Advanced health monitoring solutions designed to provide comprehensive 
      medical oversight and improved patient outcomes through innovative technology.
    </p>
  </div>
</section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Smart Medical</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Empowering families and healthcare providers with innovative monitoring solutions 
                for better health outcomes and peace of mind.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Users className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Shield className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button className="hover:text-white transition-colors">Features</button></li>
                <li><button className="hover:text-white transition-colors">Pricing</button></li>
                <li><button className="hover:text-white transition-colors">Security</button></li>
                <li><button className="hover:text-white transition-colors">Updates</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><button className="hover:text-white transition-colors">Help Center</button></li>
                <li><button className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Smart Medical Monitoring. All rights reserved. Built with care for better health outcomes.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default Home;
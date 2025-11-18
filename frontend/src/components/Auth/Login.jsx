
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, Heart, Shield, CheckCircle } from 'lucide-react';

const roleOptions = [
  { 
    value: 'doctor', 
    label: 'Doctor', 
    icon: '🩺',
    path: '/doctor/overview',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    activeColor: 'border-blue-500 bg-blue-50'
  },
  { 
    value: 'caregiver', 
    label: 'Caregiver', 
    icon: '🤲',
    path: '/caregiver/overview',
    gradient: 'from-green-500 to-green-600',
    bgGradient: 'from-green-50 to-green-100',
    borderColor: 'border-green-200',
    activeColor: 'border-green-500 bg-green-50'
  },
  { 
    value: 'family', 
    label: 'Family Member', 
    icon: '👨‍👩‍👧‍👦',
    path: '/family/overview',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    activeColor: 'border-purple-500 bg-purple-50'
  }
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('doctor');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-fill form data from registration
  useEffect(() => {
    // Check for data passed from registration via navigation state
    if (location.state?.fromRegistration) {
      setFormData(prev => ({
        ...prev,
        email: location.state.email || ''
      }));
      setSelectedRole(location.state.role || 'doctor');
      if (location.state.message) {
        setSuccessMessage(location.state.message);
        // Clear the message after 5 seconds
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!selectedRole) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRoleRedirectPath = () => {
    const role = roleOptions.find(r => r.value === selectedRole);
    return role ? role.path : '/dashboard';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      }),
    });

    const data = await response.json();
      
      if (data.success) {
        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', selectedRole);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          console.log('Remember me enabled');
        }
        
        const redirectPath = getRoleRedirectPath();
        console.log(`🔥 Redirecting ${selectedRole} to:`, redirectPath);
        
        // Navigate to role-specific overview page
        navigate(redirectPath);
        
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setErrors({ general: 'Network error. Please check your connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

  const selectedRoleData = roleOptions.find(r => r.value === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 right-1/3 w-8 h-8 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="w-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20">
                <Heart className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute bottom-32 right-32">
                <Shield className="w-12 h-12 text-white animate-bounce" />
              </div>
              <div className="absolute top-1/2 left-1/4">
                <User className="w-10 h-10 text-white animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            <div className="relative z-10 text-center text-white px-12">
              <div className="mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm animate-pulse">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4 animate-fadeIn">
                  Welcome to <span className="text-blue-200">HealthCare</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                  Compassionate care with personalized attention for every patient
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-slideInLeft" style={{ animationDelay: '0.6s' }}>
                  <h3 className="font-semibold mb-2">🏥 Professional Care</h3>
                  <p className="text-sm text-blue-100">Expert medical professionals at your service</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-slideInLeft" style={{ animationDelay: '0.9s' }}>
                  <h3 className="font-semibold mb-2">📱 Easy Monitoring</h3>
                  <p className="text-sm text-blue-100">Track health metrics with intuitive dashboards</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 animate-slideInLeft" style={{ animationDelay: '1.2s' }}>
                  <h3 className="font-semibold mb-2">👨‍👩‍👧‍👦 Family Connection</h3>
                  <p className="text-sm text-blue-100">Keep families connected to their loved ones</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slideInRight">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your healthcare dashboard</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Success Message from Registration */}
                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-slideInDown">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      {successMessage}
                    </div>
                  </div>
                )}

                {/* General Error */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-shake">
                    <div className="flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      {errors.general}
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.email 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter your email"
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm animate-fadeIn">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        errors.password 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm animate-fadeIn">{errors.password}</p>
                  )}
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Your Role <span className="text-red-500">*</span>
                  </label>
                  {errors.role && (
                    <p className="text-red-500 text-sm animate-fadeIn">{errors.role}</p>
                  )}
                  <div className="space-y-2">
                    {roleOptions.map((role) => (
                      <div 
                        key={role.value}
                        className={`relative cursor-pointer border-2 rounded-lg p-3 transition-all duration-200 hover:shadow-md ${
                          selectedRole === role.value 
                            ? `${role.activeColor} shadow-lg transform scale-[1.02]`
                            : `${role.borderColor} hover:${role.borderColor.replace('200', '300')}`
                        }`}
                        onClick={() => handleRoleSelect(role.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-gradient-to-r ${role.bgGradient}`}>
                            {role.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{role.label}</div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            selectedRole === role.value 
                              ? `border-${role.gradient.split('-')[1]}-500 bg-${role.gradient.split('-')[1]}-500`
                              : 'border-gray-300'
                          }`}>
                            {selectedRole === role.value && (
                              <div className="w-3 h-3 bg-white rounded-full mx-auto mt-0.5 animate-scaleIn"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    disabled={isLoading}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button 
                  type="submit" 
                  disabled={isLoading || !selectedRole}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isLoading || !selectedRole
                      ? 'bg-gray-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${selectedRoleData?.gradient} hover:shadow-lg focus:ring-blue-500`
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Sign In as {selectedRoleData?.label}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                  </div>
                </div>

                {/* Sign Up Button */}
                <button 
                  type="button" 
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border-2 border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Create Your Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
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
        
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Login;
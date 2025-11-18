

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Heart, Shield, Users, Phone, User, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [role, setRole] = useState('family');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const roleOptions = [
    { 
      value: 'doctor', 
      label: 'Doctor', 
      icon: '🩺',
      color: 'blue',
      description: 'Medical Professional - Diagnose and treat patients',
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      hoverBg: 'hover:bg-blue-50'
    },
    { 
      value: 'caregiver', 
      label: 'Caregiver', 
      icon: '🤲',
      color: 'green',
      description: 'Care Provider - Assist with daily health management',
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      hoverBg: 'hover:bg-green-50'
    },
    { 
      value: 'family', 
      label: 'Family Member', 
      icon: '❤️',
      color: 'purple',
      description: 'Family Member - Stay connected with loved ones health',
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      hoverBg: 'hover:bg-purple-50'
    }
  ];

  // Update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error && (name === 'email' || name === 'password' || name === 'confirmPassword')) {
      setError('');
    }
  };

  const handleRegister = async () => {
    // Clear previous messages
    setError('');
    setSuccess(false);
    
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;

    // Validation
    if (!firstName.trim()) {
      setError('First name is required');
      return;
    }
    
    if (!lastName.trim()) {
      setError('Last name is required');
      return;
    }
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Optional: Phone validation
    if (phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = registeredUsers.find(user => 
      user.email === email && user.role === role
    );

    if (userExists) {
      setError('An account with this email and role already exists. Please login instead.');
      return;
    }

    setIsLoading(true);
    
    try {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    })
  });

  const data = await response.json();

  if (data.success) {
    console.log("✅ Registration successful:", data);

    setSuccess(true);
    setTimeout(() => {
      navigate("/login", {
        state: {
          fromRegistration: true,
          email: email,
          role: role,
          message: "Account created successfully! Please sign in."
        }
      });
    }, 2000);
  } else {
    setError(data.message || "Registration failed. Please try again.");
  }
} catch (err) {
  console.error("❌ Registration failed:", err);
  setError("Network error. Please check your connection and try again.");
} finally {
  setIsLoading(false);
}
  }

  // Handle login link click
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Handle role card click
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setError(''); // Clear errors when selecting role
  };

  const selectedRoleData = roleOptions.find(r => r.value === role);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const passwordsDontMatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-16 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-pink-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-32 right-1/4 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-20 text-blue-300 animate-float">
          <UserPlus size={32} />
        </div>
        <div className="absolute top-1/2 left-16 text-pink-300 animate-float" style={{ animationDelay: '1s' }}>
          <Heart size={28} />
        </div>
        <div className="absolute bottom-20 right-32 text-green-300 animate-float" style={{ animationDelay: '2s' }}>
          <Shield size={26} />
        </div>
        <div className="absolute top-1/3 left-1/4 text-purple-300 animate-float" style={{ animationDelay: '0.5s' }}>
          <Users size={24} />
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Role Selection */}
        <div className="hidden lg:flex lg:w-2/5 relative">
          <div className="w-full bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 flex flex-col justify-center relative overflow-hidden p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20">
                <Heart className="w-16 h-16 text-white animate-pulse" />
              </div>
              <div className="absolute bottom-32 right-32">
                <Shield className="w-12 h-12 text-white animate-bounce" />
              </div>
              <div className="absolute top-1/2 right-1/4">
                <Users className="w-10 h-10 text-white animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            <div className="relative z-10 text-white">
              <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 animate-fadeIn">
                  Choose Your
                  <span className="block text-purple-200 mt-2">Care Role</span>
                </h1>
                <p className="text-xl text-purple-100 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                  Select the role that best describes how you'll be using our health monitoring platform.
                </p>
              </div>

              {/* Role Cards */}
              <div className="space-y-4">
                {roleOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className={`cursor-pointer p-6 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] animate-slideInLeft ${
                      role === option.value 
                        ? 'bg-white/20 shadow-xl border-2 border-white/30' 
                        : 'bg-white/10 hover:bg-white/15 border-2 border-white/10'
                    }`}
                    onClick={() => handleRoleSelect(option.value)}
                    style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{option.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{option.label}</h3>
                        <p className="text-purple-100 text-sm">{option.description}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                        role === option.value 
                          ? 'border-white bg-white'
                          : 'border-white/50'
                      }`}>
                        {role === option.value && (
                          <div className="w-2 h-2 bg-purple-600 rounded-full mx-auto mt-1 animate-scaleIn"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slideInRight">
              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedRoleData?.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 animate-bounce`}>
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join our health monitoring family</p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg animate-slideInDown">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium">Account created successfully!</p>
                      <p className="text-sm text-green-600">Redirecting to login...</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && !success && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg animate-shake">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                      <p className="font-medium">{error}</p>
                    </div>
                    <button 
                      onClick={() => setError('')}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Form */}
              <div className="space-y-6">
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-300 transition-all duration-200"
                        placeholder="Enter your first name"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-300 transition-all duration-200"
                        placeholder="Enter your last name"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-300 transition-all duration-200"
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-300 transition-all duration-200"
                        placeholder="Enter your phone (optional)"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile Role Selection (for smaller screens) */}
                <div className="lg:hidden space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    I am a... <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {roleOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all duration-200 ${
                          role === option.value 
                            ? `border-${option.color}-500 bg-${option.color}-50 shadow-lg`
                            : `border-gray-200 hover:border-${option.color}-300 ${option.hoverBg}`
                        }`}
                        onClick={() => handleRoleSelect(option.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{option.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{option.label}</h3>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                            role === option.value 
                              ? `border-${option.color}-500 bg-${option.color}-500`
                              : 'border-gray-300'
                          }`}>
                            {role === option.value && (
                              <div className="w-3 h-3 bg-white rounded-full mx-auto mt-0.5 animate-scaleIn"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Password Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Create Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-300 transition-all duration-200"
                        placeholder="Create password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {formData.password && formData.password.length < 6 && (
                      <p className="text-red-500 text-sm animate-fadeIn">Password must be at least 6 characters</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                          passwordsDontMatch
                            ? 'border-red-300 bg-red-50'
                            : passwordsMatch
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Confirm password"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {passwordsDontMatch && (
                      <p className="text-red-500 text-sm animate-fadeIn flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Passwords do not match
                      </p>
                    )}
                    {passwordsMatch && (
                      <p className="text-green-500 text-sm animate-fadeIn flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Passwords match
                      </p>
                    )}
                  </div>
                </div>

                {/* Register Button */}
                <button
                  onClick={handleRegister}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${selectedRoleData?.gradient} hover:shadow-lg focus:ring-purple-500`
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Create My Account 🎉
                      <UserPlus className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button 
                      onClick={handleLoginClick}
                      className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                      disabled={isLoading}
                    >
                      Sign In Here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Register;
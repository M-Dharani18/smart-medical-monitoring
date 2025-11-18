
const User = require('../models/User');
const Doctor = require('../models/Doctor'); // Add this import
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password, role, phone, firstName, lastName } = req.body;

    console.log('Registration attempt:', { email, role, phone });

    // Basic validation
    if (!email || !password || !role) {
      console.log('Missing required fields:', { email, password, role });
      return res.status(400).json({
        success: false,
        message: 'Email, password, and role are required',
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Create user with available data
    const userData = {
      email: email.toLowerCase().trim(),
      password,
      role,
      phone: phone ? phone.trim() : '',
      firstName: firstName ? firstName.trim() : '',
      lastName: lastName ? lastName.trim() : '',
    };

    console.log('Creating user with data:', userData);

    const user = await User.create(userData);

    console.log('User created successfully:', user._id);

    // Generate token
    const token = user.getSignedJwtToken();

    // Create display name
    const displayName = user.firstName || user.lastName 
      ? `${user.firstName} ${user.lastName}`.trim()
      : user.email.split('@')[0];

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: displayName,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        isProfileComplete: role === 'doctor' ? false : true // Doctors need to complete profile
      },
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      console.log('Validation errors:', messages);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      console.log('Duplicate key error:', error.keyValue);
      return res.status(400).json({
        success: false,
        message: `User already exists with ${Object.keys(error.keyValue)[0]}: ${Object.values(error.keyValue)[0]}`,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', email);

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated',
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = user.getSignedJwtToken();

    // Create display name
    const displayName = user.firstName || user.lastName 
      ? `${user.firstName} ${user.lastName}`.trim()
      : user.email.split('@')[0];

    // Prepare base user data
    let userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: displayName,
      phone: user.phone,
      isEmailVerified: user.isEmailVerified,
    };

    // If doctor, fetch doctor profile from Doctor collection
    if (user.role === 'doctor') {
      const doctorProfile = await Doctor.findOne({ userId: user._id });
      
      if (doctorProfile) {
        userData = {
          ...userData,
          specialization: doctorProfile.specialization,
          license: doctorProfile.license,
          experience: doctorProfile.experience,
          department: doctorProfile.department,
          hospitalName: doctorProfile.hospitalName,
          hospitalAddress: doctorProfile.hospitalAddress,
          hospitalPhone: doctorProfile.hospitalPhone,
          photo: doctorProfile.photo,
          isProfileComplete: doctorProfile.isProfileComplete,
          stats: doctorProfile.stats
        };
        console.log('Doctor profile loaded:', doctorProfile._id);
      } else {
        userData.isProfileComplete = false;
        console.log('No doctor profile found for user:', user._id);
      }
    }

    console.log('Login successful:', displayName);

    res.json({
      success: true,
      token,
      user: userData,
      role: user.role
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    console.log('Getting user profile for:', req.user.id);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Create display name
    const displayName = user.firstName || user.lastName 
      ? `${user.firstName} ${user.lastName}`.trim()
      : user.email.split('@')[0];

    // Prepare base user data
    let userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: displayName,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };

    // If user is a doctor, fetch doctor profile from Doctor collection
    if (user.role === 'doctor') {
      const doctorProfile = await Doctor.findOne({ userId: user._id });
      
      if (doctorProfile) {
        userData = {
          ...userData,
          specialization: doctorProfile.specialization,
          license: doctorProfile.license,
          experience: doctorProfile.experience,
          department: doctorProfile.department,
          hospitalName: doctorProfile.hospitalName,
          hospitalAddress: doctorProfile.hospitalAddress,
          hospitalPhone: doctorProfile.hospitalPhone,
          photo: doctorProfile.photo,
          isProfileComplete: doctorProfile.isProfileComplete,
          stats: doctorProfile.stats
        };
        console.log('Doctor profile found:', doctorProfile._id);
      } else {
        userData.isProfileComplete = false;
        console.log('No doctor profile found - profile incomplete');
      }
    }

    res.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error('❌ Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update user profile (specifically for doctors)
// @route   PUT /api/auth/updateprofile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // For non-doctors, update User model directly
    if (user.role !== 'doctor') {
      const { firstName, lastName, phone } = req.body;

      const updateData = { firstName, lastName, phone };
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true, runValidators: true }
      ).select('-password');

      const displayName = updatedUser.firstName || updatedUser.lastName 
        ? `${updatedUser.firstName} ${updatedUser.lastName}`.trim()
        : updatedUser.email.split('@')[0];

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          email: updatedUser.email,
          role: updatedUser.role,
          name: displayName,
          phone: updatedUser.phone,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
        },
      });
    }

    // For doctors, update Doctor collection
    const {
      specialization,
      license,
      experience,
      department,
      hospitalName,
      hospitalAddress,
      hospitalPhone,
      photo
    } = req.body;

    console.log('Updating doctor profile for:', req.user.id);

    // Validate required fields for doctors
    if (!specialization || !license || !experience || !department || 
        !hospitalName || !hospitalAddress || !hospitalPhone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled (specialization, license, experience, department, hospital name, address, and phone)'
      });
    }

    // Update or create doctor profile in Doctor collection
    let doctorProfile = await Doctor.findOne({ userId: user._id });

    const displayName = user.firstName || user.lastName 
      ? `${user.firstName} ${user.lastName}`.trim()
      : user.email.split('@')[0];

    if (doctorProfile) {
      // Update existing profile
      doctorProfile.name = displayName;
      doctorProfile.email = user.email;
      doctorProfile.specialization = specialization;
      doctorProfile.license = license;
      doctorProfile.experience = experience;
      doctorProfile.department = department;
      doctorProfile.hospitalName = hospitalName;
      doctorProfile.hospitalAddress = hospitalAddress;
      doctorProfile.hospitalPhone = hospitalPhone;
      
      if (photo) {
        doctorProfile.photo = photo;
      }

      await doctorProfile.save();
      console.log('Doctor profile updated:', doctorProfile._id);
    } else {
      // Create new doctor profile
      doctorProfile = new Doctor({
        userId: user._id,
        name: displayName,
        email: user.email,
        specialization,
        license,
        experience,
        department,
        hospitalName,
        hospitalAddress,
        hospitalPhone,
        photo: photo || undefined
      });

      await doctorProfile.save();
      console.log('New doctor profile created:', doctorProfile._id);
    }

    // Prepare response data
    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: displayName,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      specialization: doctorProfile.specialization,
      license: doctorProfile.license,
      experience: doctorProfile.experience,
      department: doctorProfile.department,
      hospitalName: doctorProfile.hospitalName,
      hospitalAddress: doctorProfile.hospitalAddress,
      hospitalPhone: doctorProfile.hospitalPhone,
      photo: doctorProfile.photo,
      isProfileComplete: doctorProfile.isProfileComplete,
      stats: doctorProfile.stats
    };

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: userData
    });

  } catch (error) {
    console.error('❌ Update profile error:', error);
    
    // Handle duplicate license number error
    if (error.code === 11000 && error.keyPattern?.license) {
      return res.status(400).json({
        success: false,
        message: 'This medical license number is already registered'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Forgot password - Send reset email
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If email exists, reset link has been sent',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    console.log('🔗 Password reset URL:', resetUrl);

    res.status(200).json({
      success: true,
      message: 'If email exists, reset link has been sent',
    });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required',
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
};
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { memberService } from '../services/memberService';

const Login = ({ showToast }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    // Basic validation
    if (!formData.email || !formData.password) {
      showToast('error', 'Missing Fields', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await memberService.login(formData.email, formData.password);
      console.log('Full login response:', response);

      // Try to extract user data from various possible response structures
      let userData = null;
      let userId = null;
      let userName = null;

      // Check different possible response structures
      if (response.user) {
        userData = response.user;
      } else if (response.data && response.data.user) {
        userData = response.data.user;
      } else if (response.member) {
        userData = response.member;
      } else if (response.data && response.data.member) {
        userData = response.data.member;
      } else if (response.email) {
        // Response itself is the user object
        userData = response;
      }

      console.log('Extracted user data:', userData);

      if (userData) {
        // Extract user ID
        userId = userData.id || userData._id || userData.memberId;
        
        // Extract user name
        if (userData.firstName && userData.lastName) {
          userName = `${userData.firstName} ${userData.lastName}`;
        } else if (userData.name) {
          userName = userData.name;
        } else if (userData.firstName) {
          userName = userData.firstName;
        } else {
          userName = 'User';
        }

        console.log('Storing:', { userId, userName });

        if (userId) {
          localStorage.setItem('memberId', userId);
          localStorage.setItem('memberName', userName);

          // Also store access token if present
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
          }
          if (response.refreshToken) {
            localStorage.setItem('refreshToken', response.refreshToken);
          }

          showToast('success', 'Login Successful!', `Welcome back, ${userName.split(' ')[0]}!`);
          
          console.log('Navigating to profile...');
          
          // Redirect to profile immediately
          navigate('/profile');
        } else {
          console.error('No user ID found in response');
          showToast('error', 'Login Failed', 'Could not retrieve user information');
        }
      } else {
        console.error('No user data found in response structure');
        console.error('Full response:', JSON.stringify(response, null, 2));
        showToast('error', 'Login Failed', 'Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      console.error('Error details:', error.response?.data);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Please check your credentials and try again';
      
      showToast('error', 'Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <img
            src="https://i.postimg.cc/8P5w5Bnz/achieverlogo.png"
            alt="VASC Logo"
            className="mx-auto h-24 w-24 rounded-full"
          />
          <h2 className="mt-6 text-3xl font-bold text-vasc-navy">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your VASC account
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-vasc-orange focus:ring-vasc-orange border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-vasc-orange hover:text-vasc-gold">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-vasc-orange hover:bg-vasc-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vasc-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-medium text-vasc-orange hover:text-vasc-gold">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
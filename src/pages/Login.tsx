import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log("Im being called")
//     const { name, value } = e.target;
//     setEmail(value);
//     setPassword(value);
    
//     // Clear error when user types
//     if (errors[name as keyof typeof errors]) {
//       setErrors({
//         ...errors,
//         [name]: ''
//       });
//     }
//   };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setLoginError('');
      
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email, password})
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Success - store token and redirect
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          // Handle error response from server
          setLoginError(data.message || 'Invalid email or password');
        }
      } catch (error) {
        setLoginError('Network error. Please try again.');
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-8 sm:px-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Login to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign up for an account
              </button>
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Show login error message if any */}
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {loginError}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
                  onClick={handleLogin}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <button 
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

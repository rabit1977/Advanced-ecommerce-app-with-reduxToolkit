'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { login, signup } from '@/lib/store/thunks/authThunks';
import { showToast } from '@/lib/store/thunks/uiThunks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/lib/store/hooks';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    
    if (mode !== 'forgot') {
      if (!formData.password) newErrors.password = 'Password is required.';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    }

    if (mode === 'signup') {
      if (!formData.name) newErrors.name = 'Name is required.';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    
    if (validate()) {
      if (mode === 'login') {
        const result = dispatch(login(formData.email, formData.password));
        if (!result.success) {
          setServerError(result.message || 'Login failed');
        } else {
          router.push('/');
        }
      } else if (mode === 'signup') {
        const result = dispatch(signup(formData.name, formData.email, formData.password));
        if (!result.success) {
          setServerError(result.message || 'Signup failed');
        } else {
          setMode('login');
          setFormData(prev => ({ ...prev, name: '', password: '', confirmPassword: '' }));
        }
      } else {
        dispatch(showToast(`If an account exists for ${formData.email}, a reset link has been sent.`, 'info'));
        setMode('login');
      }
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 p-4 dark:bg-slate-900">
      <div className="w-full max-w-md">
        <div className="rounded-xl border bg-white p-6 shadow-lg dark:bg-slate-950 dark:border-slate-800">
          {mode !== 'forgot' && (
            <div className="flex border-b dark:border-slate-800">
              <button 
                onClick={() => setMode('login')} 
                className={`flex-1 p-4 font-medium ${
                  mode === 'login' 
                    ? "text-slate-900 border-b-2 border-slate-900 dark:text-white dark:border-white" 
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Login
              </button>
              <button 
                onClick={() => setMode('signup')} 
                className={`flex-1 p-4 font-medium ${
                  mode === 'signup' 
                    ? "text-slate-900 border-b-2 border-slate-900 dark:text-white dark:border-white" 
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                Sign Up
              </button>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-8">
            <AnimatePresence mode="wait">
              <motion.div 
                key={mode} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-center dark:text-white">
                    {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create an Account' : 'Reset Password'}
                  </h2>
                  
                  {serverError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {serverError}
                    </div>
                  )}
                  
                  {mode === 'signup' && (
                    <div>
                      <Input 
                        name="name" 
                        placeholder="Full Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                  )}
                  
                  <div>
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder="Email Address" 
                      value={formData.email} 
                      onChange={handleChange} 
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  {mode !== 'forgot' && (
                    <div>
                      <Input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                      />
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                  )}
                  
                  {mode === 'signup' && (
                    <div>
                      <Input 
                        name="confirmPassword" 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" size="lg">
                    {mode === 'login' ? 'Login' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  </Button>
                  
                  {mode === 'login' && (
                    <div className="text-center">
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => setMode('forgot')}
                      >
                        Forgot Password?
                      </Button>
                    </div>
                  )}
                  
                  {mode === 'forgot' && (
                    <div className="text-center">
                      <Button 
                        variant="link" 
                        size="sm" 
                        onClick={() => setMode('login')}
                      >
                        Back to Login
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AuthForm };
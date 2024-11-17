'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import { BACKEND_URL } from '@/constants/constants';

const Login = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch(`${BACKEND_URL}/auth/user-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authToken', data.token.token);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          name: data.user.name,
        })
      );
      router.push('/');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
        <LoginForm onSubmit={handleLogin} error={error} />
        <Link href='create-user'>
          <p className='mt-2 text-center text-sky-700'>
            Do not have an account yet? Create a new one!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;


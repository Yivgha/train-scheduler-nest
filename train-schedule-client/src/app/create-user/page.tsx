'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateUserForm from '../components/CreateUserForm';
import Link from 'next/link';
import { BACKEND_URL } from '@/constants/constants';

const CreateUser = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleUserCreation = async (
    name: string,
    email: string,
    password: string
  ) => {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert('User created successfully');
      router.push('/login');
    } else {
      setError('User creation failed. Please try again.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center mb-4'>Create Account</h2>
        <CreateUserForm onSubmit={handleUserCreation} error={error} />
        <Link href='login'>
          <p className='mt-2 text-center text-sky-700'>
            Already have an account? Login!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CreateUser;


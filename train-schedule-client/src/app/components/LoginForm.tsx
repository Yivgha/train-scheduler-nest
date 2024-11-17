'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginFormProps } from '../types/interfaces';
import FormInput from './FormInput';

const LoginForm = ({ onSubmit, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <FormInput
        label='Email'
        type='email'
        inputId='email'
        name='email'
        inputValue={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormInput
        label='Password'
        type='password'
        name='password'
        inputId='password'
        inputValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className='text-red-500 mt-2'>{error}</p>}
      <Button type='submit' className='mt-4 w-full'>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;


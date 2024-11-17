'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { LoginFormProps } from '../types/interfaces';

const LoginForm = ({ onSubmit, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='mt-2'
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='mt-2'
        />
      </div>
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      <Button type='submit' className='mt-4 w-full'>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;


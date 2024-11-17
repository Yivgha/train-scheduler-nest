'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreateUserFormProps } from '../types/interfaces';
import FormInput from './FormInput';

const CreateUserForm = ({ onSubmit, error }: CreateUserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <FormInput
        label='Name'
        inputId='name'
        name='name'
        inputValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        label='Email'
        inputId='email'
        name='email'
        inputValue={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
      />
      <FormInput
        label='Password'
        inputId='password'
        name='password'
        inputValue={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
      />
      {error && <p className='text-red-500 mt-2'>{error}</p>}
      <Button type='submit' className='mt-4 w-full'>
        Create Account
      </Button>
    </form>
  );
};

export default CreateUserForm;


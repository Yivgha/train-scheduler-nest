'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreateUserFormProps } from '../types/interfaces';
import FormUserInput from './FormUserInput';

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
      <FormUserInput
        label='Name'
        inputId='name'
        inputValue={name}
        setValue={setName}
        onChange={(e) => setName(e.target.value)}
      />
      <FormUserInput
        label='Email'
        inputId='email'
        inputValue={email}
        setValue={setEmail}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
      />
      <FormUserInput
        label='Password'
        inputId='password'
        inputValue={password}
        setValue={setPassword}
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


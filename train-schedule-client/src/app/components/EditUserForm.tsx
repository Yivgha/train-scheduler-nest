'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/app/types/interfaces';
import { Button } from '@/components/ui/button';
import { EditUserFormProps } from '@/app/types/interfaces';
import FormInput from './FormInput';

const EditUserForm = ({ onSubmit, error }: EditUserFormProps) => {
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        const data = await res.json();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, password, role);
  };

  return (
    <div className='w-full h-full py-8 px-6 bg-white rounded-lg shadow-lg flex flex-col gap-4'>
      <h1 className='text-3xl sm:text-4xl font-semibold text-center text-gray-800'>
        Edit {user?.name} Profile
      </h1>
      <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
        <FormInput
          label='Name'
          inputId='name'
          inputValue={name}
          name='name'
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label='Email'
          inputId='email'
          type='email'
          name='email'
          inputValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label='Password'
          inputId='password'
          type='password'
          name='password'
          inputValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          label='Role'
          inputId='role'
          name='role'
          inputValue={role}
          onChange={(e) => setRole(e.target.value)}
        />

        {error && <p className='text-red-500 mt-2'>{error}</p>}

        <Button type='submit' className='mt-4'>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditUserForm;


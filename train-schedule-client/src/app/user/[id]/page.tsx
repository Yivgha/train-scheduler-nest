'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { User } from '@/app/types/interfaces';
import GoBackButton from '@/app/components/GoBackButton';
import Loader from '@/app/components/Loader';
import EditUserForm from '@/app/components/EditUserForm';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);

        setError('Failed to fetch user details');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        throw new Error('Failed to update user details');
      }

      const updatedUser = { ...user, role };
      localStorage.setItem('userData', JSON.stringify(updatedUser));

      window.location.reload();
    } catch (error) {
      console.error('Error submitting user details:', error);
      setError('Failed to save changes');
    }
  };

  if (!user) return <Loader />;

  return (
    <div className='w-full h-full py-8 px-6 bg-white rounded-lg shadow-lg flex flex-col gap-4'>
      <GoBackButton onClick={() => router.back()} />

      <EditUserForm onSubmit={handleSubmit} error={error} />
    </div>
  );
}


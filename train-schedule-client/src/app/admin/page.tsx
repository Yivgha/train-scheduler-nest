'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types/interfaces';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    router.push('/unauthorized');
    return null;
  }

  if (user.role !== 'admin') {
    router.push('/unauthorized');
    return null;
  }

  return (
    <div className='admin-page'>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Only accessible by admin.</p>
    </div>
  );
}

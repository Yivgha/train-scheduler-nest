import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setIsAuthenticated(true);
      setUserId(JSON.parse(userData).id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <header className='bg-gray-800 text-white p-4 w-full flex flex-row items-center justify-between'>
      <Link href='/'>
        <h1 className='text-xl'>Train Scheduler</h1>
      </Link>
      <nav className='flex flex-row items-center justify-between gap-2'>
        {isAuthenticated ? (
          <>
            <Link href={`/user/${userId}`}>
              <Button>Profile</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Button>Login</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;


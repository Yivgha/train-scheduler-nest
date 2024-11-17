'use client';

import GoBackButton from '../components/GoBackButton';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  const goBack = () => router.push('/');

  return (
    <div className='px-20 py-8 flex flex-col items-start'>
      <GoBackButton onClick={() => goBack()} />
      <h1 className='text-3xl font-semibold text-red-500 mt-6 self-center'>
        You do not have permission to access this page.
      </h1>
    </div>
  );
}


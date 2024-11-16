'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Train } from '@/app/types/interfaces';
import GoBackButton from '@/app/components/GoBackButton';
import Loader from '@/app/components/Loader';
import InfoRow from '@/app/components/InfoRow';
import formatDate from '@/app/utils/formatDate';

export default function TrainDetail() {
  const [train, setTrain] = useState<Train | null>(null);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const res = await fetch(`/api/trains/${id}`);
        const data = await res.json();
        setTrain(data);
      } catch (error) {
        console.error('Error fetching train details:', error);
      }
    };

    fetchTrain();
  }, [id]);

  if (!train) return <Loader />;

  return (
    <div className='container w-full h-full py-8 px-6 bg-white rounded-lg shadow-lg flex flex-col gap-2'>
      <GoBackButton onClick={() => router.back()} />

      <div className='mt-6'>
        <h1 className='text-3xl sm:text-4xl font-semibold text-center sm:text-left text-gray-800'>
          {train.name}
        </h1>

        <div className='mt-4 space-y-6'>
          <InfoRow text='Train ID:' info={`#${train.id}`} />
          <InfoRow text='From:' info={train.fromDestination} />
          <InfoRow text='To:' info={train.toDestination} />
          <InfoRow text='Date:' info={formatDate(train.date)} />
        </div>
      </div>
    </div>
  );
}


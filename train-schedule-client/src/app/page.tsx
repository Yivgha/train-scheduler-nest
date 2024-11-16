'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Train } from './types/interfaces';
import TrainCard from './components/TrainCard';

export default function Home() {
  const [trains, setTrains] = useState<Train[]>([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const res = await fetch('/api/trains');
        const data = await res.json();
        setTrains(data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div className='flex flex-col items-center justify-between min-h-screen min-w-full p-0 gap-16 font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='w-full flex flex-col gap-4 justify-between items-center'>
        <h1 className='text-center mt-8 mb-4 text-3xl font-semibold'>
          Train Schedule
        </h1>
        <div className='w-full px-5'>
          {trains.length > 0 ? (
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center'>
              {trains.map((train) => (
                <TrainCard key={train.id} trainInfo={train} />
              ))}
            </ul>
          ) : (
            <p className='text-center'>No trains yet</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Train } from './types/interfaces';
import TrainCard from './components/TrainCard';
import SearchBar from './components/Searchbar';

export default function Home() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [filteredTrains, setFilteredTrains] = useState<Train[]>([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const res = await fetch('/api/trains');

        const data = await res.json();

        setTrains(data);
        setFilteredTrains(data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredTrains(trains);
    } else {
      setFilteredTrains(
        trains.filter(
          (train) =>
            train.name.toLowerCase().includes(query.toLowerCase()) ||
            train.id.toString().includes(query) ||
            train.fromDestination.toLowerCase().includes(query.toLowerCase()) ||
            train.toDestination.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className='flex flex-col items-center justify-between min-h-screen min-w-full p-0 gap-16 font-[family-name:var(--font-geist-sans)]'>
      <Header />
      <main className='w-full flex flex-col gap-4 justify-between items-center'>
        <h1 className='text-center mt-8 mb-4 text-3xl font-semibold'>
          Train Schedule
        </h1>
        <SearchBar onSearch={handleSearch} />
        <div className='w-full px-5'>
          {filteredTrains.length > 0 ? (
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center'>
              {filteredTrains.map((train) => (
                <TrainCard key={train.id} trainInfo={train} />
              ))}
            </ul>
          ) : (
            <p className='text-center'>No trains found</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../types/interfaces';
import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';
import { Button } from '@/components/ui/button';
import FormInput from '../components/FormInput';
import { DateTimePicker } from '../components/DateTimePicker';
import { Label } from '@/components/ui/label';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [trainData, setTrainData] = useState({
    name: '',
    fromDestination: '',
    toDestination: '',
    date: '',
  });
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  if (!user || user.role !== 'admin') {
    router.push('/unauthorized');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrainData({
      ...trainData,
      [name]: value,
    });
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setTrainData((prev) => ({
      ...prev,
      date: selectedDate ? selectedDate.toISOString() : '',
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/trains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainData),
      });

      if (!response.ok) {
        console.error('Error submitting train data');
        alert('Failed to submit train data.');
      } else {
        alert('Train data submitted successfully!');
        setTrainData({
          name: '',
          fromDestination: '',
          toDestination: '',
          date: '',
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full h-full py-8 px-6 bg-white rounded-lg shadow-lg flex flex-col gap-4'>
      <GoBackButton onClick={() => router.push('/')} />
      <h1 className='text-3xl sm:text-4xl font-semibold text-center text-gray-800'>
        Welcome to the Admin Dashboard
      </h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-center py-6 px-10 w-full'>
        <li className='flex justify-center'>
          <Button
            onClick={() => {
              setTrainData({ ...trainData });
              setShowForm(true);
            }}
          >
            Add new train card
          </Button>
        </li>
        <li className='flex justify-center'>
          <Button>Edit train card</Button>
        </li>
        <li className='flex justify-center'>
          <Button>Delete train card</Button>
        </li>
      </ul>

      {showForm === true && (
        <form onSubmit={handleFormSubmit} className='mt-6 space-y-4'>
          <FormInput
            label='Train Name'
            inputId='name'
            name='name'
            inputValue={trainData.name}
            onChange={handleInputChange}
          />
          <FormInput
            label='From Destination'
            name='fromDestination'
            inputId='fromDestination'
            inputValue={trainData.fromDestination}
            onChange={handleInputChange}
          />
          <FormInput
            label='To Destination'
            name='toDestination'
            inputId='toDestination'
            inputValue={trainData.toDestination}
            onChange={handleInputChange}
          />

          <div className='flex items-center gap-4'>
            <div className='flex flex-col w-1/2'>
              <Label htmlFor='date'>Date and Time</Label>
              <DateTimePicker
                value={trainData.date ? new Date(trainData.date) : undefined}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <Button type='submit'>Submit</Button>
        </form>
      )}
    </div>
  );
}


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
import AlertPrompt from '../components/AlertPrompt';

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
  const [editing, setEditing] = useState(false);
  const [trainId, setTrainId] = useState<string | null>(null);
  const [showIdPrompt, setShowIdPrompt] = useState(false);
  const [trainIdInput, setTrainIdInput] = useState('');
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [deleteTrainId, setDeleteTrainId] = useState('');

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (trainId && editing) {
      fetch(`/api/trains/${trainId}`)
        .then((response) => response.json())
        .then((data) => setTrainData(data))
        .catch((error) => console.error('Error fetching train data:', error));
    }
  }, [trainId, editing]);

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
    const method = editing ? 'PATCH' : 'POST';
    const url = editing ? `/api/trains/${trainId}` : '/api/trains';

    try {
      const response = await fetch(url, {
        method,
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
        setEditing(false);
        setTrainId(null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditClick = () => {
    setShowIdPrompt(true);
  };

  const handleIdSubmit = async () => {
    if (!trainIdInput.trim() || isNaN(Number(trainIdInput))) {
      alert('Please enter a valid numeric Train ID.');
      return;
    }

    try {
      const response = await fetch(`/api/trains/${trainIdInput.trim()}`);

      if (!response.ok) {
        alert('Train not found. Please enter a valid Train ID.');
        return;
      }

      setTrainId(trainIdInput.trim());
      setShowIdPrompt(false);
      setEditing(true);
      setShowForm(true);
    } catch (error) {
      console.error(error);
      alert(
        'An error occurred while fetching the train. Please try again later.'
      );
    }
  };

  const handleDeleteSubmit = async () => {
    if (deleteTrainId.trim()) {
      try {
        const response = await fetch(`/api/trains/${deleteTrainId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          alert(`Failed to delete train with ID ${deleteTrainId}`);
        } else {
          const result = await response.json();
          alert(result.message);
        }
      } catch (error) {
        console.error('Error deleting train:', error);
        alert('Error deleting the train.');
      }
      setShowDeletePrompt(false);
      setDeleteTrainId('');
    } else {
      alert('Please enter a valid Train ID.');
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
          <Button onClick={handleEditClick}>Edit train card</Button>
        </li>
        <li className='flex justify-center'>
          <Button onClick={() => setShowDeletePrompt(true)}>
            Delete train card
          </Button>
        </li>
      </ul>

      {/* Train ID input prompt */}
      {showIdPrompt && (
        <AlertPrompt
          title='Enter Train ID to Edit:'
          inputValue={trainIdInput}
          onInputChange={(e) => setTrainIdInput(e.target.value)}
          onSubmit={handleIdSubmit}
          onCancel={() => setShowIdPrompt(false)}
          placeholder='Enter Train ID'
        />
      )}

      {/* Delete Train ID input prompt */}
      {showDeletePrompt && (
        <AlertPrompt
          title='Enter Train ID to Delete:'
          inputValue={deleteTrainId}
          onInputChange={(e) => setDeleteTrainId(e.target.value)}
          onSubmit={handleDeleteSubmit}
          onCancel={() => setShowDeletePrompt(false)}
          placeholder='Enter Train ID'
        />
      )}

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

          <Button type='submit'>{editing ? 'Update' : 'Submit'}</Button>
        </form>
      )}
    </div>
  );
}


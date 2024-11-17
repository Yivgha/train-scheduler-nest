import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SearchBarProps } from '../types/interfaces';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className='w-full max-w-sm mx-auto mb-6'>
      <Input
        type='text'
        placeholder='Search by train name, city or ID...'
        value={query}
        onChange={handleSearch}
        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  );
};

export default SearchBar;


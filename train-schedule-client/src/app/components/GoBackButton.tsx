import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '../types/interfaces';

const GoBackButton = ({ onClick }: ButtonProps) => {
  return (
    <Button
      variant='outline'
      onClick={onClick}
      className='text-blue-600 hover:bg-blue-100 mb-4 sm:mb-6 w-36 h-8'
    >
      Go back
    </Button>
  );
};

export default GoBackButton;

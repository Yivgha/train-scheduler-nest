import { Button } from '@/components/ui/button';
import { AlertPromptProps } from '../types/interfaces';

const AlertPrompt = ({
  title,
  inputValue,
  onInputChange,
  onSubmit,
  onCancel,
  placeholder,
}: AlertPromptProps) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg'>
        <h3 className='text-xl mb-4'>{title}</h3>
        <input
          type='text'
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          className='border p-2 mb-4 w-full'
        />
        <div className='flex gap-4'>
          <Button onClick={onSubmit}>Submit</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default AlertPrompt;


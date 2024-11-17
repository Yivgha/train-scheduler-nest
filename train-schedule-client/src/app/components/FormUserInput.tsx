import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormUserInputProps } from '../types/interfaces';

const FormUserInput = ({
  label,
  inputId,
  inputValue,
  onChange,
  type = 'text',
}: FormUserInputProps) => {
  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        type={type}
        id={inputId}
        value={inputValue}
        onChange={onChange}
        required
        className='mt-2'
      />
    </div>
  );
};

export default FormUserInput;


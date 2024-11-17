import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormInputProps } from '../types/interfaces';

const FormInput = ({
  label,
  inputId,
  inputValue,
  name,
  onChange,
  type = 'text',
}: FormInputProps) => {
  return (
    <div>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        type={type}
        id={inputId}
        value={inputValue}
        onChange={onChange}
        required
        name={name}
        className='mt-2'
      />
    </div>
  );
};

export default FormInput;


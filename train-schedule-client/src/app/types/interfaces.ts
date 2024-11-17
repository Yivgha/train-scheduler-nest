export interface Train {
  id: number;
  name: string;
  fromDestination: string;
  toDestination: string;
  date: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface ButtonProps {
  onClick: () => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface CreateUserFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  error: string;
}

export interface EditUserFormProps {
  onSubmit: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => void;
  error: string;
}

export interface FormUserInputProps {
  label: string;
  inputId: string;
  inputValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string;
}


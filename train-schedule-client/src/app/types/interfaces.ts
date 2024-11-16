export interface Train {
  id: number;
  name: string;
  fromDestination: string;
  toDestination: string;
  date: string;
}

export interface ButtonProps {
  onClick: () => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

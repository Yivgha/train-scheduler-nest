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

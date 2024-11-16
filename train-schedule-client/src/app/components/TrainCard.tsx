import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Train } from '../types/interfaces';

export const TrainCard = ({ trainInfo }: { trainInfo: Train }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          ID #{trainInfo.id} - {trainInfo.name}
        </CardTitle>
        <CardDescription>Date: {trainInfo.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>From: {trainInfo.fromDestination}</p>
      </CardContent>
      <CardFooter>
        <p>To: {trainInfo.toDestination}</p>
      </CardFooter>
    </Card>
  );
};


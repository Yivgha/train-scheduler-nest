import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Train } from '../types/interfaces';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const TrainCard = ({ trainInfo }: { trainInfo: Train }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{trainInfo.name}</CardTitle>
        <CardDescription>Date: {trainInfo.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>From: {trainInfo.fromDestination}</p>
        <p>To: {trainInfo.toDestination}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/train/${trainInfo.id}`}>
          <Button className='mt-2 text-blue-600' variant='outline'>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TrainCard;

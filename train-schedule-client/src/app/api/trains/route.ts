import { CreateTrainProps } from '@/app/types/interfaces';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/trains');
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return NextResponse.json(
        { message: 'Error fetching trains from backend' },
        { status: 500 }
      );
    }
    const trains = await response.json();
    return NextResponse.json(trains);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const trainData: CreateTrainProps = await request.json();
    const response = await fetch('http://localhost:3001/trains', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trainData),
    });

    if (!response.ok) {
      console.error('Failed to submit train data:', response.statusText);
      return NextResponse.json(
        { message: 'Error submitting train data. Please try again.' },
        { status: 500 }
      );
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Error submitting train data:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


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


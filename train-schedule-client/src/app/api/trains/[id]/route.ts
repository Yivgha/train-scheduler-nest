import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const trainID = url.pathname.split('/').pop();

    console.log('train id', trainID);

    const response = await fetch(`http://localhost:3001/trains/${trainID}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Train with ID ${trainID} not found` },
        { status: 404 }
      );
    }

    const train = await response.json();

    console.log('train info', train);

    return NextResponse.json(train);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}


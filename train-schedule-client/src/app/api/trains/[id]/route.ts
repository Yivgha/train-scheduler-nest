import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/constants/constants';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const trainID = url.pathname.split('/').pop();

    const response = await fetch(`${BACKEND_URL}/trains/${trainID}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Train with ID ${trainID} not found` },
        { status: 404 }
      );
    }

    const train = await response.json();

    return NextResponse.json(train);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url);
    const trainID = url.pathname.split('/').pop();
    const updatedTrain = await req.json();

    const response = await fetch(`${BACKEND_URL}/trains/${trainID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTrain),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to update train with ID ${trainID}` },
        { status: 400 }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const trainID = url.pathname.split('/').pop();

    const response = await fetch(`${BACKEND_URL}/trains/${trainID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to delete train with ID ${trainID}` },
        { status: 400 }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


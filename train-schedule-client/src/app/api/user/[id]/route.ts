import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/constants/constants';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userID = url.pathname.split('/').pop();

    const response = await fetch(`${BACKEND_URL}/users/${userID}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `User with ID ${userID} not found` },
        { status: 404 }
      );
    }

    const user = await response.json();

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const userID = url.pathname.split('/').pop();
    const updatedUser = await req.json();

    const response = await fetch(`${BACKEND_URL}/users/${userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to update user with ID ${userID}` },
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


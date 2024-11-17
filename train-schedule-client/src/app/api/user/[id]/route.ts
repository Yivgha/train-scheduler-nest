import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userID = url.pathname.split('/').pop();

    console.log('user id', userID);

    const response = await fetch(`http://localhost:3001/users/${userID}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `User with ID ${userID} not found` },
        { status: 404 }
      );
    }

    const user = await response.json();

    console.log('user info', user);

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const userID = url.pathname.split('/').pop();
    const updatedUser = await req.json();

    const response = await fetch(`http://localhost:3001/users/${userID}`, {
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


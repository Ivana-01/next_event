import { NextResponse } from 'next/server';
import User from '@/models/user';
import {connectToDB} from '@/utils/db';

export async function GET(request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log(id)
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }
    const user = await User.findById(id).populate('bookedEvents')
    console.log(user.bookedEvents)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user.bookedEvents, { status: 200 });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { eventId, userId } = body;
    console.log('Parsed eventId:', eventId, 'Parsed userId:', userId);
    if (!eventId || !userId) {
      return NextResponse.json({ message: 'Missing eventId or userId' }, { status: 400 });
    }
    await connectToDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const isBooked = user.bookedEvents.includes(eventId);
    if (isBooked) {
      user.bookedEvents = user.bookedEvents.filter(id => id.toString() !== eventId);
    } else {
      user.bookedEvents.push(eventId);
    }
    await user.save();
    return NextResponse.json(user.bookedEvents, { status: 200 });
  } catch (error) {
    console.error('Error in PUT handler:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function DELETE (req) {
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { eventId, userId } = body;
    console.log('Parsed eventId:', eventId, 'Parsed userId:', userId);
    if (!eventId || !userId) {
      return NextResponse.json({ message: 'Missing eventId or userId' }, { status: 400 });
    }
    await connectToDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    user.bookedEvents = user.bookedEvents.filter(id => id.toString() !== eventId);    
    await user.save();
    return NextResponse.json(user.bookedEvents, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE handler:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

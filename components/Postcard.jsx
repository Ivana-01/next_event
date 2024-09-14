"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import NotBooked from '@/public/nobook.png';
import Booked from '@/public/book.png';

const PostCard = ({ event, eventId }) => {
  const { data: session } = useSession();
  const [booked, setBooked] = useState(false);
  const [bookedEvents, setBookedEvents] = useState([]);
  
  const handleBooking = async () => {
    try{
      const userId = session?.user.id
      const res = await fetch(`/api/prompt/${userId}/bookedEvents`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          eventId: eventId, 
          userId: userId
        })
      })
      const data = await res.json()
      console.log(data)
      setBookedEvents(data)
      console.log(bookedEvents)
  } catch(error) {
    console.log(error)
  } finally {
    setBooked(!booked)
  }}

  const handleUnbooking = async () => {
    try {
      const userId = session?.user.id
      const res = await fetch(`/api/prompt/${userId}/bookedEvents`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId: eventId, userId: userId }),
      })
      if (!res.ok) {
        throw new Error(`Error booking event: ${res.status}`)
      }
      const updatedBookedEvents = await res.json();
      setBookedEvents(updatedBookedEvents);
      console.log(bookedEvents)
    } catch (error) {
      console.log(error)
    } finally {
      setBooked(!booked)
    }
  }
  

  return (
    <div className='rounded-lg border border-zinc-700 bg-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50'>
      <Image src={event.image} width={60} height={60} alt="event" className="w-full rounded-lg m-0 p-0 shadow" unoptimized/>
      <div className="flex justify-between">
        <h1 className='text-textLogo font-bold text-xl pl-3 pt-4'>{event.event}</h1>
        <div className="cursor-pointer pr-2 pt-5">
          {booked ? (
            <button className="cursor-pointer" onClick={handleUnbooking}>
              <Image 
                src={Booked} 
                width={20} 
                height={20} 
                alt="event" 
              />
            </button>
          ) : (
            <button className="cursor-pointer" onClick={handleBooking}>
              <Image 
                src={NotBooked} 
                width={20} 
                height={20} 
                alt="event" 
              />
            </button>
          )}
        </div>
      </div>
      <p className='text-gray-300 text-sm pl-3'>{event.location}</p>
      <p className='eventP pl-3'>{event.description}</p>
      <p className='eventP pl-3'>{event.date} | {event.time}</p>
    </div>
  );
};

export default PostCard;
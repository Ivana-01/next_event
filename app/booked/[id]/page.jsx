"use client";
import { useState, useEffect } from "react";

export default function BookedEvents({params}) {
  const [bookedE, setBookedE] = useState([]);

  useEffect(() => {
    const fetchBookedEvents = async () => {
      const res = await fetch(`/api/prompt/${params.id}/bookedEvents?id=${params.id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await res.json()
      console.log(data);
      setBookedE(data);
      console.log(bookedE)
    }
    fetchBookedEvents()
  }, []);

  return (
    <>
      <section className="max-w-6xl mx-auto py-10 px-6">
        <h2 className="font-bold text-4xl mb-8">Booked Events</h2>

        {bookedE.length === 0 ? (
          <p className="text-neutral-600">No booked events available</p>
        ) : (
          <table width="100%">
            <thead>
              <tr className="bg-neutral-900">
                <td className="font-bold text-lg py-4">Event Name</td>
                <td className="font-bold text-lg py-4">Event Date</td>
                <td className="font-bold text-lg py-4">Event Location</td>
                <td className="font-bold text-lg py-4">Event Description</td>
                <td className="font-bold text-lg py-4"></td>
              </tr>
            </thead>

            <tbody>
              {bookedE.map((event) => (
                <tr key={event._id} className="even:bg-neutral-900">
                  <td className="py-2">{event.event}</td>
                  <td className="py-2">{event.date} | {event.time}</td>
                  <td className="py-2">{event.location}</td>
                  <td className="py-2">{event.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

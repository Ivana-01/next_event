'use client'
import React from 'react'
import Postcard from './Postcard'
import { useState, useEffect } from 'react'

const PromptCardList = ({ data }) => {
  return (
    <div className='mt-16 grid max-w-5xl w-full grid-cols-3 gap-3'>
      {data.map((event) => (
        <Postcard
          key={event._id}
          event={event}
          eventId={event._id}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState(events)

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setEvents(data)
    }
    fetchEvents()
  }, [])
  console.log(events)


  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = events.filter((event) =>
      event.event.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEvents(filtered)
  };
  
  return (
    <div className='pt-10'>
        <input
          type="text"
          placeholder='Search for event...'
          className='p-2 ml-10 bg-transparent text-textLogo border-b-2'
          onChange={handleSearch}
          value={searchText}
        />
        <div className="">
          {searchText ? (
            <PromptCardList
              data={filteredEvents}
            />
          ) : (
            <PromptCardList data={events}/>
          )}
          </div>
    </div>
  )
};

export default Feed
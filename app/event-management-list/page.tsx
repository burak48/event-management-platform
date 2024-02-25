"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Search } from '@/components/Search';

interface Event {
  event_id: string;
  event_name: string;
  description: string;
}

function Page() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/event-management/list');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  const fetchSearchResults = async () => {
    try {
        if (query.trim() !== "") {
          const response = await fetch(`/api/event-management/search?q=${query}`);
          const results = await response.json();
          setSearchResults(results);
        } else {
          fetchEvents();
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error fetching search results', error);
      }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (query.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleEventClick = (eventId: string) => {
    router.push(`/event-management-detail/${eventId}`);
  };

  return (
    <div className="container mx-auto p-16 px-4 sm:px-0 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Events</h1>
      <Search setQuery={setQuery} />

      {query !== "" ? (
        searchResults.length === 0 ? (
          <p className="text-center">No matching events found.</p>
        ) : (
          <ul className="space-y-4">
            {searchResults.map((event, index) => (
              <li
                key={event.event_id}
                className="border p-4 cursor-pointer"
                onClick={() => handleEventClick(event.event_id)}
              >
                <h2 className="text-xl font-bold line-clamp mb-4">{event.event_name}</h2>
                <p className='line-clamp-2'>{event.description}</p>
              </li>
            ))}
          </ul>
        )
      ) : (
        events.length === 0 ? (
          <p className="text-center">No events available.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li
                key={event.event_id}
                className="border p-4 cursor-pointer"
                onClick={() => handleEventClick(event.event_id)}
              >
                <h2 className="text-xl font-bold line-clamp mb-4">{event.event_name}</h2>
                <p className='line-clamp-2'>{event.description}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default Page;

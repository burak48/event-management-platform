"use client";

import React, { useState, useEffect, useCallback } from "react";
import ErrorPage from "@/components/Error";
import LoadingSpinner from "@/components/LoadingSpinner";

type Event = {
    event_id: string;
    event_name: string;
    description: string;
    location: string;
    date: string;
    time: string
};

function Page({ params }: { params: { id: string } }) {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`/api/event-management/detail/${params.id}`);
            const data = await response.json();

            if (response.ok) {
                setEvent(data);
            } else {
                setError("Error fetching event details");
            }
        } catch (error) {
            console.error("Error fetching event details", error);
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorPage message={error} />;
    }

    return (
        <div className="container mx-auto pt-16 px-4 sm:px-0 max-w-2xl">
            <h1 className="text-2xl font-bold mb-4 text-center">Event Detail</h1>

            {event ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-8">
                        <div className="text-left">
                            <p className="text-sm text-gray-500">Location: {event?.location}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">
                                {event?.date} - {event?.time}
                            </p>
                        </div>
                    </div>

                    <p className="text-lg font-semibold mb-4">{event.event_name}</p>
                    <p className="text-lg mb-4">{event.description}</p>
                </div>
            ) : (
                <p className="text-lg text-gray-600">No event details available.</p>
            )}
        </div>
    )
}

export default Page;

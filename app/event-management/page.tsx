"use client";

import React, { useState, useCallback } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface FormData {
    eventName: string;
    description: string;
    location: string;
    date: string;
    time: string;
}

function Page() {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        eventName: "",
        description: "",
        location: "",
        date: "",
        time: ""
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const eventID = uuidv4();

    const onChange = useCallback((text: string, type: keyof FormData) => {
        setFormData(prev => ({
            ...prev,
            [type]: text
        }));
    }, []);

    const validateFormData = useCallback(() => {
        for (const field in formData) {
            if (formData[field as keyof FormData].length === 0) {
                console.error(`The ${field} field cannot be blank`);
            }
        }
    }, [formData]);

    const handleSubmit = useCallback(async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        validateFormData();

        if (Object.values(formData).some(value => value.length === 0)) {
            setError("Please fill out all fields");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`/api/event-management/create`, {
                method: "POST",
                body: JSON.stringify({
                    event_id: eventID,
                    event_name: formData.eventName,
                    description: formData.description,
                    location: formData.location,
                    date: formData.date,
                    time: formData.time
                })
            })

            const data = await response.json();

            if (response.ok) {
                console.log("Event created successfully!", data);
                router.push("/event-management-list");
            } else {
                console.error("Error creating event", data);
                setError("Error creating event");
            }

        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [formData, validateFormData, eventID, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof FormData) => {
        onChange(e.target.value, type);
        setError("");
    };

    return (
        <div className="container mx-auto pt-16 px-4 sm:px-0 max-w-2xl">
            {isLoading ? (
                <>
                    <LoadingSpinner />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Event Management Platform
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {Object.entries(formData).map(([type, value]) => (
                            <div className="mb-4" key={type}>
                                <Input
                                    type="text"
                                    placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
                                    value={value}
                                    onChange={(e) => handleChange(e, type as keyof FormData)}
                                    maxLength={400}
                                />
                            </div>
                        ))}
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center items-center">
                            <Button type="submit" className="text-black flex justify-center items-center" variant="default" size="default">Create Event</Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}

export default Page;

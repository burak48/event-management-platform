import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ErrorProps {
    message: string;
}

const ErrorPage = ({ message }: ErrorProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="image-container">
                <Image src="/error.svg" alt="Error" layout="responsive" width={500} height={500} />
            </div>
            <p className="text-red-500 text-xl my-8 mx-auto text-center">{message}</p>
            <button className="mb-8 bg-black text-white p-2">
                <Link href={"/event-management"}>Go to Event Creating Page</Link>
            </button>
        </div>
    )
}

export default ErrorPage;

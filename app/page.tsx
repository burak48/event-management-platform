import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center p-8">
        <div className="link-container flex justify-center items-center sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-wrap">
          <div className="image-container border border-gray-800 p-2 xl:ml-4 mt-4 xl:mt-0">
            <Link href="/event-management">
              <div className="text-center">
                <Image src="/event-management-platform.svg" alt="Event Management Platform" width={200} height={200} />
              </div>
              <div className="button-container flex justify-center mt-4">
                <button className="button font-bold">Event Management Platform</button>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

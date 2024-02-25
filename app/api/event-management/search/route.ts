import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const searchParams = url.searchParams;
    const search = searchParams.get('q');

    let events;

    if (search) {
      events = await prisma.events.findMany({
        where: {
          OR: [
            { event_name: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
          ],
        },
      });
    } else {
      events = await prisma.events.findMany();
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred" }),
      { status: 500 }
    );
  }
}

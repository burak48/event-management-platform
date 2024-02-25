import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string }}) {
  try {
    const id = params.id;

    const event = await prisma.events.findUnique({
      where: {
        event_id: String(id),
      },
    });

    if (!event) {
      return new NextResponse(
        JSON.stringify({ error: "Event not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred" }),
      { status: 500 }
    );
  }
}

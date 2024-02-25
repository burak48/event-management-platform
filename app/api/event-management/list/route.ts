import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const events = await prisma.events.findMany();
    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "An error occured" }),
      { status: 500 }
    )
  }
}

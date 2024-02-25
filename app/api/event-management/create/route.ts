import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {
  const body = await req.json()
  const result = await prisma.events.create({
    data: {
      ...body
    },
  });
  if (!result) return Response.json({
    message: 'Error',
    status: 500
  })
  return Response.json({ message: 'ok', status: 200, data: result })
}

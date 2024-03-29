import { PrismaClient } from "@prisma/client";
import { validateEventInput } from "@/utils/helper";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validationError = validateEventInput(body);
    if (validationError) {
      return Response.json({
        message: `Error: ${validationError}`,
        status: 400,
      });
    }

    const result = await prisma.events.create({
      data: {
        ...body
      },
    });
    if (!result) {
      return Response.json({
      message: 'Error: Event creation failed',
      status: 500
      })
    }
    return Response.json({ message: 'ok', status: 200, data: result })
  } catch (error) {
    console.error("Error creating event:", error);
    return Response.json({
      message: 'Error: Internal Server Error',
      status: 500
    });
  }
}

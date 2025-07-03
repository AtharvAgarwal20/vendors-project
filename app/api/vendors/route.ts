import { vendorSchema } from "@/app/utils/schemas";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod/v4";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      name,
      bankAccNo,
      bankName,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
    } = body;

    const parsedBody = vendorSchema.parse({
      name,
      bankAccNo,
      bankName,
      addressLine1,
      addressLine2,
      city,
      country,
      zipCode,
    });

    const newVendor = await prisma.vendor.create({
      data: parsedBody,
    });

    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return NextResponse.json({ error: "Invalid Form Data" }, { status: 400 });
    }
  }
}

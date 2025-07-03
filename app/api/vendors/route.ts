import { vendorSchema } from "@/app/utils/schemas";
import { auth } from "@/auth";
import { Prisma, PrismaClient } from "@prisma/client";
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

    console.log(parsedBody);

    const newVendor = await prisma.vendor.create({
      data: parsedBody,
    });

    return NextResponse.json(newVendor, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return NextResponse.json({ error: "Invalid Form Data" }, { status: 400 });
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Vendor name already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

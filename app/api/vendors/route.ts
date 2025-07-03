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
      email: session.user?.email,
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
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err);
      return NextResponse.json({ error: "Invalid Form Data" }, { status: 400 });
    }

    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Vendor name already in use" },
        { status: 409 }
      );
    }

    console.log(err);

    return NextResponse.json(
      { error: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

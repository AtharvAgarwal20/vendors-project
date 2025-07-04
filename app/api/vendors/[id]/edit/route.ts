import { prisma } from "@/app/utils/prisma";
import { vendorSchema } from "@/app/utils/schemas";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const vendor = await prisma.vendor.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });

    if (vendor) {
      return NextResponse.json({ data: vendor }, { status: 200 });
    }
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await auth();

  if (!session || !session?.user?.email) {
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

    const updatedVendor = await prisma.vendor.update({
      where: {
        id: Number(id),
        email: session.user?.email,
      },
      data: parsedBody,
    });

    if (updatedVendor) {
      return NextResponse.json(
        { message: `Vendor ${parsedBody.name} updated` },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

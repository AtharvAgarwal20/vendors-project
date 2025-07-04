import { prisma } from "@/app/utils/prisma";
import { vendorSchema } from "@/app/utils/schemas";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod/v4";

export async function GET(req: Request) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const [allVendors, totalVendors] = await prisma.$transaction([
      prisma.vendor.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: {
          email: session.user?.email,
        },
        select: {
          id: true,
          name: true,
          bankAccNo: true,
          bankName: true,
          addressLine1: true,
          addressLine2: true,
          city: true,
          country: true,
          zipCode: true,
        },
      }),
      prisma.vendor.count(),
    ]);

    if (allVendors.length > 0) {
      return NextResponse.json(
        {
          vendors: allVendors,
          totalVendors,
          totalPages: Math.ceil(totalVendors / limit),
          currentPage: page,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "No Vendor Found" }, { status: 404 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

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

export async function DELETE(req: Request) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id } = body;
    const deleteResult = await prisma.vendor.delete({
      where: {
        id,
        email: session.user.email,
      },
    });

    if (!deleteResult) {
      return NextResponse.json(
        { error: "Vendor not found or permission denied" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Vendor deleted successfully", data: deleteResult },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An unexpected error occured" },
      { status: 500 }
    );
  }
}

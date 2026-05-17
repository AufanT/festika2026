import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { ApiResponse } from "@/lib/api-response";
import { PastEventRepository } from "@/lib/repositories/past-event.repository";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    if (yearParam) {
      const year = parseInt(yearParam as string);
      const events = await PastEventRepository.findByYear(year);
      return ApiResponse.success(events);
    }

    const all = await PastEventRepository.findAll();
    return ApiResponse.success(all);
  } catch (error: any) {
    console.error("Error fetching past events:", error);
    return ApiResponse.error("Gagal mengambil data past events", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) return ApiResponse.error("Unauthorized", 401);

    const body = await req.json();

    const PastEventInput = z.object({
      title: z.string().min(1),
      theme: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      year: z.union([z.number(), z.string()]).optional(),
      eventDate: z.string().optional().nullable(),
      imageUrl: z.string().url().nullable().optional(),
      galleryUrls: z.array(z.string()).optional(),
      participants: z.union([z.number(), z.string()]).optional().nullable(),
      winner: z.string().nullable().optional(),
      runnerUp: z.string().nullable().optional(),
      thirdPlace: z.string().nullable().optional(),
      orderIndex: z.union([z.number(), z.string()]).optional(),
    });

    const parsed = PastEventInput.safeParse(body);
    if (!parsed.success) {
      const msg =
        parsed.error.issues.map((e) => e.message).join(", ") || "Invalid input";
      console.warn(
        "Validation failed for POST /api/past-events:",
        parsed.error.format(),
      );
      return ApiResponse.error(msg, 400);
    }

    const input = parsed.data;
    const id = randomUUID();
    const now = new Date();

    const data = {
      id,
      title: input.title,
      theme: input.theme ?? null,
      description: input.description ?? null,
      year: input.year ? Number(input.year) : new Date().getFullYear() - 1,
      eventDate: input.eventDate ? new Date(String(input.eventDate)) : null,
      imageUrl: input.imageUrl ?? null,
      galleryUrls: Array.isArray(input.galleryUrls)
        ? input.galleryUrls
        : input.galleryUrls
          ? String(input.galleryUrls)
              .split(",")
              .map((s) => s.trim())
          : [],
      participants:
        input.participants === undefined ||
        input.participants === null ||
        input.participants === ""
          ? null
          : Number(input.participants),
      winner: input.winner ?? null,
      runnerUp: input.runnerUp ?? null,
      thirdPlace: input.thirdPlace ?? null,
      orderIndex: input.orderIndex ? Number(input.orderIndex) : 0,
      createdAt: now,
      updatedAt: now,
    };

    await PastEventRepository.create(data as any);
    return ApiResponse.success(data, "Past event berhasil ditambahkan!", 201);
  } catch (error: any) {
    console.error("Error creating past event:", error);
    return ApiResponse.error(error.message || "Gagal membuat past event", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("ID past event wajib disertakan", 400);
    }

    const body = await req.json();
    await PastEventRepository.update(id, body);

    return ApiResponse.success(null, "Past event berhasil diperbarui!");
  } catch (error: any) {
    console.error("Error updating past event:", error);
    return ApiResponse.error(
      error.message || "Gagal memperbarui past event",
      500,
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponse.error("Unauthorized", 401);
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return ApiResponse.error("ID past event wajib disertakan", 400);
    }

    await PastEventRepository.delete(id);
    return ApiResponse.success(null, "Past event berhasil dihapus!");
  } catch (error: any) {
    console.error("Error deleting past event:", error);
    return ApiResponse.error(
      error.message || "Gagal menghapus past event",
      500,
    );
  }
}

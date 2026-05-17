import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import pool from "@/lib/mysql";
import { faqSchema } from "@/lib/validations";

export async function GET() {
  try {
    const [rows]: any = await pool.query(
      "SELECT id, question, answer, orderIndex, createdAt FROM faqs ORDER BY orderIndex ASC, createdAt ASC",
    );
    return NextResponse.json({
      success: true,
      data: rows.map((r: any) => ({
        ...r,
        createdAt: r.createdAt?.toISOString?.() || r.createdAt,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = faqSchema.parse(body);

    const { randomUUID } = await import("crypto");
    const id = randomUUID();
    const now = new Date();

    await pool.query(
      "INSERT INTO faqs (id, question, answer, orderIndex, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
      [id, parsed.question, parsed.answer, parsed.orderIndex || 0, now, now],
    );

    return NextResponse.json({
      success: true,
      data: { id, question: parsed.question, answer: parsed.answer, orderIndex: parsed.orderIndex || 0, createdAt: now.toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menambahkan FAQ" },
      { status: 400 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "id is required" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = faqSchema.partial().parse(body);

    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(parsed)) {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      return NextResponse.json({ success: false, message: "No fields to update" }, { status: 400 });
    }

    fields.push("updatedAt = ?");
    values.push(new Date());
    values.push(id);

    await pool.query(`UPDATE faqs SET ${fields.join(", ")} WHERE id = ?`, values);

    return NextResponse.json({ success: true, message: "FAQ berhasil diperbarui" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memperbarui FAQ" },
      { status: 400 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "id is required" }, { status: 400 });
    }

    await pool.query("DELETE FROM faqs WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "FAQ berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menghapus FAQ" },
      { status: 500 },
    );
  }
}

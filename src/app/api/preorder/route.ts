import { NextResponse } from "next/server";
import { completePreorderSchema } from "@/lib/validations/preorder";
import { submitPreorder } from "@/server/actions/preorder";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = completePreorderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await submitPreorder(parsed.data);

    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

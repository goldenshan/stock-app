// app/api/equipment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/token";
import { resolveWorkbookId, readTableRows } from "@/lib/excel";

const WORKBOOK_PATH = process.env.WORKBOOK_PATH!;

export async function GET(req: NextRequest) {
  try {
    const token = validateToken(req.headers.get("authorization"));
    const q = (req.nextUrl.searchParams.get("q") || "").toLowerCase();
    const status = req.nextUrl.searchParams.get("status") || "all";

    const workbookId = await resolveWorkbookId(token, WORKBOOK_PATH);

    const rows = await readTableRows(token, workbookId, "tblEquipment");

    // table rows = array of { index: number, values: [...] }
    const items = rows.map((r: any) => {
      const [
        EquipID,
        Name,
        Category,
        SerialNo,
        Location,
        TotalQty,
        AvailableQty,
        BorrowedQty,
        Status,
        ImageUrl,
        UpdatedAt,
      ] = r.values[0];

      return {
        EquipID,
        Name,
        Category,
        SerialNo,
        Location,
        TotalQty,
        AvailableQty,
        BorrowedQty,
        Status,
        ImageUrl,
        UpdatedAt,
        _row: r.index,
      };
    });

    // filter q
    const filtered = items.filter((it: any) => {
      const text = (
        it.EquipID +
        it.Name +
        it.Category +
        it.SerialNo +
        it.Location
      ).toLowerCase();

      return text.includes(q);
    });

    // filter status
    const filtered2 =
      status === "available"
        ? filtered.filter((x: any) => x.AvailableQty > 0)
        : status === "borrowed"
        ? filtered.filter((x: any) => x.BorrowedQty > 0)
        : filtered;

    return NextResponse.json({
      items: filtered2,
      count: filtered2.length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
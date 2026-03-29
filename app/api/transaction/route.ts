// app/api/transaction/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/lib/token";
import {
  resolveWorkbookId,
  readTableRows,
  addHistoryRow,
  updateEquipmentRow,
} from "@/lib/excel";

const WORKBOOK_PATH = process.env.WORKBOOK_PATH!;

export async function POST(req: NextRequest) {
  try {
    const token = validateToken(req.headers.get("authorization"));
    const body = await req.json();

    const { equipId, txType, qty, project, borrower, note } = body;

    const workbookId = await resolveWorkbookId(token, WORKBOOK_PATH);

    // get current equipment rows
    const rows = await readTableRows(token, workbookId, "tblEquipment");

    const row = rows.find((r: any) => r.values[0][0] === equipId);
    if (!row) throw new Error("EquipID not found");

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
    ] = row.values[0];

    let newTotal = TotalQty;
    let newAvail = AvailableQty;
    let newBorrow = BorrowedQty;

    // BUSINESS LOGIC
    switch (txType) {
      case "IN":
        newTotal += qty;
        newAvail += qty;
        break;

      case "OUT":
        if (newAvail - qty < 0) throw new Error("ยอด Available จะติดลบ");
        newTotal -= qty;
        newAvail -= qty;
        break;

      case "BORROW":
        if (newAvail - qty < 0) throw new Error("ยอด Available จะติดลบ");
        newAvail -= qty;
        newBorrow += qty;
        break;

      case "RETURN":
        if (newBorrow - qty < 0) throw new Error("ยอด Borrowed จะติดลบ");
        newAvail += qty;
        newBorrow -= qty;
        break;

      case "ADJUST":
        newTotal += qty;
        newAvail += qty;
        break;
    }

    // recompute STATUS
    let newStatus = "AVAILABLE";
    if (newAvail === 0 && newBorrow === 0) newStatus = "OUT_OF_STOCK";
    else if (newAvail > 0 && newBorrow === 0) newStatus = "AVAILABLE";
    else if (newAvail === 0 && newBorrow > 0) newStatus = "BORROWED";
    else newStatus = "PARTIAL";

    const now = new Date().toISOString();

    // write to history table
    await addHistoryRow(token, workbookId, [
      "TX-" + Date.now(), // TxID
      now,
      equipId,
      txType,
      qty,
      project || "",
      borrower || "",
      "user", // performedBy placeholder
      note || "",
    ]);

    // update equipment row
    await updateEquipmentRow(token, workbookId, row.index, [
      equipId,
      Name,
      Category,
      SerialNo,
      Location,
      newTotal,
      newAvail,
      newBorrow,
      newStatus,
      ImageUrl,
      now,
    ]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

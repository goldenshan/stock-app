"use client";

import { useState } from "react";

interface Props {
  equipment: any;
  onClose: () => void;
}

export default function TransactionModal({ equipment, onClose }: Props) {
  const [txType, setTxType] = useState("BORROW");
  const [qty, setQty] = useState(1);
  const [project, setProject] = useState("");
  const [borrower, setBorrower] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        equipId: equipment.EquipID,
        txType,
        qty,
        project,
        borrower,
        note,
      }),
    });

    setLoading(false);
    if (res.ok) {
      alert("ทำรายการสำเร็จ ✅");
      onClose();
    } else {
      const err = await res.json();
      alert("เกิดข้อผิดพลาด ❌\n" + err.error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h3 className="font-bold text-xl mb-4">
          ทำรายการ: {equipment.Name}
        </h3>

        <label className="font-medium">ประเภทการทำรายการ</label>
        <select
          className="w-full mt-1 mb-4 px-3 py-2 border rounded"
          value={txType}
          onChange={(e) => setTxType(e.target.value)}
        >
          <option value="BORROW">ยืม</option>
          <option value="RETURN">คืน</option>
          <option value="OUT">เบิกออก</option>
          <option value="IN">รับเข้า</option>
          <option value="ADJUST">ปรับยอด</option>
        </select>

        <label className="font-medium">จำนวน</label>
        <input
          type="number"
          className="w-full mt-1 mb-4 px-3 py-2 border rounded"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <label className="font-medium">โครงการ (ถ้ามี)</label>
        <input
          className="w-full mt-1 mb-4 px-3 py-2 border rounded"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />

        <label className="font-medium">ผู้ยืม / หน่วยงาน</label>
        <input
          className="w-full mt-1 mb-4 px-3 py-2 border rounded"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
        />

        <label className="font-medium">หมายเหตุ</label>
        <textarea
          className="w-full mt-1 mb-4 px-3 py-2 border rounded"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            ปิด
          </button>

          <button
            className="flex-1 py-2 bg-ig-pink text-white rounded disabled:opacity-50"
            disabled={loading}
            onClick={submit}
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
}
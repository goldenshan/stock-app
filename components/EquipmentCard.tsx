"use client";

interface Props {
  item: any;
  onSelect: () => void;
}

export default function EquipmentCard({ item, onSelect }: Props) {
  return (
    <div
      className="bg-white shadow-card hover:shadow-cardHover transition rounded-xl overflow-hidden cursor-pointer"
      onClick={onSelect}
    >
      {item.ImageUrl ? (
        <img
          src={item.ImageUrl}
          alt={item.Name}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200" />
      )}

      <div className="p-3">
        <div className="font-semibold text-lg">{item.Name}</div>
        <div className="text-sm text-gray-600">{item.Category}</div>

        <div className="mt-3 flex gap-2">
          <span className="px-2 py-1 text-xs rounded bg-green-50 text-green-700">
            พร้อม: {item.AvailableQty}
          </span>
          <span className="px-2 py-1 text-xs rounded bg-red-50 text-red-700">
            ยืมอยู่: {item.BorrowedQty}
          </span>
        </div>

        <span
          className={`inline-block mt-3 px-2 py-1 text-xs rounded 
            ${
              item.Status === "AVAILABLE"
                ? "bg-green-500 text-white"
                : item.Status === "BORROWED"
                ? "bg-red-500 text-white"
                : item.Status === "PARTIAL"
                ? "bg-yellow-500 text-white"
                : "bg-gray-500 text-white"
            }`}
        >
          {item.Status}
        </span>
      </div>
    </div>
  );
}
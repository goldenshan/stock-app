"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const options = [
  { value: "available", label: "พร้อมให้ยืม" },
  { value: "borrowed", label: "ถูกยืมอยู่" },
  { value: "all", label: "ทั้งหมด" },
];

export default function SegmentedFilter({ value, onChange }: Props) {
  return (
    <div className="flex bg-gray-200 p-1 rounded-full my-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            flex-1 py-2 rounded-full text-sm transition
            ${value === opt.value
              ? "bg-white shadow text-ig-pink font-semibold"
              : "text-gray-600"}
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
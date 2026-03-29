"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="my-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ค้นหาอุปกรณ์..."
        className="w-full px-4 py-3 rounded-full border bg-white shadow-sm 
        focus:ring-2 focus:ring-ig-pink outline-none transition-all"
      />
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalClient";

import SearchBar from "@/components/SearchBar";
import SegmentedFilter from "@/components/SegmentedFilter";
import EquipmentCard from "@/components/EquipmentCard";
import TransactionModal from "@/components/TransactionModal";

export default function Page() {

  const { instance, accounts } = useMsal();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  async function loadEquipment() {
    try {
      setLoading(true);

      if (accounts.length === 0) return;

      const tokenResult = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      const token = tokenResult.accessToken;

      const res = await fetch(`/api/equipment?q=${query}&status=${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setItems(data.items);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEquipment();
  }, [query, status, accounts]);

  return (
    <main className="p-4 max-w-5xl mx-auto">

      <header className="ig-header-gradient text-white text-center py-4 rounded-xl mb-4 font-semibold text-xl shadow">
        ระบบตรวจนับสต๊อค
      </header>

      <SearchBar value={query} onChange={setQuery} />

      <SegmentedFilter value={status} onChange={setStatus} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-60 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          ไม่มีอุปกรณ์ตรงกับการค้นหา
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {items.map((it) => (
            <EquipmentCard
              key={it.EquipID}
              item={it}
              onSelect={() => setSelected(it)}
            />
          ))}
        </div>
      )}

      {selected && (
        <TransactionModal
          equipment={selected}
          onClose={() => {
            setSelected(null);
            loadEquipment();
          }}
        />
      )}
    </main>
  );
}

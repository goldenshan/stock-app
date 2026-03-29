"use client";

import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h1>
        <LoginButton />
      </div>
    </main>
  );
}

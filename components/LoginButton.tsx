"use client";

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msalClient";

export default function LoginButton() {
  const { instance } = useMsal();

  async function signIn() {
    try {
      await instance.loginPopup(loginRequest);
      window.location.href = "/"; // กลับหน้าหลัก
    } catch (err) {
      alert("ไม่สามารถเข้าสู่ระบบ: " + err);
    }
  }

  return (
    <button
      onClick={signIn}
      className="px-6 py-3 bg-ig-pink text-white rounded-full shadow"
    >
      Login With Microsoft
    </button>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "age-verified";

const AgeGate = () => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      router.replace("/home");
      return;
    }
    setChecking(false);
  }, [router]);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    router.push("/home");
  };

  const handleDeny = () => {
    window.location.href = "https://www.google.com";
  };

  if (checking) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        <h1 className="text-xl font-bold">年齢確認</h1>
        <p>
          このサイトはアダルトコンテンツを含みます。
          <br />
          あなたは18歳以上ですか？
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleConfirm}
            className="bg-pink-500 text-white rounded px-4 py-2 w-24 font-bold"
          >
            はい
          </button>
          <button
            onClick={handleDeny}
            className="border border-gray-500 text-gray-500 rounded px-4 py-2 w-24 font-bold"
          >
            いいえ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;